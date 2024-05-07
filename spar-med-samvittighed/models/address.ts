import { Schema, model } from 'mongoose';

interface Store {
  street_address: String;
  state: String;
  postal_code: String;
  country: String;
  location: String;

}  

const addressSchema = new Schema<address>({
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


export const Address = model<Address>('Address', addressSchema);
