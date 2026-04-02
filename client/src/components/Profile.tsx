import { BiUser } from "react-icons/bi"
import API from "../api"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Profile() {

  const [userEmail , setUserEmail] = useState("")
  const [balance , setBalance] = useState(0)

  useEffect(()=>{
    getProfile()
  },[])
  const getProfile = async ()=>{
    try {
        const res = await API.get("/profile")
        setUserEmail(res.data.data.email)
        setBalance(res.data.data.balance)
    } catch (err : any) {
        console.log(err)
        if(err.response.status === 401){
 localStorage.removeItem("token")        }
    }   
  }
   
  return (
   <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-green-200 flex flex-col items-center">

        <BiUser className="text-8xl text-green-600 mb-4" />

        <h1 className="text-green-800 font-bold text-2xl text-center mb-6">
          Welcome to Your Profile
        </h1>

        <div className="w-full text-center space-y-2">

          <p className="text-gray-500">Email</p>
          <p className="text-gray-800 text-lg font-semibold">{userEmail}</p>

          <div className="my-4 border-t border-green-100"></div>

          <p className="text-gray-500">Your Balance</p>
          <p className="text-2xl font-bold text-green-600">${balance}</p>

        </div>

        <p className="text-gray-500 mt-6">Settings</p>

        <Link
          to="/Homepage"
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Go Back Home
        </Link>
        <Link
          to="/"
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          LogOut
        </Link>

      </div>
    </div>
  )
}

export default Profile