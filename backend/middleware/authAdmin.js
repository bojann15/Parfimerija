import User from '../models/userModel.js';

const authAdmin = async (req, res, next) => {

    try {
        const user = await User.findOne({ _id: req.userId });
        if (user.role !== 1) return res.status(400).json({ message: "Admin resources acces denied" });

        next();

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
export default authAdmin;