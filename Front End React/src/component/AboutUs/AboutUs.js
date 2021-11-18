import founder from '../../images/founder.jpg';

function AboutUs() {

    return (
        <div className="body-container container text-center">
            <div className="row mb-3">
                <h5>About Us</h5>
            </div>
            <div className="row">
                <div className="col-6 offset-3 mb-3">
                    <h6>The freight industry has long had a heavy reliance on a third party to manage logistic challenges.</h6><br/>
                    <h6>Our goal is to help facilitate establishing a direct relationship between businesses with a need to ship their goods and businesses with available resources to fullfil shipping requirements.</h6>
                </div>
                <div className="row bg-light rounded">
                    <div className="col-6 mt-3">
                        <img src={founder} alt="headshot of founder" style={{width: '75%', borderRadius: '2%'}} />
                        <h6>Founded in 2021 by Jorge Ortiz.</h6>
                    </div>
                    <div className="col-4 align-self-center">
                        <h6>When his father first started in the trucking business in 2008, Jorge quickly learned the need for a platform that can connect millions of businesses across the country.</h6>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
export default AboutUs;