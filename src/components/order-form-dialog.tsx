'use client';

import * as React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import QRCode from 'qrcode';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { type CartItem } from '@/app/page';
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePersistedForm } from '@/hooks/use-persisted-form';
import { useToast } from '@/hooks/use-toast';
import { config } from '@/lib/utils';
import { Loader2, Truck, Star, MapPin, Phone, ArrowLeft } from 'lucide-react';
import { WhatsappIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    phone: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }).max(15),
    date: z.string().optional(),
    time: z.string().optional(),
    deliveryOption: z.enum(['delivery', 'book-for-occasion'], { required_error: "Please select an option." }),
    address: z.string().optional(),
    pincode: z.string().optional(),
    paymentMethod: z.literal('pay-now'),
    utr: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.deliveryOption === 'delivery') {
        if (!data.address || data.address.length < 5) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['address'],
                message: 'Address is required for delivery.',
            });
        }
        if (!data.pincode || data.pincode.length < 6) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['pincode'],
                message: 'A valid 6-digit pincode is required for delivery.',
            });
        }
    }
    if (data.paymentMethod === 'pay-now') {
        if (!data.utr || data.utr.length < 12) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['utr'], message: 'A valid 12-digit UPI Transaction ID is required.' });
        }
    }
});

type OrderFormValues = z.infer<typeof formSchema>;

type OrderFormDialogProps = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    cart: CartItem[];
};

const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

