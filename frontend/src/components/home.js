import React from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import '../css/home.css'
import moment from 'moment'

class Home extends React.Component {
    state = {
        trips: []
    }  
    componentDidMount() { 
        axios.get(`http://localhost:3001/api/getNewestTrips`).then(res => {
            const trips = res.data.data
            this.setState(() => {
                if (this.props.name) {
                    return {trips: trips.filter(trip => trip.user.userName == this.props.name)}
                }
                return {trips: trips}
            })
            
            
        }) 
    }
    render() { 
        return ( 
            <div>
                <ul>
                    {this.state.trips.map(trip => 
                        <Link className="link" to={'/trip/'+trip._id}>
                            <div className="wrap">
                                <Link className="user-wrap"  to={'/users/'+trip.user.userName}>
                                    <img className="user-pic" src={ require('../assets/logos/default-user.png') } />
                                    <div className="user-name">{trip.user.userName}</div>
                                </Link>
                                <div className="location" >
                                    <p>{trip.startAddress}-{trip.endAddress}</p>
                                </div>
                                <div className="date">
                                    <p>{moment(trip.departureDate).format('MMMM Do YYYY, h:mm:ss a')} - {moment(trip.returnDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
                                </div>
                            </div>
                        </Link>
                        
                    )}
                </ul>
            </div>
         );
    }
}
 
export default Home;