function solution(diffs, times, limit) {
    const n = diffs.length

    let left = 1 
    let right = 100000
    let maxN = right

    function getTime(level) {
        let time = 0

        for (let i = 0; i< n; i++) {
            const diff = diffs[i]
            const currentTime = times[i]
            const prevTime = i > 0 ? times[i-1] : 0

            if (diff <= level) {
                time += currentTime
            } else {
                const mistime = diff - level
                time += mistime * (currentTime + prevTime) + currentTime
            }

            if (time > limit) break
        }

        return time
    }

    while (left<= right) {
        const mid = Math.floor((right+left) / 2)
        const time = getTime(mid)

        if (time <= limit) {
            maxN = mid
            right = mid -1
        } else {
            left = mid+1
        }
    }

    return maxN
}
