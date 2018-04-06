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
import ReactDOM from 'react-dom';

import Bio from './Bio.jsx'
import Graph from './Graph.jsx'
import Legend from './Legend.jsx'
import Sidebar from './Sidebar.jsx'

import { json } from 'd3-request'

import './Home.css'
import 'react-table/react-table.css'


class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      graph: undefined,
      roster: {},
      parties: {},
      selectedId: null,
      selected: null,
    };

    this.setSelected = this.setSelected.bind(this);
    this.clearSelected = this.clearSelected.bind(this);
    this.getDip = this.getDip.bind(this);
  }

  setSelected(id) {
    this.setState({
      selectedId: id,
      selected: this.getDip(id)
    });
  }
  
  clearSelected() {
    this.setState({
      selectedId: null,
      selected: null
    });
  }

  getDip(id) {
    if ((this.state.roster === undefined) || (id == null)) {
      return null;
    }
    if (id in this.state.roster){
      return this.state.roster[id];
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const sidebarNode = ReactDOM.findDOMNode(this.ref).getElementsByClassName('container')[0];
    const bioNode = ReactDOM.findDOMNode(this.ref).getElementsByClassName('Bio')[0];

    if (this.state.selected == null) {
      bioNode.classList.remove('expanded');
      sidebarNode.classList.add('expanded');
    } else {
      bioNode.classList.add('expanded');
      sidebarNode.classList.remove('expanded');
    }
  }
  
  componentDidMount() {
    var self = this;

    json('diputados.json', function(error, data) {
      if (error) throw error;

      self.setState({
        graph: data,
      });
    });

    json('roster.json', function(error, data) {
      if (error) throw error;
      
      self.setState({
        roster: data,
      });
    });

    json('parties.json', function(error, data) {
      if (error) throw error;
      
      self.setState({
        parties: data,
      });
    });
  }
  
  render() {
    return (
      <div id='home'
           ref={ref => this.ref = ref}>
        <div id='main'>
          <Graph id='Graph'
                 data={this.state.graph}
                 selected={this.state.selectedId}
                 setSelected={this.setSelected}
                 clearSelected={this.clearSelected}/>
          <Legend id='Legend'
                  parties={this.state.parties}/>
        </div>
        <div id='sidebar'>
          <Bio id='Bio'
               diputado={this.state.selected}
               getDip={this.getDip}
               setSelected={this.setSelected}/>
          <div className='container expanded'>
            <Sidebar id='Sidebar'
                     className='Sidebar'
                     data={Object.values(this.state.roster)}
                     selected={this.state.selectedId}
                     selectCallback={this.setSelected}
                     deselectCallback={this.clearSelected}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
