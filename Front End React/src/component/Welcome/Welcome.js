import loadingDock from '../../images/loadingDock.jpg';
import truck from '../../images/truck.png';
import devices from '../../images/devices.jpg';
import { Link } from 'react-router-dom';

function Welcome() {


    return (
        <div className="body-container container text-center">
            <div className="row">
                    <div className="col">
                        <h1><strong>Freight Hub</strong></h1>
                        <p><small className="text-muted"><em>A place for commerce</em></small></p>
                    </div>
                </div>
            <div className="row py-3 bg-light rounded">
                <div className="col-5 align-self-center">
                    <h1>Connect With Other Businesses</h1><br/>
                    <p>Connect directly with shipping and trucking businesses of any size.<br/>Establish new relationships and promote your own business.</p>
                </div>
                <div className="col-7">
                    <img src={truck} alt="Loading docks" style={{width: '100%', 'border-radius': '1%'}} />
                </div>
            </div>
            <div className="row mt-3 pb-3">
                <div className="col-7 ">
                    <img src={loadingDock} alt="Commercial truck on the road" style={{width: '100%', 'border-radius': '1%'}} />
                </div>
                <div className="col-5 align-self-center">
                    <h1>Logistic Capability Focused</h1><br/>
                    <p>Find businesses providing logistic solutions that keep up with your businesses' logistic challenges.<br/>Keep your logistic capabilities at the forefront to keep up with market trends.</p>
                </div>
            </div>
            <div className="row py-3 bg-light rounded">
                <div className="col-5 align-self-center">
                    <h1>Discover New Possibilities</h1><br/>
                    <p><Link className="home-link" to="/signUp"><strong>Sign up</strong></Link> today and discover the possibilities to keep up with market trends and business growth.</p>
                </div>
                <div className="col-7">
                    <img src={devices} alt="Electronic devices" style={{width: '75%', 'border-radius': '1%'}} />
                </div>
            </div>
        </div>
    );
  }
  
export default Welcome;