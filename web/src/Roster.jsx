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
import ReactDOM from 'react-dom';

import ReactTable from 'react-table'

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import plurIcon from '@fortawesome/fontawesome-free-solid/faGavel'
import electedIcon from '@fortawesome/fontawesome-free-solid/faUserPlus'
import deadIcon from '@fortawesome/fontawesome-free-solid/faSkull'
import licenciaIcon from '@fortawesome/fontawesome-free-solid/faPlane'
import activeIcon from '@fortawesome/fontawesome-free-solid/faThumbsUp'
import yesIcon from '@fortawesome/fontawesome-free-solid/faCheck'
import noIcon from '@fortawesome/fontawesome-free-solid/faTimes'

import './Roster.css'

class Roster extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      minRows: 30
    }

    this.select = this.select.bind(this);
    this.resetMinRows = this.resetMinRows.bind(this);
    this.categoricalAccessorFactory = this.categoricalAccessorFactory.bind(this);
    this.categoricalFilterMethodFactory = this.categoricalFilterMethodFactory.bind(this);
    this.categoricalSort = this.categoricalSort.bind(this);
    this.categoricalFilterFactory = this.categoricalFilterFactory.bind(this);
    this.numericalSort = this.numericalSort.bind(this);
    this.isScrolledIntoView = this.isScrolledIntoView.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resetMinRows);
    this.resetMinRows();
  }

  componentDidUpdate = function(prevProps, prevState) {
    if (this.props.selected !== prevProps.selected) {
      this.select(this.props.selected);
    }
  }

  resetMinRows() {
    const bodyNodes = ReactDOM.findDOMNode(this.ref).getElementsByClassName('rt-tbody');
    const rowNodes = ReactDOM.findDOMNode(this.ref).getElementsByClassName('rt-tr-group');
    if ((bodyNodes.length > 0) && (rowNodes.length > 0)) {
      const bodyNode = bodyNodes[0];
      const rowNode = rowNodes[0];
      const bodyHeight = bodyNode.getBoundingClientRect().height;
      const rowHeight = rowNode.getBoundingClientRect().height;
      this.setState({
        minRows: Math.floor(bodyHeight / rowHeight)
      });
    }
  }

  isScrolledIntoView(el, parnt) {
      var rect = el.getBoundingClientRect();
      var elemTop = rect.top;
      var elemBottom = rect.bottom;

      var startOfParent = parnt.getBoundingClientRect().top

      var isVisible = (elemTop >= startOfParent) && (elemBottom <= window.innerHeight);
      return isVisible;
  }
      

  select(id) {
    if (id == null) {
      return;
    }

    const el = document.getElementById('row' + id);
    const table = document.getElementsByClassName('rt-tbody')[0];

    if (el != null && !this.isScrolledIntoView(el, table)){
      el.scrollIntoView({
        // Smooth is too costly to render with a long list
        behavior: 'instant',
        block: 'center'
      });
    }
  }

  categoricalAccessorFactory(field, iconMap) {
    return function(d) {
      const iconField = 'icon' + field
      if (d[iconField]) {
        return d[iconField]
      } else {
        var category = d[field];
        category = category === true ? 'isTrue' : category === false ? 'isFalse' : category
        const icon = <FontAwesomeIcon category={category} icon={iconMap[category]}/>;
        d[iconField] = icon
        return icon
      }
    }
  }

  categoricalFilterMethodFactory(field) {
    return function(filter, row) {
      var value = filter.value;
      if (value === 'all') {
        return true;
      }
      value = value === 'isTrue' ? true : value === 'isFalse' ? false : value;
      return row[field] === filter.value;
    }
  }

  categoricalSort(a, b, desc) {
    return this.ref.props.defaultSortMethod(a.props.category, b.props.category, desc);
  }

  categoricalFilterFactory(categoriesToNames) {
    return function({filter, onChange}) {
      return <select onChange={event => onChange(event.target.value)}
                    style={{ width: '100%' }}
                    value={filter ? filter.value : 'all'}>
               <option value='all'>Todos</option>
              {Object.entries(categoriesToNames).map(([c, name]) => <option key={c} value={c}>{name}</option>)}
             </select>
    }
  }

  numericalSort = (a, b, desc) => {
    // force null and undefined to the bottom
    a = parseInt(a, 10)
    b = parseInt(b, 10)
    return a - b;
  };

  render() {
    const columns = [{
      Header: 'Nombre',
      accessor: 'name',
      //width: 120
    }, {
      id: 'party',
      Header: 'Partido',
      accessor: d => d.party.toUpperCase(),
      width: 80,
      filterMethod: (filter, row) => {
        if (filter.value === 'all') {
          return true;
        }
        if (filter.value) {
          return row[filter.id].toUpperCase() === filter.value;
        }
      },
      Filter: ({ filter, onChange }) =>
        <select onChange={event => onChange(event.target.value)}
                style={{ width: '100%' }}
                value={filter ? filter.value : 'all'}>
          <option value='all'>Todos</option>
          <option value='PES'>PES</option>
          <option value='IND'>IND</option>
          <option value='MVC'>MVC</option>
          <option value='MORENA'>MORENA</option>
          <option value='PANAL'>PANAL</option>
          <option value='PAN'>PAN</option>
          <option value='PRD'>PRD</option>
          <option value='PRI'>PRI</option>
          <option value='PVEM'>PVEM</option>
        </select>
    }, {
      id: 'estado',
      Header: 'Estado',
      accessor: d => d.state,
      width: 120
    }, {
      id: 'absences',
      accessor: d => (d.absence_ratio * 100).toFixed(0) + '%',
      Header: '% Faltas',
      width: 80,
      sortMethod: this.numericalSort,
    }, {
      id: 'status',
      accessor: d => d.status,
      show: false
    }, {
      id: 'status_icon',
      Header: '¿Activo?',
      accessor: this.categoricalAccessorFactory('status', {deceased: deadIcon, licencia: licenciaIcon, active: activeIcon}),
      width: 80,
      filterMethod: this.categoricalFilterMethodFactory('status'),
      sortMethod: this.categoricalSort,
      Filter: this.categoricalFilterFactory({deceased: 'Deceso', licencia: 'Licencia', active: 'Activo'})
    }, {
      id: 'in_plot',
      accessor: d => d.in_plot ? 'isTrue' : 'isFalse',
      show: false
    }, {
      id: 'plurinominal',
      accessor: d => d.plurinominal ? 'isTrue' : 'isFalse',
      show: false
    }, {
      id: 'plurinominal_icon',
      Header: '¿Pluri?',
      accessor: this.categoricalAccessorFactory('plurinominal', {isTrue: plurIcon, isFalse: electedIcon}),
      width: 80,
      filterMethod: this.categoricalFilterMethodFactory('plurinominal'),
      sortMethod: this.categoricalSort,
      Filter: this.categoricalFilterFactory({isTrue: 'Sí', isFalse: 'No'})
    }, {
      id: 'in_plot_icon',
      Header: '¿Visible?',
      accessor: this.categoricalAccessorFactory('in_plot', {isTrue: yesIcon, isFalse: noIcon}),
      width: 80,
      filterMethod: this.categoricalFilterMethodFactory('in_plot'),
      sortMethod: this.categoricalSort,
      Filter: this.categoricalFilterFactory({isTrue: 'Sí', isFalse: 'No'})
    }, {
      id: 'id',
      accessor: d => d.id,
      show: false
    }];

    const getTrProps = function(state, rowInfo, column, instance) {
      if (rowInfo === undefined) {
        return {}
      }
      const cls = [rowInfo.row.party.toLowerCase()]
      if (instance.props.selected === rowInfo.row.id) {
        cls.push('selectedRow')
      }
      return {
        id: 'row' + rowInfo.row.id,
        className: cls.join(' '),
        onClick: (e, handleOriginal) => {
          const id = rowInfo.row.id;
          if (id !== instance.props.selected) {
            instance.props.selectCallback(rowInfo.row.id);
          } else {
            instance.props.deselectCallback();
          }

          if (handleOriginal) {
            handleOriginal();
          }
        } 
      }
    }

    const defaultSortMethod = (a, b, desc) => {
      // force null and undefined to the bottom
      if ((a === null || a === undefined) && (b === null || b === undefined)) {
        return 0;
      } else if (a === null || a === undefined) {
        return 1;
      } else if (b === null || b === undefined) {
        return -1;
      }

      a = typeof a === 'string' ? a.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : a;
      b = typeof b === 'string' ? b.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : b;

      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      }
      return 0;
    };

    const defaultFilterMethod = function(filter, row, column) {
      const id = filter.pivotId || filter.id
      if (row[id] !== undefined) {
        const valStr = String(row[id]).toLowerCase();
        return valStr.includes(filter.value.toLowerCase());
      }
      return true;
    }

    return (
      <div id={this.props.id}
           className='Roster'>
        <ReactTable ref={ref => this.ref = ref}
                    data={this.props.data === undefined ? [] : this.props.data}
                    selected={this.props.selected}
                    selectCallback={this.props.selectCallback}
                    deselectCallback={this.props.deselectCallback}
                    columns={columns}
                    filterable={true}
                    filterAll={true}
                    getTrProps={getTrProps}
                    showPagination={false}
                    showPageSizeOptions={false}
                    pageSize={this.props.data === undefined ? 0 : this.props.data.length}
                    minRows={this.state.minRows}
                    defaultFilterMethod={defaultFilterMethod}
                    defaultSortMethod={defaultSortMethod}
                    onFilteredChange={this.resetMinRows}/>
      </div>
    )
  }
}
export default Roster
