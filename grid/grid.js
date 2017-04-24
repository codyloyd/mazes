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

const createGrid = (rows, columns) => {
  const getCell = function(grid, row, column) {
    if (row >= 0 && row < rows && column >= 0 && column < columns) {
      return grid[row][column]
    }
    return undefined
  }

  const prepareGrid = function() {
    let grid = []
    for (let i = 0; i < rows; i++) {
      let row = []
      for (let j = 0; j < columns; j++) {
        const cell = createCell(i, j)
        row.push(cell)
      }
      grid.push(row)
    }
    configureCells(grid)
    return grid
  }

  const contentsOfCell = function(grid, cell) {
    const distances = this.distancesObject.pathTo(grid[5][0])
    if (distances && distances[cell.id]) {
      return distances[cell.id].toString(36)
    }
    return ' '
  }
  const configureCells = function(grid) {
    grid.forEach(row =>
      row.forEach(cell => {
        const {row, column} = cell
        cell.north = getCell(grid, row - 1, column)
        cell.south = getCell(grid, row + 1, column)
        cell.west = getCell(grid, row, column - 1)
        cell.east = getCell(grid, row, column + 1)
      })
    )
  }

  const toString = function() {
    let output = '+' + '---+'.repeat(this.columns) + '\n'
    this.grid.forEach(row => {
      let top = '|'
      let bottom = '+'
      row.forEach(cell => {
        if (cell == undefined) cell = createCell(-1, -1)
        const body = ` ${contentsOfCell(this.grid, cell)} `
        const east_bound = cell.isLinked(cell.east) ? ' ' : '|'
        top += body + east_bound
        const south_bound = cell.isLinked(cell.south) ? '   ' : '---'
        const corner = '+'
        bottom += south_bound + corner
      })
      output += top + '\n' + bottom + '\n'
    })
    return output
  }

  return {
    rows,
    columns,
    toString,
    distances: {},
    grid: prepareGrid()
  }
}

module.exports = createGrid
