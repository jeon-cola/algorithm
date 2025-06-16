function solution(book_time) {
    var answer = 0;
    const list = []
    
    function toMinute(timeStr) {
        const [h,m] = timeStr.split(":").map(Number)
        return h*60 + m
    }
    
    for (const [start,end] of book_time) {
        list.push([toMinute(start), toMinute(end)+10])
    }
    list.sort((a,b)=> a[0] - b[0])
    
    const current = []
    for (const [start,end] of list) {
        let isPlace = false
        
        for (let i=0;i<current.length;i++) {
            if (current[i]<=start) {
                current[i] = end
                isPlace = true
                break
            }
        }
        if (!isPlace) {
            current.push([end])
        }
    }
    
    return current.length;
}