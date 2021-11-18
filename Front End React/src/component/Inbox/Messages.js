import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function Messages() {

    const [receivedMessages, setReceivedMessages] = useState ([]);
    const [sentMessages, setSentMessages] = useState ([]);
    const history = useHistory();
    const location = useLocation();
    const params = localStorage.getItem('loggedInUser');

    useEffect(() => {

        axios.get(`http://localhost:8080/findUserMessages?userId=${params}`).then(response => {
            setReceivedMessages(response.data.filter(function (el) {return el.toUserId == params}));
            setSentMessages(response.data.filter(function (el) {return el.fromUserId == params}));
        }).catch(error => {

        });
    }, []);

    const clickHandler = (message) => {
        history.push({
            pathname: '/inbox/view',
            search: '',
            state: message
        })
    }

    const toggleMessagePreview = (message) => {
        if (message.messageBody.length > 30) {
            return message.messageBody.substring(0, 31) + '..';
        } else {
            return message.messageBody;
        }
    }

    const deleteMessageSubmitHandler = (messageId) => {
        axios.get(`http://localhost:8080/deleteSelectedMessage?id=${messageId}`).then(response => {
            history.push(location.pathname);
        }).catch(error => {
            console.log('Delete message error');
        });
    };

    // Displays business name if not null or user name
    const nameDisplay = (userInfo) => {
        if (userInfo.businessName) {
            return userInfo.businessName;
        } else if (userInfo.firstName && userInfo.lastName) {
            return userInfo.firstName + ' ' + userInfo.lastName;
        } else {
            return userInfo.firstName;
        }
    };

    const toggleReceivedMessages = () => {
        if (receivedMessages !== null && receivedMessages.length > 0) {
            return (
                <div className="text-center">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">From</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {receivedMessages.map((message, index) => {
                                return (
                                    <tr onClick={() => clickHandler(message)}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            <div>{nameDisplay(message.author)}<br/> <small className="text-muted">{toggleMessagePreview(message)}</small></div>
                                        </td>
                                        <td onClick={() => deleteMessageSubmitHandler(message.id)}><div>&times;</div></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div className="text-center mt-3"><p>You have no messages yet.</p></div>
            );
        }
    };

    const toggleSentMessages = () => {
        if (sentMessages !== null && sentMessages.length > 0) {
            return (
                <div className="text-center">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">To</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sentMessages.map((message, index) => {
                                return (
                                    <tr onClick={() => clickHandler(message)}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            <div>{nameDisplay(message.recipient)}<br/><small className="text-muted">{toggleMessagePreview(message)}</small></div>
                                        </td>
                                        <td onClick={() => deleteMessageSubmitHandler(message.id)}><div>&times;</div></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div className="text-center mt-3"><p>You have not sent any messages yet.</p></div>
            );
        }
    };

    const toggleDisplay = () => {
        if (location.pathname === '/inbox/messages') {
            return toggleReceivedMessages();
        } else if (location.pathname === '/inbox/sent') {
            return toggleSentMessages();
        }
    }

    return (
        <div className="row">
            <div className="col text-center">
                {toggleDisplay()}
            </div>
        </div>
    );
  }
  
export default Messages;