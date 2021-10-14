import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    product_id: { type: String, unique: true, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    selectedFile: { type: String },
    category: { type: String, required: true },
    checked: { type: Boolean, default: false },
    sold: { type: Number, default: 0 },
}, {
    timestamps: true
})

const Product = mongoose.model("Product", productSchema);
export default Product;