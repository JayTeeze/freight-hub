import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

function ReadWrite() {

    const [message, setMessage] = useState({author: {firstName: '', lastName: '', businessName: ''}, recipient: {firstName: '', lastName: '', businessName: ''}});
    const [newMessage, setNewMessage] = useState({toUserId: '', fromUserId: '', messageBody: ''});
    const [query, setQuery] = useState({param: ''});
    const [findRecipients, setFindRecipients] = useState([]);

    const history = useHistory();
    const location = useLocation();
    const myId = parseInt(localStorage.getItem('loggedInUser'));

    useEffect(() => {
        setMessage(location.state);
    }, []);

    const displayRecipientForRead = (message) => {
        if (message.toUserId == myId) {
            return 'Me';
        } else {
            return message.toUserId;
        }
    }

    const displayComposerForRead = () => {
        if (message.fromUserId == myId) {
            return 'Me';
        } else {
            return message.fromUserId;
        }
    }

    const displayRecipientForWrite = (message) => {
        if (message.toUserId !== myId) {
            return message.toUserId;
        } else {
            return message.fromUserId;
        }
    }

    // Handles when users click 'reply'on a viewed message
    const replyClickHandler = () => {
        history.push({
            pathname: '/inbox/compose',
            search: '',
            state: message
        })
    }

    // Returns user id of intended recipient to prevent sending message to self
    const selectRecipient = () => {
        if (message.toUserId !== myId) {
            return message.toUserId;
        } else {
            return message.fromUserId;
        }
    }

    // Queries for list of users to set as recipient in email
    const getUsers = (query) => {
        if (query.param.length > 2) {
            axios.get(`http://localhost:8080/searchForUser?searchParam=${query.param}`).then(response => {
            setFindRecipients(response.data);
            
        }).catch(error => {
            console.log('Search results error');
        });
        } else if(query.param.length < 3) {
            setFindRecipients([]);
        }
    }

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

    // When clicked, sends recipient info to compose new message
    const recipientClickHandler = (id) => {
        history.push({pathname: '/inbox/compose', search: '', state: {toUserId: id}});
    }

    // Displays list of users to add as a recipient
    const displayUsers = () => {
        if(findRecipients !== null && findRecipients.length > 0) {
            return (
                <div className="text-center">
                    <table className="table table-hover">
                        <tbody>
                            {findRecipients.map((result) => {
                                return (
                                    <tr onClick={() => recipientClickHandler(result.userId)}>
                                        <td>
                                            <strong>{nameDisplay(result)}</strong> <small className="text-muted">{toggleAddressDisplay(result.address)}</small>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    //Change handler for querying for a recipient
    const recipientChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempQuery = {...query};

        tempQuery[name] = value;
        setQuery(tempQuery);
        setTimeout(() => {getUsers(query)}, 750);

    }

    // Change handler for composing messages
    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempNewMessage = {...newMessage};

        tempNewMessage[name] = value;
        tempNewMessage.toUserId = selectRecipient();
        tempNewMessage.fromUserId = myId;
        setNewMessage(tempNewMessage);
    }

    const sendSubmitHandler = () => {
        if (newMessage.toUserId !== null && newMessage.toUserId !== undefined) {
            axios.post('http://localhost:8080/sendNewMessage', newMessage).then(response => {
            history.push('/inbox/messages'); }).catch(error => {
                console.log("Send message error")
            });
        }
    }

    const toggleDisplay = () => {
        if (location.pathname === '/inbox/view') {
            return (
                <div className="row py-3 px-2 rounded">
                    <div className="col-12 pt-2 border-bottom bg-light">
                        <p><strong>From:</strong> {displayComposerForRead()}</p>
                        <p><strong>To:</strong> {displayRecipientForRead(message)}</p>
                    </div>
                    <div className="col-12 text-center">
                        <p><strong>Message:</strong><br/></p>
                    </div>
                    <div className="col pb-2 mb-2 mx-1 border rounded" style={{whiteSpace: 'pre-wrap'}}>
                        {message.messageBody}
                    </div>
                    <div className="col-12 mt-1 pt-2">
                        <button className="btn btn-outline-info my-2 my-sm-0" onClick={replyClickHandler} type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-reply" viewBox="0 0 16 16">
                                <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z"/>
                            </svg>
                            Reply
                        </button>
                    </div>
                </div>
            );
        } else if (location.pathname === '/inbox/compose') {
            return (
                <div className="row bg-light py-3 px-2 rounded">
                    <div className="col-12 border-bottom">
                        <p><strong>To:</strong> {displayRecipientForWrite(message)}</p>
                    </div>
                    <div className="col-12 text-center border-bottom pb-2">
                        <form>
                            <label for="inputMessageBody" className="form-label"><strong>Message </strong><small className="text-muted">({500 - newMessage.messageBody.length} characters left)</small></label>
                            <textarea type="text" name="messageBody" onChange={changeHandler} value={newMessage.messageBody} rows="15" maxLength="500" className="form-control" id="inputMessageBody" required />
                        </form>
                    </div>
                    <div className="col-12 pt-2">
                        <button className="btn btn-outline-info my-2 my-sm-0" onClick={sendSubmitHandler} type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                        </svg>
                            <strong> Send</strong>
                        </button>
                    </div>
                </div>
            );
        } else if (location.pathname === '/inbox/select-recipient') {
            return (
                <div className="row">
                    <div className="col-12 bg-light rounded">
                        <form>
                            <input type="text" name="param" onChange={recipientChangeHandler} value={query.param} maxLength="100" className="form-control" id="inputParam" placeholder="Search for recipient" required />
                        </form>
                    </div>
                    <div className="col-12 text-center">
                        {displayUsers()}
                    </div>
                </div>
            );
        }
    }

    return toggleDisplay();
  }
  
export default ReadWrite;