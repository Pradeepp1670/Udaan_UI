import React, { useState } from 'react';
import { razorpay } from '../service/PaymentService';

function Payment() {
    const [amount_value, setAmount] = useState(0);
    const [data, setData] = useState({});

    const handlePayment = async () => {
        try {
           
            await razorpay(amount_value).then((response) => {
                setData(response.data);
            });

            const options = {
                key: 'rzp_test_srynvdmHQLkcX2', // Enter the Key ID generated from the Dashboard
                amount: data['amount'],
                currency: data['currency'],
                name: 'Udaan',
                description: 'Test Transaction',
                order_id: data['orderId'],
                handler: function (response) {
                    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                },
                prefill: {
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    contact: '9999999999'
                },
                theme: {
                    color: '#8f00ff'
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Error creating Razorpay order:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Payment</h2>
            <input
                type="number"
                value={amount_value}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="border p-2 rounded mb-4 w-full"
            />
            <button
                onClick={handlePayment}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Pay Now
            </button>
        </div>
    );
}

export default Payment;
