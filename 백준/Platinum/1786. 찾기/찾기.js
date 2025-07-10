const readline = require("readline")
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const input = []
const idx = []
rl.on("line",function(line) {
    input.push(line)
    if ( input.length == 2) {
        rl.close()
    }
})

function getLps(pattern) {
    const lps = Array(pattern.length).fill(0)
    let i = 0
    for (let j =1; j<pattern.length; j++) {
        while (i>0 && pattern[i] !== pattern[j]) {
            i = lps[i-1]
        }
        if (pattern[i] === pattern[j]) {
            lps[j] = ++i
        }
    }
    return lps
}

function kmp(text, pattern) {
    const lps = getLps(pattern)
    let j=0
    let cnt = 0
    for (let i=0;i<text.length; i++) {
        while (j>0 && text[i] !== pattern[j]) {
            j = lps[j-1]
        }
        if (text[i] === pattern[j]) {
            if (j === pattern.length-1) {
                cnt++
                idx.push(i - pattern.length +1)
                j = lps[j]
            } else {
                j++
            }
        }

        }
    return cnt
}

rl.on("close", function() {
    const text = input[0]
    const pattern = input[1]
    const cnt = kmp(text, pattern)

    console.log(cnt)
    console.log(idx.map(i=>i+1).join(" "))
})