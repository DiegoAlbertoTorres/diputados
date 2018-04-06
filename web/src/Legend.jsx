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
import React, { Component } from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import plurIcon from '@fortawesome/fontawesome-free-solid/faGavel'
import electedIcon from '@fortawesome/fontawesome-free-solid/faUserPlus'
import deadIcon from '@fortawesome/fontawesome-free-solid/faSkull'
import licenciaIcon from '@fortawesome/fontawesome-free-solid/faPlane'
import activeIcon from '@fortawesome/fontawesome-free-solid/faCheck'

import './Legend.css'

class Legend extends Component {
  render() {
    var parties = Object.values(this.props.parties).map(p => {
      if ((p.name === 'unk') || (p.name === 'ind')) {
        return null;
      }
      return (
        <div className='legend-item'
              key={p.name}>
          <svg width='16px'
               height='16px'
               className='svg-inline--fa'
               strokeWidth='2px'
               stroke='#fff'>
            <circle className={'bullet ' + p.name}
                    r="7"
                    cx="8"
                    cy="8"/>
          </svg>
          {'   ' + p.name.toUpperCase()}
        </div>
      )
    });

    return (
      <div id={this.props.id}
           className='Legend'>
        <div className='legend-parties'>
          {parties}
        </div>

        <div className='legend-icons'>
          <div className='legend-item'>
            <FontAwesomeIcon icon={plurIcon}/>   Plurinominal
          </div>
          <div className='legend-item'>
            <FontAwesomeIcon icon={electedIcon}/>   Elección
          </div>
          <div className='legend-item'>
            <FontAwesomeIcon icon={activeIcon}/>   Activo
          </div>
          <div className='legend-item'>
            <FontAwesomeIcon icon={licenciaIcon}/>   Licencia
          </div>
          <div className='legend-item'>
            <FontAwesomeIcon icon={deadIcon}/>   Deceso
          </div>
        </div>
      </div>
    )
  }
}
export default Legend
