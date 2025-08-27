
import { CiSearch } from "react-icons/ci";
const Search = () => {
    return (
        <div>
            <div className='rounded border-[2px] flex gap-[5px] justify-center items-center px-[10px] focus-within:border-blue-500'>
                <CiSearch className='text-[20px] text-gray-400' />
                <input
                    type='text'
                    placeholder='Search'
                    className='w-full p-2 rounded-[10px] outline-none'
                />
            </div>

        </div>
    )
}

export default Search