import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FlightContext } from "../store/flight-context";
import { isLoggedIn } from "../service/AuthService";

const Flights = () => {

    const location = useLocation();
    const {flights, dateOfDep} = location.state || {} ;
    console.log(flights);
    let time;

    function getTimeDifference(time1, time2) {
        // Parse time strings and create Date objects
        const baseDate = '1970-01-01 ';
        const date1 = new Date(baseDate + time1);
        let date2 = new Date(baseDate + time2);
    
        // If date2 is earlier than date1, assume date2 is on the next day
        if (date2 < date1) {
            date2 = new Date(date2.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours
        }
    
        // Calculate the difference in milliseconds
        const diffInMs = date2 - date1;
    
        // Convert milliseconds to hours, minutes, and seconds
        const diffInSeconds = diffInMs / 1000;
        const hours = Math.floor(diffInSeconds / 3600);
        const minutes = Math.floor((diffInSeconds % 3600) / 60);
    
        time = hours+ "h"+minutes + "m"
        return time;
    }
    const {setFlight} = useContext(FlightContext);
    const navigate = useNavigate();
    function handleBook(flight){
        setFlight({flight, dateOfDep, time});
        const isAuth = isLoggedIn();
        if(isAuth){
            navigate("/book");
        }
        else{
            sessionStorage.setItem('redirectAfterLogin', '/book'); // Store current path
            navigate('/login');
        }
    }

    function handleAddFlight(){
        navigate("/addFlight");
    }

    return(
        <>
        <div className='justify-center flex bg-gradient-to-r from-black from-5% via-purple-700 via-30% to-black to-95% bg-cover bg-center min-h-screen p-8'>
        {flights.length>0 ? (
            
            <div className=" grid p-4 h-fit">
                <div className="justify-self-end text-white px-6">
                <button
                    type='submit'
                    onClick={handleAddFlight}
                    className="inline-block w-full rounded-lg bg-gray-950 border transition hover:bg-purple-950 px-3 py-2 font-medium sm:w-auto"
                  >
                    + Add Flight
                  </button>
                </div>
           {flights.map((flight) => (
            
           
                        <div key={flight.id} className="bg-gray-900 rounded-lg m-4 hover:scale-105 transition">
                            <div className="flex space-x-24 p-4 justify-center items-center text-center text-white">
                                <div className="text-center">
                                    <img alt="" className="size-16" src={flight.company.logo}></img>
                                    <p className=""> {flight.company.companyName}</p>
                                    <p className="">{flight.flightName}{flight.flightNumber}</p>
                                </div>

                                <div className="" >
                                    <h3 className="">{flight.source.city}</h3>
                                    <p className=""> {flight.deppTime.slice(0,5)}</p>
                                </div>

                                <div>
                                    <h2 className="sr-only">Steps</h2>

                                    <div>
                                        <p className="text-s font-medium text-gray-400">{getTimeDifference(flight.deppTime, flight.arrTime)} </p>
                                        <div className="mt-4 overflow-hidden rounded-full bg-gray-100">
                                            <div className="h-1 w-1/1 rounded-full bg-purple-700"></div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="" >{flight.destination.city}</h3>
                                    <p className=""> {flight.arrTime.slice(0,5)}</p>
                                </div>

                                <div>
                                    <h3 className="">₹{flight.price}</h3>
                                    <button onClick={() => handleBook(flight)}
                                        className="group relative inline-flex items-center overflow-hidden rounded bg-purple-700 px-6 py-2 text-white focus:outline-none focus:ring active:bg-purple-500"
                                        href="#"
                                    >
                                        <span className="absolute -end-full transition-all group-hover:end-4">
                                            <svg
                                                className="size-5 rtl:rotate-180"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </span>

                                        <span className="text-sm font-medium transition-all group-hover:me-4"> Book Now </span>
                                    </button>

                                </div>
                            </div>

                        </div>
                    )

                    )
                }
</div>
        
        ): (
            <div className="flex h-96 flex-col">
          
            <div className="flex flex-1 items-center justify-center">
              <div className="mx-auto max-w-xl px-4 py-8 text-center  text-white">
                <h1 className="text-2xl font-bold tracking-tight sm:text-2xl">
                  We can't find any flights that you've searched for.
                </h1>
          
                <p className="mt-4 text-gray-300">
                  Try searching again, or return home to start from the beginning.
                </p>
          
                <a
                  href="/"
                  className="mt-6 no-underline inline-block rounded bg-black px-5 py-3 text-sm font-medium text-white hover:scale-105 transition focus:outline-none focus:ring"
                >
                  Go Back Home
                </a>
              </div>
            </div>
          </div>
    ) }
</div>
        </>
    );


}

export default Flights