
import React, { useCallback, useEffect, useState, memo, useReducer, useContext } from "react";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEdit, AiOutlineEye } from "react-icons/ai";
import { FaCut, FaEdit, FaPlus, FaUserEdit } from "react-icons/fa";
import { FiEdit2, FiFilter, FiMoreHorizontal } from "react-icons/fi";
import { FaEllipsisVertical } from 'react-icons/fa6';
import { CgMail } from 'react-icons/cg';
import { BiSearch, BiTime, BiTimer } from 'react-icons/bi';
import { BsList } from 'react-icons/bs';
import { HiPlus, HiPlusSm } from 'react-icons/hi';
import { AuthContext } from '../../../store/Provider/AuthProvider';
import BannerAccount from './banner';


export default memo(() => {
    const { state } = useContext(AuthContext);
    return (
        <>
            <div className="container relative">
                <BannerAccount>
                    <div className="flex flex-row justify-between mb-3 cursor-pointer  items-center gap-1 shadow-sm border border-slate-200 bg-slate-100 px-2 py-2 text-xs w-full">
                        <p className="uppercase text-sm font-bold text-primary-500">Publications</p>
                        <div className="flex flex-row gap-1">
                            {/**<button className='flex flex-row gap-1 text-sm btn btn-default bg-primary-200  border btn-xs rounded-2xl px-3 text-primary-500  btn-xs'><FiFilter /> Filtres</button>
                                <button className="flex flex-row gap-1 text-sm btn">
                                    <BiSearch size={18} />
                                </button>**/}
                        </div>

                    </div>
                    <div className="flex  flex-col justify-between  sticky bg-slate-100 top-14 z-10 shadow-sm">

                    </div>
                </BannerAccount>
            </div>
        </>
    )
})