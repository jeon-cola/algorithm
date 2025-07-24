const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const input = []
rl.on("line", function(line) {
    input.push(line)
}).on('close', function() {
    const taseCase = Number(input[0])
    let idx = 1
    for (let ts = 0; ts < taseCase; ts++) {
        n = Number(input[idx++])
        const trie = new Trie()
        let isAble = true
        const numbers = input.slice(idx, idx+n)
        idx += n

        for (const number of numbers) {
            if (trie.hasPrefix(number)) {
                isAble = false
                break
            }
            trie.insert(number)
        }

        console.log(isAble ? "YES" : "NO")
    }
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

    hasPrefix(word) {
        let node = this.root
        for (const char of word) {
            if (!node.children[char]) {
                return false
            }
            node = node.children[char]
            if (node.isEndOfWord) return true
        }
        return Object.keys(node.children).length > 0
    }
}