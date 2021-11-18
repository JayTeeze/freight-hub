import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function ProfileFields() {

    const [user, setUser] = useState ({businessDescription: ''});
    const [address, setAddress] = useState ({});
    const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID",
    "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE",
    "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN",
    "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC", "GU", "PR", "VI", "AA", "AE", "AP"];
    const history = useHistory();
    const location = useLocation();
    const params = localStorage.getItem('loggedInUser');

    useEffect(() => {
        
        axios.get(`http://localhost:8080/findUserById?id=${params}`).then(response => {
            setUser(response.data);
            setAddress(response.data.address);
        }).catch(error => {

        });
    }, []);

    const userChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempUser = {...user};

        tempUser[name] = value;
        setUser(tempUser);
    }

    const addressChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempAddress = {...address};

        tempAddress[name] = value;
        setAddress(tempAddress)
    }

    const updateUserSubmitHandler = () => {
        axios.post('http://localhost:8080/updateUserDetails', user).then(response => {
            history.push('/edit-profile/details');}).catch(error => {
                console.log("Update user details error")
            });
    }

    const updateAddressSubmitHandler = () => {
        axios.post('http://localhost:8080/updateUserAddress', address).then(response => {
            history.push('/edit-profile/details');}).catch(error => {
                console.log("Update address error")
            });
    }

    const toggleFieldsDisplay = () => {
        if (location.pathname === '/edit-profile/details') {
            return (
                <div className="row">
                    <div className="col-3 offset-3 pt-3 bg-light rounded">
                        <h6>Name:</h6>
                        <p>{user.firstName} {user.lastName}</p><br/>
                        <h6>Business Name:</h6>
                        <p>{user.businessName}</p><br/>
                        <h6>Email:</h6>
                        <p>{user.email}</p><br/>
                        <h6>Telephone:</h6>
                        <p>{user.telephone}</p><br/>
                        <h6>Website:</h6>
                        <p>{user.email}</p><br/>
                    </div>
                    <div className="col-3 pt-3 bg-light">
                        <h6>Address:</h6>
                        <p>{address.street}<br/>{address.city}, {address.state} {address.zip}</p><br/>
                        <h6>Business Description:</h6>
                        <p style={{'white-space': 'pre-wrap'}}>{user.businessDescription}</p>
                    </div>
                </div>
            );
        } else if (location.pathname === '/edit-profile/user') {
            return (
                <div className="body-container container pt-3">
                    <div className="text-center">
                    </div>
                    <form className="row g-3 text-center bg-light pb-3 border rounded">

                        <div className="col-md-5">
                            <label for="inputFirstName" className="form-label"><strong>First Name</strong></label>
                            <input type="text" name="firstName" onChange={userChangeHandler} value={user.firstName} maxLength="25" className="form-control" id="inputFirstName" />
                        </div>

                        <div className="col-md-5">
                            <label for="inputLastName" className="form-label"><strong>Last Name</strong></label>
                            <input type="text" name="lastName" onChange={userChangeHandler} value={user.lastName} maxLength="25" className="form-control" id="inputLastName" />
                        </div>

                        <div className="col-md-2">
                            <label for="inputTelephone" className="form-label"><strong>Telephone</strong></label>
                            <input type="tel" name="telephone" onChange={userChangeHandler} value={user.telephone} maxLength="20" className="form-control" id="inputTelephone" placeholder="123-123-1234" />
                        </div>

                        <div className="col-md-6">
                            <label for="inputbusinessName" className="form-label"><strong>Business Name</strong></label>
                            <input type="text" name="businessName" onChange={userChangeHandler} value={user.businessName} maxLength="50" className="form-control" id="inputbusinessName" placeholder="eg. Independent Trucking, LLC, ALCO Manufacturing, Inc" />
                        </div>

                        <div className="col-md-6">
                            <label for="inputWebsite" className="form-label"><strong>Website</strong></label>
                            <input type="text" name="website" onChange={userChangeHandler} value={user.website} maxLength="75" className="form-control" id="inputWebsite" />
                        </div>

                        <div className="col-md-12">
                            <label for="inputbusinessDescription" className="form-label"><strong>Business Description</strong> <small className="text-muted">({500 - user.businessDescription.length} characters left)</small></label>
                            <textarea type="text" name="businessDescription" onChange={userChangeHandler} value={user.businessDescription} maxLength="180" className="form-control" id="inputbusinessDescription" placeholder="Brief summary of your business." />
                        </div>

                        <div className="col-md-6">
                            <label for="inputEmail" className="form-label"><strong>Email</strong></label>
                            <input type="email" name="email" onChange={userChangeHandler} value={user.email} maxLength="50" className="form-control" id="inputEmail" />
                        </div>

                        <div className="col-md-6">
                            <label for="inputPassword" className="form-label"><strong>Password</strong></label>
                            <input type="password" name="password" onChange={userChangeHandler} value={user.password} maxLength="50" className="form-control" id="inputPassword" />
                        </div>

                        <div className="col">
                            <button className="btn btn-outline-info" onClick={updateUserSubmitHandler} type="button">Submit</button>
                        </div>
                    </form>
                </div>
            );
        } else if (location.pathname === '/edit-profile/address') {
            return (
                <div className="body-container container pt-3">
                    <div className="text-center">
                    </div>
                    <form className="row g-3 text-center pb-3 bg-light border rounded">

                        <div className="col-12">
                            <label for="inputStreet" className="form-label"><strong>Street</strong></label>
                            <input type="text" name="street" onChange={addressChangeHandler} value={address.street} maxLength="75" className="form-control" id="inputStreet" placeholder="1234 Main St" />
                        </div>

                        <div className="col-md-6">
                            <label for="inputCity" className="form-label"><strong>City</strong></label>
                            <input type="text" name="city" onChange={addressChangeHandler} value={address.city} maxLength="50" className="form-control" id="inputCity" />
                        </div>

                        <div className="col-md-4">
                            <label for="inputState" className="form-label"><strong>State</strong></label>
                            <select id="inputState" name="state" onChange={addressChangeHandler} value={address.state} className="form-select">
                                <option selected>Choose..</option>
                                {states.map((state) => {
                                    return (<option>{state}</option>)
                                })}
                            </select>
                        </div>

                        <div className="col-md-2">
                            <label for="inputZip" className="form-label"><strong>Zip</strong></label>
                            <input type="text" name="zip" onChange={addressChangeHandler} value={address.zip} maxLength="10" className="form-control" id="inputZip" />
                        </div>

                        <div className="col">
                            <button className="btn btn-outline-info" onClick={updateAddressSubmitHandler} type="button">Submit</button>
                        </div>
                    </form>
                </div>
            );
        }
    }

    return toggleFieldsDisplay();
  }
  
export default ProfileFields;