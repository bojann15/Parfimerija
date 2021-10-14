import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/globalState';
import { Link } from "react-router-dom";
import API from '../../api';

const ProductItem = ({ product, handleDelete, handleCheck }) => {
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const { setCart, addCart } = useContext(GlobalContext);

    useEffect(() => {

        if (user) {
            const fetchData = async () => {
                try {
                    const response = await API.get(`/user/`, {
                        headers: { Authorization: `Bearer ${user?.token}` }
                    });
                    setCart(response.data.cart);

                } catch (err) {
                    console.error(err)
                }
            }
            fetchData()
        }
    }, [user]);


    return (
        <div className="product_card">
            {
                user?.user?.role === 1 && <input type="checkbox" checked={product.checked}
                    onChange={() => handleCheck(product._id)} />
            }
            <img src={product.selectedFile || 'https://mpng.subpng.com/20180804/qhp/kisspng-blog-computer-icons-vector-graphics-favicon-clip-a-5b661b473a7649.4698522215334183112395.jpg'} alt="" />
            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>€{product.price}</span>
                <p>{product.description}</p>
            </div>
            {user?.user?.role !== 1 ? (<div className="row_btn">
                <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
                    Buy
                </Link>
                <Link id="btn_view" to={`product/${product._id}`}>
                    View
                </Link>
            </div>) : (
                <div className="row_btn">
                    <Link id="btn_buy" to="#!" onClick={() => handleDelete(product._id)}>
                        Delete
                    </Link>
                    <Link id="btn_view" to={`edit_product/${product._id}`}>
                        Edit
                    </Link>
                </div>
            )}
        </div>

    )
}
export default ProductItem;
