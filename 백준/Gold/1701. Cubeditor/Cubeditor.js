const readline = require("readline")
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const input = []
rl.on("line", function(line) {
    input.push(line)
    rl.close()
})

function getLPS(pattern) {
    const lps = Array(pattern.length).fill(0)
    let j = 0
    for (let i =1; i<pattern.length; i++) {
        while (j>0 && pattern[j] !== pattern[i]) {
            j = lps[j-1]
        }
        if (pattern[i] === pattern[j]) {
            lps[i] = ++j
        }
    }
    return Math.max(...lps)
}

rl.on("close", function() {
    const text = input[0]
    let result = 0
    for (let i =0; i<text.length; i++) {
        const sub = text.slice(i)
        result = Math.max(result, getLPS(sub))
    }
    console.log(result)
})