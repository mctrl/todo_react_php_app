import React, {Component} from "react";

class ErroBoundry extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasError: false
        }
    }

    componentDidCatch(error, info) {
        this.setState({hasError: true});
    }

    render() {
        if(this.state.hasError){
            return(
                <h1>Oppppsss something went wrong</h1>
            )
        } else {
            return this.props.children;
        }
    }
}

export default ErroBoundry;