import React from 'react';
import axios from 'axios';
import '../css/user.css'
import Home from './home';

class User extends React.Component {
    state = { 
        user: {},
        submenu: 'trips'
     }
    componentDidMount() {  
        axios.get(`http://localhost:3001/api/getUserByUsername/${this.props.match.params.user}`, { headers: { Authorization: 'Bearer RideSharer-token'}}).then(res => {
            const user = res.data.data[0]
            this.setState(() => {
                return {user: user}
            })
            console.log(user)
            
        }) 
    }

    onItemClick = (event) => {
        const e = event.currentTarget.dataset.id
        this.setState(() => {
            return {submenu: e}
        })
    }

    render() { 
        return (
            <div>
                <div className="user-topbar-wrap">
                    <div className="user-view-wrap">
                        <div className="user-name-wrap">
                            <img className="large-user-pic" src={ require('../assets/logos/default-user.png') } />
                            <p className="user-name">{this.state.user.userName}</p>
                        </div>
                    </div>
                    <div className="menu-line">
                        <div onClick={this.onItemClick} data-id="trips" className="menu-button">TRIPS</div>
                        <div onClick={this.onItemClick} data-id="info" className="menu-button">INFO</div>
                    </div> 
                </div>
                { this.state.submenu == 'trips' && this.state.user.userName
                    ?   <Home name={this.state.user.userName} ></Home>
                    :   
                    <div className="info-wrap">
                        <div>
                            First Name: {this.state.user.firstName}
                        </div>
                        <div>
                            Last Name: {this.state.user.lastName}
                        </div>
                        <div>
                            Email: {this.state.user.email}
                        </div>
                    </div>
                }
                
            </div>
         );
    }
}
 
export default User;