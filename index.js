const createCell = (row, column) => {
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
        const body = '   '
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
    grid: prepareGrid()
  }
}

const createSidewinder = grid => {
  grid.forEach(row => {
    let run = []
    row.forEach(cell => {
      run.push(cell)
      const at_eastern_bound = cell.east === undefined
      const at_northern_bound = cell.north === undefined
      const should_close_run =
        at_eastern_bound || (!at_northern_bound && Math.random() > 0.5)
      if (should_close_run) {
        const member = run[Math.floor(Math.random() * run.length)]
        if (member.north) member.link(member.north)
        run = []
      } else {
        cell.link(cell.east)
      }
    })
  })
}

const container = document.getElementById('maze-container')
console.log(container)
const grid = createGrid(26, 26)
createSidewinder(grid.grid)
grid.grid.forEach(row => {
  const domrow = document.createElement('div')
  domrow.classList.add('row')
  row.forEach(cell => {
    const domcell = document.createElement('div')
    domcell.classList.add('cell')
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