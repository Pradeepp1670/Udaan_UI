import { useEffect, useState } from "react";
import { cities } from "../service/CityService";
import { FlightList } from "../service/FlightService";
import { useNavigate } from "react-router-dom";
import { AiOutlineSwap } from "react-icons/ai";


function Search() {


    const [city, setCity] = useState([]);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [dateOfDep, setDateOfDep] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {

        cities().then((response) => {
            setCity(response.data);
            console.log(response.data)
        }).catch(error => {
            console.error(error);
        })

    }, [])



    const handleDate = (event) => {
        const selectedDate = event.target.value;
        const currentDate = new Date();
        const selectedDateObj = new Date(selectedDate);
        setDateOfDep(selectedDate);

        // Check if selected date is valid (not in the past)
        if (selectedDateObj.getDate() < currentDate.getDate()) {
            alert('Please select a future date.');
            setIsDisabled(true);
            setError(true);
        } else {
            setIsDisabled(false);
            setError(false);
        }

    }

    const [flights, setFlights] = useState([])

    useEffect(() => {
        if(source && destination && dateOfDep){
        FlightList(source,destination,dateOfDep).then((response) => {
            setFlights(response.data);
            console.log(response.data)
        }).catch(error => {
            console.error(error);
        })}

    }, [source,destination, dateOfDep])

   

    const navigate = useNavigate();
    const handleclick = () =>{
        navigate("/flights", {state:{flights,dateOfDep}})
    }

    function swapCities(){
        const temp = source;
        setSource(destination);
        setDestination(temp);
    }

    return (
<>
            <div className="bg-cover bg-center min-h-screen bg-[url('../assets/flight-bg.jpg')] items-center justify-center p-20">
            <div className=" flex bg-gradient-to-r from-black from-5% via-purple-700/85 via-50% to-black/20 to-95% space-x-2 text-base items-center justify-center p-8">

                <div style={{ flex: 1 / 5, marginRight: '10px' }}>
                    <label htmlFor="Source" className="block text-md font-medium text-white"> Source </label>

                    <div className="relative mt-1.5">
                        <input
                            type="text"
                            list="SourceList"
                            value={source}
                            id="Source"
                            onChange={(e)=>(
                                setSource(e.target.value)
                            )}
                            className="rounded-lg pe-10 h-12 border-2"
                            placeholder="Please select"
                        />

                        <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5 text-gray-800"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                                />
                            </svg>
                        </span>
                    </div>


                    <datalist name="Source" id="SourceList">
                        {city.map(ct => (
                            <option key={ct.id} value={ct.city}>{ct.cityCode}</option>
                        ))}
                    </datalist>


                </div>

                <button className="mt-4 mx-3" onClick={swapCities}>
                <AiOutlineSwap color="white" size={26} />
                </button>

                <div style={{ flex: 1 / 5 }}>
                    <label htmlFor="Destination" className="block text-md font-medium text-white"> Destination </label>

                    <div className="relative mt-1.5">
                        <input
                            type="text"
                            list="DestinationList"
                            id="Destination"
                            value={destination}
                            onChange={(e)=>(
                                setDestination(e.target.value)
                            )}
                            
                            className="rounded-lg pe-10 h-12 border-2"
                            placeholder="Please select"
                        />

                        <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5 text-gray-800"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
                <datalist name="Destination" id="DestinationList">
                        {city.map(ct => (
                            <option key={ct.id} value={ct.city}>{ct.cityCode}</option>
                        ))}
                    </datalist>
                <div>
                <div style={{ marginLeft: '25px'}}>
                    <label className="block text-md font-medium text-white" >Date</label>
                    <input
                        type="date"
                        value={dateOfDep}
                        onChange={handleDate}
                        className={`mt-1.5 w-full rounded-lg text-gray-700 sm:text-md h-12  ${error ? 'border-3 border-red-500 outline-red-500' : 'outline-black'}`}
                        placeholder="date"
                    />
                    
                </div>
                </div>
                <div style={{ marginLeft: '50px' }}>
                    <button onClick={handleclick} disabled={isDisabled}

                        className="w-24 h-12 text-center bg-white text-black font-bold mt-4 rounded-full focus:outline-none focus:shadow-outline"
                    >
                        Search
                    </button>
                </div>
                

            </div>
            </div>
            
</>
    );
};


export default Search