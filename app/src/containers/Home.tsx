import React, {Component} from "react";
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import SearchBox from '../components/SearchBox';
import {Redirect} from 'react-router-dom';
import ErrorBoundry from '../components/Errors';
import { setSearchField, requestTodos } from '../actions';

interface ITodo {
    id: number,
    title: string,
    description: string,
    created: Date,
    username: string
}
interface IHomeProps {
    searchField: string,
    todos: Array<ITodo>,
    isPending: boolean,
    error: object,
    onRequestTodos():any
    onSearchChange():any
}

interface IHomeState {
    redirect: boolean
}
//receives state information
const mapStateToProps = (state) => {
    return {
        searchField: state.searchTodos.searchField,
        todos: state.requestTodos.todos,
        isPending: state.requestTodos.isPending,
        error: state.requestTodos.error
    }
};

//dispatch state information if it changes
const mapDispatchToProps = (dispatch) => {
    //properties that are actions that needs to be sent to the state
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestTodos: () => dispatch(requestTodos()) 
    }
};

class Home extends Component<IHomeProps, IHomeState> {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
          }
        }

    componentWillMount() {
        if( sessionStorage.getItem('userData')){
            this.props.onRequestTodos();
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
        const { searchField, onSearchChange, todos, isPending } = this.props;
        const filteredTodos = todos.filter(todo => todo.description.toLowerCase().includes(searchField.toLowerCase()));
    
        return isPending ? 
        <h1>Loading ...</h1> :
        (
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