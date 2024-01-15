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
let themes = ['danger','secondary','success','info']
const Topic = memo(({ index, title, description }: PostType) => {
    const color =  themes[index];
    return (
        <div className={`border  border-${color}-500 overflow-hidden flex flex-row   gap-x-3  rounded-md border-solid`}>
            <div className={`icon bg-${color}-500 p-5`}>
                <div className={`icon w-10 h-10 flex flex-row justify-center items-start rounded-full bg-white`}>
                    <FaUsers size={32} className={`text-${color}-500`} />
                </div>
            </div>
            <div className="py-2 w-72">
                <div className="title">
                    <div className='flex flex-row justify-start items-center gap-1'>
                        <div className={`w-5 h-5 bg-${color}-900 align-middle rounded-full border-solid border-${color}-400 border-4`} />
                        <h3 className={`text-lg font-bold text-${color}-600`}><Link to={'/forum'}>{title}</Link></h3>
                    </div>
                    <p className='text-sm mt-2'>{description}</p>
                </div>
            </div>
            <div className='flex flex-col gap-2 py-2 '>
                <div className={`w-32 box-border text-center whitespace-nowrap bg-${color}-500  py-2.5 rounded-md`}>
                    <p className='text-white text-sm'>15k</p>
                    <p className='text-white text-sm'>Discussions</p>
                </div>
                <div className={`w-32 box-border text-center whitespace-nowrap bg-${color}-500  py-2.5 rounded-md`}>
                    <p className='text-white text-sm'>111K</p>
                    <p className='text-white text-sm'>Messages</p>
                </div>
            </div>
            <div className="py-2 flex flex-col gap-3">
                <div className={`flex flex-row gap-2 items-center text-${color}-500`}><CiCalendarDate /> <span className='text-sm'>Aujourd'hui</span></div>
                <div className={`flex flex-row gap-2 items-center text-${color}-500`}><TbClockHour2 /> <span className='text-sm'>09h39</span></div>
                <div className={`flex flex-row gap-2 items-center text-${color}-500`}><BsTagFill /> <span className='text-sm'>Ma petite fille</span></div>
                <div className={`flex flex-row gap-2 items-center text-${color}-500`}><ImUser /> <span className='text-sm'>Armel Wanes</span></div>
            </div>
        </div>
    )
}, (prevProps: PostType, nextProps: PostType) => {
    return prevProps.id === nextProps.id &&
        nextProps.title === nextProps.title &&
        nextProps.description === nextProps.description
})
export default Topic;