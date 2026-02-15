"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import Header from "@/components/header";
import HeroSection from "@/components/sections/hero-section";
import { useToast } from "@/hooks/use-toast";
import { productData, type Product, type Category } from '@/lib/products';
import { config, type Review } from "@/lib/utils";
const MobileSearchHeader = dynamic(() => import("@/components/mobile-search-header"), { ssr: false });
const MobileHeroCarousel = dynamic(() => import("@/components/mobile-hero-carousel"));
const MobileBottomNav = dynamic(() => import("@/components/mobile-bottom-nav").then(mod => mod.MobileBottomNav));
const MobileAISheet = dynamic(() => import("@/components/mobile-ai-sheet"));

const MenuSection = dynamic(() => import("@/components/sections/menu-section"));
const FeaturedCollectionSection = dynamic(() => import("@/components/sections/featured-collection-section"));
const ProductSection = dynamic(() => import("@/components/sections/product-section"));
const ReviewsSection = dynamic(() => import("@/components/sections/reviews-section"));
const CustomDesignSection = dynamic(() => import("@/components/sections/custom-design-section").then(mod => mod.CustomDesignSection));
const RecommendationSection = dynamic(() => import("@/components/sections/recommendation-section"));
const Footer = dynamic(() => import("@/components/footer"));
const WriteReviewSection = dynamic(() => import("@/components/sections/write-review-section"));
const ContactSection = dynamic(() => import("@/components/sections/contact-section"));
const ProductDetailDialog = dynamic(() => import("@/components/product-detail-dialog").then(mod => mod.ProductDetailDialog));
const CartSheet = dynamic(() => import("@/components/cart-sheet"));

const MenuDialog = dynamic(() => import("@/components/menu-dialog").then(mod => mod.MenuDialog));


import { usePersistedCart } from "@/hooks/use-persisted-cart";

export type CartItem = Product & { quantity: number; selectedSize?: string };

