import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      try {
        const course = action.payload
        const index = state.cart.findIndex((item) => item._id === course._id)

        if (index >= 0) {
          toast.error("Course already in cart")
          return
        }
        
        state.cart.push({...course, quantity: 1})
        state.totalItems++
        state.total += course.price
        
        localStorage.setItem("cart", JSON.stringify(state.cart))
        localStorage.setItem("total", JSON.stringify(state.total))
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
        
        toast.success("Course added to cart")
      } catch (error) {
        console.error("Error adding to cart:", error)
        toast.error("Failed to add course to cart")
      }
    },
    removeFromCart: (state, action) => {
      try {
        const courseId = action.payload
        const index = state.cart.findIndex((item) => item._id === courseId)

        if (index >= 0) {
          state.totalItems -= state.cart[index].quantity
          state.total -= state.cart[index].price * state.cart[index].quantity
          state.cart.splice(index, 1)
          
          localStorage.setItem("cart", JSON.stringify(state.cart))
          localStorage.setItem("total", JSON.stringify(state.total))
          localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
          
          toast.success("Course removed from cart")
        }
      } catch (error) {
        console.error("Error removing from cart:", error)
        toast.error("Failed to remove course from cart")
      }
    },
    updateQuantity: (state, action) => {
      try {
        const { courseId, newQuantity } = action.payload
        const index = state.cart.findIndex((item) => item._id === courseId)
        
        if (index >= 0 && newQuantity > 0) {
          const oldQuantity = state.cart[index].quantity
          const price = state.cart[index].price
          
          state.totalItems += (newQuantity - oldQuantity)
          state.total += price * (newQuantity - oldQuantity)
          state.cart[index].quantity = newQuantity
          
          localStorage.setItem("cart", JSON.stringify(state.cart))
          localStorage.setItem("total", JSON.stringify(state.total))
          localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
        }
      } catch (error) {
        console.error("Error updating quantity:", error)
        toast.error("Failed to update course quantity")
      }
    },
    resetCart: (state) => {
      try {
        state.cart = []
        state.total = 0
        state.totalItems = 0
        
        localStorage.removeItem("cart")
        localStorage.removeItem("total")
        localStorage.removeItem("totalItems")
      } catch (error) {
        console.error("Error resetting cart:", error)
        toast.error("Failed to reset cart")
      }
    },
  },
})

export const { addToCart, removeFromCart, resetCart, updateQuantity } = cartSlice.actions

export default cartSlice.reducer