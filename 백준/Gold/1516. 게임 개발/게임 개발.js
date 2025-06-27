const readline = require("readline")
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const input = []
rl.on("line", function(line) {
  input.push(line)
  if (Number(input[0]) + 1 === input.length) rl.close()
})

rl.on('close', function() {
  const n = Number(input[0])
  const list = Array.from({length:n+1},()=>[])
  const time = Array(n+1).fill(0)
  const indegree = Array(n+1).fill(0)
  const result = Array(n+1).fill(0)

  for (let i=1; i<=n; i++) {
    const tokens = input[i].split(" ").map(Number)
    time[i] = tokens[0]

    for (let j=1; j<tokens.length-1;j++) {
      const prev = tokens[j]
      list[prev].push(i)
      indegree[i]++
    }
  }
    const q = []
    for (let i =1; i<=n; i++) {
      if (indegree[i] === 0) {
        q.push(i)
        result[i] = time[i]
      }
    }

    while (q.length) {
      const current = q.shift()
      for (const next of list[current] ) {
        indegree[next]--
        result[next] = Math.max(result[next], result[current]+time[next])

        if (indegree[next] === 0) q.push(next)
      }
    }

    for (let i =1; i<=n; i++) {
      console.log(result[i])
    }
  
})
