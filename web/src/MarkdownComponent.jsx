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

import './MarkdownComponent.css'


class MarkdownComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: undefined
    };
  }

  render() {
    return (
      <div className='md-container'>
        <div className='md'
             dangerouslySetInnerHTML={{__html: this.props.src}}>
        </div>
      </div>
    );
  }
}

export default MarkdownComponent;
