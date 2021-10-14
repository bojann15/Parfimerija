import React, { useState, useEffect, createContext } from 'react';
import API from '../api';
export const GlobalContext = createContext();
export const GlobalContextProvider = (props) => {
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [shouldUpdate, setShouldUpdate] = useState(true);
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get("/categories");
                setCategories(response.data);
                setShouldUpdate(false);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [shouldUpdate]);

    const addCart = async (product) => {
        if (!user) return alert("Please login to continue buying");
        const check = cart.every(item =>
            item._id !== product._id
        )
        if (check) {
            setCart([...cart, { ...product, quantity: 1 }])
            await API.put('/user/addcart', { cart: [...cart, { ...product, quantity: 1 }] }, {
                headers: { Authorization: `Bearer ${user?.token}` }
            })
        } else {
            alert("This product has been added to cart.");
        }
    };
    return (
        <GlobalContext.Provider value={{
            products, setProducts, users, setUsers, shouldUpdate, setShouldUpdate, cart, setCart, addCart, history, setHistory, categories, setCategories,
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}