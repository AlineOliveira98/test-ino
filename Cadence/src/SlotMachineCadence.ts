type AnticipatorConfig = {
  columnSize: number;
  minToAnticipate: number;
  maxToAnticipate: number;
  anticipateCadence: number;
  defaultCadence: number;
};

type SlotCoordinate = {
  column: number;
  row: number;
};

type SpecialSymbol = { specialSymbols: Array<SlotCoordinate> };

type RoundsSymbols = {
  roundOne: SpecialSymbol;
  roundTwo: SpecialSymbol;
  roundThree: SpecialSymbol;
};

type SlotCadence = Array<number>;

type RoundsCadences = {
  roundOne: SlotCadence;
  roundTwo: SlotCadence;
  roundThree: SlotCadence;
};

/**
 * Anticipator configuration. Has all information needed to check anticipator.
 * @param columnSize It's the number of columns the slot machine has. * 
 * @param minToAnticipate It's the minimum number of symbols to start anticipation. * 
 * @param maxToAnticipate It's the maximum number of symbols to end anticipation. * 
 * @param anticipateCadence It's the cadence value when has anticipation. * 
 * @param defaultCadence It's the cadence value when don't has anticipation.
 */
const anticipatorConfig: AnticipatorConfig = {
  columnSize: 5,
  minToAnticipate: 2,
  maxToAnticipate: 3,
  anticipateCadence: 2,
  defaultCadence: 0.25,
};

/**
 * Game rounds with special symbols position that must be used to generate the SlotCadences.
 */
const gameRounds: RoundsSymbols = {
  roundOne: {
    specialSymbols: [
      { column: 0, row: 2 },
      { column: 1, row: 3 },
      { column: 3, row: 4 },
    ],
  },
  roundTwo: {
    specialSymbols: [
      { column: 0, row: 2 },
      { column: 0, row: 3 },
    ],
  },
  roundThree: {
    specialSymbols: [
      { column: 4, row: 2 },
      { column: 4, row: 3 },
    ],
  },
};

/**
 * This must be used to get all game rounds cadences.
 */
const slotMachineCadences: RoundsCadences = { roundOne: [], roundTwo: [], roundThree: [] };

/**
 * This function receives an array of coordinates relative to positions in the slot machine's matrix.
 * This array is the positions of the special symbols.
 * And it has to return a slot machine stop cadence.
 * @param symbols Array<SlotCoordinate> positions of the special symbols. Example: [{ column: 0, row: 2 }, { column: 2, row: 3 }]
 * @returns SlotCadence Array of numbers representing the slot machine stop cadence.
 */
function slotCadence(symbols: Array<SlotCoordinate>): SlotCadence {
  // Magic - avada kedavra :D

  let newCadence: SlotCadence = []; //Auxiliary array
  let countSpecialSymbolsTotal: number = 0; // Counter for checking the number of current special symbols.
  let currentValue: number = 0; //Controller of the value to be sent in the array
  let addCadence: number = anticipatorConfig.defaultCadence; //Current cadence controller 
  let canAnticipate: boolean = true; //Validation for changing the status of the anticipator.

  newCadence.push(currentValue);

  //Searching special symbols
  for (let i = 0; i < anticipatorConfig.columnSize; i++) {
    for (let j = 0; j < 6; j++) { 

      for (let k = 0; k < symbols.length; k++) {
        if(i === symbols[k].column && j === symbols[k].row){
          countSpecialSymbolsTotal++;
        }
        
      }
    }

    if(countSpecialSymbolsTotal === anticipatorConfig.minToAnticipate && canAnticipate){
      //Anticipation
      addCadence = anticipatorConfig.anticipateCadence;
      canAnticipate = false;
    }else if(countSpecialSymbolsTotal === anticipatorConfig.maxToAnticipate && !canAnticipate){
      //Default
      addCadence = anticipatorConfig.defaultCadence;
      canAnticipate = true;
    }

    currentValue += addCadence;
    newCadence.push(currentValue)
    
  }

  return newCadence;
}

/**
 * Get all game rounds and return the final cadences of each.
 * @param rounds RoundsSymbols with contains all rounds special symbols positions.
 * @return RoundsCadences has all cadences for each game round.
 */
function handleCadences(rounds: RoundsSymbols): RoundsCadences {
  slotMachineCadences.roundOne = slotCadence(rounds.roundOne.specialSymbols);
  slotMachineCadences.roundTwo = slotCadence(rounds.roundTwo.specialSymbols);
  slotMachineCadences.roundThree = slotCadence(rounds.roundThree.specialSymbols);

  return slotMachineCadences;
}

console.log('CADENCES: ', handleCadences(gameRounds));
