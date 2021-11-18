import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function AddResource() {

    const params = localStorage.getItem('loggedInUser');
    // Variable for new resource
    const [resource, setResource] = useState({type: "", description: "", quantity: "", userId: params});
    // Variable for updating existing resources
    const [updateResource, setUpdateResource] = useState({});

    const history = useHistory();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const resourceTypes = ["Conestoga", "Double Drop/Lowboy", "Doubles", "Drop Deck/Step Deck", "Dry Van", 
    "Expandable Drop Deck", "Flatbed (Standard)", "Flatbed Stretch", "Refrigerated/Reefer", 
    "Removable Gooseneck (RGN)", "Specialty", "Straight Truck", "Stretch RGN", "Triples", "Truck (Freight)", "Other"];

    // Loads resource to be updated if user selects update
    useEffect (() => {
        if (location.pathname === '/resourceMain/updateResource') {
            const selectedResource = {userId: localStorage.getItem('loggedInUser'), resourceId: searchParams.get('id')};
            axios.post('http://localhost:8080/findUserResource', selectedResource).then(response => {
                setUpdateResource(response.data);
            }).catch(error => {

            });
        }
    }, []);

    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempResource = {...resource};

        tempResource[name] = value;
        setResource(tempResource);
    };

    const updateChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempUpdateResource = {...updateResource};

        tempUpdateResource[name] = value;
        setUpdateResource(tempUpdateResource);
    };

    const addResourceSubmitHandler = () => {
        axios.post('http://localhost:8080/addUserResource', resource).then(response => {
            history.push('/resourceMain/myResources');
        }).catch(error => {
            console.log("Add resource error.")
        });
    };

    const updateResourceSubmitHandler = () => {
        axios.post('http://localhost:8080/updateResource', updateResource).then(response => {
            history.push('/resourceMain/myResources');
        }).catch(error => {
            console.log("Add resource error.")
        });
    }

    const toggleDisplay = () => {
        if (location.pathname === '/resourceMain/addResource') {
            return (
                <form className="row pb-3 pt-1 bg-light border rounded">
            
                    <div className="col-10">
                        <label for="inputType" className="form-label"><strong>Type</strong></label>
                        <select type="text" name="type" onChange={changeHandler} value={resource.type} maxLength="50" className="form-select" id="inputType">
                            <option selected>Choose..</option>
                            {resourceTypes.map((resourceType) => {
                                return (<option>{resourceType}</option>)
                            })}
                        </select>
                    </div>

                    <div className="col-2">
                        <label for="inputQuantity" className="form-label"><strong>Quantity</strong></label>
                        <input type="number" name="quantity" onChange={changeHandler} value={resource.quantity} min="1" className="form-control" id="inputQuantity" />
                    </div>
                
                    <div className="col-12">
                        <label for="inputDescription" className="form-label"><strong>Description</strong> <small className="text-muted">({500 - resource.description.length} characters left)</small></label>
                        <textarea type="text" name="description" onChange={changeHandler} value={resource.description} rows="1" maxLength="180" className="form-control" id="inputDescription" />
                    </div>
                
                    <div className="col pt-3">
                        <button className="btn btn-outline-info" onClick={addResourceSubmitHandler} type="button">Add</button>
                    </div>
                    
                </form>
            );
        } else if (location.pathname === '/resourceMain/updateResource') {
            return (
                <form className="row pb-3 pt-1 bg-light border rounded">
            
                    <div className="col-10">
                        <label for="inputType" className="form-label"><strong>Type</strong></label>
                        <select type="text" name="type" onChange={updateChangeHandler} value={updateResource.type} maxLength="50" className="form-select" id="inputType">
                            <option selected>Choose..</option>
                            {resourceTypes.map((resourceType) => {
                                return (<option>{resourceType}</option>)
                            })}
                        </select>
                    </div>

                    <div className="col-2">
                        <label for="inputQuantity" className="form-label"><strong>Quantity</strong></label>
                        <input type="number" name="quantity" onChange={updateChangeHandler} value={updateResource.quantity} min="1" className="form-control" id="inputQuantity" />
                    </div>
                
                    <div className="col-12">
                        <label for="inputDescription" className="form-label"><strong>Description</strong> <small className="text-muted">({500 - resource.description.length} characters left)</small></label>
                        <textarea type="text" name="description" onChange={updateChangeHandler} value={updateResource.description} rows="1" maxLength="180" className="form-control" id="inputDescription" />
                    </div>
                
                    <div className="col pt-3">
                        <button className="btn btn-outline-info" onClick={updateResourceSubmitHandler} type="button">Update</button>
                    </div>
                    
                </form>
            );
        }
    };

    return toggleDisplay();
  }
  
export default AddResource;