import './App.css';
import Footer from './component/Footer';
import Header from './component/Header';
import './css/main.css'
import AppRoutes from './routes';
import {BrowserRouter as Router} from "react-router-dom"
import { FlightContextProvider } from './store/flight-context';

function App() {
  
  return (
   <Router>
    <Header/>
    <FlightContextProvider>
    <AppRoutes/>
    </FlightContextProvider>
    <Footer/>
   </Router>
     )
}

export default App;
