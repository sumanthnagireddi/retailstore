import express from "express";
import { createProduct, getProducts } from "../controllers/products.controller";

const products_router = express.Router();

products_router.route("/")
                .get(getProducts)
                .post(createProduct)

export default products_router






/**
 * 🚀 Product APIs (User-facing)
Method	Endpoint	Purpose
GET	/api/products	Get all published products (with filters, pagination, search)
GET	/api/products/:id	Get product details by ID
GET	/api/products/slug/:slug	Get product by slug (SEO-friendly)
GET	/api/products/category/:name	Get products by category
GET	/api/products/featured	Get featured products
GET	/api/products/vendor/:vendorId	Get all products from a vendor
GET	/api/products/search?q=...	Search products by name/description/tags

🛒 Product APIs (Admin/Vendor-facing)
Method	Endpoint	Purpose
POST	/api/products	Create a new product (admin/vendor)
PUT	/api/products/:id	Update product details
DELETE	/api/products/:id	Delete a product
PATCH	/api/products/:id/publish	Publish/unpublish a product
PATCH	/api/products/:id/feature	Mark/unmark as featured

✨ Additional APIs
Method	Endpoint	Purpose
POST	/api/products/:id/review	Add a review to a product
GET	/api/products/:id/reviews	Get all reviews for a product
DELETE	/api/products/:id/review/:rid	Delete a review (admin/moderator)
GET	/api/products/filters/options	Get all available filter options (brands, sizes, tags, etc.)
 */