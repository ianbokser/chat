const email = document.querySelector('#email');
const password = document.querySelector('#password');
const register = document.querySelector('#register');

register.addEventListener('click', function () {
    register.classList.add('pressed');
    const emailValue = email.value;
    const passwordValue = password.value;
    fetch('http://localhost:3005/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( { user: emailValue, password: passwordValue }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
            if(data){
                location.href ="../Pages/Log_in.html";
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        })
        .finally(() => {
            setTimeout(() => {
                register.classList.remove('pressed');
            }, 300);
        });
});