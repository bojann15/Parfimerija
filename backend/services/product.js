import Product from '../models/productModel.js';

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete (queryObj[el]));
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        this.query.find(JSON.parse(queryStr));
        return this;
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("-createdAt");
        }
        return this;
    }
    paginating() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 9;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }

};
export const getProducts = async (req, res) => {
    try {
        const features = new APIfeatures(Product.find(), req.query).filtering().sorting().paginating();
        const products = await features.query
        res.status(200).json({ result: products.length, products: products });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const createProduct = async (req, res) => {

    try {
        const { product_id, title, price, description, content, selectedFile, category } = req.body;
        const product = await Product.findOne({ product_id })
        if (product)
            return res.status(400).json({ msg: "This product already exists." });
        const newProduct = new Product({
            product_id, title: title.toLowerCase(), price, description, content, selectedFile, category
        })
        await newProduct.save()
        res.status(201).json(newProduct);


    } catch (error) {
        res.status(500).json({ mesasge: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndRemove(id);
        res.status(204).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { title, price, description, content, selectedFile, category } = req.body;
    const { id } = req.params;
    try {
        const updatedProduct = { title, price, description, content, selectedFile, category }
        await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        res.status(200).json(product);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};