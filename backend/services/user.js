import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    try {

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exist." });
        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, email, password: hashedPassword });
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.SECRET, { expiresIn: '30d' })
        const createdUser = await newUser.save();
        res.status(200).json({ newUser, token })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};
export const signin = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User doesn't exist" });
        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET, { expiresIn: "30d" });
        res.status(200).json({ user, token })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    };

};

export const addCart = async (req, res) => {

    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(400).json({ msg: "User does not exist." });
        await User.findOneAndUpdate({ _id: req.userId }, {
            cart: req.body.cart
        })
        res.status(200).json({ msg: "Updated successfully" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

