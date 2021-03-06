import React, {Component} from 'react';
import { PostData } from '../services/PostData';
import {Redirect} from 'react-router-dom'

interface ILoginProps {

}
interface ILoginState {
    username: string,
    password: string,
    redirect: boolean
}
class Login extends Component<ILoginProps, ILoginState> {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            redirect: false
        }
    }

    login = () => {
        if(this.state.username && this.state.password) {
            PostData(this.state)
            .then((response) => {
                sessionStorage.setItem('userData', JSON.stringify(response))
                this.setState({redirect: true})
            })
            .catch((response) => {
                console.log('fail', response)
            })
        }

    }

    onChange = (event) => {
        //test if this works
        // var key = event.target.name
        // if (Object.keys(this.state).includes(key)) {
        //     this.setState({[key]: event.target.value } as Pick<ILoginState, keyof ILoginState>);
        //   }
        this.setState({[event.target.name]: event.target.value } as Pick<ILoginState, keyof ILoginState>);
        //this.setState({ [event.target.name] : event.target.value})
    }

    render(){
        if(this.state.redirect || sessionStorage.getItem('userData')) {
            return(
                <Redirect to={'/'}/>
            )
        }
        return (
            <div className="col-sm">
                <div className="form-group">
                    <label>Email address</label>
                    <input type="text" name="username" className="form-control" id="exampleInputEmail1" placeholder="Enter email" onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.onChange}/>
                </div>
                <input type="submit" className="btn btn-primary" onClick={this.login} value="Submit"/>
            </div>
        );
    }
}

export default Login;