import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/globalState';
import API from '../../api';
const Cart = () => {
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const { cart, setCart } = useContext(GlobalContext);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)
            setTotal(total);
        }
        getTotal();
    }, [cart]);
    const addToCart = async (cart) => {
        await API.put('/user/addcart', { cart }, {
            headers: { Authorization: `Bearer ${user?.token}` }
        })
    }
    const increment = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1
            }
        })
        setCart([...cart])
        addToCart(cart);
    };
    const removeProduct = (id) => {
        if (window.confirm("Do you want to delete this product?")) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            })
            setCart([...cart]);
            addToCart(cart);
        }
    }
    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1;
            }
        })
        setCart([...cart])
        addToCart(cart);
    }
    const tranSuccess = async () => {

        await API.post("/payment", { cart }, {
            headers: { Authorization: `Bearer ${user?.token}` }
        })
        setCart([]);
        addToCart([]);
        alert("Uspešno ste poručili.")

    }
    if (cart.length === 0) return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Prazna korpa</h2>

    return (
        <div>
            {
                cart.map((product) => {
                    return (
                        <div className="detail cart" key={product._id}>
                            <img src={product.selectedFile || 'https://mpng.subpng.com/20180804/qhp/kisspng-blog-computer-icons-vector-graphics-favicon-clip-a-5b661b473a7649.4698522215334183112395.jpg'} alt="" />
                            <div className="box-detail">
                                <h2>{product.title}</h2>
                                <h3>{product.price * product.quantity} RSD</h3>
                                <p>{product.description}</p>
                                <p>{product.content}</p>
                                <div className="amount">
                                    <button onClick={() => decrement(product._id)}>-</button>
                                    <span>{product.quantity}</span>
                                    <button onClick={() => increment(product._id)}> + </button>
                                </div>
                                <div className="delete" onClick={() => removeProduct(product._id)}>X</div>
                            </div>
                        </div>)
                })
            }
            <div className="total">
                <h3>Total: {total} RSD</h3>
                <button id="btn_payment" onClick={() => tranSuccess()}>Poruči</button>
            </div>
        </div>

    )
}

export default Cart;
