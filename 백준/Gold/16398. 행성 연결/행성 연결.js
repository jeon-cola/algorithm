const readline = require("readline")
const rl = readline.createInterface({
    input:process.stdin,
    output: process.stdout
})

const input = []

rl.on("line",function(line) {
    input.push(line)
    if (Number(input[0]) +1 === input.length) rl.close()
})

rl.on('close', function() {
    const n = Number(input[0])
    const arr = Array.from({length: n+1},()=> [])
    const map = input.map(row => row.split(" ").map(Number))

    for (let i =1; i<=n; i++) {
        for (let j = 0; j<n; j++) {
            if (i !== j) {
                arr[i-1].push([j,map[i][j]])
                arr[j].push([i-1,map[i][j]])
            }
        }
    }
    

    function prim(idx) {
        const q = new PriorityQueue()
        const visited = Array(n+1).fill(false)
        let result = 0
        q.insert([idx,0])

        while (!q.isEmpty()) {
            const [current, cost] = q.delete()
            if (visited[current]) continue
            visited[current] = true
            result += cost

            for (const [next, nextCost] of arr[current]) {
                if (!visited[next]) {
                    q.insert([next,nextCost])
                }
            }
        }
        return result
    }

    console.log(prim(0))
})
class PriorityQueue {
    constructor() {
        this.heap = []
    }

    isEmpty() {
        return this.heap.length === 0
    }

    bubbleUp() {
        let idx = this.heap.length -1
        while (idx>0) {
            const parentIdx = Math.floor((idx-1)/2)
            if (this.heap[parentIdx][1] > this.heap[idx][1]) {
                [this.heap[idx],this.heap[parentIdx]] = [this.heap[parentIdx],this.heap[idx]]
                idx = parentIdx
            } else {
                break
            }
        }
    }

    insert(value) {
        this.heap.push(value)
        this.bubbleUp()
    }

    bubbleDown() {
        let idx = 0
        const length = this.heap.length
        while (true) {
            let smallest = idx
            const left = idx * 2 + 1
            const right = idx * 2 + 2

            if (left < length && this.heap[left][1] < this.heap[smallest][1]) {
                smallest = left
            }
            if (right < length && this.heap[right][1] < this.heap[smallest][1]) {
                smallest = right
            }

            if ( smallest !== idx ) {
                [this.heap[smallest], this.heap[idx]] = [ this.heap[idx], this.heap[smallest]]
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
        this.bubbleDown()
        return min
    }
}