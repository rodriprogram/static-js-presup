function suma(arreglo){
    let resultado = 0;
    for (let elemento in arreglo) {
        resultado += elemento;
    }
    for (let i = 0; i<arreglo.legth; i++){
        resultado += arreglo[i];
    }
    return resultado;
x = x + 1
a = 0
x = a
a = x + 2
}
console.log(suma([1,2,3,4,7,5,3,3,56,67,6,23,2,4,6,7]))
console.log(suma([1,2,3]))
console.log(suma([1,2]))