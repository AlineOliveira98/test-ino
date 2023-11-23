function call(lines) {
    const nonPayingNumbers = [10, 11, 12, 13, 14, 15];
    const finalSequence = [];
    let allnumRead = false;
    lines.forEach((element, i) => {
        //console.log(`-----------------------------------------`);
        //console.log(`Fazendo leitura do elemento ${element}.`);
        let arrayAux = [];
        let numWildAux = 0;
        //Se o elemento comparador atual não for pagante
        if (!nonPayingNumbers.includes(element) && !allnumRead && !validarRepeticao(element, finalSequence)) {
            if (element === 0) {
                //console.log(`Iniciando comparações do elemento coringa.`);
                for (let j = i + 1; j < lines.length; j++) {
                    if (element === lines[j] || lines[j] === numWildAux) {
                        if (!arrayAux.includes(i))
                            arrayAux.push(i);
                        arrayAux.push(j);
                        //console.log(`Elemento compativel ${element} - ${lines[j]}`);
                        //Se for o final do array
                        if (j == lines.length - 1) {
                            //console.log(`Todos os números validados.`);
                            allnumRead = true;
                            if (numWildAux !== 0) {
                                finalSequence.push([numWildAux, arrayAux]);
                                //console.log(`Numero predominante ${numWildAux} validado enviando para o array final o elemento ${numWildAux}.`);
                            }
                            else {
                                //console.log(`Numero predominante ${numWildAux} invalidado.`);
                                if (arrayAux.length == lines.length)
                                    finalSequence.push([0, arrayAux]);
                            }
                        }
                    }
                    else {
                        if (numWildAux === 0) {
                            numWildAux = lines[j];
                            if (!arrayAux.includes(i))
                                arrayAux.push(i);
                            arrayAux.push(j);
                            //console.log(`Elemento compativel ${element} - ${lines[j]} Definindo numero auxiliar ${numWildAux}`);
                            //Se for o final do array
                            if (j == lines.length - 1) {
                                //console.log(`Todos os números validados.`);
                                allnumRead = true;
                                if (arrayAux.length >= 3) {
                                    if (numWildAux !== 0) {
                                        finalSequence.push([numWildAux, arrayAux]);
                                        //console.log(`Numero predominante ${numWildAux} validado enviando para o array final o elemento ${numWildAux}.`);
                                    }
                                    else {
                                        //console.log(`Numero predominante ${numWildAux} invalidado.`);
                                        if (arrayAux.length == lines.length)
                                            finalSequence.push([0, arrayAux]);
                                    }
                                }
                            }
                        }
                        else {
                            //console.log(`Elemento incompativel ${numWildAux} - ${lines[j]}, consultando quantidade de elementos encontrados.`);
                            if (arrayAux.length >= 3) {
                                //console.log(`Quantidade ${arrayAux.length} suficiente, validando número predominante.`);
                                if (numWildAux !== 0) {
                                    finalSequence.push([numWildAux, arrayAux]);
                                    //console.log(`Numero predominante ${numWildAux} validado enviando para o array final o elemento ${numWildAux}.`);
                                }
                                else {
                                    //console.log(`Numero predominante ${numWildAux} invalidado.`);                  
                                }
                            }
                            else {
                                //console.log(`Quantidade ${arrayAux.length} insuficiente.`);
                            }
                            break;
                        }
                    }
                }
                //COMPARAÇÕES DE NUMEROS DIFERENTES DE 0
            }
            else {
                //console.log(`Iniciando comparações.`);
                for (let j = i + 1; j < lines.length; j++) {
                    if (element === lines[j] || lines[j] === 0) {
                        if (!arrayAux.includes(i))
                            arrayAux.push(i);
                        arrayAux.push(j);
                        //console.log(`Elemento compativel ${element} - ${lines[j]}`);
                        //Se for o final do array
                        if (j == lines.length - 1) {
                            //console.log(`Todos os números validados.`);
                            allnumRead = true;
                            if (arrayAux.length >= 3) {
                                //console.log(`Quantidade ${arrayAux.length} suficiente, enviando para o array final o elemento ${element}`);
                                finalSequence.push([element, arrayAux]);
                            }
                            else {
                                //console.log(`Quantidade ${arrayAux.length} insuficiente.`);
                            }
                        }
                    }
                    else {
                        //console.log(`Elemento incompativel ${element} - ${lines[j]}, consultando quantidade de elementos encontrados.`);  
                        if (arrayAux.length >= 3) {
                            //console.log(`Quantidade ${arrayAux.length} suficiente, enviando para o array final o elemento ${element}`);
                            finalSequence.push([element, arrayAux]);
                        }
                        else {
                            //console.log(`Quantidade ${arrayAux.length} insuficiente.`);
                        }
                        break;
                    }
                }
            }
        }
    });
    //console.log(`Final Sequence of Line: ${lines}`)  
    //console.log(finalSequence)
    return finalSequence;
}
function validarRepeticao(num, sequence) {
    let isInArray = false;
    sequence.forEach(element => {
        if (element[0] === num)
            isInArray = true;
    });
    return isInArray;
}
export const WinningCombinations = { call };
//call([1, 1, 0, 0, 3, 3]);
//# sourceMappingURL=winning-combinations.js.map