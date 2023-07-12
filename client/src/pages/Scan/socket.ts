// import { io } from 'socket.io-client';

// // "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://127.0.0.1:8008';

// export const socket = io(URL);
import useWebSocket, { ReadyState } from 'react-use-websocket';

const Logs = () => {
    const { sendMessage, lastMessage, readyState } = useWebSocket('ws://127.0.0.1:8080/ws');
    return (
        <div>
            <button onClick={() => sendMessage('Hello')}>Click me</button>
            <p>{lastMessage ? lastMessage.data : null}</p>
            {readyState === ReadyState.OPEN && 'All good'}
        </div>
    );
}
export default Logs;