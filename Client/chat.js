import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'
const socket = io('http://localhost:3005')


const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages')

socket.on('chat message', (msg) => {
    const item = `
        <li>
            <small>ian: </small>
            <p>${msg}</p> 
        </li>`
    messages.insertAdjacentHTML('beforeend', item)
    messages.scrollTop = messages.scrollHeight
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim() !== '') {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});


