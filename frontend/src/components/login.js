import React from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import '../css/login.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import {Link, Redirect} from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
        userName: "",
        password: "",
        login: false
    };
    }

    validateForm() {
    return this.state.userName.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    renderRedirect = () => {
        if (Cookies.get('userId') || this.state.login) {
            return <Redirect to='/' />
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        axios.post(`http://localhost:3001/api/getUser/`, 
        {
            email: this.state.userName,
            password: this.state.password
        },
        { headers: { Authorization: 'Bearer RideSharer-token'}}).then(res => {    
            if(res.data.data) {
                Cookies.set('userId', this.state.userName, { expires: 1 });
                this.setState({
                    logn: this.state.login = true
                });
            }
        }) 
    }
    render() { 
        return ( 
            <div className="Login">
                {this.renderRedirect()}
                <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="userName">
                    <FormControl
                    autoFocus
                    type="text"
                    placeholder="User Name"
                    value={this.state.userName}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="password">
                    <FormControl
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                    placeholder="******"
                    />
                </FormGroup>
                <Button
                    block
                   
                    disabled={!this.validateForm()}
                    type="submit">
                    Login
                </Button>
                <Link className="register" to={'/register'}>Register</Link>
                </form>
          </div>
        );
    }
}
 
export default Login;