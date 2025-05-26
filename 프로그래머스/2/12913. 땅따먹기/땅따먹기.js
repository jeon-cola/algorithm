function solution(land) {
    var answer = 0;
    const n = land.length
    const m = land[0].length
    
    for (let i =1; i<n; i++) {
        for (let j =0; j<4;j++) {
          let maxValue = -Infinity
            for (let k =0; k<4; k++) {
                if (k === j) continue
                maxValue = Math.max(maxValue,land[i-1][k])
            }   
            land[i][j] += maxValue
        }
    }
    let max_value=-Infinity
    for (let i =0; i<4; i++) {
        max_value=Math.max(max_value,land[n-1][i])
    }
    answer = max_value
    return answer;
}