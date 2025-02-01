"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";

// TypeScript interfaces
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Form validation schema
type CheckoutFormValues = z.infer<typeof formSchema>;
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "Zip code must be at least 5 characters"),
});

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subtotal, setSubtotal] = useState<number>(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart: CartItem[] = JSON.parse(storedCart);
      setCartItems(parsedCart);
      setSubtotal(
        parsedCart.reduce((sum, item) => sum + item.price * item.quantity, 0)
      );
    }
  }, []);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormValues> = (values) => {
    setIsLoading(true);
    try {
      const orderData = {
        customer: values,
        items: cartItems,
        totalAmount: subtotal,
      };

      // Simulate order placement
      console.log("Order placed successfully", orderData);

      localStorage.removeItem("cart");
      toast.success("Order placed successfully!");
      
      // Redirect to the thank-you page
      window.location.href = "/thankyou";
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("An error occurred during checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 sm:px-8 lg:px-10">
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-10">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shipping Information</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {(Object.keys(formSchema.shape) as Array<keyof CheckoutFormValues>).map((field) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={field}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={field.name}
                          {...field}
                          className="border-gray-300 focus:ring-black focus:border-black"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </Form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-4">
                <span className="text-gray-700">
                  {item.name} (x{item.quantity})
                </span>
                <span className="text-gray-900 font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t border-gray-300 mt-6 pt-6">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
