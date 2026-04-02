import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../api';



function HomePage() {
      const [balance, setBalance] = useState(0);

            const fetchBalance = async () => {
        try {
          const res = await API.get("/balance");
          console.log(res.data)
            setBalance(res.data?.balance || 0);
          
        } catch (err) {
          console.log("error found when fetching" , err)
        }
      }

      useEffect(()=>{   
        fetchBalance()
      },[])
  return (
  <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 flex flex-col items-center justify-center px-6">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-green-200">

        <h1 className="text-3xl font-bold mb-4 text-green-700 text-center">
          Welcome to the Banking App!
        </h1>

        <p className="text-lg mb-6 text-center text-gray-700">
          Your current balance is:
        </p>

        <div className="text-center text-4xl font-bold text-green-600 mb-8">
          ${balance}
        </div>

        <div className="flex flex-col gap-3">

          <Link
            to="/deposit"
            className="bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-xl font-semibold transition"
          >
            Make a Deposit
          </Link>

          <Link
            to="/profile"
            className="bg-green-400 hover:bg-green-500 text-white text-center py-3 rounded-xl font-semibold transition"
          >
            View Profile
          </Link>

          <Link
            to="/withdrawal"
            className="bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-xl font-semibold transition"
          >
            Make Withdrawal
          </Link>

        </div>

      </div>
    </div>
  )
}

export default HomePage
