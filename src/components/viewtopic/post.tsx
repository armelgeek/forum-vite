import React, { memo } from 'react'
import { FaCalendarAlt, FaTimes, FaUsers } from 'react-icons/fa';
import { CiCalendarDate } from "react-icons/ci";
import { TbClockHour2 } from 'react-icons/tb';
import { BsTagFill } from 'react-icons/bs';
import { ImUser } from 'react-icons/im';
import { Link } from 'react-router-dom';
type ViewTopicType = {
    index: number,
    id?: number;
    title: string;
    description: string;
}
const ViewTopic = memo(({ index, title, description }: ViewTopicType) => {
    return (
        <div className='relative  bg-gray-100'>
            <div className=" absolute top-2 bottom-0  left-2 z-20">
                <div className={`w-12 h-12 flex border-4 border-white bg-primary-500 flex-row justify-center items-start rounded-full`}>
                </div>
            </div>
            <div className='bg-white'>
                <div className="bg-primary-500  flex flex-row justify-between items-center h-3 text-white relative px-2 py-4 rounded-t-md">
                    <div className="name pl-14">
                        <p className='font-semibold'>Asthius</p>
                    </div>
                    <div className="flex flex-row items-center gap-1 justify-end">
                        <div className="date text-sm">Le 16-09-2023 à 01h12</div>
                        <div><FaCalendarAlt size={13} /></div>
                    </div>
                </div>

                <div className="bg-slate-200  flex flex-row justify-between items-center  relative pl-2">
                    <div className="name pl-14">
                        <p className='font-semibold text-sm'>Membre</p>
                    </div>
                    <div className="flex flex-row  items-center gap-1 justify-end">
                        <div className="text-end">
                            <p className='text-sm text-gray-800 font-bold'>Classement auteurs:</p>
                            <p className='text-xs italic text-gray-800'>depuis toujours</p>


                        </div>
                        <div className="range bg-pink-500 font-bold w-22 px-3 text-white text-sm flex flex-row justify-center items-center  h-10">
                            {">"} 100éme
                        </div>
                    </div>
                </div>
                <div className="content flex flex-row gap-5 ">
                    <div className="info w-44 py-3 px-3">
                        <div className='flex flex-row items-center gap-1 text-xs mb-3'><FaCalendarAlt className='text-primary-500' /> 09-01-2019</div>
                        <div className='flex flex-row items-center gap-1 text-xs'><span className='text-primary-500'>Genre:</span> <span className='text-gray-800'>Homme</span></div>
                        <div className='flex flex-row items-center gap-1 text-xs'><span className='text-primary-500'>Age:</span> <span className='text-gray-800'>52 ans</span></div>
                        <div className='flex flex-row items-center gap-1 text-xs'><span className='text-primary-500'>Lieu:</span> <span className='text-gray-800'>Antananarivo</span></div>
                    </div>
                    <div className="w-full text-sm text-left text-gray-500 p-3">
                        Bonjour à toutes et à tous,

                        Je m’appel pas Mario (désolé)!

                        Je suis un homme d’une trentaine d’années aimant lire des histoires et la je me prépare à écrire m’a première histoire.

                        J’habite dans les pays de la Loire et j’aime la lecture (histoire réel, D/S, voyeur et Exhibition sont mes catégories préférées!)

                        J’aime également bricoler, la console, les rencontres, m’amuser !


                        Bonne découverte et bonne lecture à tous!
                    </div>
                   
                </div>
            </div>
            <div className="flex flex-row justify-end bg-white p-2">
                <button className="btn btn-outline-primary btn-xs">Signaler</button>
            </div>
        </div>
    )
}, (prevProps: ViewTopicType, nextProps: ViewTopicType) => {
    return prevProps.id === nextProps.id &&
        nextProps.title === nextProps.title &&
        nextProps.description === nextProps.description
})
export default ViewTopic;