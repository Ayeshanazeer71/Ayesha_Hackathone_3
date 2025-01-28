'use client';
import Image from "next/image";
import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../redux/cartSlice';
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { RootState } from "../redux/store";
import { useRouter } from "next/navigation";

const Shopping = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const router = useRouter();
    const [shippingOption, setShippingOption] = useState<string>("Standard Delivery");
    const [discountCode, setDiscountCode] = useState<string>("");

    const shippingCost = useMemo(() => shippingOption === "Express Delivery" ? 10.00 : 5.00, [shippingOption]);
    const subtotal = useMemo(() => cart.items.reduce((total, item) => total + item.price * item.quantity, 0), [cart.items]);
    const applyDiscount = useMemo(() => discountCode === "DISCOUNT10" ? 10 : 0, [discountCode]);
    const totalAmount = useMemo(() => (subtotal + shippingCost - applyDiscount).toFixed(2), [subtotal, shippingCost, applyDiscount]);

    return (
        <section className="py-12 px-6 sm:px-12 bg-gray-100">
            <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 sm:p-12 flex flex-col lg:flex-row gap-8 transition-all">

                {/* Shopping Cart */}
                <div className="w-full lg:w-2/3">
                    <h1 className="text-3xl font-bold text-center sm:text-left mb-8">🛒 Shopping Cart</h1>

                    {cart.items.length === 0 ? (
                        <p className="text-gray-500 text-center py-10 text-lg">Your cart is empty.</p>
                    ) : (
                        <ul className="space-y-6">
                            {cart.items.map((item) => (
                                <li key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-5 border rounded-xl shadow-md bg-white/90 hover:shadow-lg transition duration-300">
                                    
                                    {/* Product Image */}
                                    <Image
                                        src={item.image}
                                        width={70}
                                        height={70}
                                        alt={item.name}
                                        className="rounded-lg object-cover w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] md:w-[150px] md:h-[150px] transition-all"
                                    />
                                    
                                    {/* Product Details */}
                                    <div className="flex-grow px-4 text-center sm:text-left">
                                        <h2 className="text-lg font-semibold">{item.name}</h2>
                                        
                                    </div>

                                    {/* Quantity Buttons */}
                                    <div className="flex items-center gap-4">
                                        <button 
                                            className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                                            onClick={() => dispatch(decrementQuantity(item.id))}
                                        >
                                            <FaMinus size={16} />
                                        </button>
                                        <span className="text-lg font-semibold">{item.quantity}</span>
                                        <button 
                                            className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                                            onClick={() => dispatch(incrementQuantity(item.id))}
                                        >
                                            <FaPlus size={16} />
                                        </button>
                                    </div>

                                    {/* Product Price */}
                                    <h3 className="text-lg font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</h3>

                                    {/* Delete Button */}
                                    <button 
                                        className="text-gray-500 hover:text-red-600 text-xl transition-transform hover:scale-110"
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                    >
                                        <FaTrashAlt size={20} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <button 
                        className="mt-8 text-gray-600 hover:text-gray-800 transition text-lg flex items-center gap-2"
                        onClick={() => router.push("/")}
                    >
                        ← Back to Shop
                    </button>
                </div>

                {/* Order Summary */}
                {cart.items.length > 0 && (
                    <div className="w-full lg:w-1/3 bg-white/90 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-6">📦 Order Summary</h2>

                        <div className="flex justify-between text-lg mb-4">
                            <p className="text-gray-600">Items ({cart.totalQuantity})</p>
                            <p className="font-semibold">${subtotal.toFixed(2)}</p>
                        </div>

                        {/* Shipping Options */}
                        <div className="mb-5">
                            <label className="text-gray-600 block mb-2 font-semibold">🚚 Shipping</label>
                            <select
                                className="w-full p-3 border rounded-lg bg-white shadow-sm transition hover:border-gray-400"
                                value={shippingOption}
                                onChange={(e) => setShippingOption(e.target.value)}
                            >
                                <option>Standard Delivery - $5.00</option>
                                <option>Express Delivery - $10.00</option>
                            </select>
                        </div>

                        {/* Discount Code Input */}
                        <div className="mb-5">
                            <label className="text-gray-600 block mb-2 font-semibold">💰 Discount Code</label>
                            <input
                                type="text"
                                placeholder="Enter your code"
                                className="w-full p-3 border rounded-lg shadow-sm transition hover:border-gray-400"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                            />
                        </div>

                        {/* Total Price */}
                        <div className="flex justify-between font-bold text-xl mb-6">
                            <p>Total Price</p>
                            <p>${totalAmount}</p>
                        </div>

                        {/* Checkout Button */}
                        <button 
                            className="w-full bg-black text-white py-3 rounded-lg font-medium text-lg hover:bg-gray-800 transition-transform hover:scale-105 active:scale-95 focus:ring focus:ring-gray-400"
                        >
                            ✅ Checkout
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Shopping;
