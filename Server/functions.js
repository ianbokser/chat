import { createConnection } from 'mysql';

export async function checkUserCredentials(_user, _password) {
    const connection = createConnection({
        host: 'localhost',
        user: 'ian',
        password: '123456',
        database: 'rol',
    });

    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.error('Error al conectar a la base de datos:', err);
                reject(err);
                return;
            }

            const query = 'SELECT * FROM usuarios WHERE user = ? AND password = ?';
            connection.query(query, [_user, _password], (err, results) => {
                if (err) {
                    console.error('Error al ejecutar la consulta:', err);
                    reject(err);
                    return;
                }

                connection.end();

                // Si hay algún resultado, significa que existe un usuario con esos credenciales
                const userExists = results.length > 0;
                resolve(userExists);
            });
        });
    });
}

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

export function userExists(user, password) {
    return new Promise(async (resolve, reject) => {
        try {
            const userExists = await checkUserCredentials(user, password);
            resolve(userExists);
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            reject(error);
        }
    });
}