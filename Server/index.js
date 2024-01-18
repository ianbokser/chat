import express from 'express';
import logger from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import cors from 'cors';
import { userExists, registUser  } from './functions.js';


const port = process.env.PORT ?? 3005;

const app = express();

app.use(cors());

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5500",  
        methods: ["GET", "POST"]
    }
});

app.use(bodyParser.json());

app.post('/login', async (req, res) => {
    try {
    const { user, password } = req.body;
    const login  = await userExists ('localhost', 'ian', '123456', 'users', user, password)
    res.json(login);
    }catch (error) {
        console.error('Error en la solicitud:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

app.post('/register', async (req, res) => {
    try {
    const { user, password } = req.body;
    const registered = registUser('localhost', 'ian', '123456', 'users', user, password)
    res.json({ message: 'Usuario registrado exitosamente.' });
    }catch (error) {
        console.error('Error en la solicitud:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});



io.on('connection', async (socket) => {
    console.log('a user has connected!')
    socket.on('disconnect', () => {
    console.log('an user has disconnected')
    })
});

app.use(logger('dev'));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/Client/index.html');
});

server.listen(port, () => {
    console.log(`server running on port ${port}`);
});