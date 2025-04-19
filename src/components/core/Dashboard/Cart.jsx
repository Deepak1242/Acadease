import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function Cart() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  return (
    <div className="text-3xl text-richblack-50">Cart</div>
  )
}