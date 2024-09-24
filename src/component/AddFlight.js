import { useEffect, useState } from "react";
import { cities } from "../service/CityService";
import { companies } from "../service/FlightCompanyService";
import { AddFlightService } from "../service/FlightService";
import { useNavigate } from "react-router-dom";


function AddFlight() {
    const [city, setCity] = useState([]);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [companyList, setCompanyList] = useState([]);
    const [company, setCompany] = useState('');
    const [arrTime, setArrTime] = useState('');
    const [deppTime, setDeppTime] = useState('');
    const days =[];
    const [price, setPrice] = useState('');
    const [seats, setSeats] = useState('');

    const navigate = useNavigate();
    const flight = {
        seats: seats,
        deppTime: deppTime,
        arrTime: arrTime,
        days:days,
        price:price,
        source: source,
        destination: destination,
        company:company
    }


    useEffect(() => {

        cities().then((response) => {
            setCity(response.data);
            console.log(response.data)
        }).catch(error => {
            console.error(error);
        })

        companies().then((response) => {
            setCompanyList(response.data);
            console.log(response.data)
        }).catch(error => {
            console.error(error);
        })

    }, [])

    function handleDays(day){
        if(days.includes(day)){
            let index = days.indexOf(day);
            days.splice(index,1);
        }
        else{
            days.push(day);
        }
    }

    function handleAddFlight(){
        AddFlightService(flight).then(response => {
            console.log(response.data);
            alert(response.data);
            navigate("/");
        }).catch(error => {
            console.error(error);
            alert(error.message);
        })
        

    }
    console.log(days);

    return (
        <div className='justify-center flex bg-gradient-to-r from-black from-5% via-purple-700 via-30% to-black to-95% bg-cover bg-center min-h-screen p-8 text-white'>


            <div className="w-max h-max rounded-lg bg-gray-900 p-12 shadow-lg shadow-white grid  ">
                <div className="justify-self-center text-3xl mb-5 font-semibold border-2 border-purple-600 p-2 rounded-lg">
                    Flight Details
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-md font-medium text-white"> Company </label>

                        <div className="relative mt-1.5">
                            <input
                                type="text"
                                list="CompanyList"
                                id="Company"
                                onChange={(e) => (
                                    setCompany(e.target.value)
                                )}
                                className="w-full rounded-lg bg-transparent border border-purple-200 p-3 text-sm"
                                placeholder="Please select"
                            />
                        </div>


                        <datalist name="Company" id="CompanyList">
                            {companyList.map(cm => (
                                <option key={cm.id} value={cm.companyName}>{cm.address}</option>
                            ))}
                        </datalist>


                    </div>
                    <div className="flex gap-4 w-full justify-center">

                        <div>
                        <label className="block text-md font-medium text-white"> Departure Time </label>
                        <div className="relative mt-2">
                                <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input type="time" id="time" className="w-48 rounded-lg bg-transparent border border-purple-200 p-3 text-sm" value={deppTime} onChange={(e) => setDeppTime(e.target.value)} required />
                            </div>
                        </div>
                        <div >
                        <label className="block text-md font-medium text-white"> Arrival Time </label>
                        <div className="relative mt-2">
                                <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input type="time" id="time" className="w-48 rounded-lg bg-transparent border border-purple-200 p-3 text-sm" value={arrTime} onChange={(e) => setArrTime(e.target.value)} required />
                            </div>
                        </div>

                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-md font-medium text-white"> Source </label>

                            <div className="relative mt-1.5">
                                <input
                                    type="text"
                                    list="SourceList"
                                    id="Source"
                                    onChange={(e) => (
                                        setSource(e.target.value)
                                    )}
                                    className="w-full rounded-lg bg-transparent border border-purple-200 p-3 text-sm"
                                    placeholder="Please select"
                                />
                            </div>


                            <datalist name="Source" id="SourceList">
                                {city.map(ct => (
                                    <option key={ct.id} value={ct.city}>{ct.cityCode}</option>
                                ))}
                            </datalist>


                        </div>
                        <div>
                            <label className="block text-md font-medium text-white"> Destination </label>

                            <div className="relative mt-1.5">
                                <input
                                    type="text"
                                    list="DestinationList"
                                    id="Destination"
                                    onChange={(e) => (
                                        setDestination(e.target.value)
                                    )}
                                    className="w-full rounded-lg bg-transparent border border-purple-200 p-3 text-sm"
                                    placeholder="Please select"
                                />
                            </div>


                            <datalist name="Destination" id="DestinationList">
                                {city.map(ct => (
                                    <option value={ct.city}>{ct.cityCode}</option>
                                ))}
                            </datalist>

                        </div>
                    </div>
                    <div>
                    <label className="block text-md font-medium text-white"> Days </label>

                    
                    <div className="flex gap-3 justify-center font-semibold mt-2">
                        
                        <div>
                        <label className="border-2 rounded-lg has-[:checked]:border-purple-600 has-[:checked]:bg-black has-[:checked]:text-purple-600 px-2 py-1">
                            <input type="checkbox" 
                            hidden
                            value={"Sunday"}
                            onChange={(e) => handleDays(e.target.value)}></input>
                            Sun</label>
                        </div>
                        <div>
                        <label className="border-2 rounded-lg has-[:checked]:border-purple-600 has-[:checked]:bg-black has-[:checked]:text-purple-600 px-2 py-1">
                            <input type="checkbox" 
                            hidden
                            value={"Monday"}
                            onChange={(e) => handleDays(e.target.value)}></input>
                            Mon</label>
                        </div>
                        <div>
                        <label className="border-2 rounded-lg has-[:checked]:border-purple-600 has-[:checked]:bg-black has-[:checked]:text-purple-600 px-2 py-1">
                            <input type="checkbox" 
                            hidden
                            value={"Tuesday"}
                            onChange={(e) => handleDays(e.target.value)}></input>
                            Tue</label>
                        </div>
                        <div>
                        <label className="border-2 rounded-lg has-[:checked]:border-purple-600 has-[:checked]:bg-black has-[:checked]:text-purple-600 px-2 py-1">
                            <input type="checkbox" 
                            hidden
                            value={"Wednesday"}
                            onChange={(e) => handleDays(e.target.value)}></input>
                            Wed</label>
                        </div>
                        <div>
                        <label className="border-2 rounded-lg has-[:checked]:border-purple-600 has-[:checked]:bg-black has-[:checked]:text-purple-600 px-2 py-1">
                            <input type="checkbox" 
                            hidden
                            value={"Thursday"}
                            onChange={(e) => handleDays(e.target.value)}></input>
                            Thu</label>
                        </div>
                        <div>
                        <label className="border-2 rounded-lg has-[:checked]:border-purple-600 has-[:checked]:bg-black has-[:checked]:text-purple-600 px-2 py-1">
                            <input type="checkbox" 
                            hidden
                            value={"Friday"}
                            onChange={(e) => handleDays(e.target.value)}></input>
                            Fri</label>
                        </div>
                        <div>
                        <label className="border-2 rounded-lg has-[:checked]:border-purple-600 has-[:checked]:bg-black has-[:checked]:text-purple-600 px-2 py-1">
                            <input type="checkbox" 
                            hidden
                            value={"Saturday"}
                            onChange={(e) => handleDays(e.target.value)}></input>
                            Sat</label>
                        </div>
                        
                    </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-md font-medium text-white"> Price </label>

                            <div className="relative mt-1.5">
                                <input
                                    type="text"
                                    inputMode="numeric"      
                                    className="w-full rounded-lg bg-transparent border border-purple-200 p-3 text-sm"
                                    placeholder="Enter Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-md font-medium text-white"> Seats </label>

                            <div className="relative mt-1.5">
                                <input
                                    type="text" 
                                    inputMode="numeric"                                    
                                    className="w-full rounded-lg bg-transparent border border-purple-200 p-3 text-sm"
                                    placeholder="Enter no. of Seats"
                                    value={seats}
                                    onChange={(e) => setSeats(e.target.value)}
                                />
                            </div>


                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="inline-block w-full rounded-lg bg-black px-5 py-3 font-semibold text hover:text-purple-600 text-lg sm:w-auto border-2 transition hover:border-purple-600"
                            onClick={handleAddFlight}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddFlight