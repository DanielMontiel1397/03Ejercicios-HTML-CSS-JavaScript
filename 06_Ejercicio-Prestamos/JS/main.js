//VARIABLES
let DB;
let editando;
//SELECTORES
const nombreNuevoCliente = document.querySelector('#registro-nombre');
const direccionNuevoCliente = document.querySelector('#registro-direccion');
const telefonoNuevoCliente = document.querySelector('#registro-telefono');
const cantidadNuevoCliente = document.querySelector('#registro-cantidad');

const formularioRegistro = document.querySelector('#formulario-registro');

const listaClientes = document.querySelector('.usuarios-nuevo');

//abono
const formularioAbono = document.querySelector('#formulario-abono');
const cantidadAbono = document.querySelector('#pago-abono');
const btnAbonar =document.querySelector('#button-abonar');

//EVENT LISTENERS 

addEventListener('DOMContentLoaded', ()=>{
    eventListeners();
    crearDB();
})

function eventListeners(){

    nombreNuevoCliente.addEventListener('change',agregarDatos);
    direccionNuevoCliente.addEventListener('change',agregarDatos);
    telefonoNuevoCliente.addEventListener('change',agregarDatos);
    cantidadNuevoCliente.addEventListener('change',agregarDatos);

    formularioRegistro.addEventListener('submit',agregarCliente);

    formularioAbono.addEventListener('submit',agregarAbono);
}

//CLASES
class Cliente{
    constructor(){
        this.clientes = [];
    }

    agregarClientes(cliente){
        this.clientes = [...this.clientes, cliente];

    }

    calcularPagoSemanal(cantidad){
        let pagoSemanal = cantidad/12;
        return pagoSemanal;
    }

    calcularRestante(abono,{pagoRestante}){
        if(abono>pagoRestante){
            return;
        }

        const restante = pagoRestante-abono;
        return restante;
    }

    editarCliente(clienteActualizado){
        this.clientes = this.clientes.map( cliente => cliente.id === clienteActualizado.id ? clienteActualizado : cliente);
    }

}

class UI{
    mostrarAlerta(tipo,mensaje){

        this.limpiarMensaje();

        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','d-block','col-12','mt-4','mostrando','alert');
        
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
            divMensaje.classList.remove('alert-success');
            formularioRegistro.appendChild(divMensaje);
        }

        if(tipo === 'clienteCorrecto'){
            divMensaje.classList.remove('alert-danger');
            divMensaje.classList.add('alert-success');
            formularioRegistro.appendChild(divMensaje);
        }

        if(tipo === 'errorAbono'){
            divMensaje.classList.add('alert-danger');
            divMensaje.classList.remove('alert-success');
            formularioAbono.appendChild(divMensaje);
        }

        if(tipo==='abonoCorrecto'){
            divMensaje.classList.remove('alert-danger');
            divMensaje.classList.add('alert-success');
            formularioAbono.appendChild(divMensaje);
        }
        
        divMensaje.textContent = mensaje;
        setTimeout(()=>{
            divMensaje.remove()
        },3000);

    }

    limpiarMensaje(){
        if(document.querySelector('.mostrando')){
            console.log('eliminando mensaje');
            document.querySelector('.mostrando').remove();
        }
    }

    mostrarClientes(){

       this.limpiarHTML();

        //Leer contenido de DB
        const objectStore = DB.transaction('clientes').objectStore('clientes');

        objectStore.openCursor().onsuccess = function(e){

            const cursor = e.target.result;

            if(cursor){

                const {nombre,direccion,telefono,cantidad,pagoSemanal,pagoRestante} = cursor.value;

                const lista = document.createElement('li');
                lista.classList.add('row','fs-5','border','border-3','border-primary','rounded-5','p-3','mb-1');

                const divContainer = document.createElement('div');
                divContainer.classList.add('col-6');

                divContainer.innerHTML = `
                <p>Nombre: <span>${nombre}</span></p>
                <p>Direccion: <span>${direccion}</span></p>
                <p>Telefono: <span>${telefono}</span></p>
                <p class="fw-bold">Deuda: <span>$${cantidad}<span></p>
                <p class="fw-bold">Pago Semanal:<span>$${pagoSemanal.toFixed(2)}</span></p>
                <p class="fw-bold">Restante:<span>$${pagoRestante}</span></p>
                `
                lista.appendChild(divContainer);
                listaClientes.appendChild(lista);

                //Contenedor botones
                const divBtnConteiner = document.createElement('div');
                divBtnConteiner.classList.add('d-flex','gap-2','flex-column')
                divContainer.appendChild(divBtnConteiner);

                //Boton agregar abono

                const btnAbono = document.createElement('button');
                btnAbono.classList.add('btn','btn-info','fs-4','fw-bold','col-8');
                btnAbono.textContent = "Agregar Abono";
                divBtnConteiner.appendChild(btnAbono);

                const cliente = cursor.value;
                btnAbono.onclick = () => agregarBono(cliente);

                //Boton eliminar 
                const btnEliminar = document.createElement('button');
                btnEliminar.classList.add('btn','btn-danger','fs-4','fw-bold','col-8');
                btnEliminar.textContent = "Eliminar";
                divBtnConteiner.appendChild(btnEliminar);

                btnEliminar.onclick = ()=>eliminarCliente(cliente);

                //Ir al siguiente elemento
                cursor.continue();

            }
        }

    }

    limpiarHTML(){
        while(listaClientes.firstChild){
            listaClientes.removeChild(listaClientes.firstChild);
        }
    }

    formularioAbono(nombre,cantidad,restante){

        document.querySelector('#nombre-abono').textContent = nombre;

        document.querySelector('#total-abono').textContent = cantidad;

        document.querySelector('#restante-abono').textContent = restante;
        
    }
}

