import io from "socket.io-client";

const socket: SocketIOClient.Socket = io("http://localhost:5000/");

export default socket;
