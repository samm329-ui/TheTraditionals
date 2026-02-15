"use client";

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Phone, Plus, Minus, X } from 'lucide-react';
import { type CartItem } from '@/app/page';
import { type Product } from '@/lib/products';
import { WhatsappIcon } from './icons';
import { OrderFormDialog } from './order-form-dialog';
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

type CartSheetProps = {
    cart: CartItem[];
    onEmptyCart: () => void;
    onAddToCart: (product: Product, size?: string) => void;
    onRemoveFromCart: (itemName: string, size?: string) => void;
    children?: React.ReactNode;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
};

const CartSheet = ({
    cart,
    onEmptyCart,
    onAddToCart,
    onRemoveFromCart,
    children,
    isOpen,
    onOpenChange
}: CartSheetProps) => {
    const [isOrderFormOpen, setIsOrderFormOpen] = React.useState(false);

    // Sort items by name and size to keep the display consistent
    const sortedCart = [...cart].sort((a, b) => {
        if (a.name !== b.name) return a.name.localeCompare(b.name);
        return (a.selectedSize || "").localeCompare(b.selectedSize || "");
    });

    const totalItems = cart.reduce((total, pi) => total + pi.quantity, 0);
    const totalPrice = cart.reduce((total, pi) => total + (pi.price * pi.quantity), 0);
    const totalSavings = cart.reduce((total, pi) => {
        if (pi.originalPrice) {
            return total + (pi.originalPrice - pi.price) * pi.quantity;
        }
        return total;
    }, 0);

    const handleOrderOnWhatsAppClick = () => {
        if (onOpenChange) {
            onOpenChange(false);
        }
        setIsOrderFormOpen(true);
    };

    const content = (
        <DialogContent className={cn(
            "bg-[#F8F5F0] text-[#3D3227] p-0 flex flex-col",
            "fixed inset-0 w-full h-full border-0 rounded-none shadow-none",
            "translate-x-0 translate-y-0 max-w-none",
            "data-[state=closed]:slide-out-to-left-0 data-[state=closed]:slide-out-to-top-0",
            "data-[state=open]:slide-in-from-left-0 data-[state=open]:slide-in-from-top-0",
            "data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100"
        )}>
            <DialogHeader className="p-6 pb-4 flex-shrink-0 sticky top-0 bg-[#F8F5F0]/95 backdrop-blur-sm z-10">
                <DialogTitle className="text-2xl font-bold">Your Cart</DialogTitle>
                {cart.length > 0 && <p className="text-sm text-muted-foreground">{totalItems} {totalItems === 1 ? 'item' : 'items'} • Ready to order</p>}
                <DialogClose asChild>
                    <Button variant="ghost" size="icon" className="absolute right-4 top-4 rounded-full opacity-70 p-1 hover:bg-secondary">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close</span>
                    </Button>
                </DialogClose>
            </DialogHeader>

            <div className="flex-grow overflow-y-auto">
                {cart.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center p-10">
                        <ShoppingCart className="h-16 w-16 text-muted-foreground/30" strokeWidth={1.5} />
                        <p className="mt-4 font-semibold text-lg">Your cart is empty</p>
                        <p className="mt-1 text-sm text-muted-foreground">Add items from the menu to get started.</p>
                    </div>
                ) : (
                    <div className="p-6 pt-2 space-y-4">
                        {sortedCart.map((item, index) => {
                            const mainImage = item.images && item.images.length > 0 ? item.images[0] : null;
                            return (
                                <div key={`${item.name}-${item.selectedSize}-${index}`} className="flex items-center gap-4 bg-white/60 p-4 rounded-[18px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-md border border-white/40">
                                    <div className="relative h-16 w-16 flex-shrink-0">
                                        {mainImage ? (
                                            <Image
                                                src={mainImage}
                                                alt={item.name}
                                                fill
                                                className="object-cover rounded-xl"
                                                sizes="64px"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-secondary rounded-xl" />
                                        )}
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <p className="font-bold text-base truncate">{item.name}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <p className="text-sm font-semibold text-primary">
                                                ₹{item.price.toLocaleString('en-IN')}
                                            </p>
                                            {item.selectedSize && (
                                                <Badge variant="outline" className="h-5 px-1.5 text-[10px] font-bold uppercase tracking-wider bg-background/50">
                                                    Size: {item.selectedSize}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 bg-primary/5 p-1 rounded-full border border-primary/10">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-primary hover:bg-primary/10" onClick={() => onRemoveFromCart(item.name, item.selectedSize)}>
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="font-bold w-6 text-center text-sm">{item.quantity}</span>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-primary hover:bg-primary/10" onClick={() => onAddToCart(item, item.selectedSize)}>
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <p className="font-bold w-20 text-right text-base text-foreground">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {cart.length > 0 && (
                <div className="p-6 border-t border-black/10 bg-[#F8F5F0]/95 backdrop-blur-sm flex-shrink-0 space-y-4">
                    <div className="space-y-2">
                        {totalSavings > 0 && (
                            <>
                                <div className="flex justify-between items-center text-sm font-medium text-green-600">
                                    <span>Total Savings:</span>
                                    <span>- ₹{totalSavings.toLocaleString('en-IN')}</span>
                                </div>
                                <Separator className="bg-black/10" />
                            </>
                        )}
                        <div className="flex justify-between items-center font-bold text-xl pt-2">
                            <span>Grand Total:</span>
                            <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 pt-2">

                        <Button size="lg" disabled={cart.length === 0} className="w-full h-12 rounded-xl bg-[#25D366] hover:bg-[#20A952] text-white shadow-lg" onClick={handleOrderOnWhatsAppClick}>
                            <WhatsappIcon className="mr-2 h-4 w-4" /> Order on WhatsApp
                        </Button>
                        <Button size="lg" variant="destructive" className="w-full h-12 rounded-xl bg-red-600 hover:bg-red-700 shadow-lg" onClick={onEmptyCart}>
                            Empty Cart
                        </Button>
                    </div>
                </div>
            )}
        </DialogContent>
    );

    if (children) {
        return (
            <React.Fragment>
                <Dialog open={isOpen} onOpenChange={onOpenChange}>
                    {children}
                    {content}
                </Dialog>
                <OrderFormDialog isOpen={isOrderFormOpen} onOpenChange={setIsOrderFormOpen} cart={cart} />
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Dialog open={isOpen} onOpenChange={onOpenChange}>{content}</Dialog>
            <OrderFormDialog isOpen={isOrderFormOpen} onOpenChange={setIsOrderFormOpen} cart={cart} />
        </React.Fragment>
    );
};

export default CartSheet;
