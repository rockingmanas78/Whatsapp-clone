// eslint-disable-next-line
import { Avatar, IconButton } from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {SearchOutlined, MoreVert, Message, InsertEmoticon} from '@material-ui/icons'
import MicIcon from '@material-ui/icons/Mic';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './Chat.css'
import { useStateValue } from './StateProvider';
import db from './firebase';
import firebase from "firebase/app";
import "firebase/firestore";

import { deepPurple } from '@material-ui/core/colors';
import userEvent from '@testing-library/user-event';


function Chat() {

    const [input, setInput] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        if(roomId){
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot((snapshot) => setRoomName
            (snapshot.data().name));

            db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => 
                    setMessages(snapshot.docs.map((doc) => doc.data()))
            );

        }
    }, [roomId])


    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>> ", input);

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat__header">
            <Avatar />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen {""}
                    {new Date(messages[messages.length-1]?.
                        timestamp?.toDateString()).toUTCString()} 
                    </p>
                </div>

                <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined />
                    </IconButton>
                    <IconButton>
                    <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                    <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`}>

                    <span className="chat__name">
                        {message.name}
                    </span>
                        {message.message}
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDateString()).toUTCString()}
                    </span>
                </p>
                ))}
                
                

            </div>

            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input value={input} onChange = {e =>
                    setInput(e.target.value)}
                    placeholder="Type a message" 
                    type="text" />
                    <button onClick= {sendMessage} 
                    type="submit">Send a Message</button>
                </form>
                <MicIcon />

            </div>
        </div>
    )
}

export default Chat
