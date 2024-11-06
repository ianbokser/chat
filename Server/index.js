import express from 'express';
import logger from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
// import dotenv from 'dotenv'
import cors from 'cors';
import { userExists, registUser, addMesage, idFromUser, FromId  } from './functions.js';

// dotenv.config()


// const DBhost = process.env.DB_Host
// const DBuser = process.env.DB_User
// const DBpassword = process.env.DB_Password
// const DBdb = process.env.DB

const port = process.env.PORT ?? 3005;

const app = express();

app.use(cors());

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    },
    connectionStateRecovery:{}
});

app.use(bodyParser.json());

app.post('/login', async (req, res) => {
    try {
        const { user, password } = req.body;
        const login = await userExists('localhost', 'ian', '123456', 'users', user, password);
        res.json({ login, user });
    } catch (error) {
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
    console.log(`user has connected!`);

    socket.on('disconnect', () => {
        console.log(`user has disconnected`);
    });

    socket.on('chat message', (msg) => {
        // try {
        //     const userId = FromId(_host, _user, _password, _database, user)
        //     addMesage('localhost', 'ian', '123456', 'users', msg, userId);
        // } catch (e) {
        //     console.error('Error al procesar el mensaje:', e);
        // }
        io.emit('chat message', msg);
    });
});

app.use(logger('dev'));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/Client/index.html');
});

server.listen(port, () => {
    console.log(`server running on port ${port}`);
});