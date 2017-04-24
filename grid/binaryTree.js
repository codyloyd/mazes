const createGrid = require('./grid')

const createBinaryTree = grid => {
  grid.forEach(row =>
    row.forEach(cell => {
      const neighbors = []
      if (cell.south) neighbors.push(cell.south)
      if (cell.east) neighbors.push(cell.east)
      const index = Math.floor(Math.random() * neighbors.length)
      neighbor = neighbors[index]
      if (neighbor) cell.link(neighbor)
    })
  )
  return grid
}

const grid = createGrid(10, 26)
createBinaryTree(grid.grid)
console.log(grid.toString())
