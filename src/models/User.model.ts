import mongoose, { Document, Schema } from "mongoose";
import { ROLES } from "../Interfaces/roles.enum";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  roles?: ROLES[]
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  roles: {
    type: [String],
    enum: Object.values(ROLES),
    default: ROLES.User,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>("User", userSchema);
