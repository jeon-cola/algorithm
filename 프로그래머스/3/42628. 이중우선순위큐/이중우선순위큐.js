function solution(operations) {
    var answer = [];
    
    function putOperation(number) {
        answer.push(number)
        answer.sort((a,b)=> b-a)
    }
    
    for (const orders of operations) {
        const [ order, number ] = orders.split(" ")
        if (order === "I") {
            putOperation(number)
        } else {
            if (answer.length>0) {
                switch (number) {
                    case ("1"):
                        answer.shift()
                        break
                    case ("-1"):
                        answer.pop()
                        break
                }
            }
        }
    }
    if (answer.length === 0){
      answer = [0,0]  
    } else {
        answer = [Number(answer[0]), Number(answer[answer.length -1])]
    }
    return answer;
}