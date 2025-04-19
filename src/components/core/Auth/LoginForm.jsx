import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../../services/operations/authAPI"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-8 flex w-full flex-col gap-y-6 font-inter"
    >
      <label className="w-full">
        <p className="mb-2 text-[1rem] leading-[1.5rem] text-richblack-5 font-semibold tracking-tight">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter your email"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-lg bg-richblack-800 p-3 text-richblack-5 text-base focus:outline-yellow-50 transition-all duration-200 border border-richblack-700 focus:border-yellow-50 placeholder:text-richblack-400"
        />
      </label>
      <label className="relative">
        <p className="mb-2 text-[1rem] leading-[1.5rem] text-richblack-5 font-semibold tracking-tight">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter your password"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-lg bg-richblack-800 p-3 pr-12 text-richblack-5 text-base focus:outline-yellow-50 transition-all duration-200 border border-richblack-700 focus:border-yellow-50 placeholder:text-richblack-400"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[44px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-2 ml-auto max-w-max text-xs text-blue-100 hover:underline">
            Forgot your password?
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-8 rounded-lg bg-yellow-50 py-3 px-6 font-bold text-richblack-900 text-lg shadow transition-all duration-200 hover:scale-95 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-50"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm