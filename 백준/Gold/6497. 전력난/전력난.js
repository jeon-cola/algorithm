const readline = require("readline")
const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
})

const input = []
rl.on("line",function(line) {
  input.push(line)
})

rl.on("close", function() {
  let idx=0
  
  while (idx< input.length) {
    const [m,n] = input[idx].split(" ").map(Number)
    if ( m === 0 && n === 0) {
    break
  }
    
    const list = Array.from({length:m},()=>[])
    const visited = Array.from({length:m},()=>false)
    let total = 0
  
    for (let i=1; i<=n;i++) {
      const [a,b,c] = input[idx+i].split(" ").map(Number)
      list[a].push([b,c])
      list[b].push([a,c])
      total+=c 
    }
  
    function prim() {
      const heap = new PriorityQueue()
      let current_cost = 0
      heap.push([0,0])
  
      while (!heap.isEmpty()) {
        const [cost,current] = heap.pop()
        if (visited[current]) continue
        visited[current] = true
        current_cost+=cost
  
        for (const [next,next_cost] of list[current]) {
          if (!visited[next]) {
              heap.push([next_cost,next])
          }
        }
      }
      return current_cost
  }
  const mst = prim()
  console.log(total - mst)
  idx+=n+1
  }

})

class PriorityQueue {
  constructor() {
    this.heap = [null]
  }

  isEmpty() {
    return this.heap.length === 1
  }

  push(value) {
    this.heap.push(value)
    let cur = this.heap.length - 1
    while (cur > 1) {
      let parent = Math.floor(cur / 2)
      if (this.heap[parent][0] <= this.heap[cur][0]) break
      [this.heap[parent], this.heap[cur]] = [this.heap[cur], this.heap[parent]]
      cur = parent
    }
  }

  pop() {
    if (this.heap.length === 2) return this.heap.pop()
    const min = this.heap[1]
    this.heap[1] = this.heap.pop()
    let cur = 1
    while (true) {
      let left = cur * 2
      let right = cur * 2 + 1
      let smallest = cur

      if (left < this.heap.length && this.heap[left][0] < this.heap[smallest][0]) {
        smallest = left
      }
      if (right < this.heap.length && this.heap[right][0] < this.heap[smallest][0]) {
        smallest = right
      }
      if (smallest === cur) break
      [this.heap[cur], this.heap[smallest]] = [this.heap[smallest], this.heap[cur]]
      cur = smallest
    }
    return min
  }
}
