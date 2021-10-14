import React, { useState, useContext } from 'react'
import API from '../../api';
import { GlobalContext } from '../../context/globalState';
const Category = () => {
    const { categories, setShouldUpdate } = useContext(GlobalContext)
    const [category, setCategory] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState('')
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));

    const createCategory = async (e) => {
        e.preventDefault();
        try {

            await API.post('/categories', { name: category }, {
                headers: { Authorization: `Bearer ${user?.token}` }
            })
            setIsEditing(false);
            setCategory('');
            setShouldUpdate(true);

        } catch (err) {
            console.error(err.message)
        }
    }
    const updateCategory = async (e) => {
        e.preventDefault();
        try {

            await API.put(`/categories/${currentId}`, { name: category }
                , {
                    headers: { Authorization: `Bearer ${user?.token}` }
                })
            setIsEditing(false);
            setCategory('');
            setShouldUpdate(true);
        } catch (err) {
            console.error(err.message)
        }
    }

    const editCategory = (e, id, name) => {

        setCurrentId(id);
        setCategory(name);
        setIsEditing(true);

    }
    const deleteCategory = async (id) => {
        try {
            await API.delete(`/categories/${id}`, {
                headers: { Authorization: `Bearer ${user?.token}` }
            })
            setShouldUpdate(true)
        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <div className="categories">
            <form onSubmit={isEditing ? updateCategory : createCategory}>
                <label htmlFor="category">Category</label>
                <input type="text" name="category" value={category} required onChange={(e) => setCategory(e.target.value)} />
                <button type="submit">{isEditing ? "Update" : "Save"}</button>
                <div className="col">
                    {
                        categories.map((category) => {
                            return (
                                <div className="row" key={category._id}>
                                    <p>{category.name}</p>
                                    <div>
                                        <button onClick={(e) => editCategory(e.preventDefault(), category._id, category.name)}>Edit</button>
                                        <button onClick={() => deleteCategory(category._id)}>Delete</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </form>
        </div>
    )
}

export default Category;
