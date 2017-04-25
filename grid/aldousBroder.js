const createAldousBroder = grid => {
  let cell = grid.grid[0][0]
  let unvisited = grid.rows * grid.columns - 1
  while (unvisited > 0) {
    const neighbors = cell.neighbors()
    const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)]
    if (!neighbor.links.length) {
      cell.link(neighbor)
      unvisited -= 1
    }
    cell = neighbor
  }
  return grid
}

module.exports = createAldousBroder
