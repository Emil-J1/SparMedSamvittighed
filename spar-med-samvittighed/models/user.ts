import mongoose, { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User interface (for type safety)
interface User {
    email: string; // Change to a more specific type
    username: string;
    password: string;
    zipCode: Number;
  }  

const UserSchema = new Schema<User>({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required!'],
        match: [/\S+@\S+\.\S+/, 'Email format is invalid!'], 
    },
    username: {
      type: String,
      required: [true, 'Username is required!'],
      match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      minlength: [6, 'Password should be at least 6 characters long!'],
    },
    zipCode: {
      type: Number,
      match: [/^\d{4}$/, "Postal-code invalidt, only 4 digits is allowed."], // Postal code (4 digits)
      required: [true, "Postal code is required."],
    }
  });

  UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  });

// Export the compiled Mongoose model
const User = mongoose.models.User || model<User>('User', UserSchema);

export { User };

