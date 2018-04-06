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

import Header from './Header.jsx'
import Home from './Home.jsx'
import MarkdownComponent from './MarkdownComponent.jsx'

import './App.css'

import { HashRouter, Route, Switch } from 'react-router-dom'

const HomeRoute = () => (
  <Home/>
)
const FaqRoute = () => (
  <MarkdownComponent src={require('./preguntas.md')}/>
)
const MethodologyRoute = () => (
  <MarkdownComponent src={require('./metodologia.md')}/>
)
// TODO(diego) metodologia is hardcoded because only metodologia can refer to simple.html. Should get the
// referrer programatically, though.
const SimpleRoute = ({match, history}) => { history.replace('metodologia'); window.location = match.path; }

const App = () => (
  <HashRouter>
    <div id="master">
      <Header/>
      <Switch>
        <Route exact path="/" component={HomeRoute}/>
        <Route exact path="/preguntas" component={FaqRoute}/>
        <Route exact path="/metodologia" component={MethodologyRoute}/>
        <Route exact path="/simple.html" component={SimpleRoute}/>
      </Switch>
    </div>
  </HashRouter>
);

export default App;
