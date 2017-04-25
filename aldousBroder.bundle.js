/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const createDistancesObject = __webpack_require__(0)
const createCell = __webpack_require__(3)

const createGrid = (rows, columns) => {
  const getCell = function(grid, row, column) {
    if (row >= 0 && row < rows && column >= 0 && column < columns) {
      return grid[row][column]
    }
    return undefined
  }

  const randomCell = () => {
    const rand = max => Math.floor(Math.random() * max)
    return this.grid[0][0]
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
        const body = `   `
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
    randomCell,
    grid: prepareGrid()
  }
}

module.exports = createGrid


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const createDistancesObject = __webpack_require__(0)

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const createGrid = __webpack_require__(2)
const createAldousBroder = __webpack_require__(1)

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


/***/ })
/******/ ]);