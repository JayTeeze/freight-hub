import axios from 'axios';
import { useEffect, useState } from 'react';
import trucks from '../../images/trucks.jpg';
import profile from '../../images/profile.png';
import address from '../../images/address.png';
import { Link } from 'react-router-dom';

function Home() {

    const [user, setUser] = useState ({});

    useEffect(() => {
        const params = localStorage.getItem('loggedInUser');

        axios.get(`http://localhost:8080/findUserById?id=${params}`).then(response => {
            setUser(response.data);
        }).catch(error => {

        });
    }, []);

    // Displays logged in user's name prioritizing name then business name if not entered
    const nameDisplay = () => {

        if (user.firstName && user.lastName) {
            return user.firstName + ' ' + user.lastName;
        } else if (user.businessName) {
            return user.businessName;
        } else {
            return user.firstName;
        }
    }

    return (
        <div className="body-container container content-row text-center">
            <div className="row mb-5">
                <h2>Welcome back, {nameDisplay()}</h2>
            </div>

            <div className="row">
                <div className="col-sm-12 col-lg-4">

                    <div className="card h-100 bg-light">
                        <Link className="home-link" to="/resourceMain/myResources">
                        <img className="mt-3" src={trucks} alt="Commercial trucks" style={{width: '56%', borderRadius: '5%', opacity: '0.75'}} />
                        <div className="card-body">
                            <h5 className="card-title border-bottom pb-2">My Resources</h5>
                            <p className="card-text">Manage your resources you display on your profile.</p>
                        </div>
                        </Link>
                    </div>

                </div>
                <div className="col-sm-12 col-lg-4">

                    <div className="card h-100 bg-light">
                        <Link className="home-link" to="/edit-profile/user">
                        <img className="mt-3" src={profile} alt="Social network profile" style={{width: '50%', borderRadius: '5%', opacity: '0.75'}} />
                        <div className="card-body">
                            <h5 className="card-title border-bottom pb-2">Update Profile</h5>
                            <p className="card-text">Keeping your profile up-to-date can help you stand out for potential business.</p>
                        </div>
                        </Link>
                    </div>

                </div>
                <div className="col-sm-12 col-lg-4">

                    <div className="card h-100 bg-light">
                        <Link className="home-link" to="/edit-profile/address">
                        <img className="mt-3" src={address} alt="Map with pinpoint" style={{width: '50%', borderRadius: '5%', opacity: '0.75'}} />
                        <div className="card-body">
                            <h5 className="card-title border-bottom pb-2">Update Address</h5>
                            <p className="card-text">Keeping your address updated helps others looking for a particular area to conduct business.</p>
                        </div>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
  }
  
export default Home;