import { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";

function Header() {

    const [signInUser, setSignInUser] = useState({email: '', password: ''});
    const [searchInput, setSearchInput] = useState({param: ''});
    const history = useHistory();
    

    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempSignIn = {...signInUser};
        
        tempSignIn[name] = value;
        setSignInUser(tempSignIn);
    }

    const searchChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempSearchInput = {...searchInput};
        
        tempSearchInput[name] = value;
        setSearchInput(tempSearchInput);
    }

    const signInSubmitHandler = () => {
        axios.post('http://localhost:8080/login', signInUser).then(response => {
            localStorage.setItem("loggedInUser", response.data.userId);
            history.push('/home');}).catch(error => {
                console.log("Login error")
            });
            const tempSignIn = {...signInUser};
            tempSignIn.password = "";
            setSignInUser(tempSignIn);
    }

    const searchSubmitHandler = () => {
        history.push(`/search/${searchInput.param}`);

        const tempSearchInput = {...searchInput};
        tempSearchInput.param = "";
        setSearchInput(tempSearchInput);
    }

    const signOutSubmitHandler = () => {
        localStorage.clear();
        history.push('/');

        const tempSignIn = {...signInUser};
        tempSignIn.email = "";
        setSignInUser(tempSignIn);
    }

    // Toggles display for signed-in users or non-registered visitors
    const toggleDisplay = () => {
        if (localStorage.getItem('loggedInUser')) {
            return (
                <header className="mb-5">
                    <nav className="navbar navbar-expand-md fixed-top navbar-dark">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="/">Freight Hub</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
        
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                    <li className="nav-item active">
                                        <Link className="nav-link" to={"/home"}>Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={`/profile/${localStorage.getItem('loggedInUser')}`}>My Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/inbox/messages"}>Messages</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/about-us"}>About Us</Link>
                                    </li>
                                </ul>

                                <form className="d-flex mx-auto">
                                    <input className="form-control mr-sm-2" 
                                        name="param" 
                                        onChange={searchChangeHandler} 
                                        value={searchInput.param}
                                        maxLength="100" 
                                        type="search" 
                                        placeholder="Search" 
                                        aria-label="Search"/>
                                    <button className="btn btn-outline-light my-2 my-sm-0" onClick={searchSubmitHandler} type="button">Search</button>
                                </form>

                                <form className="d-flex">
                                    <button className="btn btn-outline-light my-2 my-sm-0" onClick={signOutSubmitHandler} type="button">Sign Out</button>
                                </form>
                            </div>
                        </div>
                    </nav>
                </header>
            );
        } else {
            return (
                <header className="mb-5">
                    <nav className="navbar navbar-expand-md fixed-top navbar-dark">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="/">Freight Hub</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
        
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/signUp">Sign Up</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/about-us"}>About Us</Link>
                                    </li>
                                </ul>
                                <form className="d-flex">
                                    <input name="email" onChange={changeHandler} value={signInUser.email} maxLength="50" className="form-control me-2" type="email" placeholder="Email"/>
                                    <input name="password" onChange={changeHandler} value={signInUser.password} maxLength="50" className="form-control me-2" type="password" placeholder="Password"/>
                                    <button className="btn btn-outline-light my-2 my-sm-0" onClick={signInSubmitHandler} type="button">Sign In</button>
                                </form>
                            </div>
                        </div>
                    </nav>
                </header>
            );
        }
    }

    return toggleDisplay();
}
  
export default Header;