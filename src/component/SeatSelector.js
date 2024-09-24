import React, { useContext, useState } from 'react';
import { GiSteeringWheel } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { FlightContext } from '../store/flight-context';


function SeatSelector() {
    const {flightCtx, setFlight} = useContext(FlightContext);
    const rows = 15;
    const columns = 6; // Assuming A-F columns
    const seatLimit = flightCtx.listOfPassengers.length;
    const [selectedSeats, setSelectedSeats] = useState([]);
    const navigate = useNavigate();

    const handleSeatClick = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(prevState =>
                prevState.filter(s => s !== seat)
            );
        } else if (selectedSeats.length < seatLimit) {
            setSelectedSeats(prevState => [...prevState, seat]);
        }
    };

    function handleConfirm(){
        setFlight(prev => ({
            ...prev,
            selectedSeats: selectedSeats,
        }));
        navigate("/booking");
    }

    const renderSeats = () => {
        const seatArray = [];
        for (let row = 1; row <= rows; row++) {
            const rowSeats = [];
            for (let col = 1; col <= columns; col++) {
                const seat = `${String.fromCharCode(64 + row)}${col}`;
                const isSelected = selectedSeats.includes(seat);
                rowSeats.push(
                    <div
                        key={seat}
                        className={`w-10 h-10 flex  items-center transition justify-center rounded ${isSelected ? 'bg-purple-500 border-2 border-purple-200 text-purple-950 font-semibold' : 'bg-gray-900 text-gray-200'
                            } cursor-pointer`}
                        onClick={() => handleSeatClick(seat)}
                    >
                        {seat}
                    </div>
                );
            }
            seatArray.push(
                <div key={row} className="flex justify-center space-x-2 mb-2">
                    {rowSeats.slice(0, 3)}
                    <div className="w-4"></div>
                    {rowSeats.slice(3)}
                </div>
            );
        }
        return seatArray;
    };

    return (
        <div className="flex flex-col items-center p-8 text-gray-300 bg-gradient-to-r from-black from-5% via-purple-600 via-30% to-black to-95% bg-cover bg-center">
            <h2 className="text-2xl font-bold mb-4">Select Your Seats</h2>



            <div className="flex flex-col items-center space-y-2">
                <div className='p-4 align-self-end'><GiSteeringWheel color='white' size={24} /></div>
                {renderSeats()}
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-semibold ">Selected Seats:</h3>
                <p>{selectedSeats.join(', ') || 'None'}</p>
            </div>
            
                <p className="text-red-500 mt-2">You can select up to {seatLimit} seats.</p>
                <div className='grid'>
              <button
                disabled={selectedSeats.length < seatLimit}
                className="inline-block justify-self-end m-4 shrink-0 rounded-md no-underline border-2 border-purple-500 bg-black px-4 py-2 text-lg font-medium text-white  transition hover:border-purple-100 focus:outline-none active:text-purple-500"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
            
        </div>
    );
}

export default SeatSelector;
