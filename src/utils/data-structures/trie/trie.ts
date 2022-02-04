export class TrieNode {
    protected _children: Map<string, TrieNode> = new Map<string, TrieNode>();

    get children(): Map<string, TrieNode> {
        return this._children;
    }

    set children(v: Map<string, TrieNode>) {
        this._children = v;
    }

    protected _isEnd = false;

    get isEnd(): boolean {
        return this._isEnd;
    }

    set isEnd(v: boolean) {
        this._isEnd = v;
    }
}

export class Trie {
    protected _root: TrieNode;

    constructor() {
        this._root = new TrieNode();
    }

    insert(input: string): boolean {
        let cur = this._root;
        for (const c of input) {
            let nodeC = cur.children.get(c);
            if (!nodeC) {
                nodeC = new TrieNode();
                cur.children.set(c, nodeC);
            }
            cur = nodeC;
        }
        cur.isEnd = true;
        return true;
    }

    /**
     * Only can present as a prefix, not a word
     * @param input
     */
    isAbsPrefix(input: string): boolean {
        let cur = this._root;
        for (const c of input) {
            const nodeC = cur.children.get(c);
            if (!nodeC) {
                return false;
            }
            cur = nodeC;
        }
        return !cur.isEnd;
    }

    /**
     * Can present as a prefix or word
     * @param input
     */
    isPrefix(input: string): boolean {
        let cur = this._root;
        for (const c of input) {
            const nodeC = cur.children.get(c);
            if (!nodeC) {
                return false;
            }
            cur = nodeC;
        }
        return true;
    }

    search(input: string): boolean {
        let cur = this._root;
        for (const c of input) {
            const nodeC = cur.children.get(c);
            if (!nodeC) {
                return false;
            }
            cur = nodeC;
        }
        return cur.isEnd;
    }

    getAllWords(prefix = ''): string[] {
        const words: string[] = [];

        function dfs(node: TrieNode, word: string) {
            for (const char of node.children.keys()) {
                const charNode = node.children.get(char);
                if (charNode !== undefined) {
                    dfs(charNode, word.concat(char));
                }
            }
            if (node.isEnd) {
                words.push(word);
            }
        }

        let startNode = this._root;

        if (prefix) {
            for (const c of prefix) {
                const nodeC = startNode.children.get(c);
                if (nodeC) {
                    startNode = nodeC;
                }
            }
        }

        dfs(startNode, prefix);
        return words;
    }
}
