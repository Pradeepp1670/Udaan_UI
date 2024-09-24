import { useState } from "react"

function Input({type,label}){
    const [value, setValue] = useState();

    return(
        <div className="col-span-6 sm:col-span-3">
        <label htmlFor="Password" className="block text-sm font-medium text-gray-200"> Password </label>

        <input
            type="password"
           
            value={value}
            onChange={e => setValue(e.target.value)}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-md p-2 text-gray-700 shadow-sm"
        />
    </div>
    )
}

export default Input