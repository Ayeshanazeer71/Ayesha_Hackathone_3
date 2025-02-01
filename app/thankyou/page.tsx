"use client";
import Link from 'next/link'
import { Button } from '@/app/components/ui/button'
import { motion } from 'framer-motion'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
        }}
      >
        <motion.h1
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Thank You for Your Order!
        </motion.h1>
        <motion.p
          className="text-gray-600 mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          We've received your order and will process it shortly. You'll receive a confirmation email with your order details.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/" passHref>
            <Button className="w-full">Continue Shopping</Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}