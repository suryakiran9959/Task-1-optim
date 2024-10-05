import React, { useEffect, useState } from 'react';
import './history1.css'; 
import Header from './header';
import { useNavigate } from 'react-router-dom';

function History() {
    const [orders, setOrders] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        setOrders(storedOrders);
    }, []);

    const handler = () => {
        navigator("/");
    };

    return (
        <>
            <Header />
            <div className="history-container">
                <h2>Order Summary</h2>
                {orders.length > 0 ? (
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Table Number</th>
                                <th>Contact Number</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.itemName}</td>
                                    <td>{order.quantity}</td> 
                                    <td>{order.tableNumber}</td>
                                    <td>{order.contactNumber || "N/A"}</td>
                                    <td>{order.date}</td>
                                    <td>{order.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="no-orders">No orders found.</p>
                )}
            </div>
            <center><button onClick={handler}>BACK TO LIST ITEMS</button></center>
        </>
    );
}

export default History;
