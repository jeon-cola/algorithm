function solution(targets) {
    targets.sort((a,b)=>a[1]-b[1])
    
    let count = 0
    let lastShot = 0
    
    for (let [start,end] of targets) {
        if (lastShot>start && lastShot<end) continue
        
        lastShot = end - 0.5
        count++
    }
    return count
}
