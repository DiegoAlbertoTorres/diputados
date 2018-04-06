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

import Toggle from 'react-toggle'
import Slider from 'rc-slider'

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import playIcon from '@fortawesome/fontawesome-free-solid/faPlay'
import pauseIcon from '@fortawesome/fontawesome-free-solid/faPause'

import './GraphControls.css'
import 'react-toggle/style.css' // for ES6 modules
import 'rc-slider/assets/index.css';

class GraphControls extends Component {
  constructor(props) {
    super(props);
    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay(ev) {
    if (ev.target.checked)
      this.props.playSimulation() 
    else
      this.props.pauseSimulation()
  }
  render() {
    var zoomEl = null
    if (this.props.showZoom) {
      zoomEl = <span className='zoom-controls'>
        <button className='zoom slider-button'
                onClick={this.props.zoomOut}>-</button>
        <Slider className='zoom slider'
                min={0}
                max={100}
                defaultValue={10}
                value={this.props.zoom}
                onChange={this.props.zoomGraph}/>
        <button className='zoom slider-button'
                onClick={this.props.zoomIn}>+</button>
      </span>
    }
    return (
      <div className='GraphControls'>
        {zoomEl}
        <span className='play-pause-toggle'>
          <Toggle checked={!this.props.paused}
                  icons={{
                    checked: <FontAwesomeIcon icon={playIcon}/>,
                    unchecked: <FontAwesomeIcon icon={pauseIcon}/>,
                  }}
                  onChange={this.togglePlay} />
        </span>
      </div>
    )
  }
}
export default GraphControls
