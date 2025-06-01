function solution(n, q, ans) {
    
    function getCombinations(num) {
        const result = []
        function backtracking(start,list) {
            if (list.length === 5) {
                result.push([...list])
                return
            }
            for (let i =start; i<num.length; i++ ) {
                list.push(num[i])
                backtracking(i+1,list)
                list.pop()
            }
        }
    backtracking(0,[])
    return result
    }
    
            
    var answer = 0;
    const numbers = Array.from({length:n},(_,i)=>i+1)
    const combs = getCombinations(numbers)
    
    for (const comb of combs) {
        let valid = true
        for (let i =0; i<q.length; i++) {
            const setComb = new Set(comb)
            const check = q[i].filter(x => setComb.has(x))
            if (check.length !== ans[i]) {
                valid = false
            }
        }
        if (valid) answer++
    }
 
    return answer;
}