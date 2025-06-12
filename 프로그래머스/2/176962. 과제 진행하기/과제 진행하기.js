function solution(plans) {
    var answer = [];
    
    function toMinute(timeStr) {
        const [h,m] = timeStr.split(":").map(Number)
        return h*60+m
    }
    
    plans.sort((a,b)=> toMinute(a[1]) - toMinute(b[1]))
    
    const stack = []
    let time = toMinute(plans[0][1])
    
    for (const [name, a, b] of plans) {
        const startTime = toMinute(a)
        const duration = Number(b)
        
        while (stack.length && time <startTime) {
            const last = stack.pop()
            const remaining = last.remaining - (startTime - time)
            if (remaining > 0) {
                stack.push({name:last.name,remaining})
                time = startTime
                break
            } else {
                answer.push(last.name)
                time+= last.remaining
            }
        }
        
        time = Math.max(time, startTime)
        stack.push({name,remaining:duration})
        
    }
    while (stack.length) {
    const last = stack.pop()
    answer.push(last.name)
    }
    
    return answer;
}