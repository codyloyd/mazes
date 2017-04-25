const createGrid = require('./grid/grid')
const createSidewinder = require('./grid/sideWinder')

const container = document.getElementById('maze-container')
const grid = createGrid(30, 30)
createSidewinder(grid.grid)
const distances = grid.grid[29][0].distances()
grid.distances = distances.pathTo(grid.grid[29][29])

grid.grid.forEach(row => {
  const domrow = document.createElement('div')
  domrow.classList.add('row')
  row.forEach(cell => {
    const domcell = document.createElement('div')
    // domcell.innerHTML = `${grid.distances[cell.id] ? grid.distances[cell.id] : ' '}`
    if (grid.distances[cell.id]) {
      domcell.classList.add('path')
    }
    domcell.classList.add('cell', cell.id)
    if (cell.isLinked(cell.east)) {
      domcell.classList.add('east')
    }
    if (cell.isLinked(cell.south)) {
      domcell.classList.add('south')
    }
    domrow.appendChild(domcell)
  })
  container.appendChild(domrow)
})
