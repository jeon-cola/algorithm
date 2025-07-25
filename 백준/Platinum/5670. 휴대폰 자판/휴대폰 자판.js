const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const input = []
rl.on("line", function(line) {
    input.push(line)
}).on('close', function() {
    let idx = 0
    while (idx < input.length) {
        let n = Number(input[idx])
        if (n===0) break
        const trie = new Trie()
        const words = []

        for (let i =0; i<n; i++) {
            const word = input[++idx]
            words.push(word)
            trie.insert(word)
        }

        let cnt = 0
        for (const word of words) {
            cnt += trie.startsWith(word)
        }

        console.log((cnt / n).toFixed(2))
        idx++
    }
})


class TrieNode {
    constructor() {
        this.children = {}
        this.endOfWord = false
        this.count = 0
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
            node.count++
        }
        node.endOfWord = true
    }

    startsWith(prefix) {
        let node = this.root
        let press = 0

        for (let i =0; i <prefix.length; i++) {
            const char = prefix[i]
            
            if (i === 0 || Object.keys(node.children).length >1 || node.endOfWord) {
                press++
            }
            node = node.children[char]
        }
        return press
    }
}