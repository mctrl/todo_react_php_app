import React, {Component} from "react";
import TodoList from './TodoList';
import SearchBox from './SearchBox';
import {Redirect} from 'react-router-dom'


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            searchfield: '',
            redirect: false
          }
        }

    componentWillMount() {
        if( sessionStorage.getItem('userData')){
            fetch('http://192.168.99.100:4500/read.php')
                .then(response=> response.json())
                .then(response => {this.setState({ todos: response.records})});
  
        } else {
            this.setState({redirect : true});
        }
    }

    // componentDidMount() {
    //     fetch('http://192.168.99.100:4500/read.php')
    //       .then(response=> response.json())
    //       .then(response => {this.setState({ todos: response.records})});
    //   }
    
    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    logout = () => {
        sessionStorage.setItem('userData', "");
        sessionStorage.clear();
        this.setState({redirect: true});
    }

    render() {
        if(this.state.redirect) {
            return(
                <Redirect to={'/login'}/>
            )
        }
        const { todos, searchfield } = this.state;
        const filteredTodos = todos.filter(todo => todo.description.toLowerCase().includes(searchfield.toLowerCase()));
    
        return(
            <div className="col-sm">
                <button type="button" onClick={this.logout}>LogOut</button>
                <SearchBox searchChange={this.onSearchChange}/>
                <TodoList todos={filteredTodos}/>
            </div>
        )
    }
}

export default Home;