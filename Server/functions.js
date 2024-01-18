import { createConnection } from 'mysql';

export async function checkUserCredentials(_host, __user, __password, _database, _user, _password) {
    const connection = createConnection({
        host: _host,
        user: __user,
        password: __password,
        database: _database,
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
                const userExists = results.length > 0;
                resolve(userExists);
            });
        });
    });
}

export async function registerUser(_host, _user, _password, _database, password, email) {
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

            const sql = 'INSERT INTO `users`(`user`, `password`) VALUES (?, ?)';
            const values = [password, email];

            connection.query(sql, values, (error, results) => {
                connection.end();

                if (error) {
                    console.error('Error al registrar el usuario:', error);
                    reject(error);
                } else {
                    console.log('Usuario registrado exitosamente.');
                    resolve(results);
                }
            });
        });
    });
}

export function registUser (_host, _user, _password, _database, user, password) {
    return new Promise(async (resolve, reject) => {
        try {
            const userExists = await registerUser(_host, _user, _password, _database, user, password);
            resolve(userExists);
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            reject(error);
        }
    });
}



export function userExists(_host, _user, _password, _database, user, password) {
    return new Promise(async (resolve, reject) => {
        try {
            const userExists = await checkUserCredentials(_host, _user, _password, _database, user, password);
            resolve(userExists);
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            reject(error);
        }
    });
}