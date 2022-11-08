import React from 'react';
import Logo from '../../img/logo.png';
import {UilSearch} from '@iconscout/react-unicons';
import './LogoSearch.css';
const LogoSeach = () => {
  return (
    <div className = "logoSearch">
        <img src = {Logo} alt="Logo" />
        <div className="Search">
        <input type="text" placeholder = 'Search...' />
        <div className = 's-icon'>
            <UilSearch />
        </div>
        </div>
    </div>
  )
}

export default LogoSeach