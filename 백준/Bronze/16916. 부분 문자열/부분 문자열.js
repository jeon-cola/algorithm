const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const input = [];
rl.on("line", line => {
    input.push(line.trim());
    if (input.length === 2) rl.close();
});

rl.on("close", () => {
    const S = input[0]
    const P = input[1]

    function getLps(pattern) {
        const lps = Array(pattern.length).fill(0)
        let j = 0
        for (let i=1; i<pattern.length; i++) {
            while (j>0 && pattern[i] !== pattern[j]) {
                j = lps[j-1]
            }
            if (pattern[i] === pattern[j]) {
                lps[i] = ++j
            }
        }
        return lps
    }

    function kmp(text, pattern) {
        const lps = getLps(pattern)
        let j =0
        for (let i = 0; i<text.length; i++) {
            while (j>0 && text[i] !== pattern[j]) {
                j = lps[j -1]
            }
            if (text[i] === pattern[j] ) {
                if (j === pattern.length -1) {
                    return 1
                } else {
                    j++
                }
            }
        }
        return 0
    }

    console.log(kmp(S, P));
});
