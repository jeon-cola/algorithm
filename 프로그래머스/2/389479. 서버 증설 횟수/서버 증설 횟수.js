function solution(players, m, k) {
    let answer = 0;
    const q = []

    for (let i=0; i<players.length; i++) {
        while (q.length>0 && q[0] === i) {
            q.shift()
        }
        
        const current = players[i]
        const need = Math.floor(current / m)
        
        if (q.length>= need) continue
        
        const add = need - q.length
        for (let j=0; j<add; j++) {
            q.push(i+k)
            answer++
        }
    }

    return answer;
}
