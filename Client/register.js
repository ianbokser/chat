const Remail = document.querySelector('#Remail');
const Rpassword = document.querySelector('#Rpassword');
const registerButton = document.querySelector('#register');

registerButton.addEventListener('click', function () {
    registerButton.classList.add('pressed');
    const RemailValue = Remail.value;
    const RpasswordValue = Rpassword.value;
    if (RemailValue == "" || RpasswordValue == ""){
        console.log('no puede estar vacio')
    }else{
    fetch('http://localhost:3005/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( { user: RemailValue, password: RpasswordValue }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        })
    }
    setTimeout(() => {
        registerButton.classList.remove('pressed');
    }, 300);
});

