import React, { useContext } from 'react'
import UserContext from './contexts/UserContext';
import { Link } from 'react-router-dom';

const Header = () => {

    const {user} = useContext(UserContext);

    const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
          return text.slice(0, maxLength) + '..';
      }
      return text;
  };

  return (
    <div>
        <header className='p-4 flex justify-between max-md:w-full'>
          <Link to={'/'} className='flex items-center gap-1'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10">
            <path d="M15.75 8.25a.75.75 0 0 1 .75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 1 1-.992-1.124A2.243 2.243 0 0 0 15 9a.75.75 0 0 1 .75-.75Z" />
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM4.575 15.6a8.25 8.25 0 0 0 9.348 4.425 1.966 1.966 0 0 0-1.84-1.275.983.983 0 0 1-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 0 1 2.328-.377L16.5 15h.628a2.25 2.25 0 0 1 1.983 1.186 8.25 8.25 0 0 0-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.575 15.6Z" clip-rule="evenodd" />
          </svg>

            <span className='font-bold text-2xl'>
              EcoSphere
            </span>
            </Link>
            <div className='flex rounded-full shadow-gray-500 shadow-sm py-2 px-4 gap-2 max-md:hidden'>
              <Link className='cursor-pointer' to={'/'}>Home</Link>
              <div className='border-l border-2 border-gray-200'></div>
              <Link className='cursor-pointer' to={'/initiatives'}>Initiatives</Link>
              <div className='border-l border-2 border-gray-200'></div>
              <Link className='cursor-pointer' to={'/challenges'}>Challenges</Link>
              <div className='border-l border-2 border-gray-200'></div>
              <div className='cursor-pointer'>Community</div>
              <div className='border-l border-2 border-gray-200'></div>
              <div className='cursor-pointer'>Resources</div>
              <button className=' bg-primary p-1 text-white rounded-full'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </div>
            <Link to={user?'/dashboard':'/login'} className='flex rounded-full shadow-gray-500 shadow-sm py-2 px-4 gap-2 items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <div className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 relative top-1">
                  <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                </svg>
              </div>
              {
                  !!user && (
                    <div>
                      {truncateText(user.name, 7)}
                    </div>
                  )
                }
            </Link>
        </header>
      </div>
  )
}

export default Header