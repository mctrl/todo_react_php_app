import React, {Component} from "react";

interface IErroBoundryProps {

}

interface IErroBoundryComponentState {
    hasError: boolean
}
class ErroBoundry extends Component<IErroBoundryProps, IErroBoundryComponentState> {
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