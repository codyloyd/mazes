const createGrid = require('./grid/grid')
const createAldousBroder = require('./grid/aldousBroder')

const container = document.getElementById('maze-container')
const form = document.getElementById('generate-maze')
form.addEventListener('submit', e => {
  e.preventDefault()
  const input = document.querySelector('input[name="size"]')
  generateMaze(input.value)
})

// const distances = grid.grid[29][0].distances()
// grid.distances = distances.pathTo(grid.grid[29][29])

const generateMaze = (size = 20) => {
  container.innerHTML = ''
  const grid = createGrid(size, size)
  createAldousBroder(grid)
  grid.grid.forEach(row => {
    const domrow = document.createElement('div')
    domrow.classList.add('row')
    row.forEach(cell => {
      const domcell = document.createElement('div')
      // domcell.innerHTML = `${grid.distances[cell.id] ? grid.distances[cell.id] : ' '}`
      // if (grid.distances[cell.id]) {
      //   domcell.classList.add('path')
      // }
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
}

generateMaze(20)
