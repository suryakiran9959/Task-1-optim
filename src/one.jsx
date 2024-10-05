import axios from "axios";
import { useEffect, useState } from "react";
import "./one.css";
import Header from "./header";

function Fetch() {
    const [data, setData] = useState([]);
    const [orderDetails, setOrderDetails] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);
    const [orders, setOrders] = useState([]);
    const [quantityOrdered, setQuantityOrdered] = useState(1); 

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("https://api.jsonbin.io/v3/b/66faa41facd3cb34a88ed968");
            const storedData = JSON.parse(localStorage.getItem('data')) || result.data.record;
            setData(storedData);
        };
        fetchData();

        const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        setOrders(storedOrders);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleOrder = (item) => {
        setSelectedItem(item);
        setQuantityOrdered(1); 
        window.scrollTo(0, 0);
    };

    const handleQuantityChange = (e) => {
        const value = Math.max(1, Math.min(selectedItem.available_quantity, e.target.value)); 
        setQuantityOrdered(value);
    };

    const handleSubmitOrder = (e) => {
        e.preventDefault();

        if (!selectedItem) {
            console.error("No item selected");
            return;
        }

        const detailsWithItem = {
            ...orderDetails,
            itemName: selectedItem.name,
            quantity: quantityOrdered, 
        };

        alert(`Order placed for ${quantityOrdered} ${selectedItem.name}(s) at Table: ${orderDetails.tableNumber}`);

        const updatedData = data.map((item) => {
            if (item.id === selectedItem.id) {
                const newQuantity = item.available_quantity - quantityOrdered;
                return { ...item, available_quantity: newQuantity };
            }
            return item;
        });

        setData(updatedData);
        localStorage.setItem('data', JSON.stringify(updatedData));

        // Update orders
        const updatedOrders = [...orders, detailsWithItem];
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));

        setSelectedItem(null);
        setOrderDetails({});
    };

    return (
        <>
            <Header />
            <center><h1>WELCOME! YOU CAN ORDER YOUR FAVORITE DISHES!</h1></center>
            <hr />
            <center>
                {selectedItem && (
                    <div className="order-form">
                        <h3>Order Details for: {selectedItem.name}</h3>
                        <form onSubmit={handleSubmitOrder}>
                            <div>
                                <label>Table Number:</label>
                                <input
                                    type="text"
                                    name="tableNumber"
                                    value={orderDetails.tableNumber || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Contact Number (Optional):</label>
                                <input
                                    type="text"
                                    name="contactNumber"
                                    value={orderDetails.contactNumber || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Date:</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={orderDetails.date || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Time:</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={orderDetails.time || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Quantity:</label>
                                <input
                                    type="number"
                                    value={quantityOrdered}
                                    onChange={handleQuantityChange}
                                    min="1"
                                    max={selectedItem.available_quantity}
                                    required
                                />
                            </div>
                            <button type="submit">Confirm Order</button>
                        </form>
                    </div>
                )}
            </center>
            <hr />

            <div className="main">
                {data.map((each) => (
                    <div key={each.id} className="child">
                        <div className="image">
                            <img src={each.image_url} alt={each.name} height={200} width={200} />
                        </div>
                        <p>Name: {each.name}</p>
                        <p>Category: {each.category}</p>
                        <p>Price: ${each.price}</p>
                        <p>Available Quantity: {each.available_quantity}</p>
                        <button
                            onClick={() => handleOrder(each)}
                            disabled={each.available_quantity === 0}
                            className={each.available_quantity === 0 ? "disabled-button" : "active-button"}
                        >
                            {each.available_quantity === 0 ? "Out of Stock" : "Place an Order"}
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Fetch;
