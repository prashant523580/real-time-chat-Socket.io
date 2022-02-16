import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
// import SendIcon from '@mui/icons-material/Send';
import "./chat.style.css";
function ChatPage() {
    const socket = io.connect("http://localhost:4040");
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [displayChat, setDisplayChat] = useState(false);
    const [currentMsg, setCurrentMsg] = useState('');
    const [messages,setMessages] = useState([]);
    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setDisplayChat(true)
        } else {
            alert("enter User   name && roomID")
        }
    }

    const sendMessage = async () => {
        if(currentMsg !== ""){

            const messageData = {
                author: username,
                room: room,
                message:currentMsg,
                time: `${new Date().getHours()} :  ${new Date(Date.now()).getMinutes}`
            }
            await socket.emit("send_message",messageData)

            // setMessages((msg) => [...msg,messageData]);
            setCurrentMsg("")
        }
        console.log(messages);
        }
    useEffect(() => {
        socket.on("receive_message", (data) => {
        
            setMessages((msg) => [...msg,data]);
        })
    },[socket]);
    const ScrollRef = useRef(null);
    useEffect(() => {
        if(ScrollRef.current){

            ScrollRef.current.scrollIntoView({behavior:"smooth"})
        }
    })
    return ( 
        <>
            <div className="chat-container" style={{height:  !displayChat ?`${40}% ` : `${80}%`}}>
                {
                    !displayChat &&
                    <div className="chat-form">
                        <h1>Join Chat Room</h1>
                        <div className="form-group">
                            <input type="text" className="input-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
                            <input type="text" className="input-control" value={room} onChange={(e) => setRoom(e.target.value)} placeholder="roomId" />
                        </div>
                        <div className="form-group">

                            <button onClick={joinRoom}>join</button>
                        </div>
                        <p>Socket.IO is a library that enables real-time, bidirectional and event-based communication between the browser and the server. </p>
                    </div>
                }
                {
                    displayChat && <div className="chat-room">
                        <div className="chat-header">
                            <h4>live chat</h4>
                        </div>
                        <div className="messages">
                            <div className="room-info">
                                <p>welcome to {room}</p>
                            </div>
                            {
                                messages.map((msg,ind) => 
                                    <div className="message" key={ind} id={username === msg.author ? "you" : "other"}>
                                        
                                        <div className="message-content">
                                        <div className="text" ref={ScrollRef}>
                                            <p>{msg.message}</p>
                                        </div>
                                        <div className="detail">
                                            <div className="time">10:50</div>
                                            <div className="author">sent by: {msg.author}</div>
                                        </div>

                                            </div>
                                    </div>
                                    
                                )
                            }
                            
                        </div>
                        <div className="input-types">
                            <textarea placeholder="type message...." onChange={(e) => setCurrentMsg(e.target.value)} value={currentMsg} cols="30" rows="3"></textarea>
                            <button onClick={sendMessage}> Send </button>
                        </div>
                    </div>
                }

            </div>
        </>
    )
}

export default ChatPage;