import React, { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../../context/globalState';
import { Link } from 'react-router-dom';
import API from '../../api';
const OrderHistory = () => {
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const { history, setHistory } = useContext(GlobalContext)
    useEffect(() => {

        const fetchData = async () => {
            try {
                if (user?.user?.role === 1) {
                    const response = await API.get("/payment", {
                        headers: { Authorization: `Bearer ${user?.token}` }
                    })
                    setHistory(response.data)

                } else {
                    const response = await API.get("/history", {
                        headers: { Authorization: `Bearer ${user?.token}` }
                    });
                    setHistory(response.data)
                }

            } catch (err) {
                console.error(err)
            };
        }

        fetchData();

    }, [setHistory, user?.token, user?.user?.role])


    return (
        <div className="history-page">
            <h2>History</h2>
            <h4>You have {history.length} order </h4>

            <table>
                <thead>
                    <tr>

                        <th>Date of order</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map((items) =>
                        (<tr key={items._id}>
                            <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                            <td><Link to={`/history/${items._id}`}> View</Link></td>
                        </tr>)
                        )
                    }
                </tbody>
            </table>
        </div>

    )
}

export default OrderHistory;