//INSTANCIAR
const cliente = new Cliente();
const ui = new UI();


//OBJETOS
const objCliente = {
    nombre: '',
    direccion: '',
    telefono: '',
    cantidad: ''
}

//FUNCIONES

//Crear objeto con datos

function agregarDatos(e){
    objCliente[e.target.name] = e.target.value;
}

//Agregar cliente

function agregarCliente(e){
    e.preventDefault();

    //Validar Campos
    if(nombreNuevoCliente.value === '' || direccionNuevoCliente.value === '' || telefonoNuevoCliente.value === '' || cantidadNuevoCliente.value === ''){
        ui.mostrarAlerta('error','Todos los Campos deben ser llenados');
        return;
    }

    objCliente.id = Date.now();

    cliente.agregarClientes({...objCliente});

    //Calcular Pago semanal
    const pagoSemanal = cliente.calcularPagoSemanal(objCliente.cantidad);

    objCliente.pagoSemanal = pagoSemanal;

    //Calcular Restante
    const pagoRestante = objCliente.cantidad;

    objCliente.pagoRestante = pagoRestante;

    //Agregar a DB
    const transaccion = DB.transaction(['clientes'],'readwrite');

    const objectStore = transaccion.objectStore('clientes');

    objectStore.add(objCliente);

    transaccion.oncomplete = function(){
        ui.mostrarAlerta('clienteCorrecto','El cliente se agrego Correctamente')
        console.log('Cita agregada');
    }

    //Imprimir HTML
    ui.mostrarClientes();

    //Limpiar objeto
    limpiarObjeto();

    formularioRegistro.reset();

}

function crearDB(){
    const crearDB = window.indexedDB.open('clientes',1);

    //si hay un error
    crearDB.onerror = function(){
        console.log('Hubo un error');
    }

    //si todo esta bien
    crearDB.onsuccess = function(){
        console.log('Base de datos creada');

        DB = crearDB.result;
        

        ui.mostrarClientes();
    }

    //Definir el esquema
    crearDB.onupgradeneeded = function(e){
        const db = e.target.result;

        const objectStore = db.createObjectStore('clientes',{
            keyPath: 'id',
            autoIncrement: true
        });

        //Definir Columnas
        objectStore.createIndex('nombre','nombre', {unique: false});
        objectStore.createIndex('direccion','direccion', {unique: false});
        objectStore.createIndex('telefono','telefono', {unique: false});
        objectStore.createIndex('cantidad','cantdad', {unique: false});
        objectStore.createIndex('pagoSemanal','pagoSemanal', {unique: false});
        objectStore.createIndex('pagoRestante','pagoRestante', {unique: false});
        objectStore.createIndex('id','id', {unique: true});

        console.log('DB creada y lista');
    }

    
}

function limpiarObjeto(){
    objCliente.nombre = '';
    objCliente.direccion = '';
    objCliente.telefono = '';
    objCliente.cantidad = '';
    objCliente.pagoSemanal = '';
    objCliente.pagoRestante = '';
}

function agregarBono(cliente){
    editando = true;
    ventanaEdicion(editando);

    const {nombre,cantidad,direccion,telefono,pagoSemanal,pagoRestante,id} = cliente;

    ui.formularioAbono(nombre,cantidad,pagoRestante);

    objCliente.nombre = nombre;
    objCliente.cantidad = cantidad;
    objCliente.direccion = direccion;
    objCliente.pagoSemanal = pagoSemanal;
    objCliente.pagoRestante = pagoRestante;
    objCliente.telefono = telefono;
    objCliente.id = id;
}

function agregarAbono(e){
    e.preventDefault();
    console.log('holis');
    if(cantidadAbono === '' || !parseInt(cantidadAbono.value) ){
        ui.mostrarAlerta('errorAbono','El abono tiene que ser un número');
        return;
    }

    if(objCliente.pagoRestante === 0){
        ui.mostrarAlerta('errorAbono','La deuda ya ha sido pagada');
        editando = false;
        formularioAbono.reset();

        setTimeout(()=>{
            ventanaEdicion(editando);
        },3000);
        return;
    }

    const restante = cliente.calcularRestante(cantidadAbono.value,objCliente);

    if(restante === undefined){
        ui.mostrarAlerta('errorAbono','El abono seria mayor al restante');
        return;
    }

    objCliente.pagoRestante = restante;

    cliente.editarCliente({...objCliente});

    //Editar DB

    const transaccion = DB.transaction(['clientes'],'readwrite');
    const objectStore = transaccion.objectStore('clientes');

    objectStore.put(objCliente);

    transaccion.oncomplete = ()=>{
        editando = false;
        ui.mostrarAlerta('abonoCorrecto','El abono se agrego Correctamente');
        limpiarObjeto();
        ui.mostrarClientes();
        
    }
    
    transaccion.onerror = ()=>{
    }


    formularioAbono.reset();

    setTimeout(()=>{
        ventanaEdicion(editando);
        
    },3000)
}

function ventanaEdicion(editando){

    if(editando === true){
        formularioRegistro.parentElement.classList.add('d-none');
        formularioAbono.parentElement.classList.remove('d-none');
    } else{
        formularioAbono.parentElement.classList.add('d-none');
        formularioRegistro.parentElement.classList.remove('d-none');
    }

}

function eliminarCliente(cliente){
    const transaccion = DB.transaction(['clientes'],'readwrite');
    const objectStore = transaccion.objectStore('clientes');

    objectStore.delete(cliente.id);

    transaccion.oncomplete = ()=>{
        console.log('Cliente eliminado');
        ui.mostrarClientes();
    }
}