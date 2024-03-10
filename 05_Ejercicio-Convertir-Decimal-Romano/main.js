//SELECTORES

const btn = document.querySelector('#btn-convertir');
const inputNumeroDecimal = document.querySelector('#noDecimal');
const inputNumeroRomano = document.querySelector('#noRomano');


eventListener();

function eventListener(){
    btn.addEventListener('click',convertir);
}


const romano = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];

const decimal = [1000,900,500,400,100,90,50,40,10,9,5,4,1];

function convertir(e){
    e.preventDefault();

    let valorDecimal = inputNumeroDecimal.value.trim();
    let valorRomano = "";

    //Validar si el campo no esta vacio
    if(valorDecimal === ''){
        mensajeAlerta('El campo NÚMERO esta vacio');
        return;
    }

    //VALIDAR SI CONTIENE SOLO NUMERO

    if(validar(valorDecimal)){

        if(!(valorDecimal<4000 && valorDecimal>0)){
            mensajeAlerta('El numero tiene que estrar entre 0 y 4000');
        }

        decimal.forEach((valor,indice) => {   

            while(valorDecimal>=valor){
                valorRomano += romano[indice];
                valorDecimal -= valor;
            }

        })

        inputNumeroRomano.value = valorRomano;
        valorRomano = '';
        
    } else{
        mensajeAlerta("El valor ingresado no es un número");
    }

}

function validar(numero){
    const expresionRegular = /^[0-9]+$/;

    const resultado = expresionRegular.test(numero);

    return resultado;

}

function mensajeAlerta(texto){
    if(document.querySelector('.divMensaje')){
        document.querySelector('.divMensaje').remove();
    }

    const divMensaje = document.createElement('div');
    const mensaje = document.createElement('p');
    divMensaje.classList.add('divMensaje');
    mensaje.textContent = texto;

    divMensaje.appendChild(mensaje);
    document.querySelector('.section-container').appendChild(divMensaje);

    inputNumeroDecimal.value = '';
    inputNumeroRomano.value = '';

    setTimeout(()=>{
        divMensaje.remove();
    },3000);
}