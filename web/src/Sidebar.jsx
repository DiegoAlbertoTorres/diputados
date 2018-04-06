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

import Roster from './Roster.jsx'
import Intro from './Intro.jsx'

import './Sidebar.css'

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

class Sidebar extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        <Intro id='Intro' selected={this.props.selected}/>
        <div className='roster-container'>
              <Roster id='Roster'
                      data={this.props.data}
                      selected={this.props.selected}
                      selectCallback={this.props.selectCallback}
                      deselectCallback={this.props.deselectCallback}/>
        </div>
      </div>
    );
  }
}

export default Sidebar;
