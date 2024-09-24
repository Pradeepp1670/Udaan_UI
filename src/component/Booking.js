import { useNavigate } from 'react-router-dom';
import { IoIosAirplane } from "react-icons/io";
import { MdOutlineCable } from "react-icons/md";
import { FcRating } from "react-icons/fc";
import { useContext, useEffect, useState } from 'react';
import { razorpay } from '../service/PaymentService';
import { FlightContext } from '../store/flight-context';
import { addBooking } from '../service/BookingService';


function Booking() {
  const {flightCtx, setFlight}= useContext(FlightContext);
  const {flight,dateOfDep,time,base,baseFare,taxFare,listOfPassengers,selectedSeats} = flightCtx;
  console.log(flightCtx);
  const baggage = 249;
  const [isBaggage, setIsBaggage] = useState(false);
  const navigate = useNavigate();

  const [totalAmount, setTotalAMount] = useState(baseFare + taxFare);

  function handleLostBaggage() {
    if (isBaggage) {
      setTotalAMount(totalAmount - baggage);
      setIsBaggage(false);
    }
    else {
      setTotalAMount(totalAmount + baggage);
      setIsBaggage(true);
    }
  }

  const [data, setData] = useState(null);

  const handlePayment = async () => {

    await razorpay(totalAmount).then((response) => {
      setData(response.data);
    });

  }

  const handlePay = () => {
    try {
      const options = {
        key: 'rzp_test_srynvdmHQLkcX2', // Enter the Key ID generated from the Dashboard
        amount: data['amount'],
        currency: data['currency'],
        name: 'Udaan',
        description: 'Test Transaction',
        order_id: data['orderId'],
        handler: function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          rzp.close();
          handleBooking();
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#8f00ff'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
    }
  }

  const bookingDTO = {
    userEmail : sessionStorage.getItem('authenticatedUser'),
    flightUuid : flight.uuid,
    passengers : listOfPassengers
  }
  async function handleBooking() {
    console.log("here")
    await addBooking(bookingDTO).then((response) => {
      console.log(response.data);
      setFlight(prev => ({
        ...prev,
        bookingDetails: response.data,
    }));
      navigate("/final");
    }).catch(error => {
      console.error(error);
    })
  }

  useEffect(() => {
    if(data!==null){
      handlePay();
    }
}, [data])


  return (
    <>
      <div className='bg-gradient-to-r from-black from-5% via-purple-600 via-30% to-black to-95% bg-cover bg-center min-h-screen p-1'>
        <div className="text-white px-4">
          <h1>Booking</h1>
        </div>
        <div className='flex'>
          <div className='w-[64rem]'>
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
                  <div className='font-bold text-xl'>Travellers Details</div>
                  <div className='p-3'>
                    <ol className='list-decimal space-y-4'>
                      <div className='flex ml-5 font-semibold gap-10 place-content-around'>
                        <p className='w-64'>Name</p>
                        <p>Age</p>
                        <p>Nationality</p>
                        <p>Gender</p>
                      </div>
                      {listOfPassengers.map((item,index) => (
                        <li key={index}>
                          <div className='flex gap-10 place-content-around'>
                            <p className='w-64'>{item.name}</p>
                            <p>{item.age}</p>
                            <p>{item.nationality}</p>
                            <p>{item.gender}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className='border-1 border-gray-400 mb-4'></div>
                  <div className='font-bold text-xl mb-2'>Selected Seats</div>
                  {selectedSeats.map(seat => (
                    <li>{seat}</li>
                  ))}
                </div>
              </section>
            </div>
            <div className='m-4'>
              <section>
                <div className="p-8 sm:px-6 lg:px-10 rounded-lg bg-black text-white">
                  <div className='flex gap-2'>
                    <FcRating size={26} />
                    <div className='font-bold text-xl mb-2'>Lost baggage assistance, trip delay, trip cancellation & more benefits.</div>
                  </div>
                  <div className='flex gap-2'>
                    <p className='m-2'>All inclusive cover with lost/delayed Baggage assistance, complimentary travel insurance upto Rs.50,000 for accident, Rs.1,500 for trip delay, Rs.2,500 for missed flight and more.View T&C</p>
                    <button
                      className=" m-2 rounded-2xl border-2 px-2 py-1 text-md text-white  bg-gray-950 border-purple-500 hover:border-white focus:outline-none active:text-purple-500"
                      onClick={handleLostBaggage}
                    >
                      {isBaggage ? "Remove" : ('+' + baggage)}
                    </button>
                  </div>
                </div>
              </section>
            </div>
            <div className='m-4'>
              <section>
                <div className="grid p-8 sm:px-6 lg:px-10 rounded-lg bg-black text-white">
                  <div className='flex gap-2'>
                    <input type='checkbox' ></input>
                    <label>I understand and agree with the Fare Rules , the Privacy Policy , the User Agreement and Terms of Service of Udaan</label>
                  </div>
                  <button
                    className="inline-block justify-self-end m-4 shrink-0 rounded-md no-underline border-2 border-purple-600 bg-purple-600 px-4 py-2 text-lg font-medium text-white transition hover:bg-gray-950 hover:border-purple-500 focus:outline-none active:text-purple-500"
                    onClick={handlePayment}
                  >
                    Proceed to Pay
                  </button>
                </div>
              </section>
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
                    <p>{baseFare * listOfPassengers.length}</p>
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
                {isBaggage && (<>
                  <div className='border-t border-stone-500'></div>

                  <div className='flex mt-4 place-content-between'>
                    <div>
                      <h6>Other Services</h6>
                      <p>Secure Baggage</p>
                    </div>
                    <div>
                      <h6>&nbsp;</h6>
                      <p>{baggage}</p>
                    </div>
                  </div>
                </>)}

                <div className='border-t-2 border-stone-300'></div>

                <div className='flex mt-4 place-content-between'>
                  <div>
                    <h4>Total Amount</h4>
                  </div>
                  <div>
                    <h4>{totalAmount}</h4>
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


export default Booking