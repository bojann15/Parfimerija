import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../../context/globalState';
const OrderDetails = () => {
    const { history } = useContext(GlobalContext);
    const [orderDetails, setOrderDetails] = useState([])
    const { id } = useParams();
    useEffect(() => {
        history.forEach(item => { if (item._id === id) setOrderDetails(item) })

    }, [id, history])
    if (orderDetails.length === 0) return null;

    return (
        <div className="history-page">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{orderDetails.name}</td>
                        <td>{orderDetails.email}</td>

                    </tr>
                </tbody>
            </table>

            <table style={{ margin: "30px 0px" }}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Products</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.cart.map(item => (
                            <tr key={item._id}>
                                <td><img src={item.selectedFile || 'https://mpng.subpng.com/20180804/qhp/kisspng-blog-computer-icons-vector-graphics-favicon-clip-a-5b661b473a7649.4698522215334183112395.jpg'} alt="" /></td>
                                <td>{item.title}</td>
                                <td>{item.quantity}</td>
                                <td>$ {item.price * item.quantity}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}

export default OrderDetails
