import React, { memo } from 'react'
import { FaTimes, FaUsers } from 'react-icons/fa';
import { CiCalendarDate } from "react-icons/ci";
import { TbClockHour2 } from 'react-icons/tb';
import { BsTagFill } from 'react-icons/bs';
import { ImUser } from 'react-icons/im';
import { Link } from 'react-router-dom';
type PostType = {
    index: number,
    id?: number;
    title: string;
    description: string;
}
const Post = memo(({ index, title, description }: PostType) => {
    return (
        <div className='border bg-white border-primary-500 rounded-md border-solid'>
            <div className=' overflow-hidden flex flex-row   gap-x-3 '>
                <div className={`flex flex-col justify-start items-center px-5  gap-2 py-2`}>
                    <div className={`icon w-10 h-10 flex flex-row justify-center items-start rounded-full bg-primary-500`}>
                        <FaUsers size={32} className={`text-primary-500`} />

                    </div>
                    <p className='text-xs text-gray-400 '>Tilia TV</p>
                </div>
                <div className="py-2 w-72">
                    <div className="title">
                        <div className='flex flex-row justify-start items-center gap-1'>
                            <div className={`w-4 h-4 bg-primary-100 align-middle rounded-full border-solid border-primary-400 border-4`} />
                            <h3 className={`text-md font-bold text-primary-600`}><Link to={'/viewtopic'}>{title}</Link></h3>
                        </div>
                        <p className='text-xs italic font-light'>{description}</p>

                    </div>
                </div>
                <div className='flex flex-col gap-2 py-2 justify-end '>
                    <div className={`w-32 box-border text-center whitespace-nowrap bg-primary-500  py-1.5 rounded-md`}>

                        <p className='text-white text-sm'>10 752 reponses</p>
                    </div>
                    <div className={`w-32 box-border text-center whitespace-nowrap bg-primary-500  py-1.5 rounded-md`}>
                        <p className='text-white text-sm'>10 752 vues</p>
                    </div>
                </div>
                <div className="py-2 flex flex-col justify-end ">
                    <div className={`flex flex-row gap-2 items-center text-gray-500`}><CiCalendarDate /> <span className='text-sm'>Le 10-01-2024 à 21h33</span></div>
                    <div className={`flex flex-row gap-2 items-center text-gray-500`}><ImUser /> <span className='text-sm'>Armel Wanes</span></div>
                </div>
            </div>
            <div className={`flex flex-row justify-end pr-5`}>
                <div className="text-sm pl-5 text-primary-500 my-1">1 2 3 … 131</div>
            </div>
        </div>
    )
}, (prevProps: PostType, nextProps: PostType) => {
    return prevProps.id === nextProps.id &&
        nextProps.title === nextProps.title &&
        nextProps.description === nextProps.description
})
export default Post;