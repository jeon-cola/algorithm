function solution(n, computers) {
    var answer = 0;
    const visited = new Set()
    
    function bfs(start) {
        const q = [start]
        visited.add(start)
        
        while (q.length > 0) {
            const current = q.shift()
            
            for (let i =0; i<n; i++) {
                if (computers[current][i] == 1 && !visited.has(i)) {
                    visited.add(i)
                    q.push(i)
                }
            }
        }
    }
    
    for (let i = 0; i<n; i++) {
        if (!visited.has(i)) {
            bfs(i)   
            answer++
        }
    }
    return answer;
}