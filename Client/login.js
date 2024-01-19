const Lemail = document.querySelector('#Lemail');
const Lpassword = document.querySelector('#Lpassword');
const loginButton = document.querySelector('#login');

loginButton.addEventListener('click', function () {
    loginButton.classList.add('pressed');
    const LemailValue = Lemail.value;
    const LpasswordValue = Lpassword.value;
    if (LemailValue == "" || LpasswordValue == ""){
        console.log('no puede estar vacio')
    }else{
    fetch('http://localhost:3005/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( { user: LemailValue, password: LpasswordValue }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
            if(data.login){
                location.href ="./Pages/chat.html";
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        })
    }
    setTimeout(() => {
        loginButton.classList.remove('pressed');
    }, 300);
});
