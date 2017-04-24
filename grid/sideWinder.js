const createGrid = require('./grid')

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

const grid = createGrid(6, 14)
createSidewinder(grid.grid)
const distances = grid.grid[1][1].distances()
console.log(grid.toString())
