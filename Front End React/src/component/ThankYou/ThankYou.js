import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import celebrate from '../../images/celebrate.jpg';

function ThankYou() {

    const [newUser, setNewUser] = useState({firstName: '', email: '', businessName: ''});
    const location = useLocation();

    useEffect(() => {
        setNewUser(location.state);
    }, []);

    const toggleNameDisplay = () => {
        if (newUser.firstName && newUser.businessName) {
            return newUser.firstName + ' and ' + newUser.businessName;
        } else if (newUser.firstName) {
            return newUser.firstName;
        } else if (newUser.businessName) {
            return 'and ' + newUser.businessName;
        }
    };

    const toggleEmailDisplay = () => {
        if (newUser.email) {
            return (
                <h3>Use '{newUser.email}' to sign in to your account.</h3>
            );
        }
    };

    return (
        <div className="thank-you-container text-center">
            <div className="row">
                <div className="col-12">
                    <h1>Thank you {toggleNameDisplay()} for signing up!</h1>
                    {toggleEmailDisplay()}
                </div>
                <div className="col-12 mt-5">
                <img src={celebrate} alt="Friends celebrating" style={{width: '50%', 'border-radius': '1%'}} />
                </div>
                <div className="col-12 mt-3">
                    <h5>Sign in and start connecting with other businesses!</h5>
                </div>
            </div>
            
        </div>
    );
  }
  
export default ThankYou;