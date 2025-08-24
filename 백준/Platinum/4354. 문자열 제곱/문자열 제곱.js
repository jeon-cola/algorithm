const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const input = []
rl.on("line", function(line) {
    if (line === ".") rl.close()
    input.push(line)
}).on('close', function() {
    for (const text of input) {
        const lps = getLps(text)
        const n = text.length
        const k = n - lps[n-1]

        if (n % k === 0) console.log(n/k)
        else console.log(1)
    }
})

const getLps = (pattern) => {
    const lps = Array(pattern.length).fill(0)
    let prefix = 0

    for (let suffix = 1; suffix < pattern.length; suffix++) {
        while (prefix > 0 && pattern[prefix] !== pattern[suffix]) {
            prefix = lps[prefix -1]
        }
        if (pattern[prefix] === pattern[suffix]) {
            lps[suffix] = ++prefix
        }
    }
    return lps
}