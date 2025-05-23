function solution(board, moves) {
    var answer = 0;
    const stack = []
    var m = board[0].length
    
    for (let i of moves) {
        var j = 0
        while (
            j < m
        ) {
            if (board[j][i-1] != 0) {
                stack.push(board[j][i-1])
                board[j][i-1] = 0
                break
            }
            j++
        }
        if (
            stack.length >= 2 &&
            stack[stack.length-1] == stack[stack.length-2]
        ) {
            stack.pop()
            stack.pop()
            answer+=2
        }
    }
    return answer;
}