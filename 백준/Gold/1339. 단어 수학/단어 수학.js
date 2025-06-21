const readline = require('readline')
const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
})

const input = []

rl.on('line', function (line) {
  input.push(line)
  if (input.length === Number(input[0])+1) {
    rl.close()
  }
}) 

rl.on('close',function() {
  const n = Number(input[0])
  const result = []

  for (let i=1; i<=n; i++) {
    result.push(input[i])
  }

  const weigth = new Map()
  for (const word of result ) {
    const len = word.length
    for (let i=0; i<len; i++) {
      const char = word[i]
      const power = len -i -1
      weigth.set(char, (weigth.get(char) || 0) + Math.pow(10,power))
    }
  }

  const sorted = [...weigth.entries()].sort((a,b)=> b[1]-a[1])
  const num = new Map()
  let digit = 9
  for (const [char] of sorted) {
    num.set(char, digit--)
  }

  let answer = 0
  for (const word of result) {
    let strNum = ""
    for (const ch of word) {
      strNum += num.get(ch)
    }
    answer+= Number(strNum)
  }
  console.log(answer)
})