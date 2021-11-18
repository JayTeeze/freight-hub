import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import userImage from '../../images/userImage.png';

function Profile() {

    const [user, setUser] = useState({userId: '', address: {}, resources: [], connections: []});
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        
        // Gets user's information
        axios.get(`http://localhost:8080/findUserById?id=${id}`).then(response => {
            setUser(response.data);
        }).catch(error => {
        });
    }, [id]);

    const toggleEditButtonDisplay = () => {
        if (user.userId === parseInt(localStorage.getItem('loggedInUser'))) {
            return (
                <div className="col">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#00ACC1" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
                <Link className="profile-link" to={'/edit-profile/details'} style={{color: '#00ACC1', display: 'inline-block'}}>Edit Profile</Link>
                </div>
            )
        }
    };

    // <button className="btn btn-outline-info my-2 my-sm-0" onClick={() => history.push({pathname: '/inbox/compose', search: '', state: {toUserId: id}})} type="button">

    const toggleMessageButtonDisplay = () => {
        if (user.userId !== parseInt(localStorage.getItem('loggedInUser'))) {
            return (
                <button className="btn btn-outline-info my-2 my-sm-0" onClick={() => history.push({pathname: '/inbox/compose', search: '', state: {toUserId: id}})} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-reply" viewBox="0 0 16 16">
                        <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z"/>
                    </svg>
                    Message
                </button>
            )
        }
    };

    // Displays business name if not null or user name
    const nameDisplay = (userInfo) => {
        if (userInfo.businessName) {
            return userInfo.businessName;
        } else if (userInfo.firstName && userInfo.lastName) {
            return userInfo.firstName + ' ' + userInfo.lastName;
        } else {
            return userInfo.firstName;
        }
    };

    const toggleAddressDisplay = (address) => {
        if (address.city && address.state) {
            return address.city + ', ' + address.state;
        } else if (address.state) {
            return address.state;
        } else if (address.city) {
            return address.city;
        }
    };

    const toggleBusinessDescriptionDisplay = () => {
        if (user.businessDescription) {
            return (
                <div className="profile-text">
                    <h6>Business Description:</h6>
                    <p>{user.businessDescription}</p>
                </div>
            )
        }
    };

    const toggleTelephoneDisplay = () => {
        if (user.telephone) {
            return (
                <div>
                    <h6>Contact:</h6>
                    <p>{user.telephone}</p>
                </div>
            )
        }
    };

    const toggleWebsiteDisplay = () => {
        if (user.website) {
            return (
                <div>
                    <h6>Website:</h6>
                    <p>{user.website}</p>
                </div>
            )
        }
    };

    const toggleResourcesDisplay = () => {
        if (user.resources) {
            return (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Type</th>
                            <th scope="col">Description</th>
                            <th scope="col">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.resources.map((resource, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{resource.type}</td>
                                    <td>{resource.description}</td>
                                    <td>{resource.quantity}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            );
        } else {
            return (
                <div><p>No resources yet.</p></div>
            );
        }
    };

    // Displays list of connections or string if no connections
    const toggleConnectionDisplay = () => {
        if (user.connections) {
            return (
                <div className="row justify-content-center">
                    {user.connections.map((connection) => {
                        return (
                            <div className="card w-25 align-items-center pt-2 mx-1">
                                <Link className="profile-link" to={`/profile/${connection.userId}`}>
                                <img src={userImage} style={{width: '75px'}} className="card-img-top" alt="Default user"/>
                                <div className="card-body">
                                    <h5 className="card-title">{nameDisplay(connection)}</h5>
                                    <p className="card-text">{toggleAddressDisplay(connection.address)}</p>
                                </div>
                                </Link>
                            </div>
                        );
                    })}
                    
                </div>
            );
        } else {
            if (id === localStorage.getItem('loggedInUser')) {
                return (
                    <div><p>You have no connections yet.</p></div>
                );
            } else {
                return (
                    <div><p>{nameDisplay(user)} has no connections yet.</p></div>
                );
            }
            
        }
    };

    return (
        <div className="body-container container">
            <div className="row">
                <div className="col-6 text-center align-self-center">
                    <h3>{nameDisplay(user)}</h3>
                    <img src={userImage} style={{width: '125px'}} alt="Default user" />
                </div>
                <div className="col-6 pt-3 bg-light border border-info rounded">
                    {toggleEditButtonDisplay()}
                    {toggleMessageButtonDisplay()}
                    <h6><br/>{toggleAddressDisplay(user.address)}</h6><br/>
                    {toggleBusinessDescriptionDisplay()}<br/>
                    {toggleTelephoneDisplay()}<br/>
                    {toggleWebsiteDisplay()}
                </div>
                <div className="col-12 pt-3 text-center">
                    <h5><strong>Resources</strong></h5>
                    {toggleResourcesDisplay()}
                </div>
                <div className="col-12 pt-3 text-center">
                    <h5><strong>Connections</strong></h5>
                    {toggleConnectionDisplay()}
                </div>
            </div>
        </div>
    );
  };
  
export default Profile;