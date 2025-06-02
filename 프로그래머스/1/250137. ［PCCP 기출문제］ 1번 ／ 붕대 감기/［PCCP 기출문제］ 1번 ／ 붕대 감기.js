function solution(bandage, health, attacks) {
    const attack_time_list = new Map()
    for (const [attack_time, attack_damage] of attacks) {
        attack_time_list.set(attack_time, attack_damage)
    }
    
    let time = 0
    let cnt =0
    const last_time = attacks[attacks.length-1][0]
    let hp = health
    
    while (time<= last_time) {
        if (attack_time_list.has(time)) {
            hp -= attack_time_list.get(time)
            cnt=0
            if (hp <=0) {
                hp = -1
                break
            }
        } else {
            cnt++
            hp += bandage[1]
            if (cnt === bandage[0]) {
                hp+=bandage[2]
                cnt=0
            } 
            if (hp>=health) hp = health
        }
        time++
    }
    
    return hp;
}