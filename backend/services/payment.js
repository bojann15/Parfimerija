import Payment from '../models/paymentModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';

export const getPayment = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

export const createPayment = async (req, res) => {
    try {
        const id = req.userId
        const user = await User.findById(id);

        if (!user) return res.status(400).josn({ msg: "User doesn't exist." });
        const { cart } = req.body;
        const { name, email } = user;
        const newPayment = new Payment({
            user_id: id, name, email, cart
        });
        cart.filter(item => {
            return sold(item._id, item.quantity, item.sold)
        })
        await newPayment.save();
        res.status(201).json(newPayment)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
const sold = async (id, quantity, oldSold) => {
    await Product.findOneAndUpdate({ _id: id }, {
        sold: quantity + oldSold
    })
};

export const getHistory = async (req, res) => {
    try {

        const history = await Payment.find({ user_id: req.userId });
        res.status(200).json(history);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};
