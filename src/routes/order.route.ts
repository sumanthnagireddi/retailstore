import express from "express";
import { userAuth } from "../middleware/userAuth";
import {
  getOrders,
  createOrder,
  getOrderById,
  getUserOrders,
  deleteOrder,
  updateOrderDetails,
  getPaymentStatus,
  updateOrderStatus,requestReturn
} from "../controllers/orders.controller";

const orders_router = express.Router();

orders_router.get("/users/:user_id", getUserOrders); 
orders_router.get("/", getOrders);
orders_router.post("/", createOrder);
orders_router.get("/:id", getOrderById); 
orders_router.delete("/:id",deleteOrder)
orders_router.patch("/:id",updateOrderDetails);
orders_router.get("/payment_status/:order_id",getPaymentStatus)
orders_router.patch("/update_order_status/:id",updateOrderStatus)
orders_router.patch("/return_request/:id",requestReturn )
export default orders_router;

/**
 *  Order Lifecycle Management
createOrder – User places a new order

getOrderById – Fetch single order (user/admin)

getMyOrders – Get current user's orders

getAllOrders – Admin fetches all orders

deleteOrder – Admin deletes an order (if allowed)

updateOrderDetails – Modify shipping/payment details

💸 Payment Handling
markOrderAsPaid – Set order as paid

verifyPayment – Verify payment via third-party (e.g., Razorpay, Stripe)

handlePaymentWebhook – Process payment webhook events

updatePaymentMethod – User/admin updates payment method

getPaymentStatus – Fetch status of payment (pending, failed, completed)

🚚 Delivery Management
markOrderAsDelivered – Set order as delivered

trackShipment – Integrate and show real-time delivery tracking

assignDeliveryPartner – Assign 3rd-party courier/logistics

updateTrackingInfo – Update AWB/tracking number

🔄 Order Status & Workflow
updateOrderStatus – Change order status (Processing, Shipped, etc.)

bulkUpdateOrderStatus – Admin updates status in batch

delayOrderDelivery – Notify customer about delivery delay

❌ Cancellation & Returns
cancelOrder – Cancel an order (user-initiated)

adminCancelOrder – Admin cancels on behalf of user

requestReturn – User initiates return request

approveReturnRequest – Admin approves/denies return

processRefund – Trigger refund after return/cancellation

getReturnOrders – List of orders marked for return

📊 Analytics & Reports
getOrderStats – Total revenue, orders, AOV (average order value)

getTopSellingProducts – Based on order data

getSalesByDateRange – Filter orders by date for reporting

getOrderCountByStatus – Group orders by current status

🔍 Filtering & Search
filterOrdersByStatus – E.g., only show 'Delivered' or 'Cancelled'

searchOrders – Search by user, email, product, order ID

getRecentOrders – For dashboard or notifications

🧪 Testing, Logs, and Utilities
seedOrders – Create dummy orders for testing

logOrderHistory – Maintain internal history/logs for order events

resendOrderConfirmationEmail – If email delivery failed

sendOrderReminder – Payment pending reminders

archiveOrder – Archive older orders to cold storage


 */