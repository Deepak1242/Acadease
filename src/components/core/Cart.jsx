import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
  const { cart, total, totalItems } = useSelector((state) => state.cart)

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl font-bold">Your Cart</h2>
      {cart.length > 0 ? (
        <>
          <div className="flex flex-col gap-2">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="text-lg font-medium">{item.courseName}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="text-lg font-medium">₹{item.price}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center p-4 border-t">
            <h3 className="text-xl font-bold">Total</h3>
            <p className="text-xl font-bold">₹{total}</p>
          </div>
        </>
      ) : (
        <p className="text-gray-600">Your cart is empty</p>
      )}
    </div>
  )
}

export default Cart