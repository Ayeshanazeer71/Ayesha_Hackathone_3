import axios from "axios";
import { createClient } from '@sanity/client';
import slugify from 'slugify';

import dotenv from 'dotenv';
dotenv.config();

// Create Sanity client using environment variables
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Use environment variable
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // Use environment variable
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Use environment variable
  apiVersion: '2025-01-12',
});

// Rest of the code remains the same


// Function to upload an image to Sanity
async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);
    const response = await axios.get(imageUrl, { responseType: "arraybuffer", timeout: 10000 });
    const buffer = Buffer.from(response.data);
    const asset = await client.assets.upload("image", buffer, {
      filename: imageUrl.split("/").pop(), // Extract the filename from URL
    });
    console.log("✅ Image uploaded successfully:", asset);
    return asset._id; // Return the uploaded image asset reference ID
  } catch (error) {
    console.error("❌ Failed to upload image:", imageUrl, error);
    return null;
  }
}

// Function to create or fetch a category in Sanity
async function createCategory(category, counter) {
  try {
    const categorySlug = slugify(category.name || `category-${counter}`, {
      lower: true,
      strict: true,
    });

    // Check if category already exists
    const categoryExist = await client.fetch(`*[_type=="category" && slug.current==$slug][0]`, {
      slug: categorySlug,
    });

    if (categoryExist) {
      console.log(`✅ Category already exists: ${categoryExist.name}`);
      return categoryExist._id;
    }

    // Create a new category
    const categoryObject = {
      _type: "category",
      _id: `category-${counter}`,
      name: category.name,
      slug: { _type: "slug", current: categorySlug },
    };

    const response = await client.createOrReplace(categoryObject);
    console.log("✅ Category created successfully:", response);
    return response._id;
  } catch (error) {
    console.error("❌ Failed to create category:", category.name, error);
    return null;
  }
}

// Function to import data from API to Sanity
async function importData() {
  try {
    console.log("Fetching products from API...");
    const response = await axios.get("https://hackathon-apis.vercel.app/api/products");
    const products = response.data;

    console.log(`✅ Fetched ${products.length} products`);
    let counter = 1;

    for (const product of products) {
      let imageRef = null;
      let catRef = null;

      // Upload image if available
      if (product.image) {
        imageRef = await uploadImageToSanity(product.image);
      }

      // Create or fetch category
      if (product.category?.name) {
        catRef = await createCategory(product.category, counter);
      }

      // Prepare the product object for Sanity
      const sanityProduct = {
        _id: `product-${counter}`, // Unique ID
        _type: "product",
        name: product.name,
        slug: {
          _type: "slug",
          current: slugify(product.name || "default-product", {
            lower: true,
            strict: true,
          }),
        },
        price: product.price,
        quantity: product.quantity || 50, // Default quantity
        category: catRef
          ? {
              _type: "reference",
              _ref: catRef,
            }
          : undefined,
        tags: product.tags || [],
        image: imageRef
          ? {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: imageRef,
              },
            }
          : undefined,
        description:
          product.description ||
          "A timeless design, with premium materials features as one of our most popular and iconic pieces. The dandy chair is perfect for any stylish living space with beech legs and lambskin leather upholstery.",
        features: product.features || [
          "Premium material",
          "Handmade upholstery",
          "Quality timeless classic",
        ],
        dimensions: product.dimensions || {
          _type: "dimensions",
          height: "110cm",
          width: "75cm",
          depth: "50cm",
        },
      };

      // Log the product before uploading
      console.log("Uploading product:", sanityProduct);

      // Upload the product to Sanity
      await client.createOrReplace(sanityProduct);
      console.log(`✅ Imported product: ${sanityProduct.name}`);
      counter++;
    }

    console.log("✅ Data import completed successfully!");
  } catch (error) {
    console.error("❌ Error importing data:", error);
  }
}

// Start the import process
importData();
