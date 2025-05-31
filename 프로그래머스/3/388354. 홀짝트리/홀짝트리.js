function solution(nodes, edges) {
    const list = Array.from({length:nodes.length}, () => 0)
    const map = new Map()
    const count = new Map()
    const result = [0,0]

    for (let i =0; i<nodes.length; i++) {
        list[i] = {weight: nodes[i], child:[]}
        map.set(nodes[i],i)
        count.set(nodes[i],0)
    }

    for (const [a,b] of edges) {
        list[map.get(a)].child.push(b)
        list[map.get(b)].child.push(a)
        count.set(a,(count.get(a) || 0) +1)
        count.set(b,(count.get(b)||0)+1)
    }

    function isValid(root, start) {
        let cnt = count.get(start)
        if (root !== start ) cnt--

        if ((start & 1) === 0) {
            return ((cnt & 1) === 0)
        } else {
            return ((cnt & 1) === 1)
        }
    }

    function solve(root, visited) {
        visited.add(root)
        const q = [root]

        while (q.length > 0) {
            const current = q.pop()

            for (const next of list[map.get(current)].child) {
                if (visited.has(next)) continue
                if (!isValid(root,next)) return false
                visited.add(next)
                q.push(next)
            }
        }
        return true
    }

    function reverse(root, visited) {
        visited.add(root)
        const q = [root]

        while (q.length > 0) {
            const current = q.pop()

            for (const next of list[map.get(current)].child) {
                if (visited.has(next)) continue
                if (isValid(root, next)) return false
                q.push(next)
                visited.add(next)
            }
        }
        return true
    }

    for (const root of nodes) {
        let visited = new Set()
        if (isValid(root,root)){
            if (solve(root,visited)) {
                result[0]++
            }
        }
        visited = new Set()
        if (!isValid(root,root)){
            if (reverse(root,visited)) {
                result[1]++
            }
        }
    }
    return result
}
