import React from 'react';
import { Link } from 'react-router-dom';
import RavenLong from '../../assets/images/Ravenwise_Long.png';
import '../../assets/styles/Header.css';



const Header = () => {
  return (
    <header>
      <img src={RavenLong} className='logo' alt="Ravenwise" />

        <nav>
            <ul>
                <li>
                <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/courses">Courses</Link>
                </li>
                <li>
                <Link to="/quiz">Quiz</Link>
                </li>
                <li>
                <Link to="/login">Login</Link>
                </li>
                <li>
                <Link to="/Community">Community</Link>
                </li>
            </ul>
        </nav>
    </header>
  );
};

export default Header;