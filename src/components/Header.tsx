import React, { useContext } from 'react'
import { BsChatDotsFill } from 'react-icons/bs';
import { FaUserCircle, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AuthState from './auth/AuthState';
import { AuthContext } from '../store/Provider/AuthProvider';

const Header = () => {
    const { state, dispatch } = useContext(AuthContext);
    return (
        <>
            <div className='flex flex-row justify-between bg-slate-800 text-white'><Link className="link-style" to="/admin"> Acceder à l'administration </Link></div>
            <header className='sticky top-0 z-40'>
                <nav className='h-14 w-full border-b shadow'>
                    <div className="mx-40   bg-white flex h-14 items-center gap-5 justify-between text-center max-[828px]:ml-20 max-[711px]:ml-10 max-[675px]:ml-20 max-[591px]:ml-16 max-[528px]:ml-4 max-[474px]:h-24 max-[474px]:pb-10">
                        <div className="flex flex-row justify-center items-center">
                            <Link to="/" className='text-xl  font-semibold text-primary-500'>Koragna</Link>
                            {/**<div className="flex flex-row px-5 gap-5">
                                <div className="">
                                    <Link to={"/"} className='flex flex-row gap-1 items-center text-primary-500'>Forum</Link>
                                </div>
                                <div className="">
                                    <Link to={"/"} className='flex flex-row gap-1 items-center text-primary-500'>Communauté</Link>
                                </div>
    </div>**/}
                        </div>
                        <div className="flex h-14 items-center gap-4 justify-center">


                            <div>
                                <div className="text-[12px]">
                                    {!state.isAuthenticated ? (
                                        <>
                                            <Link
                                                to={"/login"}
                                                className="mx-3"
                                            >
                                                <FaUserCircle fontSize={32} className="text-primary-500 group-focus-within:ring group-focus-within:ring-primary-500" />
                                            </Link>
                                        </>
                                    ) : (
                                        <AuthState />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}
export default Header;