function solution(x, y, n) {
    const visited = Array(y + 1).fill(false)
    const queue = []
    let head = 0
    
    queue.push([x, 0])
    visited[x] = true
    
    while (head < queue.length) {
        const [current, cnt] = queue[head++]
        
        if (current === y) return cnt
        
        const nexts = [current + n, current * 2, current * 3]
        for (const next of nexts) {
            if (next <= y && !visited[next]) {
                visited[next] = true
                queue.push([next, cnt + 1])
            }
        }
    }
    
    return -1
}
