import { useState } from "react";

function Passenger({id, deletePassenger, savePassenger}) {
    
  
    const [isEditing, setIsEditing] = useState(true);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [nationality, setNationality] = useState('');
    const [gender, setGender] = useState('');
  
    
      const newPassenger = {
        name: name,
        age: age,
        nationality: nationality,
        gender: gender
      };
     
  
    let buttonclass = "inline-block w-12 h-10 mt-3 rounded-lg font-medium transition text-white"
  
    if (isEditing) {
      buttonclass += " bg-purple-600 border-2 border-purple-600 hover:bg-black";
    }
    else {
      buttonclass += " bg-black-500 border-2 border-purple-600 hover:bg-purple-700";
    }
  
    function handleEdit(e) {
      e.preventDefault(); // Prevent form submission
  
      if (isEditing) {
        savePassenger(id, newPassenger);
      }
      setIsEditing(edit => !edit);
  
    }

    function handleDelete(){
      deletePassenger(id)
    }

    return (
      <>
        <div className="flex gap-4 mb-12 ">
          <div>
            <label className="block text-sm font-medium text-gray-300">Full Name</label>
            {isEditing ? (
              <input
                className="w-96 rounded-lg h-12 mt-3 border-gray-300 border-2 text-black bg-purple-200"
                placeholder="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />) :
              (<div className='w-96 rounded-lg h-12 mt-3 border text-white'>
                <div className="m-2">{name}</div>
                </div>)
            }
          </div>
          |
          <div>
            <label className="block text-sm font-medium text-gray-300">Age</label>
            {isEditing ? (
              <input
                className="w-24 rounded-lg h-12 mt-3 border-gray-300  border-2 text-black bg-purple-200"
                placeholder="Age"
                type="number"
                value={age}
                min={1}
                max={100}
                onChange={(e) => setAge(e.target.value)}
                required
              />) :
              (<div className='w-24 rounded-lg h-12 mt-3 border  text-white'><div className="m-2">{age}</div></div>)
            }
          </div>
          |
          <div>
            <label className="block text-sm font-medium text-gray-300" >Nationality</label>
            {isEditing ? (
              <input
                className="w-48 rounded-lg h-12 mt-3 border-gray-300 border-2 text-black bg-purple-200"
                placeholder="Nationality"
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                required
              />) :
              (<div className='w-48 rounded-lg h-12 mt-3 border text-white'><div className="m-2">{nationality}</div></div>)}
          </div>
          |
          <div>
            <label className="block text-sm font-medium text-gray-300">Gender</label>
            {isEditing ? (
              <select
                name="HeadlineAct"
                value={gender}
                className="w-16 rounded-lg h-12 mt-3 border-2 text-sm border-gray-300 text-black bg-purple-200"
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option></option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>) :
              (<div className='w-16 rounded-lg h-12 mt-3 border text-white'><div className="m-2">{gender}</div></div>)
            }
          </div>
          <div className="mt-4">
            <button
              type='submit'
              className={buttonclass}
              onClick={handleEdit}
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>


          <div className="mt-4">
            <button
              className="inline-block px-2 w-9 h-10 mt-3  text-gray-700 border-purple-600 border-2 rounded-lg hover:bg-purple-600 focus:relative"
              title="Delete Product"
              type="submit"
              onClick={handleDelete}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="white"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      </>
    );
  }

  export default Passenger