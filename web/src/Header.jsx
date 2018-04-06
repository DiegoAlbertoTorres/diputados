/* La telaraña del congreso
 * Copyright (C) 2018 Diego Alberto Torres Quintanilla 
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
import React from 'react';

import './Header.css'

import NavMenu from './NavMenu.jsx'

import { Link } from 'react-router-dom'

class Header extends React.Component {
  render() {
    return (
      <div className='nav' id='nav'>
          <Link to='/' id='nav-header'>
            <svg id='main-icon' className='svg-inline--fa' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100"><path d="M6.687,6.688v2h16.026c23.481,12.666,25.592,37.918,25.77,41.415L31.066,67.52l1.414,1.414l17.452-17.452  c22.226-1.456,39.418,19.77,41.38,22.299v19.532h2V6.688H6.687z M79.757,21.657c4.659-1.479,10.279,3.622,11.556,4.865v23.319  c-3.333-5.431-11.114-15.196-24.144-15.596L79.757,21.657z M91.313,23.824c-2.032-1.715-5.593-4.206-9.304-4.419l9.304-9.304V23.824  z M89.898,8.688l-10.239,10.24c-0.978-2.525-3.364-7.47-7.844-10.24H89.898z M78.1,20.486L65.274,33.312  c-1.298-4.794-5.815-17.955-17.603-24.624h17.05C73.587,8.688,77.306,18.116,78.1,20.486z M26.663,8.688h16.331  c15.033,5.79,19.861,23.091,20.631,26.274L50.34,48.246C49.648,41.457,45.964,20.855,26.663,8.688z M52,49.414l13.147-13.147  c17.146-0.773,25.317,15.901,26.165,17.745v16.592C86.303,64.695,71.386,49.324,52,49.414z"></path></svg>
            <span>La telaraña del congreso</span>
          </Link>
          <NavMenu/>
      </div>
    );
  }
}

export default Header;