export function OrderFormDialog({ isOpen, onOpenChange, cart }: OrderFormDialogProps) {
    const { toast } = useToast();
    const [orderMode, setOrderMode] = React.useState<'selection' | 'whatsapp' | 'call'>('selection');

    // Reset mode when dialog opens
    React.useEffect(() => {
        if (isOpen) {
            setOrderMode('selection');
        }
    }, [isOpen]);

    const form = useForm<OrderFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            phone: '',
            date: new Date().toISOString().split('T')[0],
            time: '12:00',
            deliveryOption: 'delivery',
            address: '',
            pincode: '',
            paymentMethod: 'pay-now',
            utr: '',
        },
    });

    usePersistedForm(form, 'traditional-needle-work-order-form');

    const deliveryOption = form.watch('deliveryOption');
    const paymentMethod = 'pay-now'; // Forced for WhatsApp
    const addressValue = form.watch('address');

    const [qrCodeUrl, setQrCodeUrl] = React.useState<string | null>(null);
    const [upiLink, setUpiLink] = React.useState<string | null>(null);

    const [locationError, setLocationError] = React.useState<string | null>(null);
    const [isVerifying, setIsVerifying] = React.useState(false);
    const [isLocationVerified, setIsLocationVerified] = React.useState(false);
    const [userLocation, setUserLocation] = React.useState<{ latitude: number, longitude: number } | null>(null);
    const permissionRequested = React.useRef(false);
    const [showOutOfRangeDialog, setShowOutOfRangeDialog] = React.useState(false);

    const STORE_LAT = 24.2024486;
    const STORE_LON = 87.7985075;
    const DELIVERY_RADIUS_KM = 5;

    React.useEffect(() => {
        if (deliveryOption === 'delivery') {
            setIsLocationVerified(false);
        }
    }, [addressValue, deliveryOption]);

    React.useEffect(() => {
        if (deliveryOption !== 'delivery') {
            setIsLocationVerified(true);
            setLocationError(null);
        } else {
            setIsLocationVerified(false);
        }
    }, [deliveryOption]);

    const handleLocationRequest = () => {
        if (!navigator.geolocation || permissionRequested.current || deliveryOption !== 'delivery') return;
        permissionRequested.current = true;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ latitude, longitude });
                setLocationError(null);
                setIsLocationVerified(true); // Automatically verify for simplicity since policy is All Over India
                toast({
                    title: "Location Captured",
                    description: "Your location has been added to the order details.",
                });
            },
            (error) => {
                setIsLocationVerified(true); // Don't block even if location fails
                if (error.code === error.PERMISSION_DENIED) {
                    setLocationError("Location access denied. Please enter your address manually.");
                } else {
                    setLocationError("Could not get location. Please enter your address manually.");
                }
            }
        );
    };

    const handleVerifyClick = () => {
        handleLocationRequest();
    };

    const subtotal = React.useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart]);
    const HANDLING_CHARGE = 5;
    const DELIVERY_CHARGE = 40;
    const totalPrice = subtotal + HANDLING_CHARGE + DELIVERY_CHARGE;

    const isSubmitDisabled = (deliveryOption === 'delivery' && !isLocationVerified) || form.formState.isSubmitting;

    React.useEffect(() => {
        if (isOpen && orderMode === 'whatsapp' && totalPrice > 0) {
            const transactionNote = cart.length > 1
                ? `Cart order (${cart.length} items)`
                : cart[0]?.name || 'Traditional Order';
            const upiId = config.contact.upi;
            const upiPayeeName = config.fullName;
            const generatedUpiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(upiPayeeName)}&am=${totalPrice.toFixed(2)}&cu=INR&tn=${encodeURIComponent(transactionNote.substring(0, 49))}`;
            setUpiLink(generatedUpiLink);

            QRCode.toDataURL(generatedUpiLink, { errorCorrectionLevel: 'M', width: 300, margin: 2 }, (err, url) => {
                if (err) {
                    console.error("Failed to generate QR code", err);
                    setQrCodeUrl(null);
                    setUpiLink(null);
                } else {
                    setQrCodeUrl(url);
                }
            });
        }
    }, [isOpen, orderMode, cart, totalPrice]);


    const onSubmit = (data: OrderFormValues) => {
        const orderDetails = cart.map((item, index) =>
            `${index + 1}. ${item.name} ${item.selectedSize ? `(Size: ${item.selectedSize})` : ""} x ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString('en-IN')}`
        ).join('\n');

        let orderType: string;
        switch (data.deliveryOption) {
            case 'delivery':
                orderType = 'Delivery';
                break;
            case 'book-for-occasion':
                orderType = 'Book for Occasion';
                break;
            default:
                orderType = 'Not specified';
        }

        let formattedDate = '';
        if (data.date) {
            formattedDate = new Date(data.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
        }

        let formattedTime = '';
        if (data.time) {
            const timeString = data.time;
            const [hours, minutes] = timeString.split(':');
            const hoursInt = parseInt(hours, 10);
            const ampm = hoursInt >= 12 ? 'PM' : 'AM';
            const formattedHours = hoursInt % 12 || 12;
            formattedTime = `${String(formattedHours).padStart(2, '0')}:${minutes} ${ampm}`;
        }

        let customerDetails = `*Customer Details:*\nName: ${data.name}\nPhone: ${data.phone}\nOrder Type: ${orderType}`;

        if (formattedDate) customerDetails += `\nDate: ${formattedDate}`;
        if (formattedTime) customerDetails += `\nTime: ${formattedTime}`;

        if (data.deliveryOption === 'delivery') {
            customerDetails += `\nAddress: ${data.address}\nPincode: ${data.pincode}`;
        }

        const paymentMethodText = 'Paid via UPI';
        customerDetails += `\nPayment Method: ${paymentMethodText}`;
        if (data.paymentMethod === 'pay-now' && data.utr) {
            customerDetails += `\nUPI Transaction ID: ${data.utr}`;
        }


        const message = `Hello ${config.brandName}, I would like to place the following order:\n\n*Order Summary:*\n${orderDetails}\n\nSubtotal: ₹${subtotal.toLocaleString('en-IN')}\nHandling Charge: ₹${HANDLING_CHARGE}\nDelivery Charge: ₹${DELIVERY_CHARGE}\n\n*Total Order Value: ₹${totalPrice.toLocaleString('en-IN')}*\n\n${customerDetails}\n\nPlease confirm this order.`;

        const whatsappUrl = `https://wa.me/91${config.contact.whatsapp}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        onOpenChange(false);
        form.reset();
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onOpenChange}>
                <DialogContent className="w-[95vw] max-w-lg md:max-w-xl rounded-[20px] bg-[#F6F2EB] border-[1px] border-[#C8A165]/40 shadow-[0_10px_40px_rgba(58,42,31,0.15)] p-0 overflow-hidden flex flex-col max-h-[90vh]">

                    {/* Header with Textile Design Hint */}
                    <div className="relative bg-[#F6F2EB] p-6 pb-2 text-center border-b border-[#C8A165]/10">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C8A165]/40 to-transparent"></div>
                        <DialogHeader>
                            <DialogTitle className="font-serif text-2xl md:text-3xl text-[#3A2A1F] tracking-wide font-medium">
                                {orderMode === 'selection' ? 'Choose Order Method' :
                                    orderMode === 'call' ? 'Call to Order' : 'Complete Your Order'}
                            </DialogTitle>
                            {orderMode === 'selection' && (
                                <DialogDescription className="text-[#3A2A1F]/60 font-sans mt-1">
                                    Select how you would like to proceed with your traditional masterpiece.
                                </DialogDescription>
                            )}
                        </DialogHeader>

                        {orderMode !== 'selection' && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="absolute left-4 top-6 text-[#3A2A1F]/60 hover:text-[#3A2A1F] hover:bg-[#C8A165]/10 rounded-full w-8 h-8 p-0 z-10"
                                onClick={() => setOrderMode('selection')}
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        )}

                        {/* Decorative Flourish */}
                        <div className="flex justify-center mt-3 mb-1">
                            <div className="w-16 h-[1px] bg-[#C8A165]/40 relative">
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#C8A165] rotate-45"></div>
                            </div>
                        </div>
                    </div>

                    <ScrollArea className="flex-grow">
                        <div className="p-6 md:p-8">

                            {/* SELECTION MODE */}
                            {orderMode === 'selection' && (
                                <div className="flex flex-col items-center justify-center gap-6 py-4">
                                    <Button
                                        onClick={() => setOrderMode('whatsapp')}
                                        className="w-full max-w-md h-auto py-5 px-6 flex items-center justify-between gap-4 bg-[#3A5A40] hover:bg-[#344e39] text-white rounded-full shadow-[0_4px_14px_rgba(58,90,64,0.2)] border border-[#C8A165]/30 transition-all hover:scale-[1.02] group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                                <WhatsappIcon className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-lg font-serif font-medium tracking-wide">Order via WhatsApp</div>
                                                <div className="text-xs uppercase tracking-wider opacity-80">Quick Order & Secure Payment</div>
                                            </div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowLeft className="w-4 h-4 text-white rotate-180" />
                                        </div>
                                    </Button>

                                    <div className="flex items-center gap-6 w-full max-w-sm opacity-80">
                                        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C8A165]/50 to-transparent flex-grow"></div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-[#C8A165] rotate-45"></div>
                                            <span className="text-[#3A2A1F] text-xs font-serif tracking-[0.3em] uppercase font-bold">OR</span>
                                            <div className="w-1.5 h-1.5 bg-[#C8A165] rotate-45"></div>
                                        </div>
                                        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C8A165]/50 to-transparent flex-grow"></div>
                                    </div>

                                    <Button
                                        onClick={() => setOrderMode('call')}
                                        className="w-full max-w-md h-auto py-5 px-6 flex items-center justify-between gap-4 bg-[#F8F5F0] hover:bg-[#f0ebe0] text-[#3A2A1F] border border-[#C8A165] rounded-full shadow-sm transition-all hover:scale-[1.02] group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[#C8A165]/10 flex items-center justify-center">
                                                <Phone className="w-5 h-5 text-[#3A2A1F]" />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-lg font-serif font-medium tracking-wide">Call to Order</div>
                                                <div className="text-xs uppercase tracking-wider opacity-60">Speak directly with our team</div>
                                            </div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-[#C8A165]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowLeft className="w-4 h-4 text-[#3A2A1F] rotate-180" />
                                        </div>
                                    </Button>

                                    <div className="mt-6 text-center text-[#3A2A1F]/40 text-xs font-serif italic">
                                        "Experience the luxury of tradition with every order."
                                    </div>
                                </div>
                            )}

                            {/* CALL MODE */}
                            {orderMode === 'call' && (
                                <div className="flex flex-col items-center justify-center h-full gap-8 py-6 text-center">
                                    <div className="w-24 h-24 bg-[#EFE6D8] rounded-full flex items-center justify-center border border-[#C8A165]/20 shadow-inner">
                                        <Phone className="w-10 h-10 text-[#3A2A1F]" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-serif text-2xl text-[#3A2A1F]">We'd love to hear from you</h3>
                                        <p className="text-[#3A2A1F]/60 max-w-xs mx-auto">
                                            Our team is ready to assist you with your custom order needs.
                                        </p>
                                    </div>
                                    <a
                                        href={`tel:${config.contact.phone}`}
                                        className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#3A2A1F] hover:bg-[#2a1e16] text-[#F6F2EB] rounded-full text-xl font-serif tracking-wide shadow-lg transition-transform hover:scale-105"
                                    >
                                        <Phone className="w-5 h-5 fill-current" />
                                        {config.contact.phone}
                                    </a>
                                </div>
                            )}

                            {/* WHATSAPP FORM MODE */}
                            {orderMode === 'whatsapp' && (
                                <div className="max-w-xl mx-auto">
                                    <Form {...form}>
                                        <form id="order-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                                            {/* Order Type Section */}
                                            <FormField
                                                control={form.control}
                                                name="deliveryOption"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-3 bg-white/50 p-5 rounded-2xl border border-[#C8A165]/20">
                                                        <FormLabel className="text-sm font-serif uppercase tracking-widest text-[#3A2A1F]/70">Order Type</FormLabel>
                                                        <FormControl>
                                                            <RadioGroup
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                                className="flex flex-wrap gap-4"
                                                            >
                                                                {['delivery', 'book-for-occasion'].map((option) => (
                                                                    <FormItem key={option} className="flex items-center space-x-2 space-y-0">
                                                                        <FormControl>
                                                                            <RadioGroupItem value={option} className="text-[#C8A165] border-[#3A2A1F]/30" />
                                                                        </FormControl>
                                                                        <FormLabel className="font-normal text-[#3A2A1F] capitalize cursor-pointer">
                                                                            {option === 'book-for-occasion' ? 'Book for Occasion' : 'Delivery'}
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                ))}
                                                            </RadioGroup>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-[#3A2A1F] font-serif">Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Full Name" {...field} className="bg-white border-[#C8A165]/20 focus:border-[#C8A165] focus:ring-[#C8A165]/20" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="phone"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-[#3A2A1F] font-serif">Phone</FormLabel>
                                                            <FormControl>
                                                                <Input type="tel" placeholder="Phone Number" {...field} className="bg-white border-[#C8A165]/20 focus:border-[#C8A165] focus:ring-[#C8A165]/20" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            {/* Date/Time Row */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="date"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-[#3A2A1F] font-serif">Date</FormLabel>
                                                            <FormControl>
                                                                <Input type="date" {...field} className="bg-white border-[#C8A165]/20 focus:border-[#C8A165] focus:ring-[#C8A165]/20 block w-full" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="time"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-[#3A2A1F] font-serif">Time</FormLabel>
                                                            <FormControl>
                                                                <Input type="time" {...field} className="bg-white border-[#C8A165]/20 focus:border-[#C8A165] focus:ring-[#C8A165]/20 block w-full" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            {deliveryOption === 'delivery' && (
                                                <div className="bg-white/50 p-5 rounded-2xl border border-[#C8A165]/20 space-y-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="address"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-[#3A2A1F] font-serif">Delivery Address</FormLabel>
                                                                <FormControl>
                                                                    <Textarea placeholder="Full Address" {...field} onFocus={handleLocationRequest} className="bg-white border-[#C8A165]/20 focus:border-[#C8A165] focus:ring-[#C8A165]/20 min-h-[80px]" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2 text-xs text-[#3A2A1F]/60 font-medium">
                                                            <Truck className="w-3.5 h-3.5" />
                                                            <span>We deliver pan-India</span>
                                                        </div>
                                                        {locationError && <p className="text-sm font-medium text-destructive">{locationError}</p>}
                                                        <Button type="button" variant="outline" className="w-full border-[#C8A165]/40 text-[#8a6d3b] hover:bg-[#C8A165]/10 hover:text-[#8a6d3b] font-serif" onClick={handleVerifyClick} disabled={isVerifying}>
                                                            {isVerifying ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MapPin className="mr-2 h-4 w-4" />}
                                                            {isLocationVerified ? 'Location Verified' : 'Use Current Location'}
                                                        </Button>
                                                    </div>
                                                    <FormField
                                                        control={form.control}
                                                        name="pincode"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-[#3A2A1F] font-serif">Pincode</FormLabel>
                                                                <FormControl>
                                                                    <Input type="number" placeholder="6-digit Pincode" {...field} className="bg-white border-[#C8A165]/20 focus:border-[#C8A165] focus:ring-[#C8A165]/20" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            )}

                                            {/* PAYMENT SECTION - FORCED UPI */}
                                            <div className="space-y-5 pt-2">
                                                <div className="bg-[#F8F5F0] p-6 rounded-2xl border border-[#C8A165]/30 shadow-sm relative overflow-hidden">
                                                    {/* Background decorative hint */}
                                                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#C8A165]/5 rounded-bl-full"></div>

                                                    <h3 className="font-serif font-medium text-lg text-[#3A2A1F] flex items-center justify-between mb-4">
                                                        <span>Payment Method</span>
                                                        <Badge className="bg-[#3A5A40] text-white hover:bg-[#3A5A40] font-sans font-normal px-3 py-1">UPI (Pay Now)</Badge>
                                                    </h3>

                                                    <div className="flex flex-col items-center gap-5 bg-white p-6 rounded-xl border border-[#C8A165]/10 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                                                        <p className="text-[#3A2A1F] font-serif">Scan to pay <strong className="text-xl ml-1">₹ {totalPrice.toLocaleString('en-IN')}</strong></p>

                                                        {qrCodeUrl ? (
                                                            <>
                                                                <div className="relative w-48 h-48 bg-white p-2 rounded-lg border border-[#3A2A1F]/10">
                                                                    <Image src={qrCodeUrl} alt="UPI QR Code" fill className="object-contain p-2" unoptimized={true} />
                                                                </div>
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    className="w-full max-w-[200px] border-[#C8A165] text-[#8a6d3b] hover:bg-[#C8A165]/10 font-medium"
                                                                    onClick={() => {
                                                                        if (upiLink) {
                                                                            window.location.href = upiLink;
                                                                        }
                                                                    }}
                                                                >
                                                                    Open UPI App
                                                                </Button>
                                                            </>
                                                        ) : (
                                                            <div className="flex justify-center items-center h-48 w-48 bg-gray-50 rounded-lg">
                                                                <Loader2 className="animate-spin text-[#C8A165]" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="mt-6">
                                                        <FormField
                                                            control={form.control}
                                                            name="utr"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="text-[#3A2A1F] font-serif">Transaction ID (UTR) <span className="text-red-500">*</span></FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="Enter 12-digit UTR No." {...field} className="bg-white border-[#C8A165]/30 focus:border-[#C8A165] focus:ring-[#C8A165]/20 h-11" />
                                                                    </FormControl>
                                                                    <FormDescription className="text-xs text-[#3A2A1F]/50">
                                                                        Required to verify your payment.
                                                                    </FormDescription>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </Form>
                                </div>
                            )}

                        </div>
                    </ScrollArea>

                    {orderMode === 'whatsapp' && (
                        <div className="p-4 bg-[#F8F5F0] border-t border-[#C8A165]/20">
                            <Button
                                type="submit"
                                form="order-form"
                                className="w-full bg-[#3A5A40] hover:bg-[#2e4732] text-white h-14 rounded-full text-lg font-serif font-medium shadow-md transition-all hover:shadow-lg"
                                disabled={isSubmitDisabled}
                            >
                                Complete Order on WhatsApp
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
            <AlertDialog open={showOutOfRangeDialog} onOpenChange={setShowOutOfRangeDialog}>
                {/* ... existing alert dialog content ... */}
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>🚫 Oops! Delivery Not Available</AlertDialogTitle>
                        <AlertDialogDescription>
                            Your location is outside our {DELIVERY_RADIUS_KM} km delivery radius. You can still place an order for Take Away.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Stay on Page</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                            setShowOutOfRangeDialog(false);
                            form.setValue('deliveryOption', 'book-for-occasion');
                            toast({
                                title: "Order Option Changed",
                                description: "Your order has been switched to Take Away.",
                            });
                        }}>Switch to Book for Occasion</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
