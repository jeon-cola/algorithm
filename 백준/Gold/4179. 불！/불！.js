const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const input = []
let n = 0
let m = 0

rl.on('line', function(line){
    if (n === 0 && m === 0) {
        [n,m] = line.split(" ").map(Number)
    } else {
        input.push(line)
    }

    if (input.length === n )rl.close()
}).on('close', function(){
    const list = input.map(row => row.split(""))
    const jihoo = []
    const fire = []
    const jihooVisited = Array.from({length:n}, ()=> Array(m).fill(-1))
    const fireVisited = Array.from({length:n}, ()=> Array(m).fill(Infinity))

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (list[i][j] === "F") {
                fire.push([i,j])
                fireVisited[i][j] = 0
            } else if (list[i][j] === "J") {
                jihoo.push([i,j])
                jihooVisited[i][j] = 0
            }
        }
    }

    const ni = [0, 0, -1, 1]
    const nj = [1, -1, 0, 0]
    
    while (fire.length) {
        const [i,j] = fire.shift()
        const time = fireVisited[i][j]

        for (let move = 0; move < 4; move++) {
            const newI = i + ni[move]
            const newJ = j + nj[move]

            if (newJ >= 0 && newJ < m && newI >= 0 && newI < n && list[newI][newJ] !== "#" && fireVisited[newI][newJ] === Infinity) {
                fireVisited[newI][newJ] = time+1
                fire.push([newI, newJ])
            }
        }
    }

    let isAble = false
    while(jihoo.length) {
        const [i,j] = jihoo.shift()
        const time = jihooVisited[i][j]

        if (i === 0 || i === n-1 || j === 0 || j === m-1) {
            isAble = time+1
            break
        }

        for (let move = 0; move < 4; move++) {
            const newI = i + ni[move]
            const newJ = j + nj[move]

            if (newJ >= 0 && newJ < m && newI >= 0 && newI < n && list[newI][newJ] !== "#" && jihooVisited[newI][newJ] === -1 && fireVisited[newI][newJ] > time+1) {
                jihooVisited[newI][newJ] = time+1
                jihoo.push([newI, newJ])
            }
        }
    }
    
    console.log(isAble ? isAble : "IMPOSSIBLE" )
})

