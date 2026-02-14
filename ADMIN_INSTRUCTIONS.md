
# How to Update the Website Menu

This guide is for the restaurant administrator. Follow these simple steps to update menu items, categories, and images without writing any code.

**There are 2 main files you will work with:**
1.  `/src/lib/menu.ts` - For adding/editing menu categories and items (text like name, price, description).
2.  `/src/lib/placeholder-images.json` - For adding/changing product images.

---

## Part 1: How to Add or Change Product Images

All product images are managed from a single file.

### Step 1: Add Your Image File

1.  Find the `public` folder in the project files.
2.  Inside `public`, find the `uploads` folder.
3.  **Drag and drop** your new product image (e.g., `my-new-dish.jpg`) directly into the `uploads` folder.
    *   Use simple, lowercase filenames with hyphens instead of spaces (e.g., `chicken-korma.jpg` instead of `Chicken Korma.jpg`).
    *   Supported formats are `.jpg`, `.jpeg`, and `.png`.

### Step 2: Link Your Image to the Product

1.  Open the file: `/src/lib/placeholder-images.json`.
2.  This file contains a list of all product images. To add a new one, copy the template below:

    ```json
    {
      "id": "Name of The Product",
      "imageUrl": "/uploads/your-image-filename.jpg",
      "description": "A short description for the image",
      "imageHint": "search keyword"
    },
    ```

3.  Paste the copied template at the end of the list (before the final `]`).
4.  **Update the fields:**
    *   `id`: **(Crucial!)** This **must exactly match** the `name` of the product in the menu. For example, if the dish is named "Mutton Handi" in the menu file, the `id` here must also be `"Mutton Handi"`.
    *   `imageUrl`: Change `your-image-filename.jpg` to the exact filename of the image you uploaded to the `public/uploads` folder.
    *   `description`: A brief description for accessibility.
    *   `imageHint`: One or two keywords for the image.

5.  Save the file. The website will automatically display the new image for that product.

---

## Part 2: How to Add or Edit Menu Categories and Items

All menu text (categories, items, prices, descriptions) is managed in one file.

1.  Open the file: `/src/lib/menu.ts`.
2.  You will see the menu structured into categories.

### To Add a New Category:

1.  Copy the entire category template below:

    ```ts
    {
      name: 'New Category Name',
      items: [
        // Add menu items for this category here
      ],
    },
    ```

2.  Paste it at the end of the `menuData` list.
3.  Change `'New Category Name'` to your desired category title (e.g., `'Seafood Specials'`).
4.  Follow the instructions below to add items to it.

### To Add a New Menu Item to a Category:

1.  Find the category you want to add an item to.
2.  Inside its `items: []` list, copy the item template below:

    ```ts
    { 
      name: 'New Dish Name', 
      price: 999, 
      originalPrice: 1099, // Optional: remove this line if there is no discount
      description: 'A delicious description of the new dish.', 
      rating: 5, // Initial rating
      ratingsCount: 1 // Initial rating count
    },
    ```

3.  Paste it inside the `items` list for that category.
4.  Update the `name`, `price`, `description`, etc.
5.  Save the file. Your new item will appear on the menu.
6.  **Finally, remember to add an image for it** by following Part 1 of this guide!

That's it! By following these steps, you can keep your website's menu completely up-to-date.
