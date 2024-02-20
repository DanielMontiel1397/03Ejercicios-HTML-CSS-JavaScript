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

addEventListener('DOMContentLoaded',()=>{
    let width = window.innerWidth;

    if(width<800){
        containerInicio.style.display = 'none';
        containerRegister.style.display = 'block';

        formularioInicio.style.display = 'block';
        formularioRegistro.style.display = 'none';
    }
})

btnRegistrar.addEventListener('click',registrar);
btnIniciarSesion.addEventListener('click',iniciar);

window.addEventListener('resize',()=>{
    let width = window.innerWidth;
    
    if(width<800){
        organizarFormulario();
    } else{
        containerInicio.style.display='block';
        containerRegister.style.display='block';
        
        let formularioInicioDisplay = window.getComputedStyle(formularioInicio).display;
        let formularioRegistroDisplay = window.getComputedStyle(formularioRegistro).display;

        if(formularioInicioDisplay ==='block'){
            iniciar()
        } else if(formularioRegistroDisplay === 'block'){
            registrar();
        }
    }

})

//FUNCIONES
function registrar(){
    if(window.innerWidth>= 800){

        formularioRegistro.style.display = "block";
        contenedorLoginRegister.style.left = "410px";
        formularioInicio.style.display = 'none';
        containerRegister.style.opacity = "0";
        containerInicio.style.opacity ='1';
        console.log('Toy funcionando');
    }
     else{
        formularioRegistro.style.display = "block";
        formularioInicio.style.display = 'none';
        containerInicio.style.display = 'block';
        containerRegister.style.display ='none';
        containerInicio.style.opacity = "1";
    }
}

function iniciar(){
    if(window.innerWidth>=800){
        formularioRegistro.style.display = "none";
        contenedorLoginRegister.style.left = "10px";
        formularioInicio.style.display = 'block';
        containerRegister.style.opacity = "1";
        containerInicio.style.opacity ='0';
        console.log('Toi funcionando');
    }
     else{
        formularioRegistro.style.display = "none";
        formularioInicio.style.display = 'block';
        containerRegister.style.opacity = "1";
        containerInicio.style.display = 'none';
        containerRegister.style.display ='block';
     }
}

function organizarFormulario(){

    let formularioInicioDisplay = window.getComputedStyle(formularioInicio).display;
    let formularioRegistroDisplay = window.getComputedStyle(formularioRegistro).display;
    
    if(formularioInicioDisplay==='block'){
        containerInicio.style.display= 'none';
        formularioInicio.style.opacity = "1";
    } else if(formularioRegistroDisplay === 'block'){
        containerRegister.style.display='none';
        formularioRegistro.style.opacity = "1";
    }
}