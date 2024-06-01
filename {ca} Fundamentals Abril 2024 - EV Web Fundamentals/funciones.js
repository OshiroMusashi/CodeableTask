function interactuarCadenas(cadena1, cadena2) {
  // Aquí se verifica que las dos cadenas tengan la misma longitud. Si no lo son, lanza un error.
  if (cadena1.length !== cadena2.length) {
    throw new Error("Las cadenas deben tener la misma longitud");
  }

  let resultado = '';

  // Aquí se recorre cada posición de los caracteres de ambas cadenas utilizando un bucle
  for (let i = 0; i < cadena1.length; i++) {
    if (cadena1[i] === '+' && cadena2[i] === '+') {
      resultado += '+';
    } else if (cadena1[i] === '-' && cadena2[i] === '-') {
      resultado += '-';
    } else {
      resultado += '0';
    }
  }

  return resultado;
}

function generarApodo(nombre) {
  // Aquí se definen las vocales
  const vocales = 'aeiou';

  // Con este código se verifica que el nombre tenga al menos 4 caracteres
  if (nombre.length < 4) {
    throw new Error("Nombre muy corto");
  }

  // Aquí se obtiene la tercera letra (índice 2)
  const terceraLetra = nombre[2].toLowerCase();

  // Aquí se verifica que la tercera letra sea una vocal
  if (vocales.includes(terceraLetra)) {
    // Si es vocal, se devuelve las primeras 4 letras
    return nombre.slice(0, 4);
  } else {
    // Si no es vocal, se devuelve las primeras 3 letras
    return nombre.slice(0, 3);
  }
}

function obtenerMarcador(texto) {
  // Aquí se realiza el mapeo de palabras a números
  const numeros = {
    "cero": 0,
    "uno": 1,
    "dos": 2,
    "tres": 3,
    "cuatro": 4,
    "cinco": 5,
    "seis": 6,
    "siete": 7,
    "ocho": 8,
    "nueve": 9,
    "diez": 10
  };

  // Aquí se convierte el texto a minúsculas y se divide en palabras
  const palabras = texto.toLowerCase().split(" ");

  // Aquí se filtran las palabras que son números
  const resultado = palabras.filter(palabra => palabra in numeros).map(palabra => numeros[palabra]);

  // Aquí se valida que si no se encontran números, entonces que se retorne [0, 0]
  if (resultado.length === 0) {
    return [0, 0];
  }

  // Aquí se retornan los dos primeros números encontrados, o se completa con 0 si solo hay uno
  return [resultado[0] || 0, resultado[1] || 0];
}

class Barco {
  constructor(calado, tripulacion) {
    this.calado = calado;
    this.tripulacion = tripulacion;
  }

  valeLaPena() {
    // Aquí se calcula el calado total teniendo en cuenta el peso adicional de la tripulación
    const caladoTotal = this.calado - (this.tripulacion * 1.5);

    // Si el calado total es mayor que 20, el barco vale la pena ser saqueado
    return caladoTotal > 20;
  }
}
