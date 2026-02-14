
export type Product = {
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  rating: number;
  ratingsCount: number;
  images: string[];
  sizes?: string[];
};

export type Category = {
  name: string;
  products: Product[];
};

export const productData: Category[] = [
  {
    name: 'Embroidered Punjabis',
    products: [
      {
        name: 'Black Designer Punjabi',
        price: 957,
        description: 'Exquisite black designer punjabi featuring premium needlework. This stunning piece showcases intricate traditional patterns combined with a modern silhouette, making it perfect for formal events, evening celebrations, and special occasions where you want to make a lasting impression.',
        rating: 4.9,
        ratingsCount: 124,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%201/Whisk_1c7579dda7ddb49b73e43825e4d32425dr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%201/Whisk_3c0d72c08d3d27194a549af6ef037188dr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%201/Whisk_a26b78cd6010f608e0143050843ee03bdr.webp'
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },
      {
        name: 'Navy Blue Designer Punjabi',
        price: 1047,
        description: 'Sophisticated navy blue punjabi with elegant designer touches. Crafted from high-quality fabric with meticulous attention to detail, this piece features refined embroidery that adds a touch of luxury. Ideal for weddings, cultural festivals, and upscale social gatherings.',
        rating: 4.8,
        ratingsCount: 98,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%202/Whisk_9f869d08ec5d7449e224dc71d1f4c638dr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%202/Whisk_d4965e1358661c5979248454db9bbfb5dr.webp'
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },
      {
        name: 'White Punjabi',
        price: 690,
        description: 'Classic white punjabi featuring clean lines and traditional elegance. Made from a breathable cotton blend, this versatile piece is perfect for daytime celebrations, religious ceremonies, and family gatherings. The timeless design ensures you look refined on any occasion.',
        rating: 4.7,
        ratingsCount: 156,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%203/Whisk_0228967971b69c5b02f461d3125437dadr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%203/Whisk_cd64053038c87d5aef74747b06a79f54dr.webp'
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },
      {
        name: 'Yellow Threaded Punjabi',
        price: 667,
        description: 'Vibrant punjabi with delicate yellow thread work showcasing traditional craftsmanship at its finest. A cheerful and auspicious choice for Haldi ceremonies, spring festivals, and joyous celebrations. The intricate threading adds artistic flair to the classic design.',
        rating: 4.9,
        ratingsCount: 87,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%204/Whisk_50be634aa817b1d9b424cb039870bf9bdr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%204/Whisk_0acbe1a7634a7569a8d4440fbfed6485dr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%204/Whisk_1da1d213ebd5a60ae874a63c2fbf8765dr.webp'
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },
      {
        name: 'Yellow Stylish Punjabi',
        price: 757,
        description: 'Modern take on a traditional classic. This yellow stylish punjabi offers a contemporary fit combined with traditional elements, making it perfect for the fashion-forward individual who appreciates heritage design with a modern twist.',
        rating: 4.8,
        ratingsCount: 112,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%205/Whisk_8507f630a0a5e65b72f42861a78aa522dr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%205/Whisk_b1138a1f661773190854ed22687ad8dadr.webp'
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },
      {
        name: 'Yellow Designer Punjabi',
        price: 859,
        description: 'Premium yellow designer punjabi with intricate detailing on the collar and cuffs. Features unique pattern work that sets this piece apart, making it an excellent choice for those who want to stand out at festive occasions and celebrations.',
        rating: 5.0,
        ratingsCount: 94,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%206/Whisk_2704ef4a9aadd44b56949efa3ab5a8fedr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%206/Whisk_9d8b9adfdc42fc48a8a4c0c6743d6d38dr.webp'
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },
      {
        name: 'White Minimalist Punjabi',
        price: 663,
        description: 'A serene white punjabi with minimalist design philosophy. Perfect for those who appreciate understated elegance and clean craftsmanship. The simple yet sophisticated aesthetic makes it suitable for both casual and formal settings.',
        rating: 4.7,
        ratingsCount: 76,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%207/Whisk_109b30d288fe06d826b4362ac53abae8dr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%207/Whisk_10bb66fcb62bbc1bca44c98c0ee0bcc2dr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%207/Whisk_9c4ca76f5ae74cb940f4e6bb50af2c53dr.webp'
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },
      {
        name: 'Red Designer Punjabi',
        price: 999,
        description: 'Vibrant red designer punjabi perfect for celebratory occasions. Features heavy embroidery work and premium fabric that creates a royal feel. The bold color and intricate detailing make this an unforgettable piece for weddings and special events.',
        rating: 4.9,
        ratingsCount: 132,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%208/Whisk_06fc776642f7e0ba55d4efec5c09379ddr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%208/Whisk_415e82c7455ac6e9bf04a9a6b10e255cdr.webp'
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },
      {
        name: 'Black Detailed Needlework Punjabi',
        price: 1199,
        description: 'Exceptional black punjabi with detailed needlework showcasing the pinnacle of traditional Bengali craftsmanship. Every stitch tells a story of artisanal expertise passed down through generations. A true masterpiece that deserves a place in your wardrobe.',
        rating: 5.0,
        ratingsCount: 210,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%209/Whisk_1bec8aeee84f774be4c40c33fbd9c111dr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%209/Whisk_64633c796b25cc28d394d40fc372d9a8dr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%209/Whisk_a525d1503264b19b5074b1e60c2c63b1dr.webp'
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },
      {
        name: 'Red Blue Punjabi',
        price: 657,
        description: 'Unique punjabi featuring an eye-catching combination of red and blue tones. This distinctive color palette makes it a conversation starter at any gathering, while the quality craftsmanship ensures comfort and durability.',
        rating: 4.6,
        ratingsCount: 68,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%2010/Gemini_Generated_Image_ye83sjye83sjye83.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%2010/Gemini_Generated_Image_xk7vvixk7vvixk7v.webp'
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },
    ],
  },
  {
    name: 'Designer Blouses',
    products: [
      {
        name: 'White Reversed Design Blouse',
        price: 697,
        description: 'Unique white blouse with innovative reversed design aesthetics. Features delicate embroidery and a contemporary cut that pairs beautifully with both traditional and modern sarees. Perfect for making a subtle yet sophisticated statement.',
        rating: 4.9,
        ratingsCount: 142,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B1/Whisk_8bc224741376d30ae2444e84bb0ffbb5dr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B1/Whisk_5d0eff62114f1ab9c1642691db1d719fdr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B1/Whisk_5cc75e955667d54b77548f93badc07c2dr.webp'
        ],
        sizes: ['32', '34', '36', '38', '40', '42']
      },
      {
        name: 'Yellow Reversed Design Blouse',
        price: 653,
        description: 'Cheerful yellow blouse with an innovative reversed design. Hand-stitched details provide a touch of artisanal luxury to your traditional ensemble, bringing warmth and vibrancy to your festival wardrobe.',
        rating: 4.7,
        ratingsCount: 96,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B10/Whisk_3e683f2897088a6b02c447d80db22393dr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B10/Whisk_41558f6343afef9bc7e4b17874c0c697eg.webp'
        ],
        sizes: ['32', '34', '36', '38', '40', '42']
      },
      {
        name: 'Green Reversed Design Blouse',
        price: 654,
        description: 'Stunning green blouse with a classic reversed design. The rich emerald tone combined with delicate needlework makes it a festive favorite. Perfect for Durga Puja, weddings, and cultural celebrations.',
        rating: 4.8,
        ratingsCount: 110,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B11/Whisk_6aa43522615d1d0beeb4b8446b3b346edr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B11/Whisk_58d1706295beec2aa1949dafcfc33ac7eg.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B11/Whisk_53466f345b5e7b4b0cc4255881b5b555eg.webp'
        ],
        sizes: ['32', '34', '36', '38', '40', '42']
      },
      {
        name: 'New Reversed Design Blouse',
        price: 765,
        description: 'The latest addition to our reversed design collection. Features contemporary motifs and a premium finish for the fashion-forward woman who appreciates modern interpretations of traditional styling.',
        rating: 5.0,
        ratingsCount: 78,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B12/Whisk_6295fe7e520796e910d483fa3b2c7f07dr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B12/Whisk_38e4bd904353c01965e41285a8e2ad6beg.webp'
        ],
        sizes: ['32', '34', '36', '38', '40', '42']
      },
      {
        name: 'Maroon Reversed Design Blouse',
        price: 682,
        description: 'Deep maroon blouse with traditional reversed styling. Elegant necklines and detailed sleeves craft a look of timeless beauty. The rich color adds depth and sophistication to any saree pairing.',
        rating: 4.6,
        ratingsCount: 134,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B13/Whisk_68e288f8ab9b4eb9402407efc5d4df4bdr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B13/Whisk_0605a165c4f6d8db7724647ba2389453eg.webp'
        ],
        sizes: ['32', '34', '36', '38', '40', '42']
      },
      {
        name: 'New White Reversed Design Blouse',
        price: 649,
        description: 'A fresh take on our classic white reversed design. Features new embroidery patterns and a light, comfortable fabric for all-day wear. Ideal for daytime functions and outdoor celebrations.',
        rating: 4.7,
        ratingsCount: 89,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B14/Whisk_4a7f6d38ebb2b838db64f3dd24fcd549dr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B14/Whisk_d9a539e458e07fc9d3d48d4e08c33a87eg.webp'
        ],
        sizes: ['32', '34', '36', '38', '40', '42']
      },
      {
        name: 'Modern Blouse',
        price: 659,
        description: 'Highly stylish modern blouse with cutting-edge design elements that blend traditional craftsmanship with contemporary fashion trends. Perfect for the woman who wants to honor tradition while embracing modern style.',
        rating: 4.9,
        ratingsCount: 156,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B15/Whisk_d6b87160b33cfc9909d44d77c537f4dfeg.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B15/Whisk_0ff3d7ea190c9e29fd24b702b60ca99bdr.webp'
        ],
        sizes: ['32', '34', '36', '38', '40', '42']
      },
      {
        name: 'New Designer Blouse',
        price: 643,
        description: 'An elegant new designer blouse with minimalist aesthetic. Features subtle thread work and a premium silk-blend finish that drapes beautifully. Designed for women who appreciate refined simplicity.',
        rating: 4.8,
        ratingsCount: 67,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B16/Whisk_32f83440fde517fa1f34ed37e181d6ebeg.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B16/Whisk_6d8fd1ef821b70c8bed4ce239fd59071eg.webp'
        ],
        sizes: ['32', '34', '36', '38', '40', '42']
      },
      {
        name: 'Black Modern Blouse',
        price: 709,
        description: 'Sleek black blouse with modern detailing and a unique back design. Crafted from premium fabric that adds a touch of sophistication to any saree. The contemporary cut flatters all body types.',
        rating: 5.0,
        ratingsCount: 121,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B2/Whisk_40517421e220bd7b9a04bec3a5708c36dr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B2/Whisk_ff3669b3308ef43b38f482395210c7aedr.webp'
        ],
        sizes: ['32', '34', '36', '38', '40', '42']
      },
      {
        name: 'Royal Pink Reversed Design Blouse',
        price: 717,
        description: 'Luxurious pink blouse with detailed reversed craftsmanship. A royal choice for weddings and festive occasions, featuring intricate needlework that catches the eye. The sophisticated pink hue exudes elegance.',
        rating: 5.0,
        ratingsCount: 145,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B3/Whisk_a14fdc3bb0917fd88774a8e3f68fd695dr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B3/Whisk_928cc3e7bc52e8c9abb4b5f9c48e9a35dr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B3/Whisk_375c64358d2618f9fc647da58d47efdfeg.webp'
        ],
        sizes: ['32', '34', '36', '38', '40', '42']
      },
      {
        name: 'Royal Classy Blouse',
        price: 684,
        description: 'Classic elegance redefined. This royal classy blouse features traditional embroidery with a refined finish, making it a staple for traditional wear. The timeless design ensures it remains a wardrobe favorite for years.',
        rating: 4.7,
        ratingsCount: 132,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B4/Whisk_3abdd30c9a87e019e214fa4c3946bed4eg.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B4/Whisk_7a4c3e47be1d29696234b40d40713e55dr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B4/Whisk_7c8ca172928c923a14e4a6537d46f707eg.webp'
        ],
        sizes: ['32', '34', '36', '38', '40', '42']
      },
      {
        name: 'New Classy Blouse',
        price: 663,
        description: 'The latest addition to our classy blouse collection. Features unique sleeve details and a comfortable fit tailored for the modern silhouette. Combines traditional aesthetics with contemporary comfort.',
        rating: 4.8,
        ratingsCount: 94,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B5/Whisk_3277d010a91cdf682204854e9988f73eeg.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B5/Whisk_6d5af6a85ce71b4a6f04f234542cce76eg.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B5/Whisk_b96b6a1006c1afda42743a5cb2277ecfdr.webp'
        ],
        sizes: ['32', '34', '36', '38', '40', '42']
      },
      {
        name: 'Magenta Blouse',
        price: 724,
        description: 'Vibrant magenta blouse with rich embroidery. A bold choice for festive occasions, featuring high-quality needlework and artisanal finish. The intense color makes it perfect for standing out at celebrations.',
        rating: 4.9,
        ratingsCount: 118,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B6/Whisk_524ae86865c86d7b6654e4182dff254eeg.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B6/Whisk_d518062a49696fa89ca414c806bbf3dedr.webp'
        ],
        sizes: ['32', '34', '36', '38', '40', '42']
      },
      {
        name: 'Best Designer Blouse',
        price: 759,
        description: 'Our top-tier designer blouse featuring exceptional craftsmanship. Every detail is meticulously hand-stitched for a truly premium feel. This piece represents the pinnacle of our artisan expertise.',
        rating: 5.0,
        ratingsCount: 167,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B7/Whisk_1a794a5fc5d2f4482ae4bed0f561fee3eg.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B7/Whisk_3bd0c1b8d82a54899874fb9b1cadfc9ddr.webp'
        ],
        sizes: ['32', '34', '36', '38', '40', '42']
      },
      {
        name: 'Twin Design Blouse',
        price: 889,
        description: 'Innovative twin design blouse with symmetrical embroidery patterns. Crafted from premium silk-blend fabric with exquisite needlework detailing, this unique piece is sure to turn heads.',
        rating: 4.7,
        ratingsCount: 143,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B8/Whisk_f6d687f517b8d229f194576f91bb54d8dr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B8/Whisk_d6da86d45c3b40e93df49ec047b1f721dr.webp'
        ],
        sizes: ['32', '34', '36', '38', '40', '42']
      },
      {
        name: 'Traditional Blouse',
        price: 887,
        description: 'Classic traditional blouse with heritage-inspired motifs. Features rich embroidery and a time-honored design that celebrates Bengali culture and craftsmanship. Perfect for those who value authentic traditional wear.',
        rating: 4.9,
        ratingsCount: 189,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B9/Whisk_819b1d6879129489518452df040cf527dr.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B9/Whisk_0b491f0eebe8ce8ad5b4a50f50e169f0eg.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Blouse/B9/Whisk_e87c568f662f86ea8cc46488b073794eeg.webp'
        ],
        sizes: ['32', '34', '36', '38', '40', '42']
      },
    ],
  },
  {
    name: 'Traditional Kurtis',
    products: [
      {
        name: 'Female Kurti',
        price: 717,
        description: 'Elegant women\'s kurti designed for comfort and style. Features graceful cuts and traditional aesthetics perfect for daily wear and casual occasions. The versatile design pairs well with both leggings and palazzos.',
        rating: 4.8,
        ratingsCount: 156,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Kurti/K4/Gemini_Generated_Image_sz8ozrsz8ozrsz8o.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Kurti/K4/Gemini_Generated_Image_qfqxm4qfqxm4qfqx.webp'
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },
      {
        name: 'Black Kurti',
        price: 697,
        description: 'Sophisticated black kurti with contemporary design elements. Made from premium fabric with subtle embellishments, this versatile piece transitions effortlessly from office to evening wear.',
        rating: 4.7,
        ratingsCount: 134,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Kurti/K3/Gemini_Generated_Image_psli4tpsli4tpsli.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Kurti/K3/Gemini_Generated_Image_8o4m168o4m168o4m.webp'
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },
      {
        name: 'White Plain Kurti',
        price: 627,
        description: 'Classic white plain kurti offering timeless simplicity. Made from breathable cotton fabric, this essential piece is perfect for summer days, religious functions, and creating a fresh, clean look.',
        rating: 4.6,
        ratingsCount: 142,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Kurti/K2/Gemini_Generated_Image_cia6oxcia6oxcia6.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Kurti/K2/Gemini_Generated_Image_vweplnvweplnvwep.webp'
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },
      {
        name: 'Red Casual Kurti',
        price: 638,
        description: 'Vibrant red kurti perfect for casual outings and festive occasions. Features comfortable styling with a modern fit, making it ideal for everyday elegance. The cheerful red adds energy to your wardrobe.',
        rating: 4.7,
        ratingsCount: 128,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Kurti/K1/Gemini_Generated_Image_2tbjje2tbjje2tbj.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Kurti/K1/Gemini_Generated_Image_2tbjje2tbjje2tbj.webp'
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      },
    ],
  },
  {
    name: 'Premium Sarees',
    products: [
      {
        name: 'Yellow Traditional Designer Saree',
        price: 3766,
        description: 'Exquisite yellow traditional designer saree featuring intricate craftsmanship and premium fabric. The vibrant yellow hue combined with detailed needlework makes this saree perfect for weddings, festivals, and special celebrations.',
        rating: 4.9,
        ratingsCount: 87,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Saree/S1/Gemini_Generated_Image_f638bmf638bmf638.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Saree/S1/Gemini_Generated_Image_bdg566bdg566bdg5.webp'
        ],
        sizes: ['Standard']
      },
      {
        name: 'White Premium Handcrafted Saree',
        price: 7000,
        description: 'Luxurious white saree entirely handcrafted by skilled artisans. Every inch is a testament to traditional Bengali textile artistry. This premium piece is perfect for the discerning bride or for milestone celebrations.',
        rating: 5.0,
        ratingsCount: 54,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Saree/S2/Gemini_Generated_Image_f12k02f12k02f12k.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Saree/S2/Gemini_Generated_Image_gmhq82gmhq82gmhq.webp'
        ],
        sizes: ['Standard']
      },
      {
        name: 'Tasar Needlework Saree',
        price: 8997,
        description: 'Extraordinary tasar silk saree with detailed needlework throughout. This masterpiece showcases the pinnacle of traditional embroidery on luxurious tasar fabric. A collector\'s item that will be cherished for generations.',
        rating: 5.0,
        ratingsCount: 42,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Saree/S3/Gemini_Generated_Image_2k52bm2k52bm2k52.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Saree/S3/Gemini_Generated_Image_ogv23xogv23xogv2.webp'
        ],
        sizes: ['Standard']
      },
      {
        name: 'Off White Modern Saree',
        price: 7889,
        description: 'Contemporary off-white saree with modern design sensibilities. Blends traditional elegance with contemporary patterns, making it suitable for both classic and modern styling. Premium fabric ensures a graceful drape.',
        rating: 4.8,
        ratingsCount: 68,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Saree/S4/Gemini_Generated_Image_9fioq79fioq79fio.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Saree/S4/Gemini_Generated_Image_ejdt8ejdt8ejdt8e.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Saree/S4/Gemini_Generated_Image_rstt38rstt38rstt.webp'
        ],
        sizes: ['Standard']
      },
      {
        name: 'Royal Collection Royal Pink Saree',
        price: 7956,
        description: 'From our exclusive Royal Collection, this royal pink saree exudes regal elegance. Features opulent embroidery and luxurious silk that makes it perfect for grand weddings and prestigious events.',
        rating: 5.0,
        ratingsCount: 76,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Saree/S5/Gemini_Generated_Image_u1mnyzu1mnyzu1mn.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Saree/S5/Gemini_Generated_Image_r2btx0r2btx0r2bt.webp'
        ],
        sizes: ['Standard']
      },
      {
        name: 'Black Designer Saree',
        price: 4568,
        description: 'Elegant black designer saree with sophisticated styling. The deep black provides a stunning canvas for intricate gold and silver threadwork. Perfect for evening events and formal occasions.',
        rating: 4.9,
        ratingsCount: 92,
        images: [
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Saree/S6/Gemini_Generated_Image_awlf6wawlf6wawlf.webp',
          'https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Saree/S6/Gemini_Generated_Image_s7yblgs7yblgs7yb.webp'
        ],
        sizes: ['Standard']
      },
    ],
  },
];
