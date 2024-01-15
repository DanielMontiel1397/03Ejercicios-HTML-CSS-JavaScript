//VARIABLES

//SELECTORES
const contenedorLoginRegister = document.querySelector('.contenedor-login-register');

const formularioInicio = document.querySelector('#formulario-iniciar');
const formularioRegistro = document.querySelector('#formulario-register');

const containerInicio = document.querySelector('.ingesar-login');
const containerRegister = document.querySelector('.ingesar-register');

const btnIniciarSesion = document.querySelector('#button-iniciar-sesion');
const btnRegistrar = document.querySelector('#button-register')

//EVENT LISTENERS

btnRegistrar.addEventListener('click',registrar);
btnIniciarSesion.addEventListener('click',iniciar);

//FUNCIONES
function registrar(){
    
        formularioRegistro.style.display = "block";
        contenedorLoginRegister.style.left = "410px";
        formularioInicio.style.display = 'none';
        containerRegister.style.opacity = "0";
        containerInicio.style.opacity ='1';
        console.log('Toy funcionando');
     //else{
    //     formularioRegistro.style.display = "block";
    //     contenedorLoginRegister.style.top = "550x";
    //     formularioInicio.style.display = 'none';
    //     containerRegister.style.opacity = "0";
    //     containerInicio.style.opacity ='1';
    //     console.log('holi');
    // }
}

function iniciar(){
    
        formularioRegistro.style.display = "none";
        contenedorLoginRegister.style.left = "10px";
        formularioInicio.style.display = 'block';
        containerRegister.style.opacity = "1";
        containerInicio.style.opacity ='0';
        console.log('Toi funcionando');
     //else{
    //     formularioRegistro.style.display = "none";
    //     contenedorLoginRegister.style.top = "-450px";
    //     formularioInicio.style.display = 'block';
    //     containerRegister.style.opacity = "1";
    //     containerInicio.style.opacity ='0';
    // }
}