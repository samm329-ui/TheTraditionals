"use client"

import * as React from "react"
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { productData, type Product } from "@/lib/products"
import { ChevronDown, ShoppingCart } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type ProductMenuDropdownProps = {
    onAddToCart: (item: Product) => void;
    onProductSelect: (item: Product) => void;
    onOpenChange: (open: boolean) => void;
    className?: string;
}

const ProductMenuDropdown = ({ onAddToCart, onProductSelect, onOpenChange, className }: ProductMenuDropdownProps) => {
    return (
        <DropdownMenu onOpenChange={onOpenChange}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn("data-[state=open]:text-primary", className)}>
                    Collections <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-background/80 backdrop-blur-sm">
                <DropdownMenuGroup>
                    {productData.map(category => (
                        <DropdownMenuSub key={category.name}>
                            <DropdownMenuSubTrigger>
                                <Link href={`#${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                    {category.name}
                                </Link>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent className="bg-background/80 backdrop-blur-sm p-0">
                                    <ScrollArea className="max-h-96 w-full p-1">
                                        {category.products.map(item => (
                                            <DropdownMenuItem key={item.name} className="flex justify-between items-center" onSelect={(e) => {
                                                e.preventDefault();
                                                onProductSelect(item);
                                            }}>
                                                <div>
                                                    <p>{item.name}</p>
                                                    <p className="text-sm text-muted-foreground">Rs. {item.price}</p>
                                                </div>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/20" onClick={(e) => { e.stopPropagation(); onAddToCart(item); }}>
                                                    <ShoppingCart className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuItem>
                                        ))}
                                    </ScrollArea>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProductMenuDropdown;
