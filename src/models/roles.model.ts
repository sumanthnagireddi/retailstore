import mongoose, { Document, Schema } from "mongoose";
import { ROLES } from "../Interfaces/roles.enum";

export interface IROLES extends Document {
    role_name: string;
    createdAt: Date;
    updatedAt: Date;
}

const roleSchema = new Schema<IROLES>({
    role_name: { type: String, required: true, unique:true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IROLES>("Roles", roleSchema);
