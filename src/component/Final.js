import { IoIosAirplane } from "react-icons/io"
import { FcApproval } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FlightContext } from "../store/flight-context";


function Final() {

    const navigate = useNavigate();

    const {flightCtx} = useContext(FlightContext);
    console.log(flightCtx);
    const combined =  flightCtx.listOfPassengers.map((passenger, index) => ({
        ...passenger,
        seat: flightCtx.selectedSeats[index],
      }));
    console.log(flightCtx);
    return (

        <div className="bg-cover bg-center min-h-screen bg-[url('../assets/flight-bg.jpg')]">

            <div className="grid text-white justify-center p-4">
                <div className="p-4 mb-4 flex justify-self-center bg-purple-500/30 rounded-xl">
                    <h1>Booking Confirmed </h1>
                    <div className="p-2">
                    <FcApproval size={35}/>
                    </div>
                </div>
                <div>
                    <div className="bg-[url('../assets/UDAAN.jpg')] bg-cover p-10 flex w-[56rem] h-[21rem] gap-4 mx-4">
                        <div className="w-1/4 pt-4 text-black">
                            <div className="flex gap-3">
                                <div className="text-sm">
                                    <p className="m-0 text-purple-800 font-semibold">FROM</p>
                                    <h3 className="m-0 font-bold">{flightCtx.flight.source.cityCode}</h3>
                                    <h6 className="m-0 text-orange-600">{flightCtx.flight.source.city}</h6>
                                    <p className="m-0 text-xs">{flightCtx.dateOfDep}</p>
                                    <p className="m-0">{flightCtx.flight.deppTime}</p>
                                </div>
                                <div className='pt-6'><IoIosAirplane size={20} /></div>
                                <div className="text-sm">
                                    <p className="m-0 text-purple-800 font-semibold">TO</p>
                                    <h3 className="m-0 font-bold">{flightCtx.flight.destination.cityCode}</h3>
                                    <h6 className="m-0 text-orange-600">{flightCtx.flight.destination.city}</h6>
                                    <p className="m-0 text-xs">{flightCtx.dateOfDep}</p>
                                    <p className="m-0">{flightCtx.flight.arrTime}</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div>
                                    <div className="text-purple-800 font-semibold">
                                        Flight
                                    </div>
                                    <div className="font-bold">
                                        {flightCtx.flight.company.companyName} - {flightCtx.flight.flightName}{flightCtx.flight.flightNumber}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-3/4 text-black pr-10">

                        <h4 className="text-purple-800 mx-2">Passanger Details</h4>
                        <h6 className="text-purple-800 mx-2 mb-1">Booking ID - <span className="text-black">{flightCtx.bookingDetails.pnr}</span></h6>

                        <div className=" h-5/6 bg-purple-400/30 rounded-lg p-4 items-center flex">
                        
                            <table className="w-full pb-8 gap-10">
                                <tr className="font-semibold text-purple-800">
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Seat</th>
                                    <th>Status</th>
                                </tr>
                                {combined.map( (passenger,index) => (
                             <tr key={index} className="font-bold">                                    
                             <td>{passenger.name}</td>
                             <td>{passenger.age}</td>
                             <td>{passenger.gender}</td>
                             <td>{passenger.seat}</td>
                             <td className="text-green-600">Confirm</td>
                         </tr>
                        ))}
                               
                                                        
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="place-self-end m-10">
            <button 
          className="inline-block shrink-0 rounded-md no-underline border-2 border-purple-600 bg-purple-600 px-4 py-2 text-md font-medium text-white transition hover:bg-transparent hover:text-purple-600 hover:border-purple-600 focus:outline-none active:text-purple-500"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
            </div>
            </div>
            
        </div>
    )
}

export default Final