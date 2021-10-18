// eslint-disable-next-line
import React from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'
import db from './firebase';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function SidebarChat({id, name, addNewChat}) {

    const [messages, setMessages] = useState("");

    useEffect(() => {
        if(id) {
            db.collection('rooms')
            .doc(id).collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => 
                setMessages(snapshot.docs.map((doc) =>
                    doc.data()))
            );      
        }
    }, [id])

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");

        if(roomName){
            //database stuff here...
            db.collection('rooms').add({
                name: roomName,
            });
        }
    };


    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                <Avatar />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>

        
    ): (
        <div onClick = {createChat}
         className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat
