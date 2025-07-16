const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const input = []
rl.on("line", function(line) {
    input.push(line)
    const [n, m] = input[0].split(" ").map(Number)
    if (input.length === n+m+1) rl.close()
})

rl.on("close", function() {
    const [n, m] = input[0].split(" ").map(Number) 

    const s = new Set()
    for (let i = 1; i<n+1; i++) {
        s.add(input[i])
    }

    let cnt = 0
    for (let i = n+1; i < n+m+1; i++) {
        if (s.has(input[i])) {
            cnt++
        }
    }
    console.log(cnt)
})