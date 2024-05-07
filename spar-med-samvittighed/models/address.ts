import { Schema, model } from 'mongoose';

interface Address {
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  location?: { // Optional location details (consider using GeoJSON for geospatial data)
    type: { type: string; default: "Point" };
    coordinates: number[];
  };
}  

const AddressSchema = new Schema<Address>({
  street_address: String, // Street address
  city: String, // City name
  state: String, // State or province abbreviation (optional)
  postal_code: {
    type: String,
    validate: {
      validator: function(value: string): boolean {
        // Replace with your specific postal code format regex (if needed)
        return /^\d{4}$/.test(value); // Example for 4-digit DKK postal codes
      },
      message: 'Invalid postal code format'
    }
  },
  country: String, // Country name
  location: { // Optional location details (consider using GeoJSON for geospatial data)
    type: { type: String, default: "Point" },
    coordinates: [Number]
  }
});


export const Address = model<Address>("Address", AddressSchema);
