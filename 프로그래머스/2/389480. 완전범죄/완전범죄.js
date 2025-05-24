function solution(info, n, m) {
    let minA = n;
    const memo = new Set()
    function find(idx,cntA,cntB) {
    if (cntA>=n || cntB>=m) return
    if (idx == info.length) {
        minA = Math.min(minA, cntA)
        return
    }
    const key = `${idx},${cntA},${cntB}`
    if (memo.has(key)) return
    memo.add(key)
    find(idx+1,cntA+info[idx][0],cntB)     
    find(idx+1,cntA,cntB+info[idx][1])  
    }
    find(0,0,0)
    return minA === n ? -1 :minA;
}
