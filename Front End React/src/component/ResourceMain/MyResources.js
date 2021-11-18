import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

function MyResources() {

    const [resources, setResources] = useState([]);
    const history = useHistory();

    useEffect(() => {

        const params = localStorage.getItem('loggedInUser');

        axios.get(`http://localhost:8080/findAllUserResources?userId=${params}`).then(response => {
            if (response.data.length !== 0) {
                setResources(response.data);
            }
            
        }).catch(error => {

        });
    }, []);

    const deleteResourceSubmitHandler = (resourceId) => {
        axios.get(`http://localhost:8080/deleteSelectedResource?resourceId=${resourceId}`).then(response => {
            history.go(0);
        }).catch(error => {
            console.log("Delete resource error");
        });
    };

    const loadResources = () => {
        if (resources.length !== 0) {
            return (
                <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col" className="col-1">#</th>
                    <th scope="col" className="col-2">Type</th>
                    <th scope="col">Description</th>
                    <th scope="col" className="col-1">Quantity</th>
                    <th scope="col" className="col-1"></th>
                    </tr>
                </thead>
                <tbody>
                    {resources.map((resource, index) => {
                        return (
                            <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{resource.type}</td>
                            <td>{resource.description}</td>
                            <td>{resource.quantity}</td>
                            <td>
                                <div className="btn-group btn-group-sm" role="group">
                                    <Link className="btn btn-outline-info" to={`/resourceMain/updateResource?id=${resource.resourceId}`} type="button">Update</Link>
                                    <button className="btn btn-outline-danger" onClick={() => deleteResourceSubmitHandler(resource.resourceId)} type="button">Delete</button>
                                </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                </table>
            );
        } else {
            return (
                <p>You have no resources.</p>
            );
        }
    };

    return loadResources();
  }
  
export default MyResources;