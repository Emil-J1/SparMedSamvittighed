import { Schema, model } from "mongoose";

// Define the User interface (for type safety)
interface Product {
  ean: number;
  category: string;
  description: string;
  image: string;
}

const IMAGE_URL_PREFIX = "https://digitalassets.sallinggroup.com";

const ProductSchema = new Schema<Product>({
  ean: {
    type: Number,
    unique: true,
    required: true,
    match: [
      /^\d{13}$/,
      "EAN must be exactly 13 digits long and consist only of numbers.",
    ],
  },
  category: {
    type: String,
    required: true,
    match: [
      /^[a-zA-Z0-9\s]+$/,
      "Category must contain only alphanumeric characters and spaces.",
    ],
  },

  description: {
    type: String,
    required: true,
    match: [
      /^[a-zA-Z0-9\s]+$/,
      "Description must contain only alphanumeric characters and spaces.",
    ],
  },
  image: {
    type: String,
    required: false,
    match: [/^https?:\/\/.+$/, "Category must be a valid URL."],
    validate: {
      validator: function (v: string) {
        // Validate that the image URL starts with the specified prefix
        return v.startsWith(IMAGE_URL_PREFIX);
      },
      message: "error",
    },
  },
});

// Export the compiled Mongoose model
export const Product = model<Product>("Product", ProductSchema);
