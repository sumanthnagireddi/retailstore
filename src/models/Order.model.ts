import mongoose, { Document, ObjectId, Schema, Types } from "mongoose";
import { ROLES } from "../Interfaces/roles.enum";

export interface IOrder {
    product: { type: ObjectId },
    name: { type: String },
    quantity: number,
    price: number,
    image: string,

}
export interface IShippingAddress {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
}

export interface IPaymentResult {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
}
export interface IOrder extends Document {
    user: Types.ObjectId;
    orderItems: IOrder;
    shippingAddress: IShippingAddress;
    paymentMethod: string;
    paymentResult?: IPaymentResult;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: Date;
    isDelivered: boolean;
    deliveredAt?: Date;
    orderStatus: string;
    createdAt: Date;
    updatedAt: Date;
    cancellationReason?: string;
    returnRequested?: boolean;
    returnApproved?: boolean;
}
const orderItemSchema = new Schema<IOrder>(
    {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
    },
    { _id: false }
);
const shippingSchema = new Schema<IShippingAddress>(
    {
        fullName: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true },
    },
    { _id: false }
);

const paymentResultSchema = new Schema<IPaymentResult>(
    {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    { _id: false }
);
const orderSchema = new Schema<IOrder>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        orderItems: [orderItemSchema],
        shippingAddress: shippingSchema,
        paymentMethod: { type: String, required: true },
        paymentResult: paymentResultSchema,
        taxPrice: { type: Number, required: true, default: 0.0 },
        shippingPrice: { type: Number, required: true, default: 0.0 },
        totalPrice: { type: Number, required: true, default: 0.0 },
        isPaid: { type: Boolean, required: true, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, required: true, default: false },
        deliveredAt: { type: Date },
        orderStatus: {
            type: String,
            enum: [
                "Processing",
                "Shipped",
                "Out for Delivery",
                "Delivered",
                "Cancelled",
                "Returned",
                "Refunded",
            ],
            default: "Processing",
        },
        cancellationReason: { type: String },
        returnRequested: { type: Boolean, default: false },
        returnApproved: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IOrder>("Order", orderSchema);
