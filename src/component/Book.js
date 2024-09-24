import React, { useContext, useEffect, useRef, useState } from 'react';
import Passenger from './Passenger';
import { useNavigate } from 'react-router-dom';
import { IoIosAirplane } from "react-icons/io";
import { MdOutlineCable, MdAddAlert } from "react-icons/md";
import { createRoot } from 'react-dom/client';
import { getStates } from '../Constants/States';
import { FlightContext } from '../store/flight-context';

function Book() {

  const {flightCtx, setFlight} = useContext(FlightContext);
  const {flight, dateOfDep, time} = flightCtx;
  console.log(flightCtx);

  const passengerContainerRef = useRef(null);
  const passengerIdRef = useRef(0);
  const passengersRef = useRef([]);
  let base = Math.floor((flight.price / 100) * 70);
  let tax = Math.floor((flight.price / 100) * 30);
  const [listOfPassengers, setListOfPassengers] = useState([]);
  const [baseFare, setBaseFare] = useState(base * listOfPassengers.length);
  const [taxFare, setTaxFare] = useState(tax * listOfPassengers.length);
  const states = getStates();
  const navigate = useNavigate();

  // Create a root only once
  const rootRef = useRef(null);

  useEffect(() => {
    if (passengerContainerRef.current) {
      rootRef.current = createRoot(passengerContainerRef.current);
    }
  }, []);

  function handleAddPassenger(e) {
    e.preventDefault();
    const newPassengerId = passengerIdRef.current++;
    const newPassenger = (
      <Passenger
        key={newPassengerId}
        id={newPassengerId}
        deletePassenger={() => handleDelete(newPassengerId)}
        savePassenger={handleSave}
      />
    );

    passengersRef.current.push(newPassenger);

    if (rootRef.current) {
      rootRef.current.render(<>{passengersRef.current}</>);
    }
  }

  function handleSave(newPassengerId, newPassenger) {
    const updatedPassengers = [...listOfPassengers];
    updatedPassengers[newPassengerId] = newPassenger;
    setListOfPassengers(updatedPassengers);
    setBaseFare(base * updatedPassengers.length);
    setTaxFare(tax * updatedPassengers.length);
    console.log(updatedPassengers);
  }

  function handleDelete(id) {
    passengerIdRef.current--;
    const updatedPassengers = listOfPassengers.filter((_, index) => index !== id);
    setListOfPassengers(updatedPassengers);
    setBaseFare(base * updatedPassengers.length);
    setTaxFare(tax * updatedPassengers.length);

    passengersRef.current = passengersRef.current.filter(p => p.props.id !== id).map((p, index) => React.cloneElement(p, { key: index, id: index }));

    if (rootRef.current) {
      rootRef.current.render(<>{passengersRef.current}</>);
    }

    console.log(updatedPassengers);
  }

  function handleContinue(e) {
    e.preventDefault();
    setFlight({flight,dateOfDep,time,base,baseFare,taxFare,listOfPassengers})
    navigate("/seat");
  }

  return (
    <>
      <div className='bg-gradient-to-r from-black from-5% via-purple-600 via-30% to-black to-95% bg-cover bg-center min-h-screen p-1'>
        <div className="text-white px-4">
          <h1>Booking</h1>
        </div>
        <div className='flex'>
          <div className='max-w-screen-xl'>
            <div className='m-4'>
              <section>
                <div className="p-8 sm:px-6 lg:px-10 rounded-lg bg-black text-white">
                  <div>
                    <div className='flex'>
                      <div className='text-2xl font-bold'>{flight.source.city}</div>
                      <div className='px-3 py-2'><IoIosAirplane size={20} /></div>
                      <div className='text-2xl font-bold'>{flight.destination.city}</div>
                    </div>
                    <div className='flex'>
                      <div className='text-sm p-1 bg-purple-900'>{dateOfDep},</div>
                      <div className='text-sm px-2 py-1'>{time}</div>
                    </div>
                  </div>
                  <div className='flex py-3'>
                    <div className='size-10'>
                      <img alt='' src={flight.company.logo}></img>
                    </div>
                    <div className='text-lg'>
                      {flight.company.companyName}
                    </div>
                    <div className='text-lg ml-4'>
                      {flight.flightName}{flight.flightNumber}
                    </div>
                  </div>
                  <div className='bg-purple-200 p-4 text-black'>
                    <div className='flex'>
                      <div className='font-bold'>
                        {flight.arrTime.slice(0, 5)}
                        &nbsp;&nbsp;&nbsp;
                        {flight.source.city}&nbsp;-&nbsp;
                      </div>
                      <div>
                        {flight.source.airport}
                      </div>
                    </div>
                    <div className='p-2 flex'>
                      <MdOutlineCable size={24} color='black' />
                      <div className='ml-5'>
                        {time}
                      </div>
                    </div>
                    <div className='flex'>
                      <div className='font-bold'>
                        {flight.deppTime.slice(0, 5)}
                        &nbsp;&nbsp;&nbsp;
                        {flight.destination.city}&nbsp;-&nbsp;
                      </div>
                      <div>
                        {flight.destination.airport}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className='m-4'>
              <section>
                <div className="p-8 sm:px-6 lg:px-10 rounded-lg bg-black text-white">
                  <div className='font-bold text-xl'>Important Information</div>
                  <div className='p-3'>
                    <div className='font-bold flex p-2'><MdAddAlert size={24} color='red' /> &nbsp; Check travel guidelines and baggage information below:</div>
                    <div className='ml-2'>
                      <li>Carry no more than 1 check-in baggage and 1 hand baggage per passenger. If violated, airline may levy extra charges.</li>
                    </div>
                    <div className='font-bold flex p-2 mt-2'><MdAddAlert size={24} color='red' /> &nbsp; Unaccompanied Minors Travelling:</div>
                    <div className='ml-2'>
                      <li>An unaccompanied minor usually refers to a child traveling without an adult aged 18 or older.</li>
                      <li>Please check with the airline for their rules and regulations regarding unaccompanied minors, as these can differ between airlines.</li>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className='m-4'>
              <section>
                <div className="p-8 sm:px-6 lg:px-10 rounded-lg bg-black text-white">
                  <h3>Passenger Details</h3>
                  <form className="space-y-4">
                    <div ref={passengerContainerRef}></div>
                    <div className="mt-4">
                      <button
                        type='submit'
                        className="inline-block w-full rounded-lg bg-slate-600 transition hover:bg-slate-500 px-5 py-3 font-medium sm:w-auto"
                        onClick={handleAddPassenger}
                      >
                        + Add passenger
                      </button>
                    </div>
                  </form>
                  <br></br>
                  <div className='border-b border-stone-300 mb-4'></div>

                  <label className="block text-md font-medium text-gray-200"> Booking details will be sent to </label>

                  <div className='p-4 flex gap-10'>
                    <div>
                      <label className="block text-md font-medium text-gray-200"> Mobile No. </label>
                      <input
                        placeholder='+91 123456789'
                        type='email'
                        className="mt-1.5 w-64 p-2 h-10 text-md rounded-md text-gray-800 placeholder:text-gray-500 bg-purple-200 border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-md font-medium text-gray-200">Email </label>
                      <input
                        placeholder='xyz@abc.com'
                        type='tel'
                        className="mt-1.5 w-64 p-2 h-10 text-md rounded-md text-gray-800 placeholder:text-gray-500 bg-purple-200 border-white"
                      />
                    </div>

                  </div>
                </div>
              </section>
            </div>
            <div className='m-4'>
              <section>
                <div className="p-8 sm:px-6 lg:px-10 rounded-lg bg-black text-white">
                  <div className='font-bold text-xl'>Your State
                    <span className='text-sm font-light'> (Required for GST purpose on your tax invoice. You can edit this anytime later in your profile section.)</span>
                  </div>

                  <div className='p-4'>
                    <label htmlFor="HeadlineAct" className="block text-md font-medium text-gray-200"> Select a State </label>

                    <select
                      name="HeadlineAct"
                      id="HeadlineAct"
                      className="mt-1.5 w-max h-10 text-md rounded-md text-gray-800 bg-purple-200 border-white"
                    >
                      {states.map(item => (
                        <option key={item.code}>{item.name}</option>
                      ))}

                    </select>
                    <div className='mt-3 text-gray-300 '>
                      <input type='checkbox' className='bg-purple-200' />
                      &nbsp;&nbsp;Confirm and save billing details to your profile
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className='grid'>
              <button
                className="inline-block justify-self-end m-4 shrink-0 rounded-md no-underline border-2 border-purple-600 bg-purple-600 px-4 py-2 text-lg font-medium text-white transition hover:bg-gray-950 hover:border-purple-500 focus:outline-none active:text-purple-500"
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          </div>

          <div className='text-white w-[25rem] mt-4 '>
            <section>
              <div className="p-8 sm:px-6 lg:px-10 rounded-lg bg-black text-white">
                <div>
                  <h4>Fare Summary</h4>
                </div>
                <div className='flex mt-4 place-content-between'>
                  <div>
                    <h6>Base Fare</h6>
                    <p>Adult(s) ({listOfPassengers.length} X {base})</p>
                  </div>
                  <div>
                    <h6>&nbsp;</h6>
                    <p>{baseFare}</p>
                  </div>
                </div>
                <div className='border-t border-stone-500'></div>

                <div className='flex mt-4 place-content-between'>
                  <div>
                    <h6>Taxes and Surcharges</h6>
                    <p>Airline Taxes & Surcharges</p>
                  </div>
                  <div>
                    <h6>&nbsp;</h6>
                    <p>{taxFare}</p>
                  </div>
                </div>

                <div className='border-t-2 border-stone-300'></div>

                <div className='flex mt-4 place-content-between'>
                  <div>
                    <h4>Total Amount</h4>
                  </div>
                  <div>
                    <h4>{baseFare + taxFare}</h4>
                  </div>
                </div>
              </div>
            </section>
          </div>

        </div>

      </div>
    </>
  );
}

export default Book;
