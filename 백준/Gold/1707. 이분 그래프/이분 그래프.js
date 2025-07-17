const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const input = []
rl.on("line", function(line){
    input.push(line)
}).on('close',function() {
    const t = Number(input[0])
    let cnt = 1
    for (let ts = 0; ts<t; ts++) {
        const [v, e] = input[cnt].split(" ").map(Number)
        const lst = Array.from({length:v+1},()=>[])
        const visited = Array(v+1).fill(-1)

        for (let i = cnt+1; i<cnt+1+e; i++) {
            const [a, b] = input[i].split(" ").map(Number)
            lst[a].push(b)
            lst[b].push(a)
        }
        
        let isTree = true

        for (let i =1; i<= v; i++) {
            if (visited[i] === -1) {
                const q = [i]
                visited[i] = 0

                while (q.length && isTree) {
                    const current = q.shift()

                    for (const next of lst[current]) {
                        if (visited[next] === -1) {
                            visited[next] = 1 - visited[current]
                            q.push(next)
                        } else if (visited[next] === visited[current]) {
                            isTree = false
                            break
                        }
                    }
                }
            }
        }
        console.log(isTree? "YES" : "NO")
        cnt+= e+1
    }
})