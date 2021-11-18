import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function SignUp() {

    const [user, setUser] = useState({firstName: '', lastName: '', email: '', password: '', telephone: '', businessName: '', address: {street: '', city: '', state: '', zip: ''}});
    const history = useHistory();
    const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID",
    "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE",
    "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN",
    "TX", "UT", "VA", "VT", "WA", "WV", "WI", "WY", "DC", "GU", "PR", "VI", "AA", "AE", "AP"];

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
        const tempUser = {...user};

        tempUser.address[name] = value;
        setUser(tempUser)
    }

    const signUpSubmitHandler = () => {
        axios.post('http://localhost:8080/signUp', user).then(response => {
            history.push({
                pathname: '/thank-you',
                search: '',
                state: {firstName: user.firstName, lastName: user.lastName, businessName: user.businessName, email: user.email}
            }); }).catch(error => {
                console.log("Sign up error")
            });
    }

    return (
        <div className="sign-up-container container pt-2 bg-light border rounded">
            <form className="row g-3 text-center">
            <h4> Sign up below!</h4>

                <div className="col-md-6">
                    <label for="inputFirstName" className="form-label">First Name</label>
                    <input type="text" name="firstName" onChange={userChangeHandler} value={user.firstName} maxLength="25" className="form-control" id="inputFirstName" required />
                </div>

                <div className="col-md-6">
                    <label for="inputLastName" className="form-label">Last Name</label>
                    <input type="text" name="lastName" onChange={userChangeHandler} value={user.lastName} maxLength="25" className="form-control" id="inputLastName" required />
                </div>
            
                <div className="col-md-6">
                    <label for="inputEmail" className="form-label">Email</label>
                    <input type="email" name="email" onChange={userChangeHandler} value={user.email} maxLength="50" className="form-control" id="inputEmail" required />
                </div>

                <div className="col-md-6">
                    <label for="inputPassword" className="form-label">Password</label>
                    <input type="password" name="password" onChange={userChangeHandler} value={user.password} maxLength="50" className="form-control" id="inputPassword" required />
                </div>

                <div className="col-md-8">
                    <label for="inputbusinessName" className="form-label">Business Name</label>
                    <input type="text" name="businessName" onChange={userChangeHandler} value={user.businessName} maxLength="50" className="form-control" id="inputbusinessName" placeholder="eg. Independent Trucking, LLC, ALCO Manufacturing, Inc" />
                </div>

                <div className="col-md-4">
                    <label for="inputTelephone" className="form-label">Telephone</label>
                    <input type="tel" name="telephone" onChange={userChangeHandler} value={user.telephone} maxLength="20" className="form-control" id="inputTelephone" placeholder="123-123-1234" />
                </div>

                <div className="col-12">
                    <label for="inputStreet" className="form-label">Street</label>
                    <input type="text" name="street" onChange={addressChangeHandler} value={user.address.street} maxLength="75" className="form-control" id="inputStreet" placeholder="1234 Main St" />
                </div>

                <div className="col-md-6">
                    <label for="inputCity" className="form-label">City</label>
                    <input type="text" name="city" onChange={addressChangeHandler} value={user.address.city} maxLength="50" className="form-control" id="inputCity" required />
                </div>

                <div className="col-md-4">
                    <label for="inputState" className="form-label">State</label>
                    <select id="inputState" name="state" onChange={addressChangeHandler} value={user.address.state} className="form-select">
                        <option selected>Choose..</option>
                        {states.map((state) => {
                            return (<option>{state}</option>)
                        })}
                    </select>
                </div>

                <div className="col-md-2">
                    <label for="inputZip" className="form-label">Zip</label>
                    <input type="text" name="zip" onChange={addressChangeHandler} value={user.address.zip} maxLength="10" className="form-control" id="inputZip" />
                </div>

                <div className="col border-top pt-2 pb-3">
                    <button className="btn btn-outline-info" onClick={signUpSubmitHandler} type="button">Sign up</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;