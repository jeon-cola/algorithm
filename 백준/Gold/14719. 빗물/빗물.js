const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const input = []
let h,w
let cnt = 0

rl.on('line', (line) => {
    if (cnt === 0) {
        [h, w] = line.split(" ").map(Number)
    } else if (cnt === 1) {
        input.push(line)
        rl.close()
    }
    cnt++
}).on('close', () => {
    const blocks = input[0].split(" ").map(Number)
    
    const leftMax = Array.from(w).fill(0)
    const rightMax = Array.from(w).fill(0)

    leftMax[0] = blocks[0]
    for (let i = 1; i < w; i++) {
        leftMax[i] = Math.max(leftMax[i -1], blocks[i])
    }

    rightMax[w-1] = blocks[w-1]
    for (let i = w -2; i >=0; i--) {
        rightMax[i] = Math.max(rightMax[i +1], blocks[i])
    }

    let result = 0
    for (let i = 0; i < w; i++) {
        result += Math.min(leftMax[i], rightMax[i]) - blocks[i]
    }

    console.log(result)
})