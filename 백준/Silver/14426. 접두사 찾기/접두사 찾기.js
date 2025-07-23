const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const input = []
let n, m

rl.on("line", function(line) {
    input.push(line)
    if (input.length === 1)  [n, m] = input[0].split(' ').map(Number)
    if (input.length === n+m+1) rl.close()
}).on("close", function() {
    const s = input.slice(1, n+1)
    const queries = input.slice(n+1, n+m+1)

    const trie = new Trie()
    for (const word of s ) {
        trie.insert(word)
    }

    let cnt = 0
    for (const query of queries) {
        if (trie.startsWith(query)) cnt++
    }
    console.log(cnt)
})

class TrieNode {
    constructor() {
        this.children = {}
        this.isEndOfWord = false
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode()
    }

    insert(word) {
        let node = this.root
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode()
            }
            node = node.children[char]
        }
        node.isEndOfWord = true
    }

    searchWith(word) {
        let node = this.root
        for (const char of word) {
            if (!node.children[char]) {
                return false
            }
            node = node.children[char]
        }
        return node.isEndOfWord
    }

    startsWith(prefix) {
        let node = this.root
        for (const char of prefix) {
            if (!node.children[char]) {
                return false
            }
            node = node.children[char]
        }
        return true
    }
}