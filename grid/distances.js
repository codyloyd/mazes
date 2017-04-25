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

  const max = function() {
    return Object.keys(this.cells).reduce((max, cell) => {
      return this.cells[cell] > this.cells[max] ? cell : max
    }, this.root.id)
  }

  return {
    root,
    pathTo,
    max,
    cells: {
      [root.id]: 1
    }
  }
}

module.exports = distances
