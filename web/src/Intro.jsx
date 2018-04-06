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

import './Intro.css'

import Cookies from 'universal-cookie';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import prevIcon from '@fortawesome/fontawesome-free-solid/faAngleUp'
import nextIcon from '@fortawesome/fontawesome-free-solid/faAngleDown'
import lastIcon from '@fortawesome/fontawesome-free-solid/faAngleDoubleDown'

function PrevArrow(props) {
  var className = props.className;
  if ((props.currentSlide !== (props.slideCount - 1)) && 
      (!className.includes('slick-disabled'))) {
    className = props.className + ' slick-disabled'
  }
  return (
    <div className={className + ' arrow-container arrow-container-prev'}>
      <div className={'arrow arrow-prev'}
           onClick={props.goToFirst}>
        <FontAwesomeIcon className='arrow-icon' icon={prevIcon}/>
      </div>
    </div>
  );
};

function NextArrow(props) {
  return (
    <div className={props.className + ' arrow-container arrow-container-next'}>
      <div className={'arrow arrow-next'}
           onClick={props.onClick}>
        <FontAwesomeIcon className='arrow-icon' icon={nextIcon}/>
      </div>
      <div className={'arrow arrow-last'}
           onClick={props.goToLast}>
        <FontAwesomeIcon className='arrow-icon' icon={lastIcon}/>
      </div>
    </div>
  );
};

class Intro extends React.Component {
  componentDidMount() {
    const el = document.getElementsByClassName('slick-list')[0];
    el.addEventListener('wheel', (e) => {
      this.slide(e.deltaY);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selected === null && this.props.selected != null && this.slider.innerSlider.state.currentSlide === 0) {
      setTimeout(() => this.slider.slickGoTo(1), 500);
    }
  }

  slide(y){
    if (y > 0) {
       this.slider.innerSlider.slickNext();
    } else {
       this.slider.innerSlider.slickPrev();
    }
  }

  render() {
    const cookies = new Cookies();
    this.slides = [
        <div className={'intro-slide'}>
          <h1>¡Hola!</h1>
          <p>
            Bienvenido a <i>La telaraña del congreso</i>, una simulación de la LXIII
            legislatura de la cámara de diputados de México.
          </p>
          <p>
            Cada círculo corresponde a una diputada o un diputado en el
            congreso.
          </p>
          <p>
            ¡Haz click sobre un diputado!
          </p>
        </div>,
        <div className={'intro-slide'}>
          <h1>¿Y luego?</h1>
          <p>
            En la simulación los diputados se acomodan cerca de otros
            que votaron de manera similar en el pleno.
          </p>
          <p>
            Si ves a un grupo de diputados muy unido es porque votaron muy
            parecido.
          </p>
          <p>
            En cambio, cuando dos diputados están muy alejados es porque
            éstos rara vez votaron de manera similar.
          </p>
        </div>,
        <div className={'intro-slide'}>
          <h1>¿Y a mi qué?</h1>
          <p>
            Las agrupaciones te ayudarán a discernir los distintos grupos de
            poder dentro del congreso. Por ejemplo, en el centro puedes ver a un enorme
            grupo de diputados: todos ellos votan muy similar.
          </p>
          <p>
            Además, las líneas que aparecen al hacer click a uno de ellos indican a
            sus cinco colaboradores más cercanos.
          </p>
        </div>,
        <div className={'intro-slide'}>
          <h1>¿Ya por fin?</h1>
          <p>
            También puedes interactuar con <i>la telaraña</i> haciendo zoom, picándole al botón
            de pausa o a través de la lista que aparecerá a continuación.
          </p>
          <p>
            Si tienes más preguntas, no olvides revisar la sección de metodología y
            las preguntas frecuentes.
          </p>
        </div>,
        <div>
        </div>
    ];

    var settings = {
      dots: false,
      infinite: false,
      draggable: false,
      swipe: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: cookies.get('skip-intro') ? (this.slides.length - 1) : 0,
      vertical: true,
      adaptiveHeight: true,
      nextArrow: <NextArrow goToLast={e => this.slider.slickGoTo(this.slides.length - 1)}/>,
      prevArrow: <PrevArrow slideCount={this.slides.length} goToFirst={e => this.slider.slickGoTo(0)}/>,
      afterChange: (currentSlide) => {
        if (currentSlide === (this.slides.length - 1)) {
          const cookies = new Cookies();
          cookies.set('skip-intro', 'true', { maxAge: 604800}); // 1 week
        }
      }
    };

    return (
      <Slider {...settings}
              className={this.props.id}
              ref={slider => (this.slider = slider)}>
        {this.slides}
      </Slider>
    );
  }
}

export default Intro;
