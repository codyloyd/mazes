const createGrid = require('./grid')
const createSidewinder = require('./sideWinder')

const grid = createGrid(6, 14)
createSidewinder(grid.grid)
let distances = grid.grid[5][13].distances()

console.log(grid.toString())
