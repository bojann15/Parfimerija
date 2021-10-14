import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { register, signin, getUser, addCart } from './services/user.js';
import { getCategory, createCategory, deleteCategory, updateCategory } from './services/category.js';
import auth from './middleware/auth.js';
import authAdmin from './middleware/authAdmin.js'
import { createProduct, deleteProduct, getProducts, updateProduct, getProduct } from './services/product.js';
import { getPayment, createPayment, getHistory } from './services/payment.js';
const app = express();
dotenv.config();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/user/register", register);
app.post("/user/signin", signin);
app.get("/categories", getCategory);
app.post("/categories", auth, authAdmin, createCategory);
app.delete("/categories/:id", auth, authAdmin, deleteCategory);
app.put("/categories/:id", auth, authAdmin, updateCategory);
app.get("/products", getProducts);
app.post("/products", auth, authAdmin, createProduct);
app.delete("/products/:id", auth, authAdmin, deleteProduct);
app.put("/products/:id", auth, authAdmin, updateProduct);
app.get("/products/:id", getProduct);
app.get("/user/", auth, getUser);
app.put("/user/addCart", auth, addCart);
app.get("/payment", auth, authAdmin, getPayment);
app.post("/payment", auth, createPayment);
app.get("/history", auth, getHistory);

app.get('/', (req, res) => {
    res.send('Hello to parfemerija')
});

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URL, {

    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => app.listen(port, () => {
    console.log(`Server running on  http://localhost:${port}`);
})).catch((error) => console.log(error.message));

