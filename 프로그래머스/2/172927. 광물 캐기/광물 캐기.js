function solution(picks, minerals) {
    var answer = 0;
    const map = [[1,1,1],[5,1,1],[25,5,1]]
    const idx= {"diamond":0,"iron":1,"stone":2}

   const blocks = []
   const totalPicks = picks.reduce((a, b) => a + b, 0)
   for (let i =0; i< minerals.length && blocks.length < totalPicks; i+=5) {
    const sliced =  minerals.slice(i,i+5)
    let score = 0
    for (const m of sliced) {
        score+=map[2][idx[m]]
    }
    blocks.push({sliced,score})
   }
   blocks.sort((a,b)=> b.score - a.score)

   let pickersIdx = 0
   for (const { sliced } of blocks) {
    while (pickersIdx < 3 && picks[pickersIdx] === 0 ) { pickersIdx++ }
    if (pickersIdx === 3) break

    for (const m of sliced) {
        answer += map[pickersIdx][idx[m]]
    }
    picks[pickersIdx]--
   }
   
    return answer;
}