const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let n, r, q
const input = []
let count = 0

rl.on('line', function(line) {
    if (count === 0 ) {
        [n, r, q] = line.split(" ").map(Number)
        count++
    } else {
        input.push(line)
        count++
    }

    if (count === n + q) {
        rl.close()
    }
}).on("close", function() {
    const tree = Array.from({length: n+1}, () => [] )
    const visited = Array(n+1).fill(false)
    const subTree = Array(n+1).fill(0)
    
    for (let line = 0; line < n-1; line++) {
        const [a, b] = input[line].split(" ").map(Number)
        tree[a].push(b)
        tree[b].push(a)
    }

    const dfs = (root) => {
        visited[root] = true
        let size = 1

        for (const next of tree[root]) {
            if (!visited[next]) {
                size += dfs(next)
            }
        }
        subTree[root] = size
        return size
    }
    dfs(r)
    
    for ( let i = n-1; i < (n-1)+q; i++) {
        const query = Number(input[i])
        console.log(subTree[query])
    }
})


