import mongoose, { Schema, Document } from "mongoose";

export interface Transaction extends Document {
  id: string;
  amount: number;
  date: Date;
}

const Transaction: Schema<Transaction> = new Schema({
  id: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

export interface User extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  new_password: string;
  verifyCode_password: string;
  codeExpiry_password: Date;
  verifyCode: string;
  codeExpiry: Date;
  transactions: Transaction[];
  verified: boolean;
  balance: number;
  role: string;
  verified_password: boolean;
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Invalid email",
    ],
  },
  password: { type: String, required: [true, "Password is required"] },
  new_password: { type: String, required: false },
  verifyCode_password: { type: String, required: false },
  codeExpiry_password: { type: Date, required: false },
  verifyCode: { type: String, required: [true, "Verification Code is needed"] },
  codeExpiry: { type: Date, required: [true, "Valid expiry date required"] },
  verified: { type: Boolean, required: true },
  transactions: [Transaction],
  balance: { type: Number, required: true },
  role: { type: String, required: true },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
