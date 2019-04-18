import React from 'react';
import Cookies from 'js-cookie';
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import axios from 'axios';
import moment from 'moment'
import {Link, Redirect} from 'react-router-dom';

class AddTrip extends React.Component {
    state = {  
        from: '',
        to: '',
        departureDate: moment().format(),
        roundTrip: false,
        returnDate: moment().format(),
        passangers: '',
        price: '',
        aproved: false
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        axios.post(`http://localhost:3001/api/addTrip/`, 
        {
            userID: Cookies.get('userId'),
            trip: {
                startAddress: this.state.from,
                endAddress: this.state.to,
                departureDate: this.state.departureDate,
                roundTrip: this.state.roundTrip,
                returnDate: this.state.returnDate,
                passangers: this.state.passangers,
                price: this.state.price
            }
        },
        { headers: { Authorization: 'Bearer RideSharer-token'}}).then(res => {    
            if(res.data.success) {
                this.setState({
                    aproved: this.state.aproved = true
                });
            }
        }) 
    }
    renderRedirect = () => {
        if (this.state.aproved) {
            return <Redirect to='/' />
        }
    }


    render() { 
        return ( 
            <div  className="Login">
                {this.renderRedirect()}
                <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="from">
                    <FormControl
                    autoFocus
                    type="text"
                    placeholder="From"
                    value={this.state.from}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="to">
                    <FormControl
                    autoFocus
                    type="text"
                    placeholder="To"
                    value={this.state.to}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="departureDate">
                    <FormControl
                    autoFocus
                    type="text"
                    placeholder="Departure date"
                    value={this.state.departureDate}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <div key="checkbox" className="mb-3">
                    <Form.Check inline label="Return" value="true" name="formHorizontalRadios" onChange={this.handleChange} type="checkbox"id="roundTrip" />
                </div>
                <FormGroup controlId="returnDate">
                    <FormControl
                    autoFocus
                    type="text"
                    placeholder="Return date"
                    value={this.state.returnDate}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="passangers">
                    <FormControl
                    value={this.state.passangers}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="passangers"
                    />
                </FormGroup>
                <FormGroup controlId="price">
                    <FormControl
                    value={this.state.price}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="price"
                    />
                </FormGroup>
                <Button
                    block
                   
                    type="submit">
                    Add
                </Button>
                </form>
            </div>
        );
    }
}
 
export default AddTrip;