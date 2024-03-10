'use client'
import { motion }from "framer-motion";
import Link from "next/link";
const Navbar = () => {
  
  return (
    <header className="z-50 fixed top-0 w-full bg-transparent border-b border-transparent bg-black">
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <a className="flex items-center space-x-2">
            <div className="relative h-8 w-8 border text-white flex items-center justify-center rounded-md ">
              <motion.div
                whileHover={{ scale: 0.9 }}
                whileTap={{ scale: 1 }}
                className="absolute top-[-2.5rem] mx-auto h-10 w-full  rounded-full blur-xl "
              ></motion.div>
              <motion.img
                alt="Logo"
                src="/aii.png"
                //@ts-ignore
                layout="fill"
                
                className="rounded-md"
                initial={{ scale: 1}}
                whileHover={{ scale: 3.1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <motion.h1
              className="sm:text-sm font-bold text-neutral-600 dark:text-gray-100 cursor-grab	"
              whileHover={{ scale: 0.9 }}
              whileTap={{ scale: 1 }}
            >
              Dora AI
            </motion.h1>
          </a>
        </div>
                      
        <nav className="hidden md:flex space-x-10">
          <Link className="text-gray-400 hover:text-white transition duration-300" href={'/module'}>Modules</Link>
          <Link className="text-gray-400 hover:text-white transition duration-300" href={'/'}>About</Link>
          <Link className="text-gray-400 hover:text-white transition duration-300" href={'/'}>Community</Link>
        </nav>
        <div className="flex items-center md:gap-4">                     
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 py-2 w-9 px-0 outline-none focus:ring-0 focus:outline-none active:ring-0 active:outline-none hover:bg-customBlack">
            <svg viewBox="0 0 255.99507 255.99507" width="30px" height="30px">
              <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}>
                <g transform="scale(10.66667,10.66667)">
                  <path d="M10.9,2.1c-4.6,0.5 -8.3,4.2 -8.8,8.7c-0.5,4.7 2.2,8.9 6.3,10.5c0.3,0.1 0.6,-0.1 0.6,-0.5v-1.6c0,0 -0.4,0.1 -0.9,0.1c-1.4,0 -2,-1.2 -2.1,-1.9c-0.1,-0.4 -0.3,-0.7 -0.6,-1c-0.3,-0.1 -0.4,-0.1 -0.4,-0.2c0,-0.2 0.3,-0.2 0.4,-0.2c0.6,0 1.1,0.7 1.3,1c0.5,0.8 1.1,1 1.4,1c0.4,0 0.7,-0.1 0.9,-0.2c0.1,-0.7 0.4,-1.4 1,-1.8c-2.3,-0.5 -4,-1.8 -4,-4c0,-1.1 0.5,-2.2 1.2,-3c-0.1,-0.2 -0.2,-0.7 -0.2,-1.4c0,-0.4 0,-1 0.3,-1.6c0,0 1.4,0 2.8,1.3c0.5,-0.2 1.2,-0.3 1.9,-0.3c0.7,0 1.4,0.1 2,0.3c1.3,-1.3 2.8,-1.3 2.8,-1.3c0.2,0.6 0.2,1.2 0.2,1.6c0,0.8 -0.1,1.2 -0.2,1.4c0.7,0.8 1.2,1.8 1.2,3c0,2.2 -1.7,3.5 -4,4c0.6,0.5 1,1.4 1,2.3v2.6c0,0.3 0.3,0.6 0.7,0.5c3.7,-1.5 6.3,-5.1 6.3,-9.3c0,-6 -5.1,-10.7 -11.1,-10z"></path>
                </g>
              </g>
            </svg>
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 py-2 w-9 px-0 outline-none focus:ring-0 focus:outline-none active:ring-0 active:outline-none hover:bg-customBlack">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z"
                  stroke="#6b6b6b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
