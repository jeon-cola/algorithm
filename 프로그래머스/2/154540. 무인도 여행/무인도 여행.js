function solution(maps) {
    var answer = [];
    const map = maps.map(row=>row.split(""))
    const n = map.length
    const m = map[0].length
    const visited = Array.from({length:n},()=> Array(m).fill(false))
    
    const list = []
    for (let i = 0; i<n; i++) {
        for (let j=0; j<m; j++) {
            if (map[i][j] !== "X") {
                list.push([i,j])
            }
        }
    }
    
    function bfs(start_i,start_j) {
        const q = [[start_i,start_j]]
        visited[start_i][start_j] = true
        let cnt = Number(map[start_i][start_j])
        
        const di = [0,0,-1,1]
        const dj = [1,-1,0,0]
        
        while (q.length) {
            const [i,j] = q.shift()
            for (let move = 0; move<4; move++) {
                const ni = i + di [move]
                const nj = j + dj[move]
                if (
                    ni>=0 && ni<n && nj>=0 && nj<m && 
                    !visited[ni][nj] && map[ni][nj] !== "X") {
                    visited[ni][nj] = true
                    q.push([ni,nj])
                    cnt += Number(map[ni][nj])
                }
            }
        }
        answer.push(cnt)
        return 
    }
    
    for (const [i,j] of list) {
        if (!visited[i][j]) {
            bfs(i,j)
        }
    }
    
    answer.sort((a,b)=>a-b)
    
    return answer.length ? answer : [-1];
}