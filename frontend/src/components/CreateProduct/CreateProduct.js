import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/globalState';
import API from '../../api';
import FileBase64 from 'react-file-base64';
import { useHistory, useParams } from 'react-router-dom';

const initialState = {
    product_id: '', title: '', price: 0, description: '', content: '', category: '', selectedFile: '', _id: ''
}

const CreateProduct = () => {
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const history = useHistory();
    const { id } = useParams();
    const { categories, products, setShouldUpdate } = useContext(GlobalContext);
    const [edit, setEdit] = useState(false);
    const [product, setProduct] = useState(initialState)
    useEffect(() => {
        if (id) {
            setEdit(true);
            products.forEach((product) => { if (product._id === id) { setProduct(product) } })
        } else {
            setEdit(false);
            setProduct(initialState);
        }
    }, [id, products])
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value })
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {

            await API.put(`/products/${id}`, { ...product }, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            setShouldUpdate(true);
            setProduct(initialState);
            history.push("/")

        } catch (err) {
            console.error(err.message)
        }
    };
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await API.post('/products', { ...product }, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            setShouldUpdate(true);
            setProduct(initialState);
            history.push("/")
        } catch (err) {
            console.error(err.response.data)
        }
    }
    return (
        <div className="create_product">

            <form onSubmit={edit ? handleUpdate : handleCreate}>
                <div className="upload">
                    <FileBase64 type="file" multiple={false} onDone={({ base64 }) => { setProduct({ ...product, selectedFile: base64 }) }} />
                </div>
                <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" id="product_id" required value={product.product_id} onChange={handleChangeInput} disabled={edit} />
                </div>
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required value={product.title} onChange={handleChangeInput} />
                </div>
                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="numer" name="price" id="price" required value={product.price} onChange={handleChangeInput} />
                </div>
                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required value={product.description} rows="5" onChange={handleChangeInput} />
                </div>
                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required value={product.content} rows="7" onChange={handleChangeInput} />
                </div>
                <div className="row">
                    <label htmlFor="categories">Categories</label>
                    <select name="category" value={product.category} onChange={handleChangeInput}>
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category.name} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <button type="submit">{edit ? 'Update' : 'Create'}</button>
            </form>
        </div>
    )
}

export default CreateProduct;
