import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import Messages from './Messages';
import ReadWrite from './ReadWrite';

function Inbox() {

    return (
        <div className="body-container container">
            <div className="row text-center">
                <h3>Messages</h3>
            </div>
            <div className="row">
                <div className="col-2">
                    <div className="list-group text-center">
                        <Link to="/inbox/select-recipient" className="list-group-item list-group-item-action">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-plus" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471 1.069.64.257.155.257-.154 1.33-.798L15 5.383V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825Zm1.22-.434L1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217L9.072 7.774 8 8.417l-1.072-.643ZM16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 1 .5.5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 .5-.5Z"/>
                            </svg>
                            <strong> Compose</strong>
                        </Link>
                        <Link to="/inbox/messages" className="list-group-item list-group-item-action">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-inbox" viewBox="0 0 16 16">
                                <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438L14.933 9zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z"/>
                            </svg>
                            <strong> Inbox</strong>
                        </Link>
                        <Link to="/inbox/sent" className="list-group-item list-group-item-action">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                            </svg>
                            <strong> Sent</strong>
                        </Link>
                    </div>
                </div>
                <div className="col-10">
                    <Route path="/inbox/messages" component={Messages} />
                    <Route path="/inbox/sent" component={Messages} />
                    <Route path="/inbox/select-recipient" component={ReadWrite} />
                    <Route path="/inbox/view" component={ReadWrite} />
                    <Route path="/inbox/compose" component={ReadWrite} />
                </div>
            </div>

        </div>
    );
  }
  
export default Inbox;