import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street_address: String, // Street address
  city: String, // City name
  state: String, // State or province abbreviation (optional)
  postal_code: {
    type: String,
    validate: {
      validator: function(value: string): boolean {
        // Replace with your specific postal code format regex (if needed)
        return /^\d{5}$/.test(value); // Example for 5-digit US postal codes
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

export default mongoose.model('Address', addressSchema); // Export the model
