import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import userImage from '../../images/userImage.png';

function SearchResults() {

    const [results, setResults] = useState([]);
    const { param } = useParams();
    const history = useHistory();

    // Sends param to back end to query db
    useEffect(() => {
        axios.get(`http://localhost:8080/searchForUser?searchParam=${param}`).then(response => {
            setResults(response.data);
            
        }).catch(error => {
            console.log('Search results error');
        });
    }, [param]);

    // Displays business name if not null or user name
    const nameDisplay = (userInfo) => {
        if (userInfo.businessName) {
            return userInfo.businessName;
        } else if (userInfo.firstName && userInfo.lastName) {
            return userInfo.firstName + ' ' + userInfo.lastName;
        } else {
            return userInfo.firstName;
        }
    }

    // Displays address in way users can understand
    const toggleAddressDisplay = (address) => {
        if (address.city && address.state) {
            return address.city + ', ' + address.state;
        } else if (address.state) {
            return address.state;
        } else if (address.city) {
            return address.city;
        }
    }

    // Results are list of User objects
    const toggleResultsDisplay = () => {
        if (results !== null && results.length > 0) {
            return (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">{results.length} result(s) for '{param}'</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result) => {
                            return (
                                <tr>
                                    <td>
                                        <Link className="nav-link profile-link" 
                                        to={`/profile/${result.userId}`} 
                                        onClick={() => history.push(`/profile/${result.userId}`)}>
                                            <img className="mx-3" src={userImage} alt="User" style={{width: '35px'}} />
                                            <strong>{nameDisplay(result)}</strong> <small className="text-muted">{toggleAddressDisplay(result.address)}</small>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            );
        } else {
            return (
                <div><h5>Sorry, no results for '{param}'</h5></div>
            );
        }
    }

    return (
        <div className="body-container container text-center">
            {toggleResultsDisplay()}

        </div>
    );
  }
  
export default SearchResults;