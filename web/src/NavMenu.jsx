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

import './NavMenu.css'

import { Link } from 'react-router-dom'

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import twitterIcon from '@fortawesome/fontawesome-free-brands/faTwitter'
import menuIcon from '@fortawesome/fontawesome-free-solid/faBars'

class NavMenu extends React.Component {
  constructor(props) {
    super(props);

    this.displayToggle = this.displayToggle.bind(this);
  }
  displayToggle() {
    let linksEl = document.querySelector('.narrow-links');
    if (linksEl.style.display === 'block') {
      linksEl.style.display = 'none';
    } else {
      linksEl.style.display = 'block';
    }
  }
  render() {
    return (
      <nav>
        <div className='nav-div nav-wide'>
            <div className='nav-pill'>
              <Link className='nav-link' to='/preguntas'>
                Preguntas frecuentes
              </Link>
            </div>
            <span className='nav-pill'>|</span>
            <div className='nav-pill'>
              <Link className='nav-link' to='/metodologia'>
                Metodología
              </Link>
            </div>
            <span className='nav-pill'>|</span>
            <div className='nav-pill'>
              <a className='nav-link' href='https://es.diegotorr.es'>El autor</a>
            </div>
            <span className='nav-pill'>|</span>
            <div className='nav-pill'>
              <a className='nav-link' href='https://twitter.com/DiegoATorresQ'>
                <FontAwesomeIcon className='nav-pill-icon' icon={twitterIcon}/>
              </a>
            </div>
        </div>
        <div className='nav-div nav-narrow'>
          <span className='narrow-nav-icon' onClick={this.displayToggle}>
            <FontAwesomeIcon icon={menuIcon}/>
          </span>
          <div className="narrow-links">
            <Link className='narrow-nav-link nav-link' to="preguntas" onClick={this.displayToggle}>Preguntas frecuentes</Link>
            <Link className='narrow-nav-link nav-link' to="metodologia" onClick={this.displayToggle}>Metodología</Link>
            <a className='narrow-nav-link nav-link' href="http://es.diegotorr.es" onClick={this.displayToggle}>El autor</a>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavMenu;
