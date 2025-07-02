const readline = require("readline")
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const input = []
rl.on("line",function(line) {
    input.push(line)
    const [m, n] = input[0].split(" ").map(Number)
    if (n+1 === input.length) rl.close()
})

rl.on('close', function() {
    const [m, n] = input[0].split(" ").map(Number)
    const arr = input.slice(1).map(row => row.split("").map(Number))
    
    function dijkstra() {
        const q = new PriorityQueue()
        q.insert([0,0,0])
        const visited = Array.from({length:n},()=>Array(m).fill(Infinity))
        visited[0][0] = 0
        const di = [0,0,-1,1]
        const dj = [1,-1,0,0]

        while (!q.isEmpty()) {
            const [x, y, cost] = q.delete()
            if (cost > visited[x][y]) continue

            if (x === n-1 && y === m-1 ) return cost

            for (let move = 0; move<4; move++) {
                const ni = x + di[move]
                const nj = y + dj[move]
                if (ni>=0 && ni<n && nj>=0 && nj<m) {
                    const newCost = cost + arr[ni][nj]
                    if (newCost<visited[ni][nj]){
                        visited[ni][nj] = newCost
                        q.insert([ni,nj,newCost])
                    }
                }
            }
        }
        return -1
    }

    console.log(dijkstra())
}) 

class PriorityQueue {
    constructor() {
        this.heap = []
    }

    isEmpty() {
        return this.heap.length === 0
    }

    bubbleUp(idx) {
        while (idx > 0) {
            const parentIdx = Math.floor((idx-1)/2)

            if (this.heap[parentIdx][2] > this.heap[idx][2]) {
                [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]]
                idx = parentIdx
            } else {
                break
            }
        }
    }

    insert(value) {
        this.heap.push(value)
        this.bubbleUp(this.heap.length -1)
    }

    bubbleDown(idx) {
        const length = this.heap.length
        while (true) {
            let smallest = idx
            const left = idx*2 +1
            const right = idx *2 +2

            if (left< length && this.heap[left][2] < this.heap[smallest][2]) {
                smallest = left
            }
            if (right < length && this.heap[right][2] < this.heap[smallest][2]) {
                smallest = right
            }
            if (smallest !== idx ) {
                [this.heap[smallest], this.heap[idx]] = [this.heap[idx], this.heap[smallest]]
                idx = smallest
            } else {
                break
            }
        }
    }

    delete() {
        if (this.heap.length === 1) return this.heap.pop()

        const min = this.heap[0]
        this.heap[0] = this.heap.pop()
        this.bubbleDown(0)
        return min
    }
}