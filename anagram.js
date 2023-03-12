const fs = require('fs');
const readline = require('readline');

class AnagramFinder {
  constructor(letters) {
    // Convertimos las letras a minúsculas y las ordenamos alfabéticamente
    this.sortedLetters = letters.toLowerCase().split('').sort().join('');
    // Creamos un stream de lectura para el archivo palabras.txt
    this.stream = fs.createReadStream('palabras.txt');
  }

  findAnagrams() {
    // Creamos un lector de línea para leer cada línea del archivo
    const reader = readline.createInterface({ input: this.stream });

    let anagram = [];

    // Por cada línea del archivo, verificamos si es un anagrama de las letras ingresadas
    reader.on('line', (line) => {
      const sortedLine = line.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split('').sort().join('');
      const intoWord = this.sortedLetters.split('');
      let matchs = 0;
      let l = [];

      if (sortedLine.length === 7) {
        for (let i = 0; i < sortedLine.length; i++) {
          for (let e = 0; e < intoWord.length; e++) {

            if (sortedLine[i] === intoWord[e]) {
              // console.log(intoWord);
              // console.log(line);
              // console.log(sortedLine[i] +"=" + intoWord[e]);
              // console.log('--');
              l.push(sortedLine[i])
              matchs += 1;
              intoWord[e] = '';
              break
            }
          }
        }
        // console.log('--');
        // console.log(this.sortedLetters);
        // console.log(intoWord);
        // console.log(l);
        // console.log(line);
        // console.log(matchs);
      }

      if (sortedLine.length === 7 && matchs >= 7) {
        anagram.push(line);
      }
    });

    // Cuando se termine de leer el archivo, cerramos el stream de lectura y el programa
    reader.on('close', () => {
      this.stream.close();
      console.log("proceso exitoso");
    });

    // Devolvemos una promesa que se resolverá con el contenido de `resp` cuando se termine de procesar el archivo
    return new Promise((resolve) => {
      reader.on('close', () => {
        resolve(anagram);
      });
    });
  }
}

module.exports = AnagramFinder;

// tjeuingrtsda