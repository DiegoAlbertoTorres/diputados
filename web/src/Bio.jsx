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

import ProgressiveImage from 'react-progressive-image';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import plurIcon from '@fortawesome/fontawesome-free-solid/faGavel'
import electedIcon from '@fortawesome/fontawesome-free-solid/faUserPlus'
import linkIcon from '@fortawesome/fontawesome-free-solid/faLink'
import emailIcon from '@fortawesome/fontawesome-free-solid/faEnvelope'
import corruptionIcon from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import votesIcon from '@fortawesome/fontawesome-free-solid/faClipboardCheck'
import absencesIcon from '@fortawesome/fontawesome-free-solid/faTimesCircle'

import './Bio.css'


class Bio extends Component {
  static defaultProps = {
    diputado: {
      name: 'Diego Alberto Torres Quintanilla',
      party: 'unk',
      id: 'yo',
      url: 'http://es.diegotorr.es',
      email: 'diego@diegotorr.es',
      state: 'Nuevo León',
      district: '666',
      curul: '666',
      type: 'plurinominal',
      substitute: 'Diego Fernández de Cevallos',
      plurinominal: false,
      votes: 666,
      absences: 666,
      abstentions: 666
    }
  }

  render() {
    var diputado = this.props.diputado;

    var info;
    if (diputado == null) {
      info = ( 
        <div className='info empty-info'>
        </div>
      );
    } else {
      if (this.ref !== undefined) {
        //this.ref.style.height = '20%';
      }
      var substituteElement;
      var substitute = this.props.getDip(diputado.substitute);
      var substitute_of = this.props.getDip(diputado.substitute_of);

      if (substitute) {
        substituteElement = <div className='substitute'>
          <a onClick={e => this.props.setSelected(substitute.id)}>
            Suplente: <span className='substitute-name'>{substitute.name}</span>
          </a>
        </div>
      } else if (substitute_of) {
        substituteElement = <div className='substitute-of'>
          <a onClick={e => this.props.setSelected(substitute_of.id)}>
            Suplente de: <span className='substitute-name'>{substitute_of.name}</span>
          </a>
        </div>
      }

      var plurElement;
      if (diputado.plurinominal) {
        plurElement = <div className='type'>
          <span><FontAwesomeIcon icon={plurIcon}/> Plurinominal</span>
        </div>
      } else {
        plurElement = <div className='type'>
          <span><FontAwesomeIcon icon={electedIcon}/> Elección</span>
        </div>
      }
      info = (
        <div className='info-container'>
          <div className='info populated-info'>
            <div className='name'>
              <span title={diputado.name}>{diputado.name}</span>
            </div>
            <div className='extra-info'>
              <div className='distrito'>
                <span>{diputado.state}, distrito {diputado.district}</span>
              </div>
              {plurElement}
              <div className='stats'>
                <span>
                  <FontAwesomeIcon className='stat-icon' icon={votesIcon}/> {diputado.votes} votos,
                  <FontAwesomeIcon className='stat-icon-shifted' icon={absencesIcon}/> {diputado.absences} faltas 
                </span>
              </div>
            </div>
            {substituteElement}
            <div className='links'>
              <a className='hyperlink'
                 href={diputado.url}
                 target='_blank'>
                <FontAwesomeIcon icon={linkIcon}/>
              </a>
              <a className='email'
                 href={'mailto:' + diputado.email}>
                <FontAwesomeIcon icon={emailIcon}/>
              </a>
              <a className='corruption'
                 href={'https://google.com/search?q=corrupcion+' + diputado.name.split(' ').join('+')}
                 target='_blank'>
                <FontAwesomeIcon icon={corruptionIcon}/>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div id={this.props.id}
           className='Bio'
           ref={ref => this.ref = ref}>
        <div className='crop'> 
          <ProgressiveImage src={diputado ? 'img/' + diputado.id + '.jpg' : 'no_image.jpg'}
                            onError={(e) => {e.target.src='no_image.jpg'}}>
            {(src, loading) => {
              if (loading) {
                return <div className='loader-container'><div className='loader'></div></div>
              } else {
                return <img className={'picture ' + (diputado ? diputado.party ? diputado.party.toLowerCase() : "" : "")}
                            alt={diputado ? diputado.name : ""}
                            src={src}/>
              }
            }}
          </ProgressiveImage>{info}
        </div>
      </div>
    )
  }
}

export default Bio
