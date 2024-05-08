import { Schema, model } from 'mongoose';

// Define the User interface (for type safety)
interface User {
    email: string; // Change to a more specific type
    username: string;
  }  

const UserSchema = new Schema<User>({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required!'],
    },
    username: {
      type: String,
      required: [true, 'Username is required!'],
      match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
  });

// Export the compiled Mongoose model
export const User = model<User>('User', UserSchema);