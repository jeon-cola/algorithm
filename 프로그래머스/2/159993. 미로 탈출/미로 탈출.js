function solution(maps) {
    const map = maps.map(row => row.split(""))
    const n = map.length
    const m = map[0].length
    
    let start = []
    let target = []
    let end = []
    
    for (let i =0; i<n; i++) {
        for (let j =0; j<m; j++) {
            const current = map[i][j]
            if (current === "S") {
                start = [i,j]
            } else if (current === "L") {
                target = [i,j]
            } else if (current === "E") {
                end = [i,j]
            }
        }
    }
    
    function escape() {
        const q = [[...start,false,0]]
        const visited = Array.from({length:n},() =>
                                  Array.from({length:m},()=>[false,false])
                                  )
        visited[start[0]][start[1]][0] = true
        const [end_i, end_j] = end
        
        const di = [0,0,-1,1]
        const dj = [1,-1,0,0]
        
        while (q.length) {
            const [ i,j,isAble,cnt ] = q.shift()
            if (i === end_i && j === end_j && isAble) return cnt
            
            for (let move =0; move<4; move++) {
                const ni = i + di[move]
                const nj = j + dj[move]
                if (
                    ni>=0 && ni<n && nj>=0 && nj<m && 
                    map[ni][nj] !== "X") {
                    const nextAble = isAble || map[ni][nj] === "L"
                    if (!visited[ni][nj][nextAble]) {
                        visited[ni][nj][nextAble] = true  
                        q.push([ni,nj,nextAble,cnt+1])

                    }
                }
            }
        }
        return -1
    }
    
    return escape();
}