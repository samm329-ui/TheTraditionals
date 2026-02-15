'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Minus, Plus, Trash2, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { usePersistedCart } from '@/hooks/use-persisted-cart';
import { OrderFormDialog } from '@/components/order-form-dialog';
import { CartItem } from '@/app/page'; // Importing type from main page
import { config } from '@/lib/utils';
import { WhatsappIcon } from '@/components/icons';

export default function CartPage() {
    const router = useRouter();
    const { cart, setCart } = usePersistedCart();
    const [isOrderFormOpen, setIsOrderFormOpen] = React.useState(false);

    // Cart Actions (duplicated from hook/page for local use)
    const updateQuantity = (itemName: string, size: string | undefined, delta: number) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.name === itemName && item.selectedSize === size) {
                    return { ...item, quantity: Math.max(0, item.quantity + delta) };
                }
                return item;
            }).filter(item => item.quantity > 0);
        });
    };

    const removeFromCart = (itemName: string, size: string | undefined) => {
        setCart(prevCart => prevCart.filter(item => !(item.name === itemName && item.selectedSize === size)));
    };

    // Calculations
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const HANDLING_CHARGE = 5;
    const DELIVERY_CHARGE = 40;
    const totalPrice = subtotal + HANDLING_CHARGE + DELIVERY_CHARGE;
    const totalSavings = cart.reduce((total, item) => {
        if (item.originalPrice) {
            return total + (item.originalPrice - item.price) * item.quantity;
        }
        return total;
    }, 0);

    // Sorting for consistent display
    const sortedCart = [...cart].sort((a, b) => {
        if (a.name !== b.name) return a.name.localeCompare(b.name);
        return (a.selectedSize || "").localeCompare(b.selectedSize || "");
    });

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-[#F6F2EB] flex flex-col items-center justify-center p-4 bg-textile">
                <div className="max-w-md w-full text-center space-y-6">
                    <div className="w-24 h-24 bg-[#EFE6D8] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-[#C8A165]/30">
                        <ShieldCheck className="w-10 h-10 text-[#C8A165]" />
                    </div>
                    <h1 className="font-heading text-3xl text-[#3A2A1F]">Your Cart is Empty</h1>
                    <p className="text-[#3A2A1F]/70 font-sans">
                        Looks like you haven't added any traditional masterpieces to your collection yet.
                    </p>
                    <Button
                        onClick={() => router.push('/')}
                        className="w-full bg-gradient-to-r from-[#C8A165] to-[#B08D55] text-white hover:opacity-90 transition-all rounded-full h-12 text-lg font-heading tracking-wide shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Explore Collection
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-textile text-[#3A2A1F] font-sans selection:bg-[#C8A165]/20">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#F6F2EB]/80 backdrop-blur-md border-b border-[#C8A165]/20">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-[#3A2A1F]/70 hover:text-[#3A2A1F] transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-[#EFE6D8] flex items-center justify-center group-hover:bg-[#C8A165]/20 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="font-medium hidden sm:inline">Continue Shopping</span>
                    </Link>
                    <h1 className="font-heading text-2xl md:text-3xl text-[#3A2A1F] absolute left-1/2 -translate-x-1/2">My Cart</h1>
                    <div className="w-8"></div> {/* Spacer for alignment */}
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* Cart Items List (Left Column) */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex items-baseline justify-between">
                            <h2 className="font-heading text-xl text-[#3A2A1F]">Cart Items <span className="text-[#C8A165] ml-1">({totalItems})</span></h2>
                        </div>

                        <div className="space-y-4">
                            {sortedCart.map((item, index) => (
                                <div
                                    key={`${item.name}-${item.selectedSize}-${index}`}
                                    className="bg-[#F8F5F0] rounded-[16px] p-4 sm:p-5 shadow-[0_2px_12px_rgba(58,42,31,0.05)] border border-[#C8A165]/20 flex gap-4 sm:gap-6 group transition-all hover:shadow-[0_8px_24px_rgba(58,42,31,0.08)] hover:border-[#C8A165]/40"
                                >
                                    {/* Product Image */}
                                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-white rounded-xl overflow-hidden shadow-sm border border-[#EFE6D8]">
                                        {item.images?.[0] ? (
                                            <Image
                                                src={item.images[0]}
                                                alt={item.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-[#EFE6D8] flex items-center justify-center text-[#3A2A1F]/30 text-xs">No Image</div>
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div className="flex-grow flex flex-col justify-between py-1">
                                        <div>
                                            <div className="flex justify-between items-start gap-3">
                                                <h3 className="font-heading text-lg sm:text-lg text-[#3A2A1F] leading-snug">{item.name}</h3>
                                                <p className="font-medium text-[#3A2A1F] whitespace-nowrap font-serif">₹ {item.price.toLocaleString('en-IN')}</p>
                                            </div>
                                            {item.selectedSize && (
                                                <p className="text-sm text-[#3A2A1F]/60 mt-1 font-medium">Size: <span className="text-[#3A2A1F]">{item.selectedSize}</span></p>
                                            )}
                                            <p className="text-xs text-[#C8A165] mt-1 uppercase tracking-wider font-medium">Premium Collection</p>
                                        </div>

                                        <div className="flex justify-between items-center mt-4">
                                            {/* Quantity Selector */}
                                            <div className="flex items-center bg-white rounded-full border border-[#C8A165]/30 h-8 sm:h-9 px-1 shadow-sm">
                                                <button
                                                    onClick={() => updateQuantity(item.name, item.selectedSize, -1)}
                                                    className="w-8 h-full flex items-center justify-center text-[#3A2A1F]/70 hover:text-[#C8A165] active:scale-90 transition-all"
                                                >
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>
                                                <span className="w-8 text-center font-medium text-sm text-[#3A2A1F]">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.name, item.selectedSize, 1)}
                                                    className="w-8 h-full flex items-center justify-center text-[#3A2A1F]/70 hover:text-[#C8A165] active:scale-90 transition-all"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                </button>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeFromCart(item.name, item.selectedSize)}
                                                className="text-xs font-medium text-[#3A2A1F]/40 hover:text-red-600 transition-colors flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-red-50"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Order Summary Panel (Right Column) */}
                    <div className="lg:col-span-4 relative">
                        <div className="sticky top-24 bg-[#F8F5F0] rounded-[20px] p-6 lg:p-8 shadow-[0_4px_24px_rgba(58,42,31,0.06)] border border-[#C8A165]/30 bg-ornamental-corner">

                            <h2 className="font-heading text-2xl text-[#3A2A1F] mb-6 pb-4 border-b border-[#C8A165]/20">Order Summary</h2>

                            <div className="space-y-4 text-sm text-[#3A2A1F]/80 font-sans">
                                <div className="flex justify-between items-center">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-base">₹ {subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-2">Handling Charge</span>
                                    <span className="font-medium">₹ {HANDLING_CHARGE}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Delivery Charge</span>
                                    <span className="font-medium">₹ {DELIVERY_CHARGE}</span>
                                </div>
                                {totalSavings > 0 && (
                                    <div className="flex justify-between items-center text-[#3A5A40] bg-[#3A5A40]/5 p-2 rounded-lg mt-2 border border-[#3A5A40]/10">
                                        <span className="font-medium">Total Savings</span>
                                        <span className="font-bold">- ₹ {totalSavings.toLocaleString('en-IN')}</span>
                                    </div>
                                )}

                                <Separator className="my-6 bg-[#C8A165]/20" />

                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-heading text-lg text-[#3A2A1F]">Total Amount</span>
                                    <span className="font-heading text-3xl font-bold text-[#3A2A1F]">₹ {totalPrice.toLocaleString('en-IN')}</span>
                                </div>
                                <p className="text-xs text-[#3A2A1F]/50 text-right mb-6">Including all taxes</p>

                                <Button
                                    onClick={() => setIsOrderFormOpen(true)}
                                    className="w-full bg-gradient-to-r from-[#C8A165] via-[#D4B07B] to-[#C8A165] text-white hover:opacity-95 transition-all shadow-[0_8px_20px_rgba(200,161,101,0.4)] hover:shadow-[0_10px_25px_rgba(200,161,101,0.5)] rounded-full h-14 text-lg font-heading tracking-wide transform hover:-translate-y-0.5"
                                >
                                    Proceed to Checkout
                                </Button>

                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center justify-center gap-2 text-xs text-[#3A2A1F]/60">
                                        <ShieldCheck className="w-3.5 h-3.5 text-[#C8A165]" />
                                        <span>Secure Payment via UPI</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2 text-xs text-[#3A2A1F]/60">
                                        <Truck className="w-3.5 h-3.5 text-[#C8A165]" />
                                        <span>Estimated Delivery: 3-5 Days</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <OrderFormDialog
                isOpen={isOrderFormOpen}
                onOpenChange={setIsOrderFormOpen}
                cart={cart}
            />
        </div>
    );
}
