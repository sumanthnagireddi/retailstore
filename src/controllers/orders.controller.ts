import { NextFunction, Request, Response } from "express"
import orderModel from "../models/Order.model"

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await orderModel.find({})
        res.status(200).json(orders)
    } catch (error) {
        next(error)
    }
}

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order_payload = req.body
        const orders = await orderModel.create(order_payload)
        res.status(200).json(orders)
    } catch (error) {
        next(error)
    }
}

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order_id = req.params.id;
        const order = await orderModel.findById(order_id)
        if (!order) {
            res.status(404).json({ message: "Order not found.", data: {} });
        }
        res.status(200).json({ message: "Order Fetched Succesfully!!.", data: order })
    } catch (error) {
        next(error)
    }
}

export const getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id = req.params.user_id;
        const orders = await orderModel.find({ user: user_id })
        res.status(200).json(orders)
    } catch (error) {
        next(error)
    }
}

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order_id = req.params.id;
        const order = await orderModel.findByIdAndDelete(order_id);
        res.status(200).json({ message: "Order Deleted Succesfully!!!" })
    } catch (error) {
        next(error)
    }
}

export const updateOrderDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order_id = req.params.id;
        const order_payload = req.body;

        if (!order_id) {
            res.status(400).json({ message: "Order ID is required." });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(order_id, order_payload, { new: true });

        if (!updatedOrder) {
            res.status(404).json({ message: "Order not found." });
        }

        res.status(200).json({
            message: "Order updated successfully!",
            data: updatedOrder,
        });
    } catch (error) {
        next(error);
    }
};


// payment

export const getPaymentStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order_id = req.params.order_id;

        if (!order_id) {
            res.status(400).json({ message: "Order ID is required." });
        }

        const order = await orderModel.findById(order_id);

        if (!order) {
            res.status(404).json({ message: "Order not found." });
        }

        res.status(200).json({
            message: "Payment status fetched successfully!",
            data: {
                order_id: order?._id,
                paymentStatus: order?.paymentResult,
            },
        });
    } catch (error) {
        next(error);
    }
};


// order status

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order_id = req.params.id;
        const { orderStatus } = req.body;

        if (!order_id) {
            res.status(400).json({ message: "Order ID is required." });
        }

        if (!orderStatus) {
            res.status(400).json({ message: "Status is required to update the order." });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            order_id,
            { orderStatus },
            { new: true }
        );

        if (!updatedOrder) {
            res.status(404).json({ message: "Order not found." });
        }

        res.status(200).json({
            message: "Order status updated successfully!",
            data: updatedOrder,
        });
    } catch (error) {
        next(error);
    }
};


export const cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order_id = req.params.id;
        const { orderStatus } = req.body;

        if (!order_id) {
            res.status(400).json({ message: "Order ID is required." });
        }

        if (!orderStatus) {
            res.status(400).json({ message: "Status is required to update the order." });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            order_id,
            { orderStatus },
            { new: true }
        );

        if (!updatedOrder) {
            res.status(404).json({ message: "Order not found." });
        }

        res.status(200).json({
            message: "Order status updated successfully!",
            data: updatedOrder,
        });
    } catch (error) {
        next(error);
    }
};

export const adminCancelOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order_id = req.params.id;
        const { orderStatus } = req.body;

        if (!order_id) {
            res.status(400).json({ message: "Order ID is required." });
        }

        if (!orderStatus) {
            res.status(400).json({ message: "Status is required to update the order." });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            order_id,
            { orderStatus },
            { new: true }
        );

        if (!updatedOrder) {
            res.status(404).json({ message: "Order not found." });
        }

        res.status(200).json({
            message: "Order status updated successfully!",
            data: updatedOrder,
        });
    } catch (error) {
        next(error);
    }
};


export const requestReturn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order_id = req.params.id;
        const { orderStatus } = req.body;

        if (!order_id) {
            res.status(400).json({ message: "Order ID is required." });
        }

        if (!orderStatus) {
            res.status(400).json({ message: "Status is required to update the order." });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            order_id,
            { orderStatus },
            { new: true }
        );

        if (!updatedOrder) {
            res.status(404).json({ message: "Order not found." });
        }

        res.status(200).json({
            message: "Order status updated successfully!",
            data: updatedOrder,
        });
    } catch (error) {
        next(error);
    }
};
