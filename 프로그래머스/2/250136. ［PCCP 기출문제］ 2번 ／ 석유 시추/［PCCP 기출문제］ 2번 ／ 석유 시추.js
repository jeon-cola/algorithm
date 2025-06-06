function solution(land) {
    var answer = -Infinity;
    
    const dx = [1,-1,0,0]
    const dy = [0,0,1,-1]
    
    const n = land.length
    const m = land[0].length
    let id = 1
    const oilGroup = {}
    const visited = Array.from({length:n},()=> Array(m).fill(false))
    const oilMap = Array.from({length:n},()=> Array(m).fill(0))
    
    function bfs(i,j) {
        const q = [[i,j]]
        visited[i][j] = true
        oilMap[i][j] = id
        let oilSize = 1
        
        while (q.length>0) {
            const [x,y] = q.shift()
            for (let move =0; move<4; move++) {
                const nx = x + dx[move]
                const ny = y + dy[move]
                if (
                    nx>=0 && nx<n && ny>=0 && 
                    ny<m && !visited[nx][ny] &&
                    land[nx][ny] === 1
                ) {
                    visited[nx][ny] = true
                    oilMap[nx][ny] = id
                    q.push([nx,ny])
                    oilSize++
                }
            }
        }
        oilGroup[id] = oilSize
    }
    
    for (let i = 0; i<n; i++) {
        for (let j = 0; j<m; j++) {
            if (!visited[i][j] && land[i][j] === 1 ){
                bfs(i,j)
                id++
            }
        }
    }
    let maxOil = 0
    for (let j =0; j<m; j++) {
        const seen = new Set()
        let oilSum =0 
        for (let i =0; i<n; i++) {
            const gid = oilMap[i][j]
            if (gid> 0 && !seen.has(gid)) {
                seen.add(gid)
                oilSum += oilGroup[gid]
            }
        }
        maxOil = Math.max(maxOil,oilSum)
    }
    return maxOil;
}