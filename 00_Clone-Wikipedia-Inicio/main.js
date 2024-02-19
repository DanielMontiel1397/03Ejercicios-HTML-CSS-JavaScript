
function mostrarAbreviacion() {
    const select = document.getElementById("idioma");
    let opcionSeleccionada = select.options[select.selectedIndex];
    opcionSeleccionada.text = opcionSeleccionada.value;
}