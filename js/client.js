//creating a connection
const socket = io('http://localhost:8000');
const sendForm = document.getElementById('sendForm');
const message = document.getElementById('message');
const chatBox = document.querySelector('.chatbox');
const leftMessage = document.querySelector('.leftMessage');
const rightMessage = document.querySelector('.rightMessage');
//appending a function
const leftAppend = (message) =>{
    const messageElement = document.createElement('div');
    messageElement.classList.add('leftMessage');
    messageElement.classList.add('p-1');
    messageElement.classList.add('m-1');
    messageElement.innerText = message;
    chatBox.append(messageElement);
}

const rightAppend = (message) =>{
    const messageElement = document.createElement('div');
    messageElement.classList.add('rightMessage');
    messageElement.classList.add('p-1');
    messageElement.classList.add('m-1');
    messageElement.innerText = message;
    chatBox.append(messageElement);
}
//new user joined
const name1 = prompt("Enter Name to Join");
socket.emit('new-user-joined',name1);

socket.on('user-joined',name=>{
    rightAppend(`${name} joined the chat`);
})
socket.on('receive',(data)=>{
    leftAppend(`${data.name} : ${data.message}`);
})
socket.on('left',(name)=>{
    leftAppend(`${name} left the chat`);
})
sendForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let messageVal = message.value;
    rightAppend(`you: ${messageVal}`);
    socket.emit('send',messageVal);
    message.value = "";
})
