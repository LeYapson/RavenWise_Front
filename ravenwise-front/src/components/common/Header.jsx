// components/common/Header.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RavenShape from '../../assets/images/Raven_Shape.png';

const Header = () => {
  return (
    <header className="flex justify-center items-center p-2 bg-[#132238] text-[#FDC758] shadow-md border-b-2 border-[#334155] w-full z-50">
      <div className="flex items-center">
        <Image src={RavenShape} alt="RavenWise Logo" width={50} height={50} />
        <Link href="/" className="flex items-center ml-2 text-white font-bold text-2xl no-underline">
          <span className="text-white">Raven</span>
          <span className="text-[#FDC758]">Wise</span>
        </Link>
      </div>
      <nav className="flex-1 flex justify-center">
        <ul className="flex list-none p-0 m-0">
          <li className="mx-4">
            <Link href="/courses" className="text-white font-bold no-underline">Courses</Link>
          </li>
          <li className="mx-4">
            <Link href="/quiz" className="text-white font-bold no-underline">Quiz</Link>
          </li>
          <li className="mx-4">
            <Link href="/community" className="text-white font-bold no-underline">Community</Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center">
        <Link href="/auth/login" className="text-[#FDC758] font-bold border-2 border-[#FDC758] px-4 py-2 rounded-md mr-2 transition-all duration-300 hover:bg-[#FDC758] hover:text-[#0F1B2A]">
          Login
        </Link>
        <Link href="/auth/register" className="bg-[#FDC758] text-[#0F1B2A] font-bold border-2 border-[#FDC758] px-4 py-2 rounded-md transition-all duration-300 hover:bg-[#e0b347] hover:border-[#e0b347]">
          Register
        </Link>
      </div>
    </header>
  );
};

export default Header;
