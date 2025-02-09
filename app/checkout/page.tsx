
 

"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import { client } from '@/sanity/lib/client';
import { getCartItems } from '../actions/action';
import Swal from 'sweetalert2';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

export default function BillingPage() {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zipCode: '',
        phone: '',
        email: ''
    });
    const [formErrors, setFormErrors] = useState({
        firstName: false,
        lastName: false,
        address: false,
        city: false,
        zipCode: false,
        phone: false,
        email: false
    });

    useEffect(() => {
        async function fetchCart() {
            const items = await getCartItems();
            if (Array.isArray(items)) {
                setCartItems(items);
            } else {
                setCartItems([]);
            }
        }
        fetchCart();
    }, []);

    const subtotal = (cartItems ?? []).reduce((total, item) => total + (item.price * item.quantity), 0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value
        });
    };

    const validateForm = () => {
        const errors = {
            firstName: !formValues.firstName,
            lastName: !formValues.lastName,
            address: !formValues.address,
            city: !formValues.city,
            zipCode: !formValues.zipCode,
            phone: !formValues.phone,
            email: !formValues.email
        };
        setFormErrors(errors);
        return Object.values(errors).every((error) => !error);
    };

    const handlePlaceOrder = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {

                const validCartItems = cartItems.filter(item => item.id && item.id.trim() !== "");

                if (validCartItems.length === 0) {
                    throw new Error("No valid items in the cart.");
                }

                const orderData = {
                    _type: 'order',
                    firstName: formValues.firstName,
                    lastName: formValues.lastName,
                    address: formValues.address,
                    city: formValues.city,
                    zipCode: formValues.zipCode,
                    phone: formValues.phone,
                    email: formValues.email,
                    cartItems: validCartItems.map(item => ({
                        _type: 'reference',
                        _ref: item.id
                    })),
                    orderDate: new Date().toISOString(),
                    total: subtotal 
                };
                

                localStorage.removeItem("appliedDiscount");

                // Reset the form
                setFormValues({
                    firstName: '',
                    lastName: '',
                    address: '',
                    city: '',
                    zipCode: '',
                    phone: '',
                    email: ''
                });

                await client.create(orderData);
                Swal.fire({
                    title: 'Order placed successfully',
                    text: 'Your order has been placed successfully',
                    icon: 'success'
                });
            } catch (error) {
                Swal.fire({
                    title: 'Failed to place order',
                    icon: 'error'
                });
                console.error('Error creating order in Sanity:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            Swal.fire({
                title: 'Validation Error',
                text: 'Please fill in all the required fields.',
                icon: 'error'
            });
        }
    };

    return (
        <div className={`min-h-screen bg-black text-white`}>

            <div className="mt-10 bg-gray-900 p-4 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 py-3.5">
                        <Link
                            href="/cart"
                            className="text-gray-400 hover:text-white transition-colors text-sm"
                        >
                            Cart
                        </Link>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-white">Checkout</span>
                    </nav>
                </div>
            </div>

            {/* Order Summary and Billing Form */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div className="border border-gray-700 rounded-sm p-4 sm:p-6 space-y-4 w-full bg-gray-900 shadow-sm">
                        <h2 className="text-lg sm:text-xl font-medium mb-4 text-white">Your Order</h2> {/* Changed "Order Summary" to "Your Order" */}
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 py-3 border-b border-gray-700">
                                <div className="w-16 h-16 overflow-hidden rounded">
                                    {item.image &&
                                        <Image
                                            src={urlFor(item.image).url()}
                                            alt={item.name}
                                            width={64}
                                            height={64}
                                            className="object-cover w-full h-full"
                                        />
                                    }
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-white">{item.name}</h3>
                                    <p className="text-xs text-gray-400">Quantity: {item.quantity}</p>
                                </div>
                                <p className="text-sm text-white">${item.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>

                    {/* Billing Form */}
                    <div className="border border-gray-700 rounded-sm p-4 sm:p-6 space-y-4 w-full bg-gray-900 shadow-sm">
                        <h2 className="text-xl sm:text-2xl font-medium mb-6 text-white">Delivery Details</h2> {/* Changed "Billing Information" to "Delivery Details" */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="text-white">First Name</label>
                                    <Input
                                        id="firstName"
                                        placeholder="Enter your first name"
                                        value={formValues.firstName}
                                        onChange={handleInputChange}
                                        aria-invalid={formErrors.firstName ? "true" : "false"}
                                        aria-describedby="firstNameError"
                                        className="bg-gray-800 text-white border-gray-700 focus:border-gray-500"
                                    />
                                    {formErrors.firstName && <p id="firstNameError" className="text-red-500 text-sm mt-1">Please enter your first name</p>}
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="text-white">Last Name</label>
                                    <Input
                                        id="lastName"
                                        placeholder="Enter your last name"
                                        value={formValues.lastName}
                                        onChange={handleInputChange}
                                        aria-invalid={formErrors.lastName ? "true" : "false"}
                                        aria-describedby="lastNameError"
                                        className="bg-gray-800 text-white border-gray-700 focus:border-gray-500"
                                    />
                                    {formErrors.lastName && <p id="lastNameError" className="text-red-500 text-sm mt-1">Please enter your last name</p>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="address" className="text-white">Address</label>
                                <Input
                                    id="address"
                                    placeholder="Enter your address"
                                    value={formValues.address}
                                    onChange={handleInputChange}
                                    aria-invalid={formErrors.address ? "true" : "false"}
                                    aria-describedby="addressError"
                                    className="bg-gray-800 text-white border-gray-700 focus:border-gray-500"
                                />
                                {formErrors.address && <p id="addressError" className="text-red-500 text-sm mt-1">Please enter your address</p>}
                            </div>
                            <div>
                                <label htmlFor="city" className="text-white">City</label>
                                <Input
                                    id="city"
                                    placeholder="Enter your city"
                                    value={formValues.city}
                                    onChange={handleInputChange}
                                    aria-invalid={formErrors.city ? "true" : "false"}
                                    aria-describedby="cityError"
                                    className="bg-gray-800 text-white border-gray-700 focus:border-gray-500"
                                />
                                {formErrors.city && <p id="cityError" className="text-red-500 text-sm mt-1">Please enter your city</p>}
                            </div>
                            <div>
                                <label htmlFor="zipCode" className="text-white">Zip Code</label>
                                <Input
                                    id="zipCode"
                                    placeholder="Enter your zip code"
                                    value={formValues.zipCode}
                                    onChange={handleInputChange}
                                    aria-invalid={formErrors.zipCode ? "true" : "false"}
                                    aria-describedby="zipCodeError"
                                    className="bg-gray-800 text-white border-gray-700 focus:border-gray-500"
                                />
                                {formErrors.zipCode && <p id="zipCodeError" className="text-red-500 text-sm mt-1">Please enter your zip code</p>}
                            </div>
                            <div>
                                <label htmlFor="phone" className="text-white">Phone Number</label>
                                <Input
                                    id="phone"
                                    placeholder="Enter your phone number"
                                    value={formValues.phone}
                                    onChange={handleInputChange}
                                    aria-invalid={formErrors.phone ? "true" : "false"}
                                    aria-describedby="phoneError"
                                    className="bg-gray-800 text-white border-gray-700 focus:border-gray-500"
                                />
                                {formErrors.phone && <p id="phoneError" className="text-red-500 text-sm mt-1">Please enter your phone number</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="text-white">Email</label>
                                <Input
                                    id="email"
                                    placeholder="Enter your email address"
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                    aria-invalid={formErrors.email ? "true" : "false"}
                                    aria-describedby="emailError"
                                    className="bg-gray-800 text-white border-gray-700 focus:border-gray-500"
                                />
                                {formErrors.email && <p id="emailError" className="text-red-500 text-sm mt-1">Please enter your email address</p>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 justify-between py-3 text-sm sm:text-base">
                            <div className="flex justify-between py-3 border-b border-gray-700 text-sm sm:text-base">
                                <span className="text-white">Subtotal:</span>
                                <span className="text-white">${subtotal}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-gray-700 text-sm sm:text-base">
                                <span className="text-white">Delivery Charges:</span>
                                <span className="text-gray-400">Free</span>
                            </div>
                        </div>
                        <Button
                            className="w-full h-10 sm:h-12 bg-green-600 hover:bg-green-700 rounded-lg mt-4 text-sm sm:text-base text-white"
                            onClick={handlePlaceOrder}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Placing Order...' : 'Confirm Order'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}