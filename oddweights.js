// Bar weights:
//   StrongArm Powerbar:   43.5 lb
//   SSB:                  47   lb
//   EZ Curl Bar:          17.5 lb
const barWeight = 43.5
const platePairsAvg = [ 50.5, 50.5, 44.5, 44.5,
	    25.5, 25, 21, 21, 20, 10,
            5, 4.5, 2.5, 0.625, 0.625 ]

const targetWeight = process.argv[2] // For node

const getAllSubsets =
        theArray => theArray.reduce(
          (subsets, value) => subsets.concat(
            subsets.map(set => [value, ...set])
          ),
          [[]]
        );

const allCombinations = getAllSubsets(platePairsAvg)
let combinationsWeights = [] // Predefined for clarity
let lowestError = -1
let lowestErrorWeight = -1
let lowestErrorComb = null

for (index in allCombinations) {
  let comb = allCombinations[index]
  let netWeight = barWeight + 2*comb.reduce((a, b) => a+b,0)
  let absError = Math.abs(targetWeight - netWeight)

  combinationsWeights.push(netWeight)

  if (absError < lowestError || lowestErrorComb === null) {
    lowestError = absError
    lowestErrorWeight = netWeight
    lowestErrorComb = comb
  }
}

console.log('Closest weight: %d', lowestErrorWeight)
console.log('With combination: %s', lowestErrorComb)
console.log('Error: %d', lowestErrorWeight - targetWeight)

// This gets real crazy real quick:
//console.log('All possible combinations:')
//console.log(combinationsWeights)
/*for (index in allCombinations) {
  let comb = allCombinations[index]
  let netWeight = combinationsWeights[index]

  console.log(netWeight + ":")
  console.log(comb)
}*/
