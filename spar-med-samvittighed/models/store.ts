import { Schema, model } from 'mongoose';

// Define the User interface (for type safety)
interface Store {
    brand: 'bilka' | 'foetex' | 'netto';
    name: string;
  }  

  const StoreSchema = new Schema<Store>({
    brand: {
        type: String,
        required: [true, 'Brand is required!'],
        enum: ['bilka', 'foetex', 'netto'], 
        match: /^(bilka|foetex|netto)$/
    },
    name: {
      type: String,
      unique: true,
      required: [true, 'Name is required!'],
      match: /^[a-zA-Z0-9\-_]+$/
    },
  });



 

export const Store = model<Store>('Store', StoreSchema);
