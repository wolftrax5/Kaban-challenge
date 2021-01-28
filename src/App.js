import React, { Component } from 'react';
import './App.css';
import 'h8k-components';
import KanbanBoard from './components/kanban-board/index.js';

const title = "Kanban Board";

class App extends Component {
  render() {
    return (
      <div>
        <h8k-navbar header={title}></h8k-navbar>
        <h1>Hello world</h1>
      </div>
    );
  }
}

export default App;
