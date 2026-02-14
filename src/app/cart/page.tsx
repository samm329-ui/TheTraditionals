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
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
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
            <div className="min-h-screen bg-[#F6F2EB] flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full text-center space-y-6">
                    <div className="w-24 h-24 bg-[#EFE6D8] rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldCheck className="w-10 h-10 text-[#C8A165]" />
                    </div>
                    <h1 className="font-serif text-3xl text-[#3A2A1F]">Your Cart is Empty</h1>
                    <p className="text-[#3A2A1F]/70">
                        Looks like you haven't added any traditional masterpieces to your collection yet.
                    </p>
                    <Button
                        onClick={() => router.push('/')}
                        className="w-full bg-gradient-to-r from-[#C8A165] to-[#B08D55] text-white hover:opacity-90 transition-opacity rounded-full h-12 text-lg font-serif"
                    >
                        Explore Collection
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F6F2EB] text-[#3A2A1F] font-sans">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-[#F6F2EB]/80 backdrop-blur-md border-b border-[#C8A165]/20">
                <div className="container mx-auto px-4 h-16 flex items-center">
                    <Link href="/" className="flex items-center gap-2 text-[#3A2A1F]/70 hover:text-[#3A2A1F] transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Continue Shopping</span>
                    </Link>
                    <h1 className="font-serif text-2xl text-[#3A2A1F] absolute left-1/2 -translate-x-1/2">My Cart</h1>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                    {/* Cart Items List (Left Column) */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="font-serif text-2xl text-[#3A2A1F] mb-6">Cart Items ({totalItems})</h2>

                        {sortedCart.map((item, index) => (
                            <div
                                key={`${item.name}-${item.selectedSize}-${index}`}
                                className="bg-[#F8F5F0] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_12px_rgba(58,42,31,0.05)] border border-[#C8A165]/20 flex gap-4 sm:gap-6 group transition-all hover:shadow-[0_4px_16px_rgba(58,42,31,0.08)]"
                            >
                                {/* Product Image */}
                                <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-white rounded-xl overflow-hidden shadow-sm">
                                    {item.images?.[0] ? (
                                        <Image
                                            src={item.images[0]}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-[#EFE6D8] flex items-center justify-center text-[#3A2A1F]/30 text-xs">No Image</div>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="flex-grow flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start gap-2">
                                            <h3 className="font-serif text-lg sm:text-xl text-[#3A2A1F] leading-tight">{item.name}</h3>
                                            <p className="font-medium text-[#3A2A1F] whitespace-nowrap">₹ {item.price.toLocaleString('en-IN')}</p>
                                        </div>
                                        {item.selectedSize && (
                                            <p className="text-sm text-[#3A2A1F]/60 mt-1">Size: {item.selectedSize}</p>
                                        )}
                                        <p className="text-xs text-[#3A2A1F]/50 mt-1">Premium Collection</p>
                                    </div>

                                    <div className="flex justify-between items-end mt-4">
                                        {/* Quantity Selector */}
                                        <div className="flex items-center bg-white rounded-full border border-[#C8A165]/30 h-9 px-1">
                                            <button
                                                onClick={() => updateQuantity(item.name, item.selectedSize, -1)}
                                                className="w-8 h-full flex items-center justify-center text-[#3A2A1F]/70 hover:text-[#C8A165] transition-colors"
                                            >
                                                <Minus className="w-3.5 h-3.5" />
                                            </button>
                                            <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.name, item.selectedSize, 1)}
                                                className="w-8 h-full flex items-center justify-center text-[#3A2A1F]/70 hover:text-[#C8A165] transition-colors"
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                            </button>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeFromCart(item.name, item.selectedSize)}
                                            className="text-xs font-medium text-[#3A2A1F]/40 hover:text-red-500 transition-colors flex items-center gap-1 underline underline-offset-2"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                    {/* Order Summary Panel (Right Column) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-[#F8F5F0] rounded-[16px] p-6 shadow-[0_4px_24px_rgba(58,42,31,0.06)] border border-[#C8A165]/30">

                            <h2 className="font-serif text-2xl text-[#3A2A1F] mb-6">Order Summary</h2>

                            <div className="space-y-4 text-sm text-[#3A2A1F]/80">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-medium">₹ {totalPrice.toLocaleString('en-IN')}</span>
                                </div>
                                {totalSavings > 0 && (
                                    <div className="flex justify-between text-green-700">
                                        <span>Savings</span>
                                        <span>- ₹ {totalSavings.toLocaleString('en-IN')}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span>Estimated Delivery</span>
                                    <span>3-5 Days</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Payment Method</span>
                                    <span>UPI / Online</span>
                                </div>
                            </div>

                            <Separator className="my-6 bg-[#C8A165]/20" />

                            <div className="flex justify-between items-end mb-8">
                                <span className="font-serif text-lg text-[#3A2A1F]">Total</span>
                                <span className="font-serif text-2xl font-bold text-[#3A2A1F]">₹ {totalPrice.toLocaleString('en-IN')}</span>
                            </div>

                            <Button
                                onClick={() => setIsOrderFormOpen(true)}
                                className="w-full bg-gradient-to-r from-[#C8A165] via-[#D4B07B] to-[#C8A165] text-white hover:opacity-95 transition-all shadow-[0_4px_12px_rgba(200,161,101,0.3)] rounded-full h-12 text-lg font-serif tracking-wide"
                            >
                                Proceed to Checkout
                            </Button>

                            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#3A2A1F]/40">
                                <ShieldCheck className="w-3 h-3" />
                                <span>Secure Checkout • 100% Authentic</span>
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
