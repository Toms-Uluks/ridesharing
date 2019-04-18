import React from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom';
import moment from 'moment'
import '../css/trip.css';

class Trip extends React.Component {
    state = { 
        trip: {}
     }
    componentDidMount() {  
        axios.get(`http://localhost:3001/api/getTrip/${this.props.match.params.tripID}`).then(res => {
            const trip = res.data.data[0]
            this.setState(() => {
                return {trip: trip}
            })
            console.log(trip)
        }) 
    }
    render() { 
        return ( 
        <div className="trip-wrap">
            <Link className="flex v-center" to={'/'}>Go back</Link>
            <div>

                <p className="location">{this.state.trip.startAddress}{this.state.trip.roundTrip ? ' - '+ this.state.trip.endAddress : ''}</p>
                <p>{moment(this.state.trip.departureDate).format('MMMM Do YYYY, h:mm:ss a')}{this.state.trip.roundTrip ? ' - '+ moment(this.state.trip.returnDate).format('MMMM Do YYYY, h:mm:ss a') : ''}</p>
                <p>Available spots: {this.state.trip.passangers}</p>
                <p>Price per passenger: {this.state.trip.price}</p>
            </div>

        </div> );
    }
}
 
export default Trip;