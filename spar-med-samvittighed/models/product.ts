import { Schema, model } from "mongoose";

// Define the User interface (for type safety)
interface Product {
  ean: number;
  category: string;
  description: string;
  image: string;
}

const ProductSchema = new Schema<Product>({
  ean: {
    type: Number,
    unique: true,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

// Export the compiled Mongoose model
export const Product = model<Product>("Product", ProductSchema);
