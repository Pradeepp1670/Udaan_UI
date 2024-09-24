import { Route, Routes} from "react-router-dom"
import Search from "./component/Search"
import './css/main.css'
import Flights from "./component/Flights"
import Book from "./component/Book"
import AddFlight from "./component/AddFlight"
import Login from "./component/Login"
import Register from "./component/Register"
import SeatSelector from "./component/SeatSelector"
import Booking from "./component/Booking"
import Payment from "./component/Payment"
import Final from "./component/Final"
import Logout from "./component/logout"


const AppRoutes = () => {

    return(
        <Routes>
            <Route path="/" element={<Search/>}/>
            
            <Route path="/flights" element={<Flights/>}/>


            <Route path="/book" element={<Book/>}/>

            <Route path="/addFlight" element={<AddFlight/>}/>

            <Route path="/login" element={<Login/>}/>

            <Route path="/seat" element={<SeatSelector/>}/>

            <Route path="/booking" element={<Booking/>}/>

            <Route path="/register" element={<Register/>}/>

            <Route path="/logout" element={<Logout/>}/>

            <Route path="/payment" element={<Payment/>}/>

            <Route path="/final" element={<Final/>}/>

        </Routes>
    )
}

export default AppRoutes