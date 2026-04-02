import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import Home from "../pages/Home"
import Withdrawal from "../components/Withdrawal"
import Profile from "../components/Profile"
import Deposit from "../components/Deposit"
import HomePage from "../components/HomePage"
function MainRoutes() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/homepage" element={<HomePage/>} />
          <Route path="/deposit" element={<Deposit/>} />
          <Route path="/withdrawal" element={<Withdrawal/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default MainRoutes
