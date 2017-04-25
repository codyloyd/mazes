const createGrid = require('./grid')
const createSidewinder = require('./sideWinder')
const createAldousBroder = require('./aldousBroder')

const grid = createGrid(10, 24)
createAldousBroder(grid)

console.log(grid.toString())
