import { createConnection } from 'mysql';

async function checkUserCredentials(_host, __user, __password, _database, _user, _password) {
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
            const query = 'SELECT * FROM users WHERE user = ? AND password = ?';
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

async function registerUser(_host, _user, _password, _database, password, email) {
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

async function addMessageHistory(_host, _user, _password, _database, message, user_id) {
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

            const sql = 'INSERT INTO `messages`(`message`, `user_id`) VALUES (?, ?)';
            const values = [message, user_id];

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

export function addMesage(_host, _user, _password, _database, message, user_id) {
    return new Promise(async (resolve, reject) => {
        try {
            const userExists = await addMessageHistory(_host, _user, _password, _database, message, user_id);
            resolve(userExists);
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            reject(error);
        }
    });
}


async function findIdFromUsers(_host, _user, _password, _database, user_id) {
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
                const sql = 'SELECT user FROM users WHERE user_id = ?';
                const values = [user_id];
                connection.query(sql, values, (error, results) => {
                connection.end();
                if (error) {
                    console.error('Error al buscar el usuario:', error);
                    reject(error);
                } else {
                    if (results.length > 0) {
                        const userName = results[0].user;
                        resolve(userName);
                    } else {
                        console.log('Usuario no encontrado.');
                        resolve(null);
                    }
                }
            });
        });
    });
}

export function idFromUser(_host, _user, _password, _database, user_id) {
    return new Promise(async (resolve, reject) => {
        try {
            const userName = await findIdFromUsers(_host, _user, _password, _database, user_id);
            resolve(userName);
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            reject(error);
        }
    });
}

async function findUserId(host, user, password, database, username) {
    const connection = createConnection({
        host: host,
        user: user,
        password: password,
        database: database,
    });

    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.error('Error al conectar a la base de datos:', err);
                reject(err);
                return;
            }

            const sql = 'SELECT id FROM users WHERE user = ?';
            const values = [username];

            connection.query(sql, values, (error, results) => {
                connection.end();

                if (error) {
                    console.error('Error al obtener el ID del usuario:', error);
                    reject(error);
                } else {
                    if (results.length > 0) {
                        const userId = results[0].id;
                        resolve(userId);
                    } else {
                        reject('Usuario no encontrado');
                    }
                }
            });
        });
    });
}

export function FromId(_host, _user, _password, _database, user_id) {
    return new Promise(async (resolve, reject) => {
        try {
            const userName = await findUserId(_host, _user, _password, _database, user_id);
            resolve(userName);
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            reject(error);
        }
    });
}