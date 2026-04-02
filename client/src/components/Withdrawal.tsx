import { useState } from "react";
import API from "../api";
import fetchBalance from "./Auth"
import { useNavigate } from "react-router-dom";

function Withdrawal() {
        const navigate = useNavigate();

  const [amount, setAmount] = useState(0);
       const handleAddWithdrawal = async () => {
        try {
          await API.post("/withdrawal" , {
            amount : amount
          })
        setAmount(0); 
        fetchBalance
        navigate("/homepage")
        } catch (err) {
          console.log("error found when adding withdrawal" , err)
        }
      }
  return (
   <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-green-200">

        <h1 className="text-2xl font-bold text-green-700 text-center mb-6">
          Withdrawal Page
        </h1>

        <input
          type="text"
          className="w-full border border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-white text-gray-800 mb-6 p-3 rounded-xl h-12 outline-none"
          placeholder="Enter amount"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
        />

        <button
          onClick={handleAddWithdrawal}
          className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl font-semibold transition"
        >
          Withdraw
        </button>

      </div>
    </div>
  )
}

  

export default Withdrawal
