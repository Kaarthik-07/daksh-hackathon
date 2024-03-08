
import React from 'react';

const Success: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <h1 className="text-4xl font-bold mb-8 text-center">Congratulations! You Did It!</h1>
            <p className="text-lg mb-8 text-center">
                You've mastered this module like a champ! Keep up the great work!
            </p>
            <img src="/happyCat.jpeg" alt="Happy Face" className="w-64 h-64 mb-8" />
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Continue to Next Module
            </button>
        </div>
    );
};

export default Success;
