import React from 'react';

function Header() {


  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

          {/* Header: Left side */}
          <div className="flex">
            
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            {/* Suggested space for translation flags */}

              <button className='rounded-full ring-2 bg-blue-300 text-gray'>EN</button>
              <button className='rounded-full ring-2 bg-red-600 text-white'>ES</button>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;