export default function Home() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { toast } = useToast();
  const { cart, setCart } = usePersistedCart();
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(config.reviews);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuDialogOpen, setIsMenuDialogOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  const allProducts = useMemo(() => {
    return productData.flatMap(category => category.products);
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return productData;
    return productData.map(category => ({
      ...category,
      products: category.products.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.products.length > 0);
  }, [searchQuery]);


  const handleCardClick = (item: Product) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const handleRatingChange = (itemName: string, newRating: number) => {
    // Update the productData directly or a state derived from it
    // For this example, we'll update a local state if it were used for display
    // Assuming productData is the source of truth for product details
    // This part needs to be adapted if productData is meant to be immutable
    // For now, we'll simulate updating the selected item if it matches
    if (selectedItem && selectedItem.name === itemName) {
      setSelectedItem(prevItem => {
        if (!prevItem) return null;
        const newTotalRating = (prevItem.rating * prevItem.ratingsCount) + newRating;
        const newRatingsCount = prevItem.ratingsCount + 1;
        return {
          ...prevItem,
          rating: newTotalRating / newRatingsCount,
          ratingsCount: newRatingsCount,
        };
      });
    }
    // If you were displaying all products from a state variable, you'd update it here:
    // setAllProducts(prevProducts => {
    //   return prevProducts.map(category => {
    //     return {
    //       ...category,
    //       items: category.items.map(item => {
    //         if (item.name === itemName) {
    //           const newTotalRating = (item.rating * item.ratingsCount) + newRating;
    //           const newRatingsCount = item.ratingsCount + 1;
    //           return {
    //             ...item,
    //             rating: newTotalRating / newRatingsCount,
    //             ratingsCount: newRatingsCount,
    //           };
    //         }
    //         return item;
    //       }),
    //     };
    //   });
    // });
  };

  const handleAddToCart = (product: Product, size?: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem =>
        cartItem.name === product.name && cartItem.selectedSize === size
      );
      if (existingItem) {
        return prevCart.map(cartItem =>
          (cartItem.name === product.name && cartItem.selectedSize === size)
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...product, quantity: 1, selectedSize: size }];
    });
    toast({
      title: "Added to cart",
      description: `${product.name}${size ? ` (Size: ${size})` : ""} has been added to your cart.`,
    });
  };

  const handleRemoveFromCart = (itemName: string, size?: string) => {
    let itemRemoved = false;
    let itemDecremented = false;

    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem =>
        cartItem.name === itemName && cartItem.selectedSize === size
      );
      if (existingItem && existingItem.quantity > 1) {
        itemDecremented = true;
        return prevCart.map(cartItem =>
          (cartItem.name === itemName && cartItem.selectedSize === size)
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      itemRemoved = true;
      return prevCart.filter(cartItem =>
        !(cartItem.name === itemName && cartItem.selectedSize === size)
      );
    });

    if (itemRemoved) {
      toast({
        variant: "destructive",
        title: "Removed from Cart",
        description: `${itemName}${size ? ` (${size})` : ""} has been removed from your cart.`,
      });
    } else if (itemDecremented) {
      toast({
        title: "Quantity Updated",
        description: `Quantity of ${itemName}${size ? ` (${size})` : ""} has been updated.`,
      });
    }
  };

  const handleEmptyCart = () => {
    setCart([]);
    toast({
      variant: "destructive",
      title: "Cart Emptied",
      description: "All items have been removed from your cart.",
    });
  };

  const handleReviewSubmit = (newReview: { name: string; title: string; review: string }) => {
    const reviewWithAvatar: Review = { ...newReview, avatarId: `review-avatar-${Date.now()}` };
    setReviews(prevReviews => [reviewWithAvatar, ...prevReviews]);
    toast({
      title: "Review Submitted",
      description: "Thank you! Your feedback has been added.",
    });
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);


  const handleBulkAddToCart = (items: Product[]) => {
    setCart(prevCart => {
      let newCart = [...prevCart];
      items.forEach(newItem => {
        const existingItemIndex = newCart.findIndex(item => item.name === newItem.name);
        if (existingItemIndex > -1) {
          const existingItem = newCart[existingItemIndex];
          newCart[existingItemIndex] = { ...existingItem, quantity: existingItem.quantity + 1 };
        } else {
          newCart.push({ ...newItem, quantity: 1 });
        }
      });
      return newCart;
    });

    toast({
      title: "Added to Cart",
      description: `${items.length} items have been added to your cart.`,
    });

    // Navigate to cart page instead of opening sheet
    router.push('/cart');
  };

  return (
    <>
      <div className="hidden md:block">
        <Header
          cart={cart}
          onEmptyCart={handleEmptyCart}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          isDropdownOpen={isDropdownOpen}
          onDropdownOpenChange={setIsDropdownOpen}
          onProductSelect={handleCardClick}
          isMobile={false}
          onCartToggle={() => router.push('/cart')}
        />
      </div>

      <div className="block md:hidden">
        <MobileSearchHeader
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          allMenuItems={productData}
          onProductSelect={handleCardClick}
        />
      </div>
      <div className="pb-16 md:pb-0">
        <main>
          <div className="hidden md:block">
            <HeroSection />
          </div>
          <div className="md:hidden">
            <div className="mt-[-12px]">
              <Image
                src="https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/Banner/banner%203.webp"
                alt="Special Offer Banner"
                width={1200}
                height={400}
                className="object-cover w-full"
                priority
                sizes="100vw"
                quality={75}
              />
            </div>
            <div className="px-4">
              <h1 className="text-2xl font-semibold tracking-[0.2px] text-foreground mt-4">Featured Collection</h1>
              <MobileHeroCarousel onCardClick={handleCardClick} onAddToCart={handleAddToCart} />
            </div>
            <div className="mx-4 mt-8 mb-4 border-b border-border"></div>
          </div>
          <div className="hidden md:block">
            <MenuSection />
          </div>

          <div className="hidden md:block my-12">
            <Image
              src="https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/Banner/banner%203.webp"
              alt="Special Offer Banner"
              width={1920}
              height={400}
              className="object-cover w-full"
              sizes="100vw"
              quality={75}
              loading="lazy"
            />
          </div>

          <div className="hidden md:block">
            <FeaturedCollectionSection />
          </div>

          <div className="my-12 hidden md:block">
            <Image
              src="https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/Banner/banner%204.webp"
              alt="Special Offer Banner"
              width={1920}
              height={400}
              className="object-cover w-full"
              sizes="100vw"
              quality={75}
              loading="lazy"
            />
          </div>

          <ProductSection
            allMenuItems={filteredProducts}
            cart={cart}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onCardClick={handleCardClick}
            onRate={handleRatingChange}
            searchQuery={searchQuery}
            onCartClick={() => router.push('/cart')}
          />

          <div className="md:hidden -mx-4 mt-8">
            <div className="relative aspect-[21/9] w-full">
              <Image
                src="https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/Banner/banner%204.webp"
                alt="Special Offer Banner"
                fill
                className="object-cover"
                sizes="100vw"
                quality={75}
                loading="lazy"
              />
            </div>
          </div>

          <div className="hidden md:block">
            <ReviewsSection />
          </div>
          <CustomDesignSection />
          <div className="hidden md:block">
            <WriteReviewSection onReviewSubmit={handleReviewSubmit} />
          </div>
          <ContactSection />
          <div className="hidden md:block">
            <RecommendationSection />
          </div>
        </main>
        <Footer />
      </div>

      <MobileBottomNav
        cartCount={totalCartItems}
        onCartClick={() => router.push('/cart')}
        onMenuClick={() => setIsMenuDialogOpen(true)}
        onAIClick={() => setIsAIOpen(true)}
      />

      {/* AI Sheet for Mobile */}
      <MobileAISheet
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onAddToCart={handleBulkAddToCart}
      />



      <MenuDialog
        isOpen={isMenuDialogOpen}
        onOpenChange={setIsMenuDialogOpen}
      />

      {selectedItem && (
        <ProductDetailDialog
          isOpen={isDetailOpen}
          onOpenChange={setIsDetailOpen}
          item={selectedItem}
          cartItem={cart.find(ci => ci.name === selectedItem.name)}
          cart={cart}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onRate={handleRatingChange}
          onCartClick={() => {
            setIsDetailOpen(false);
            router.push('/cart');
          }}
          onSelectItem={handleCardClick}
        />
      )}

      <CartSheet
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        cart={cart}
        onEmptyCart={handleEmptyCart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
      />
    </>
  );
}
