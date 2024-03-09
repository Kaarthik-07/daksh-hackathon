import Link from 'next/link';
import React from 'react';

const NotSuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-8 text-center">Oops! Better Luck Next Time</h1>
            <p className="text-lg text-white mb-8 text-center">
                It seems like this module was quite challenging for you. Don't worry, take your time to revise the material and try again. Success is just a step away!
            </p>
            <img src="" alt="Sad Face" className="w-64 h-64 mb-8" />
            <Link href={'/module'} >
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Try Again
            </button>
            </Link>
        </div>
    );
};

export default NotSuccess;
