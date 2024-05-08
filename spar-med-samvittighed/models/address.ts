import { Schema, model } from 'mongoose';
// 
interface Address {
  street_address: string;
  city: string;
  state: string;
  postal_code: number;
  country: string;
  coordinates: number;
};

const AddressSchema = new Schema<Address>({
  street_address: {
    type: String,
    match: [/^[a-øA-Ø0-9\s]+$/, "Street address invalid, only charactors and numbers allowed."], // Street address (only characters and numbers)
    required: [true, "Street address is required."],
  
  }, // Street address
  city:{
    type: String,
    match: [/^[a-øA-Ø]+$/, "City invalid, only charactors allowed."], // City name (only characters)
    required: [true, "City is required."],
  }, // City name
  state: {
    type: String,
    match: [/^[a-øA-Ø]+$/, "State invalid, only charactors allowed."], // State name (only characters)
    required: [false, "State is optional."],
  },
  postal_code: {
    type: Number,
    match: [/^\d{4}$/, "Postal-code invalidt, only 4 digits is allowed."], // Postal code (4 digits)
    required: [true, "Postal code is required."],
  },
  country: {
    type: String,
    match: [/^[a-øA-Ø]+$/, "Country invalid, only charactors allowed."], // Country name (only characters)
    required: [true, "Country is required."],
  },
  coordinates: {
    type: Number,
    match: [/^[-+]?\d{1,3}(?:\.\d+)?,\s*[-+]?\d{1,3}(?:\.\d+)?$/, "Coordinates invalid."], // Coordinates (6 digits)
    required: [true, "Coordinates is required."],
  },
});


export const Address = model<Address>("Address", AddressSchema);
