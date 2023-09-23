import { useState } from "react";
import { IoSearch } from "react-icons/io5";


const SearchBar = () => {
    const [input, setInput] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const handleSearch = () => {
        console.log(input);
    }
    return (
        <div className="pr-10">
            <div className='mt-4 flex flex-row justify-between rounded-lg bg-white px-1 max-h-18 w-full shadow-0'>
                <button onClick={handleSearch} className='text-blue-500  font-light ml-2 rounded-md py-1 pr-1'>
                    <IoSearch size={24} />
                </button>
                <input className="rounded-full p-1 w-full max-h-18 bg-white text-gray-800 focus:text-gray-900 focus:outline-none" type="text" id="search" placeholder="Search" value={input} onChange={(e) => {
                    setInput(e.target.value)
                    setShowMenu(true);
                }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />

            </div>
        </div>
    )
}

export default SearchBar