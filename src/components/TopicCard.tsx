import React from 'react'
import { FaUsersCog } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa6';

const TopicCard = () => {
  return (
    <div className='mb-5'>
        <div className="border overflow-hidden grid grid-cols-[auto_1fr_400px] rounded-[10px] border-solid">
            <div className="icon w-10 h-10 flex flex-row justify-center items-center rounded-full bg-red-400">
                <FaUsers size={32} color='#fff'/>
            </div>
            <div className="presentation">
                
            </div>
        </div>
    </div>
  )
}
export default TopicCard;
