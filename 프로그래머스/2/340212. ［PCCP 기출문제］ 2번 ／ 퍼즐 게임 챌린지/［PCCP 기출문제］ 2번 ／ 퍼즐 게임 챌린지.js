function solution(diffs, times, limit) {
    // 입력 검증
    if (!diffs || !times || diffs.length === 0 || times.length === 0) {
        return 1;
    }
    
    const n = diffs.length;
    
    // 특정 숙련도 level로 모든 퍼즐을 푸는데 걸리는 총 시간 계산
    function getTotalTime(level) {
        let totalTime = 0;
        
        for (let i = 0; i < n; i++) {
            const diff = diffs[i];
            const timeCur = times[i];
            const timePrev = i > 0 ? times[i - 1] : 0;
            
            if (diff <= level) {
                // 틀리지 않는 경우
                totalTime += timeCur;
            } else {
                // 틀리는 경우
                const mistakes = diff - level;
                // 각 실수마다: timeCur + timePrev
                // 마지막 성공: timeCur
                const timeForMistakes = mistakes * (timeCur + timePrev);
                totalTime += timeForMistakes + timeCur;
            }
            
            // 오버플로우 방지 및 조기 종료
            if (totalTime > limit || totalTime < 0) {
                return limit + 1; // limit보다 큰 값 반환
            }
        }
        
        return totalTime;
    }
    
    // 이진 탐색
    let left = 1;
    let right = 100000; // 문제 제약조건에 따른 최대 난이도
    let answer = right;
    
    // 최대 반복 횟수 제한 (무한루프 방지)
    let iterations = 0;
    const maxIterations = 50;
    
    while (left <= right && iterations < maxIterations) {
        iterations++;
        
        const mid = Math.floor((left + right) / 2);
        const totalTime = getTotalTime(mid);
        
        if (totalTime <= limit) {
            answer = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    return answer;
}
