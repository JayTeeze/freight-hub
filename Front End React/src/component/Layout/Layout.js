import { Route, withRouter } from "react-router";
import SignUp from './../SignUp/SignUp';
import Header from './../Header/Header';
import ThankYou from './../ThankYou/ThankYou';
import Welcome from './../Welcome/Welcome';
import Home from './../Home/Home';
import ResourceMain from './../ResourceMain/ResourceMain';
import Profile from './../Profile/Profile';
import EditProfile from './../Profile/EditProfile';
import SearchResults from './../SearchResults/SearchResults';
import AboutUs from './../AboutUs/AboutUs';
import Inbox from './../Inbox/Inbox';

function Layout() {

    const toggleRoute = () => {
        if (localStorage.getItem('loggedInUser')) {
            return (
                <div className="Layout mb-5">
                    
                    <Route exact path="/" component={Welcome}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/resourceMain" component={ResourceMain}/>
                    <Route path="/signUp" component={SignUp}/>
                    <Route path="/profile/:id" component={Profile}/>
                    <Route path="/edit-profile" component={EditProfile}/>
                    <Route exact path="/search/:param" component={SearchResults} />
                    <Route path="/about-us" component={AboutUs}/>
                    <Route path="/inbox/:param" component={Inbox}/>
                </div>
                );
        } else {
            return (
                <div className="Layout mb-5">
                    
                    <Route exact path="/" component={Welcome}/>
                    <Route path="/thank-you" component={ThankYou}/>
                    <Route path="/signUp" component={SignUp}/>
                    <Route path="/about-us" component={AboutUs}/>
                </div>
                );
        }
    }

    return (<div>
        <Header/>
        {toggleRoute()}

    </div>);
}

export default withRouter(Layout);