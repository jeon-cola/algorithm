const readline = require('readline')
const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
})

const input = []
rl.on('line', function(line){
  input.push(line)
  if (input.length === 3) {
    rl.close()
  }
})

rl.on('close',function(){
  const n = Number(input[0])
  const init = input[1].split('')
  const target = input[2].split('')

  function toggle(arr, idx) {
    for (let i = idx-1; i<=idx+1;i++) {
      if (i>=0 && i<n) {
        arr[i] = arr[i] ==='0' ? '1' : '0'
      }
    }
  }

  function simulate(press) {
    const bulbs = [...init]
    let cnt = 0

    if (press) {
      toggle(bulbs,0)
      cnt++
    }

    for (let i =1; i<n; i++) {
      if (bulbs[i-1] !== target[i-1]) {
        toggle(bulbs,i)
        cnt++
      }
    }
    return bulbs.join('') === target.join('') ? cnt : Infinity
  }

  const res = Math.min(simulate(false),simulate(true))
  console.log(res === Infinity? -1 : res)
})