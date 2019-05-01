import React, {Component} from "react";
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import SearchBox from '../components/SearchBox';
import {Redirect} from 'react-router-dom';
import ErrorBoundry from '../components/Errors';
import { setSearchField } from '../actions';

//receives state information
const mapStateToProps = (state) => {
    return {
        searchField: state.searchField //change this is state.searchTodos.searchField when there's gonna be more states
    }
};

//dispatch state information if it changes
const mapDispatchToProps = (dispatch) => {
    //properties that are actions that needs to be sent to the state
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            redirect: false
          }
        }

    componentWillMount() {
        console.log()
        if( sessionStorage.getItem('userData')){
            fetch('http://192.168.99.100:4500/read.php')
                .then(response=> response.json())
                .then(response => {this.setState({ todos: response.records})});
  
        } else {
            this.setState({redirect : true});
        }
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
        const { todos } = this.state;
        const { searchField, onSearchChange } = this.props;
        const filteredTodos = todos.filter(todo => todo.description.toLowerCase().includes(searchField.toLowerCase()));
    
        return(
            <div className="col-sm">
                <button type="button" onClick={this.logout}>LogOut</button>
                <SearchBox searchChange={ onSearchChange }/>
                <ErrorBoundry>
                    <TodoList todos={filteredTodos}/>
                </ErrorBoundry>
            </div>
        )
    }
}

//connect is a higher order function. a Function that returns another function
//subscribe to Store changes
export default connect(mapStateToProps, mapDispatchToProps)(Home);