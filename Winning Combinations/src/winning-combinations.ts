
type WinningCombinationsResult = [number, number[]][];

function call(lines: number[]): WinningCombinationsResult {
  const nonPayingNumbers = [10, 11, 12, 13, 14, 15]
  const finalSequence: WinningCombinationsResult = []; 
  let allnumRead: boolean = false; //Variable to check if the entire list has already been read

  lines.forEach((element, i) => {
    let arrayAux: number[] = []; //Auxiliary array for filling in the final sequence
    let numJokerAux: number = 0; //Auxiliary predominant number for 0

    //If the current comparator is paying and is not yet in the final sequence
    if(!nonPayingNumbers.includes(element) && !allnumRead && !validateSymbolInArray(element, finalSequence)){      
      if(element === 0){
        for (let j = i+1; j < lines.length; j++) {
          //If the element is equal to the next or the next number is equal to the auxiliary number
          if(element === lines[j] || lines[j] === numJokerAux){
            if(!arrayAux.includes(i)) arrayAux.push(i);
            arrayAux.push(j);

            //If it is the last element in the array, all the numbers have been validated
            if(j == lines.length-1){
              allnumRead = true;

              //Validation to define the predominant number in the final sequence
              if(numJokerAux !== 0){
                finalSequence.push([numJokerAux, arrayAux]);
              }else{
                //If all the items in the array are equal to 0
                if(arrayAux.length == lines.length) finalSequence.push([0, arrayAux]);
              }
            }
          } else{
            //Validation for auxiliary number substitution
            if(numJokerAux === 0){
              numJokerAux = lines[j];
              if(!arrayAux.includes(i)) arrayAux.push(i);
              arrayAux.push(j);

              //If it is the last element in the array, all the numbers have been validated
              if(j == lines.length-1){
                allnumRead = true;

                if(arrayAux.length >= 3){
                  if(numJokerAux !== 0){
                    finalSequence.push([numJokerAux, arrayAux]);
                  }else{
                    //If all the items in the array are equal to 0
                    if(arrayAux.length == lines.length) finalSequence.push([0, arrayAux]);
                  }
                }
              }
            
            //If it finds another number that is not equal to the auxiliary number, it ends the search for element 0
            }else{
              if(arrayAux.length >= 3){
                finalSequence.push([numJokerAux, arrayAux]);
              } 

              break;
            }
            
          }         
        }
      //Comparing numbers other than 0
      }else{
        for (let j = i+1; j < lines.length; j++) {
          //If the current element is equal to the next or equal to 0
          if(element === lines[j] || lines[j] === 0){
            if(!arrayAux.includes(i)) arrayAux.push(i);
            arrayAux.push(j);

            //If it is the last element in the array, all the numbers have been validated
            if(j == lines.length-1){
              allnumRead = true;

              if(arrayAux.length >= 3) finalSequence.push([element, arrayAux]);
            }
            
          //If there is a discrepancy, it terminates the search for this element and validates the number of elements in the array
          } else{
            if(arrayAux.length >= 3) finalSequence.push([element, arrayAux]); 
            
            //Terminates the for loop so as not to validate the rest of the numbers
            break;
          }         
        }

      }
    }
  });
  
  return finalSequence;  
}

//Function just to validate if a token sequence already exists in the final sequence
function validateSymbolInArray(num: number, sequence: WinningCombinationsResult): boolean{
  let isInArray: boolean = false;
  sequence.forEach(element => {
    if(element[0] === num) isInArray = true;
  });

  return isInArray;
}

export const WinningCombinations = { call };