const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const input = []
let n
let count = 0

rl.on("line", function(line) {
    if (!count) {
        n = Number(line)
        count++
    } else {
        input.push(line)
        count++
    }

    if (input.length === n) rl.close()
}).on('close', function() {
    const array = Array.from({ length: n}, () => Array(n).fill(0))
    let targetI, targetJ
    
    for (let i = 0; i < n; i++) {
        const row =input[i].split(" ").map(Number)
        
        for (let j =0; j<n; j++) {
            array[i][j] = row[j]
            if (row[j] === 9) {
                targetI = i
                targetJ = j
                array[i][j] = 0
            }
        }
    }
    
    const findFish = (x,y,size) => {
        const visited = Array.from({ length: n }, () => Array(n).fill(false))
        const di = [-1, 0, 0, 1]
        const dj = [0, -1, 1, 0]
        const q = [[x, y, 0]]
        visited[x][y] = true
        let min = Infinity

        const fishs = []

        while (q.length) {
            const [i, j, dist] = q.shift()

            if (dist > min) break

            for (let move = 0; move < 4; move++) {
                const ni = di[move] + i
                const nj = dj[move] + j

                if (ni >= 0 && ni < n && nj >= 0 && nj < n && !visited[ni][nj] && array[ni][nj] <= size) {
                    visited[ni][nj] = true
                    q.push([ni, nj, dist +1])

                    if (array[ni][nj] > 0 && array[ni][nj] < size) {
                        fishs.push([ni, nj, dist +1])
                        min = dist +1
                    }
                }
            }
        }

        if (fishs.length === 0) return null
        
        fishs.sort((a, b) => {
            if (a[2] !== b[2]) return a[2] - b[2]
            if (a[0] !== b[0]) return a[0] - b[0]
            return a[1] - b[1]
        })
        const [i, j, dist] = fishs[0]
        return [i, j , dist]
    }

    let size = 2
    let i = targetI
    let j = targetJ
    let time = 0
    let ate = 0

    while (true) {
        const fish = findFish(i, j, size)
        if (!fish) break

        const [ni, nj, dist] = fish
        time += dist
        array[ni][nj] = 0
        i = ni
        j = nj
        ate++

        if (ate === size) {
            ate = 0
            size++
        }
    }

    console.log(time)
})