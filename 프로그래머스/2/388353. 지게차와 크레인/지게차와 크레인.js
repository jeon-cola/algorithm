function solution(a, requests) {
    let answer = 0;
    const storage = a.map(row => row.split(''))
    const n = storage.length
    const m = storage[0].length
    
    function findAll(request) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (storage[i][j] === request) {
                    storage[i][j] = 0
                }
            }
        }
    }

    function isClear(i,j,visited) {
        const di = [0,0,1,-1]
        const dj = [1,-1,0,0]
        for (let move = 0; move < 4; move++) {
            const ni = i + di[move]
            const nj = j + dj[move]
            if (visited.has(`${ni},${nj}`)) continue
            if ((ni>=n || ni<0) || (nj>=m || nj<0)) {
                return true
            }
            if (ni<n && ni>=0 && nj < m && nj>=0 && storage[ni][nj] === 0) {
                visited.add(`${ni},${nj}`)
                if (isClear(ni,nj,visited)) {
                    return true
                }
            }
        }
        return false
    }
    
    function findReqeust(request) {
        const list = []
        const di = [0,0,1,-1]
        const dj = [1,-1,0,0]
        
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                for (let move = 0; move < 4; move++) {
                    const ni = i + di[move]
                    const nj = j + dj[move]
                    
                    if ((ni>=n || ni<0)  && storage[i][j] === request || (nj>=m || nj<0) && storage[i][j] === request) {
                        list.push([i,j])
                    }
                    if (ni<n && ni>=0 && nj < m && nj>=0 && storage[ni][nj] === 0 && storage[i][j] === request) {
                        const visited = new Set()
                        visited.add(`${ni},${nj}`)
                        if (isClear(ni,nj,visited)) {
                            list.push([i,j])
                        }
                    }
                }
            }
        }
        
        for (const [i,j] of list) {
            storage[i][j] = 0
        }
    }
    
    for (const char of requests) {
        if (char.length>=2) {
            const a = char.split("")
            findAll(a[0])
        } else {
          findReqeust(char)   
        }
    }
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (storage[i][j] !== 0 ) {
                answer++
            }
        }
    }
    return answer;
}
