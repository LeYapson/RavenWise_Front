// pages/404.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Raven404 from '../assets/images/Raven404.png';

const PageNotFound = () => {
  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gray-800 text-white">
      <h2 className="text-3xl mb-6">Même Raven ne sait pas où tu es...</h2>
      <Image src={Raven404} alt="Raven 404" width={300} height={300} className="mb-6" />
      <Link href="/" className="px-6 py-3 bg-yellow-500 text-gray-800 rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-300">
        Go to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
