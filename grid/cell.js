const createDistancesObject = require('./distances')

const createCell = (row, column) => {
  const distances = function() {
    distancesObject = createDistancesObject(this)
    let frontier = [this]
    while (frontier.length) {
      const newFrontier = []
      frontier.forEach(cell => {
        cell.links.forEach(linkedCell => {
          if (Object.keys(distancesObject.cells).indexOf(linkedCell.id) > -1) {
            return
          }
          distancesObject.cells[linkedCell.id] =
            distancesObject.cells[cell.id] + 1
          newFrontier.push(linkedCell)
        })
      })
      frontier = newFrontier
    }
    return distancesObject
  }
  const link = function(cell, bidi = true) {
    this.links.push(cell)
    if (bidi) cell.link(this, false)
  }

  const unlink = function(cell, bidi = true) {
    const index = this.links.indexOf(cell)
    if (index > -1) this.links.splice(index, 1)
    if (bidi) cell.unlink(this, false)
  }

  const isLinked = function(cell) {
    return this.links.indexOf(cell) > -1
  }

  const neighbors = function() {
    return [this.north, this.south, this.east, this.west].filter(x => x)
  }

  return {
    row,
    column,
    link,
    unlink,
    isLinked,
    neighbors,
    distances,
    id: `r${row}c${column}`,
    north: undefined,
    south: undefined,
    east: undefined,
    west: undefined,
    links: []
  }
}

module.exports = createCell
