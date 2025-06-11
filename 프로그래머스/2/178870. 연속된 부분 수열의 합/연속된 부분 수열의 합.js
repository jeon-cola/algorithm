function solution(sequence, k) {
    var answer = [0, sequence.length -1 ];
    let start = 0
    let end = 0
    let sum = sequence[0]
    
    const n = sequence.length
    
    while (end < n) {
        if (sum < k) {
            end++
            if (end < n) {
                sum+=sequence[end]
            }
        } else if (sum > k) {
            sum-=sequence[start]
            start++
        } else {
            if ((end - start) < (answer[1] - answer[0])) {
                answer = [start, end]
            }
            sum-=sequence[start]
            start++
        }
    }
    return answer;
}