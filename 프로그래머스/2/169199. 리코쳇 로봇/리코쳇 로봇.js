function solution(board) {
    var answer = 0;
    const n = board.length
    const m = board[0].length
    const boards = board.map(row=> row.split(""))
    
    let start = []
    let end = []
    
    for (let i =0; i<n; i++) {
        for (let j=0; j<m; j++) {
            if (boards[i][j] === "R") {
                start = [i,j]
            } else if (boards[i][j] === "G") {
                end = [i,j]
            }
        }
    }
    
    function game_start() {
        const queue = [[...start,0]]
        const end_i = end[0]
        const end_j = end[1]
        
        const di = [0,0,1,-1]
        const dj = [1,-1,0,0]
        const visited = Array.from({length:n},()=> Array(m).fill(false))
        visited[start[0]][start[1]]
        
        while (queue.length) {
            const [i,j,cnt] = queue.shift()
            if (i === end_i && j === end_j) {
                return cnt
            }

            for (let move = 0; move<4; move++) {
                let ni = i
                let nj = j 
                while (ni + di[move] >=0 && ni + di[move] <n && nj+ dj[move]>=0 && nj + dj[move]<m && boards[ni+ di[move]][nj+ dj[move]] != "D" ) {
                    ni += di[move]
                    nj += dj[move]
                }
                if (ni>=0 && ni<n && nj>=0 && nj<m && !visited[ni][nj] && boards[ni][nj] != "D") {
                    visited[ni][nj] = true
                    queue.push([ni,nj,cnt+1])
                }
                
            }
        }
        return -1
    }
    
    answer = game_start()
    return answer;
}