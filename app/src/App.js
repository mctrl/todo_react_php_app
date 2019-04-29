import React, { Component } from 'react';
import TodoList from './components/TodoList';
import SearchBox from './components/SearchBox';

class App extends Component  {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      searchfield: ''
    }
  }

  componentDidMount() {
    fetch('http://192.168.99.100:4500/read.php')
      .then(response=> response.json())
      .then(response => {this.setState({ todos: response.records})});
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { todos, searchfield } = this.state;
    const filteredTodos = todos.filter(todo => todo.description.toLowerCase().includes(searchfield.toLowerCase()));
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm">
          </div>
          <div className="col-sm">
            <SearchBox searchChange={this.onSearchChange}/>
            <TodoList todos={filteredTodos}/>
          </div>
          <div className="col-sm">
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
