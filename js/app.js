const ingresos = [
    new Ingreso('Salario',2100),
    new Ingreso('Venta coche', 1500),
];

const egresos = [
    new Egreso('Renta depto', 900),
    new Egreso('Ropa', 400)
]



let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}



let totalIngresos = ()=>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = ()=>{
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}




let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();

    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);

    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);

    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor)=>{
    /*la func toLocaleString forma parte del concepto de "internacionalización" 
    que da diversos formatos a datos, e eincluso puede detectar donde esta el usuario
    y dar formato acorde a los datos*/
    return valor.toLocaleString('es-AR',{style:'currency', currency:'ARS', minimumFractionDigits:2});
    /*en este caso le damos formato tipo ingles-americano, tipo dinero, dolares americanos, 
    con 2 decimales*/

    /*para cambiar la moneda solo hay que cambiar el lenguaje(primer parámetro) 
    y la moneda(currency), ejemplos:
    en-US     USD     <--- dolares
    es-ES     EUR     <--- euros
    es-MX     MNX     <--- pesos(?) mexicanos (este no le anduvo)
    es-AR     ARS     <--- pesitos
    */
}

const formatoPorcentaje = (valor)=>{
    /*en este caso damos formato tipo ingles-americano, porcentaje, con 2 decimales*/
    return valor.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2});
}




const cargarIngresos = () => {
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresosHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}
const cargarEgresos = () => {
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresosHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}




const crearIngresosHTML = (ingreso) => {//Uba lo hace con una variable (yo hago return directo)
    let ingresoHTML = `<div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name='close-circle-outline'
                    onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>`;
    return ingresoHTML;
}

const eliminarIngreso = (id) => {
    //find index te devuelve el indice de un arreglo donde esta el valor que mandas como arg
    let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id );/*esta funcion flecha no tiene ni ()
    ni {} porque es un solo argumento y una sola linea de código. Está funcionando como un 
    for (elemento of elementos) y va a dar coincidencia cuando encuentre el id que pedimos
    como parámetro*/
    ingresos.splice(indiceEliminar,1);/*splice elimina posiciones del arreglo desde el 
    indice primerArgumento(indiceEliminar) y luego pide cuantas posiciones eleminar desde
    ahí (en este caso 1)*/
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}





const crearEgresosHTML = (egreso) => {//acá sin variable, return directo
    return `<div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalIngresos())}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name='close-circle-outline'
                onclick='eliminarEgreso(${egreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>`;
}

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex( egreso => egreso.id === id );    
    egresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarEgresos();
}

const agregarDato = () => {
    let formulario = document.forms['form1'];
    let tipo = formulario['tipo'];
    let descripcion = formulario['descripcion'];
    let valor = formulario['valor'];
    if (descripcion.value != '' && valor.value != ''){
        if (tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, Number(valor.value)));
            cargarApp();
        } else if (tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value));/* el + adelante
            de una variable que contiene string lo convierte a number como Number(cadena)*/
            cargarCabecero();
            cargarEgresos();
        }
    }
    // ettin lo agregué yo
    descripcion.value = '';
    valor.value = '';
}