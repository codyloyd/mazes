const distances = function(root) {
  const pathTo = function(goal) {
    let currentCell = goal
    const breadcrumbs = distances(this.root)
    breadcrumbs[currentCell.id] = this.cells[currentCell.id]
    while (currentCell != this.root) {
      currentCell.links.forEach(neighbor => {
        if (this.cells[neighbor.id] < this.cells[currentCell.id]) {
          breadcrumbs[neighbor.id] = this.cells[neighbor.id]
          currentCell = neighbor
        }
      })
    }
    return breadcrumbs
  }
  return {
    root,
    pathTo,
    cells: {
      [root.id]: 0
    }
  }
}

module.exports = distances
