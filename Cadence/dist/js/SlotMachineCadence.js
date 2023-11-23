"use strict";
const anticipatorConfig = {
    columnSize: 5,
    minToAnticipate: 2,
    maxToAnticipate: 3,
    anticipateCadence: 2,
    defaultCadence: 0.25,
};
const gameRounds = {
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
const slotMachineCadences = { roundOne: [], roundTwo: [], roundThree: [] };
function slotCadence(symbols) {
    let newCadence = [];
    let countSpecialSymbolsTotal = 0;
    let currentValue = 0;
    let addCadence = anticipatorConfig.defaultCadence;
    let canAnticipate = true;
    newCadence.push(currentValue);
    for (let i = 0; i < anticipatorConfig.columnSize; i++) {
        for (let j = 0; j < 6; j++) {
            for (let k = 0; k < symbols.length; k++) {
                if (i === symbols[k].column && j === symbols[k].row) {
                    countSpecialSymbolsTotal++;
                }
            }
        }
        if (countSpecialSymbolsTotal === anticipatorConfig.minToAnticipate && canAnticipate) {
            addCadence = anticipatorConfig.anticipateCadence;
            canAnticipate = false;
        }
        else if (countSpecialSymbolsTotal === anticipatorConfig.maxToAnticipate && !canAnticipate) {
            addCadence = anticipatorConfig.defaultCadence;
            canAnticipate = true;
        }
        currentValue += addCadence;
        newCadence.push(currentValue);
    }
    return newCadence;
}
function handleCadences(rounds) {
    slotMachineCadences.roundOne = slotCadence(rounds.roundOne.specialSymbols);
    slotMachineCadences.roundTwo = slotCadence(rounds.roundTwo.specialSymbols);
    slotMachineCadences.roundThree = slotCadence(rounds.roundThree.specialSymbols);
    return slotMachineCadences;
}
console.log('CADENCES: ', handleCadences(gameRounds));
