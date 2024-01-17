import { createConnection } from 'mysql';

export async function connectToDatabase(_host, _user, _password, _database) {
    const connection = createConnection({
        host: _host,
        user: _user,
        password: _password,
        database: _database,
    });

    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.error('Error al conectar a la base de datos:', err);
                reject(err);
                return;
            }
            console.log('Conexión exitosa');
            resolve(connection);
        });
    });
}