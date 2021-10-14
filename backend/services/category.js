import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
export const getCategory = async (req, res) => {
    try {

        const categories = await Category.find();
        res.status(200).json(categories);

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.findOne({ name });
        if (category) return res.status(400).json({ msg: "Thi category already exists" });
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {

        const { id } = req.params;
        const categories = await Category.findById(id)
        const products = await Product.findOne({ category: categories.name })
        if (products) { return res.status(400).json({ message: "Please delete all products with a relationship." }) }
        else {
            await Category.findByIdAndRemove(id);
            res.status(204).json({ message: "Deleted successfully" });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
export const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const updatedCategory = { name, _id: id };
        await Category.findByIdAndUpdate(id, updatedCategory, { new: true });
        res.status(200).json(updatedCategory);
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
};