import { io } from "socket.io-client";

const socket = io("http://localhost:4321");

export default socket;
