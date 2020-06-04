const barWeight = 47
const platePairsAvg = [ 58.5, 56.5, 50.75, 32.75,
            13, 12.25,
            5, 4.5, 0.625, 0.625 ]

const targetWeight = process.argv[2] // For node

const getAllSubsets =
        theArray => theArray.reduce(
          (subsets, value) => subsets.concat(
            subsets.map(set => [value, ...set])
          ),
          [[]]
        );

const allCombinations = getAllSubsets(platePairsAvg)
let combinationsWeights = []
let lowestError = -1
let lowestErroWeight = -1
let lowestErrorComb = null

for (index in allCombinations) {
  let comb = allCombinations[index]
  let netWeight = barWeight + 2*comb.reduce((a, b) => a+b,0)
  let absError = Math.abs(targetWeight - netWeight)

  combinationsWeights.push(netWeight)

  if (absError <= lowestError || lowestErrorComb === null) {
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
