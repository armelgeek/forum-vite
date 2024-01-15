import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div className='text-center bg-slate-800 text-white'> Developed with <span role="img"> ❤️ </span> by <a className="link-style" href="https://twitter.com/armelwanes" target="_blank">@armelwanes</a></div>
            <header className='sticky top-0 z-40'>
                <nav className='h-14 w-full border-b shadow bg-primary-500'>
                    <div className="mx-40  flex h-14 items-center gap-5 justify-between text-center max-[828px]:ml-20 max-[711px]:ml-10 max-[675px]:ml-20 max-[591px]:ml-16 max-[528px]:ml-4 max-[474px]:h-24 max-[474px]:pb-10">
                        <div className="flex flex-row justify-center items-center">
                            <Link to="/" className='text-xl text-white font-semibold'>Koragna</Link>
                        </div>
                        <div className="flex h-14 items-center justify-evenly">

                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}
export default Header;