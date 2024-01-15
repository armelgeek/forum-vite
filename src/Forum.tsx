import React from 'react'
import { FaFulcrum } from 'react-icons/fa';
import Posts from './components/posts';

const Forum = () => {
    return (
        <>
            <div className="">
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item active'>
                        <a href="#">Forum</a>
                    </li>
                    <li className='breadcrumb-item'>
                        <a href="#">Fun</a>
                    </li>
                </ol>
            </div>
            <div className="flex flex-row my-3 justify-between items-center">
                <div className="flex flex-row gap-2">
                    <div className="icon w-12 h-12 flex flex-row justify-center items-center rounded-full bg-primary-500"><FaFulcrum size={32} className='text-white' /></div>
                    <div className="flex flex-col justify-center items-start">
                        <p className='text-primary-500 font-semibold'>Fun</p>
                        <p className='text-xs'>Pages: 1 2 3 … 131</p>
                    </div>
                </div>
                <div className="action">
                    <button className="btn btn-primary">Nouveau Sujet</button>
                </div>
            </div>
            <Posts/>
        </>
    )
}
export default Forum;