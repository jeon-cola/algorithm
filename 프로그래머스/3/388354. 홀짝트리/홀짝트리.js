function solution(nodes, edges) {
    const nodeList = Array(nodes.length);
    const map = new Map();
    const count = new Map();
    const result = [0, 0];

    for (let i = 0; i < nodes.length; i++) {
        nodeList[i] = { weight: nodes[i], childs: [] };
        map.set(nodes[i], i);
        count.set(nodes[i], 0);
    }

    for (const [a, b] of edges) {
        nodeList[map.get(a)].childs.push(b);
        nodeList[map.get(b)].childs.push(a);
        count.set(a, (count.get(a) || 0) + 1);
        count.set(b, (count.get(b) || 0) + 1);
    }

    function isValid(root, start, visited) {
        let cnt = count.get(start);
        if (root !== start) cnt--;

        if ((start & 1) === 0) {
            return (cnt & 1) === 0;
        } else {
            return (cnt & 1) === 1;
        }
    }

    function solve(root, visited) {
        visited.add(root);
        const stk = [root];

        while (stk.length > 0) {
            const p = stk.pop();

            for (const next of nodeList[map.get(p)].childs) {
                if (visited.has(next)) continue;
                if (!isValid(root, next, visited)) return false;
                stk.push(next);
                visited.add(next);
            }
        }

        return true;
    }

    function reverse(root, visited) {
        visited.add(root);
        const stk = [root];

        while (stk.length > 0) {
            const p = stk.pop();

            for (const next of nodeList[map.get(p)].childs) {
                if (visited.has(next)) continue;
                if (isValid(root, next, visited)) return false;
                stk.push(next);
                visited.add(next);
            }
        }

        return true;
    }

    for (const root of nodes) {
        let visited = new Set();
        if (isValid(root, root, visited)) {
            if (solve(root, visited)) {
                result[0]++;
            }
        }

        visited = new Set();
        if (!isValid(root, root, visited)) {
            if (reverse(root, visited)) {
                result[1]++;
            }
        }
    }

    return result;
}
