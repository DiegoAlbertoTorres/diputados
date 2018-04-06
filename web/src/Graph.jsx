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
import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force'
import { select, event } from 'd3-selection'
import { drag } from 'd3-drag'
import { rgb } from 'd3-color'
import { scaleLinear } from 'd3-scale'
import * as d3 from 'd3-zoom'

import './Graph.css'
import GraphControls from './GraphControls.jsx'

class Graph extends Component {
  constructor(props) {
    super(props);

    this.zoomToStrength = scaleLinear().domain([0, 100]).range([-10, -2000]);
    this.qualityToCutoff = scaleLinear().domain([0, 100]).range([2, 2e-3]);

    const defaultQuality = 0;
    const defaultZoom = 30;

    this.alphaTarget = 0.003
    this.initialAlpha = 1.0
    this.simulation = forceSimulation()
                        .alphaTarget(this.alphaTarget)
                        .force('link', forceLink().id(function(d) { return d.id; }))
                        .force('charge', forceManyBody()
                          .strength(this.zoomToStrength(defaultZoom)))
                        .force('center', forceCenter())
    this.defaultDecay = this.simulation.alphaDecay()

    this.baseNodeRadius = 10.0;
    this.baseNodeStrokeWidth = 2.5;

    this.baseNodeSelectedRadius = 20.0;
    this.baseNodeSelectedStrokeWidth = 5.0;

    this.state = {
      quality: defaultQuality,
      zoom: defaultZoom,
      paused: false
    };

    this.handleSelection = this.handleSelection.bind(this);
    this.handleClickEvent = this.handleClickEvent.bind(this);
    this.drawGraph = this.drawGraph.bind(this);
    this.selectNode = this.selectNode.bind(this);
    this.deselectNode = this.deselectNode.bind(this);
    this.recenterGraph = this.recenterGraph.bind(this);
    this.zoomInGraph = this.zoomInGraph.bind(this);
    this.zoomOutGraph = this.zoomOutGraph.bind(this);
    this.increaseQuality = this.increaseQuality.bind(this);
    this.decreaseQuality = this.decreaseQuality.bind(this);
    this.changeQuality = this.changeQuality.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.togglePause = this.togglePause.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.recenterGraph);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      this.drawGraph(this.node);
    }
    if (this.props.selected !== prevProps.selected) {
      this.handleSelection(prevProps.selected, this.props.selected)
    }
  }

  selectNode(id, node, key_edges) {
    if (node.empty()) {
      return;
    }
    const self = this;
    node.each(function() { this.parentNode.appendChild(this); });
    node.classed('selected', true);

    const x = Number(node.attr('cx'));
    const y = Number(node.attr('cy'));
    select(this.svg).transition()
        .duration(750)
        .call(self.zoom.translateTo, x, y); 

    const k = d3.zoomTransform(self.svg).k
    node.attr('r', this.baseNodeSelectedRadius / k);
    node.attr('stroke-width', (this.baseNodeSelectedStrokeWidth / k).toString() + 'px');
    node.each(function() {
      this.__edges.forEach(function(e) {
        e.classList.add('selected');

        select(e).attr('stroke-width', (d, i, g) => 
          select(g[i]).attr('stroke-original-width') / k 
        )
      });
    });
  }

  deselectNode(id, node, key_edges) {
    if (node.empty()) {
      return;
    }

    const self = this;
    node.classed('selected', false);

    const k = d3.zoomTransform(self.svg).k
    node.attr('r', this.baseNodeRadius / k);
    node.attr('stroke-width', (this.baseNodeStrokeWidth / k).toString() + 'px');
    node.each(function() {
      this.__edges.forEach(function(e) { e.classList.remove('selected'); });
    });
  }

  handleSelection(prevId, newId) {
    if (prevId != null) {
      var prevNode = select(this.svg).select('#node_' + prevId);
      var prevKeyEdges = select(this.svg).selectAll('.keyEdge_' + prevId);
      this.deselectNode(prevId, prevNode, prevKeyEdges);
    }
    if (newId != null) {
      var node = select(this.svg).select('#node_' + newId);
      var keyEdges = select(this.svg).selectAll('.keyEdge_' + newId);
      this.selectNode(newId, node, keyEdges);
    }
  }

  handleClickEvent(e) {
    if (e.id === this.props.selected){
      this.props.clearSelected();
    } else {
      this.props.setSelected(e.id);
    }
  }

  recenterGraph() {
    const bbox = this.svg.getBoundingClientRect();

    this.width = bbox.width;
    this.height = bbox.height;

    this.simulation.force('center').x(this.width / 2).y(this.height / 2);
  }

  zoomGraph(zoom) {
    this.setState({
      zoom: Number(zoom)
    });
    select(this.svg)
      .selectAll('.node')
      .attr('r', this.baseNodeRadius * 0.01 * (zoom + 10))
      .attr('stroke-width', (this.baseNodeStrokeWidth * 0.01 * (zoom + 10)).toString() + 'px');
  }

  zoomInGraph() {
    if (this.state.zoom <= 90) {
      this.zoomGraph(this.state.zoom + 10)
    } else {
      this.zoomGraph(100);
    }
  }

  zoomOutGraph() {
    if (this.state.zoom >= 10) {
      this.zoomGraph(this.state.zoom - 10)
    } else {
      this.zoomGraph(0);
    }
  }
  
  changeQuality(quality) {
    this.setState({
      quality: Number(quality)
    });
    this.drawGraph(this.node)
  }

  increaseQuality() {
    if (this.state.quality <= 90) {
      this.changeQuality(this.state.quality + 10);
    } else {
      this.changeQuality(100);
    }
  }

  decreaseQuality() {
    if (this.state.quality >= 10) {
      this.changeQuality(this.state.quality - 10);
    } else {
      this.changeQuality(0);
    }
  }

  pause() {
    if (this.state.paused) {
      return;
    }
    this.setState({
      paused: true
    });
    this.simulation.stop();
  }

  resume() {
    if (!this.state.paused) {
      return;
    }
    this.setState({
      paused: false
    });
    this.simulation.restart();
  }

  togglePause() {
    if (this.state.paused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  drawGraph() {
    var component = this;
    var svg = select(this.svg);

    component.recenterGraph();

    svg.selectAll('*').remove();

    var graph = component.props.data

    if (graph === undefined) {
      const bbox = this.svg.getBoundingClientRect();
      const width = bbox.width;
      const height = bbox.height;
      svg.append('text')
         .attr('x', width / 2)
         .attr('y', height / 2)
         .text('Loading...');

      return;
    }

    select('body').on('keydown', () => (event.keyCode === 32) ? this.togglePause() : 0);

    var keepEdge = function(e, cutoff) {
      if ((e.mst !== undefined) || (e['key_nodes'] !== undefined)) {
        return true;
      }
      return e.btws > cutoff;
    }

    var container = svg.append('g');

    var zoomPause = false;
    var zoom = d3.zoom()
              .scaleExtent([1 / 4, 4])
              .on('zoom', zoomed)
              .on('start', () => { if (!component.state.paused) { zoomPause = true; component.simulation.stop() }})
              .on('end', () => { if (zoomPause) { zoomPause = false; component.simulation.restart() }})
    this.zoom = zoom;
    svg.call(zoom)

    var minWeight = Math.min(...graph.links.map(l => l.weight));
    var maxWeight = Math.max(...graph.links.map(l => l.weight));

    var cutoff = component.qualityToCutoff(component.state.quality);
    var link = container.append('g')
      .attr('class', 'edge')
      .selectAll('line')
      .data(graph.links)
      .enter()
        .filter(e => keepEdge(e, cutoff))
        .append('line')
        .attr('pointer-events', 'none')
        .attr('stroke-original-width', function(d) {
          var widthScale = scaleLinear()
                .domain([minWeight, maxWeight])
                .range([5, 30]);
          return widthScale(d.weight);
        })
        .attr('class', function(e) { 
          if (e['key_nodes'] !== undefined) {
            return e['key_nodes'].map(kn => 'keyEdge_' + kn).join(' ');
          }
          return '';
        })
        .attr('source', e => e.source)
        .attr('target', e => e.target);

    this.nodes = container.append('g')

    var node = this.nodes
      .attr('class', 'node')
      .selectAll('circle')
      .data(graph.nodes)
      .enter()
        .filter(n => { return n['isolate'] === undefined; })
        .append('circle')
        .attr('class', 'node')
        .attr('id', function(d) { return 'node_' + d.id; })
        .attr('r', this.baseNodeRadius)
        .attr('stroke-width', this.baseNodeStrokeWidth + 'px')
        .attr('fill', function(d) { return rgb.apply(this, d.color); })
        .on('click', component.handleClickEvent)
        .call(drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended))

    svg.select('.edge').selectAll('line').each(function(l) {
      const edgeNode = this;
      if (!l.key_nodes) {
        return;
      }
      l.key_nodes.forEach(function(id) {
        select(component.svg)
          .select('.node')
          .select('#node_' + id)
          .each(function() {
            if (this.__edges === undefined) {
              this.__edges = [edgeNode];
            } else {
              this.__edges.push(edgeNode);
            }
          });
      });
    });

    node.append('title')
        .text(function(d) { return d.name; });

    component.simulation
        .nodes(graph.nodes)
        .on('tick', ticked);

    const weights = graph.links.map(function(l) { return l.weight })
    var min = Math.min(...weights)
    var max = Math.max(...weights)
    var weightScale = scaleLinear()
          .domain([min, max])
          .range([0, 2]);
    component.simulation.force('link')
        .links(graph.links)
        .strength(function(l){
          var weight = weightScale(l.weight);
          return weight;
        });

    function zoomed() {
      const k = event.transform.k 
      select(component.svg)
        .selectAll('.node')
        .attr('r', component.baseNodeRadius / k)
        .attr('stroke-width', (component.baseNodeStrokeWidth / k).toString() + 'px');

      select(component.svg)
        .selectAll('.node.selected')
        .attr('r', component.baseNodeSelectedRadius / k)
        .attr('stroke-width', (component.baseNodeSelectedStrokeWidth / k).toString() + 'px');

      select(component.svg)
        .selectAll('.edge line.selected')
        .attr('stroke-width', function(d, i, g) {
          return (Number(select(g[i]).attr('stroke-original-width')) / k).toString() + 'px';
        });
      container.attr('transform', event.transform);
    }

    function ticked() {
      component.simulation.alpha(Math.min(0.5, component.simulation.alpha()));
      link
        .attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; });

      node
        .attr('cx', function(d) { return d.x })
        .attr('cy', function(d) { return d.y; })
    }

    function dragstarted(d) {
      if (!event.active) component.simulation.alphaTarget(component.alphaTarget * 3);
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(d) {
      if (!event.active) component.simulation.alphaTarget(component.alphaTarget);
      d.fx = null;
      d.fy = null;
    }
  }

  render() {
    return (
      <div className='Graph'>
        <svg className='svg'
             ref={svg => this.svg = svg}>
        </svg>
        <GraphControls showZoom={false}
                       zoomIn={this.zoomInGraph}
                       zoomOut={this.zoomOutGraph}
                       zoomGraph={e => this.zoomGraph(e)}
                       zoom={this.state.zoom}
                       increaseQuality={this.increaseQuality}
                       decreaseQuality={this.decreaseQuality}
                       changeQuality={e => this.changeQuality(Number(e.target.value))}
                       quality={this.state.quality}
                       paused={this.state.paused}
                       playSimulation={this.resume}
                       pauseSimulation={this.pause}
                      />

      </div>
    );
  }
}
export default Graph
