import express from 'express';
import logger from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectToDatabase } from './functions.js';


const port = process.env.PORT ?? 3005;

const app = express();

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5500",  
        methods: ["GET", "POST"]
    }
});

io.on('connection', async (socket) => {
    console.log('a user has connected!')
    try {
        const connection = await connectToDatabase('localhost', 'ian', '123456', 'rol');
        connection.end();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
    socket.on('disconnect', () => {
    console.log('an user has disconnected')
    })
})

app.use(logger('dev'));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/Client/index.html');
});

server.listen(port, () => {
    console.log(`server running on port ${port}`);
});

// async function connectToDatabase(_host, _user, _password, _database) {
//     const connection = createConnection({
//         host: _host,
//         user: _user,
//         password: _password,
//         database: _database,
//     });

//     return new Promise((resolve, reject) => {
//         connection.connect((err) => {
//             if (err) {
//                 console.error('Error al conectar a la base de datos:', err);
//                 reject(err);
//                 return;
//             }
//             console.log('Conexión exitosa');
//             resolve(connection);
//         });
//     });
// }