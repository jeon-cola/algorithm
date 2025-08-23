const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const input = []
rl.on("line", function(line) {
    input.push(line)
    if (input.length === 2) {
        rl.close()
    }
}).on('close', function() {
    const n = Number(input[0])
    const pattern = input[1]

    const result = n - getLps(pattern)
    console.log(result)
})

const getLps = (pattern) => {
    const lps = Array(pattern.length).fill(0)
    let prefix = 0

    for (let suffix = 1; suffix < pattern.length; suffix++) {
        while (prefix > 0 && pattern[suffix] !== pattern[prefix]) {
            prefix = lps[prefix -1]
        }
        if (pattern[suffix] === pattern[prefix]) {
            lps[suffix] = ++prefix
        }
    }
    return lps[pattern.length -1]
} 
