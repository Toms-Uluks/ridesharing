import React from 'react';
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import '../css/login.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import {Link, Redirect} from 'react-router-dom';
import '../css/register.css'

class Register extends React.Component {
    state = { 
        login: false,
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        role: ''
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        axios.post(`http://localhost:3001/api/addUser/`, 
        {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            userName: this.state.userName,
            password: this.state.password,
            role: this.state.role
        },
        { headers: { Authorization: 'Bearer RideSharer-token'}}).then(res => {    
            if(res.data.success) {
                Cookies.set('userId', this.state.userName, { expires: 1 });
                this.setState({
                    logn: this.state.login = true
                });
            }
        }) 
    }

    renderRedirect = () => {
        if (Cookies.get('userId') || this.state.login) {
            return <Redirect to='/' />
        }
    }

    render() { 
        return (  
            <div className="register-wrap">
                {this.renderRedirect()}
               <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="firstName">
                    <FormControl
                    autoFocus
                    type="text"
                    placeholder="First name"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="lastName">
                    <FormControl
                    autoFocus
                    type="text"
                    placeholder="Last name"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="userName">
                    <FormControl
                    autoFocus
                    type="text"
                    placeholder="User Name"
                    value={this.state.userName}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="email">
                    <FormControl
                    autoFocus
                    type="email"
                    placeholder="Email"
                    value={this.state.email}
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
                <div key="radio" className="mb-3">
                    <Form.Check inline label="Passenger" value="0" name="formHorizontalRadios" onChange={this.handleChange} type="radio"id="role" />
                    <Form.Check inline label="Driver" value="1" name="formHorizontalRadios" onChange={this.handleChange} type="radio"id="role" />
                </div>
                <Button
                    block
                   
                    type="submit">
                    Register
                </Button>
                </form> 
            </div>
        );
    }
}
 
export default Register;