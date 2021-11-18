import axios from 'axios';
import { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import ProfileFields from './ProfileFields';

function EditProfile() {

    const [user, setUser] = useState ({address: {}});
    const params = localStorage.getItem('loggedInUser');

    useEffect(() => {
        
        axios.get(`http://localhost:8080/findUserById?id=${params}`).then(response => {
            setUser(response.data);
        }).catch(error => {

        });
    }, []);

    return (
        <div className="body-container container pt-3">
            <div className="row text-center">
                <ul className="list-inline">
                    <li className="list-inline-item mx-5"><h5><Link to={'/edit-profile/details'} style={{color: '#00ACC1', 'text-decoration': 'none'}}>View Details</Link></h5></li>
                    <li className="list-inline-item mx-5"><h5><Link to={'/edit-profile/user'} style={{color: '#00ACC1', 'text-decoration': 'none'}}>Edit User Details</Link></h5></li>
                    <li className="list-inline-item mx-5"><h5><Link to={'/edit-profile/address'} style={{color: '#00ACC1', 'text-decoration': 'none'}}>Edit Address Details</Link></h5></li>
                </ul>
            </div>
            <Route path="/edit-profile/details" component={ProfileFields}/>
            <Route path="/edit-profile/user" component={ProfileFields}/>
            <Route path="/edit-profile/address" component={ProfileFields}/>
        </div>
    );
  }
  
export default EditProfile;