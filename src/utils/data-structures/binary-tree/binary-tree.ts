export type BinaryTreeNodePropertyName = 'id' | 'val' | 'count' | 'allLesserSum';
export type NodeOrPropertyName = 'node' | BinaryTreeNodePropertyName;
export type DFSOrderPattern = 'in' | 'pre' | 'post';
export type BinaryTreeNodeId = number;
export type FamilyPosition = 0 | 1 | 2;
export type BinaryTreeDeletedResult<T> = { deleted: BinaryTreeNode<T> | null, needBalanced: BinaryTreeNode<T> | null };
export type ResultsByTypeItem<T> = T | BinaryTreeNode<T> | number | BinaryTreeNodeId;
export type ResultsByType<T> = ResultsByTypeItem<T>[];

export interface BinaryTreeNodeParam<T> {
    id: BinaryTreeNodeId;
    val: T;
    count?: number;
}

export interface I_BinaryTree<T> {
    clear(): void;

    isEmpty(): boolean;

    insert(id: BinaryTreeNodeId, val?: T | null, count?: number): BinaryTreeNode<T> | null;

    getDepth(node: BinaryTreeNode<T>): number;

    getMinHeight(beginRoot?: BinaryTreeNode<T> | null): number;

    getHeight(beginRoot?: BinaryTreeNode<T> | null): number;

    isBalanced(beginRoot?: BinaryTreeNode<T> | null): boolean;

    getNodes(nodeProperty: BinaryTreeNodeId | number | T, propertyName ?: BinaryTreeNodePropertyName, onlyOne ?: boolean): BinaryTreeNode<T>[];

    getNode(nodeProperty: BinaryTreeNodeId | number | T, propertyName ?: BinaryTreeNodePropertyName): BinaryTreeNode<T> | null;

    getPathToRoot(node: BinaryTreeNode<T>): BinaryTreeNode<T>[];

    BFS(): BinaryTreeNodeId[];

    BFS(nodeOrPropertyName: 'id'): BinaryTreeNodeId[];

    BFS(nodeOrPropertyName: 'val'): T[];

    BFS(nodeOrPropertyName: 'node'): BinaryTreeNode<T>[];

    BFS(nodeOrPropertyName: 'count'): number[];

    BFS(nodeOrPropertyName: 'allLesserSum'): number[];

    BFS(nodeOrPropertyName ?: NodeOrPropertyName): ResultsByType<T>;

    DFS(): BinaryTreeNodeId[];

    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'id'): BinaryTreeNodeId[];

    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'val'): T[];

    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'node'): BinaryTreeNode<T>[];

    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'count'): number[];

    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'allLesserSum'): number[];// TODO in BinaryTree not implemented

    DFS(pattern ?: 'in' | 'pre' | 'post', nodeOrPropertyName ?: NodeOrPropertyName): ResultsByType<T>;

    DFSIterative(): BinaryTreeNodeId[];

    DFSIterative(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'id'): BinaryTreeNodeId[];

    DFSIterative(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'val'): T[];

    DFSIterative(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'node'): BinaryTreeNode<T>[];

    DFSIterative(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'count'): number[];

    DFSIterative(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'allLesserSum'): number[];// TODO in BinaryTree not implemented

    DFSIterative(pattern ?: 'in' | 'pre' | 'post', nodeOrPropertyName ?: NodeOrPropertyName): ResultsByType<T>;

    morris(): BinaryTreeNodeId[];

    morris(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'id'): BinaryTreeNodeId[];

    morris(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'val'): T[];

    morris(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'node'): BinaryTreeNode<T>[];

    morris(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'count'): number[];

    morris(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'allLesserSum'): number[];// TODO in BinaryTree not implemented

    morris(pattern ?: 'in' | 'pre' | 'post'): BinaryTreeNode<T>[];

    subTreeSum(subTreeRoot: BinaryTreeNode<T>, propertyName ?: BinaryTreeNodePropertyName): number;
}

export abstract class AbstractBinaryTree<T> implements I_BinaryTree<T> {
    protected _root: BinaryTreeNode<T> | null = null;
    public get root(): BinaryTreeNode<T> | null {
        return this._root;
    }

    public set root(v: BinaryTreeNode<T> | null) {
        if (v) {
            v.parent = null;
            v.familyPosition = 0;
        }
        this._root = v;
    }

    protected _size = 0;
    public get size(): number {
        return this._size;
    }

    public set size(v: number) {
        this._size = v;
    }

    protected _allowDuplicate = true;
    public get allowDuplicate(): boolean {
        return this._allowDuplicate;
    }

    public set allowDuplicate(v: boolean) {
        this._allowDuplicate = v;
    }

    constructor()
    constructor(nodeOrData: T[], allowDuplicate?: boolean)
    constructor(nodeOrData: BinaryTreeNode<T>, allowDuplicate?: boolean)
    constructor(nodeOrData: BinaryTreeNodeParam<T>, allowDuplicate?: boolean)
    constructor(nodeOrData?: BinaryTreeNodeParam<T> | BinaryTreeNode<T> | T[], allowDuplicate?: boolean) {
        if (allowDuplicate !== undefined) {
            this._allowDuplicate = allowDuplicate;
        }
        if (nodeOrData instanceof Array) {
            this.fill(nodeOrData);
        } else {
            if (nodeOrData !== undefined) {
                const {id, val, count} = nodeOrData;
                if (id !== undefined) {
                    if (typeof id === 'number') {
                        this.root = this.createNode(id, val, count);
                    } else {
                        this.root = id;
                    }
                    this._size = 1;
                }
            }
        }

    }

    abstract createNode(id: BinaryTreeNodeId, val: T, count?: number): BinaryTreeNode<T> | null;

    clear() {
        this.root = null;
        this._size = 0;
    }

    isEmpty(): boolean {
        return this._size === 0;
    }

    insert(id: BinaryTreeNodeId, val: T, count?: number): BinaryTreeNode<T> | null {
        if (count === undefined) {
            count = 1;
        }
        const _bfs = (root: BinaryTreeNode<T>, newNode: BinaryTreeNode<T> | null): BinaryTreeNode<T> | null => {
            const queue: Array<BinaryTreeNode<T> | null> = [root];
            while (queue.length > 0) {
                const cur = queue.shift();
                if (cur) {
                    if (cur.left === undefined) {
                        if (newNode) {
                            newNode.parent = cur;
                            newNode.familyPosition = 1;
                        }

                        cur.left = newNode;
                        this._size++;
                        return cur.left;
                    }
                    if (cur.right === undefined) {
                        if (newNode) {
                            newNode.parent = cur;
                            newNode.familyPosition = 2;
                        }
                        cur.right = newNode;
                        this._size++;
                        return cur.right;
                    }
                    if (cur.left) queue.push(cur.left);
                    if (cur.right) queue.push(cur.right);
                } else {
                    return null;
                }
            }
            return null;
        };
        let inserted: BinaryTreeNode<T> | null = null;
        if (this._allowDuplicate) {
            if (this.root) {
                for (let i = 0; i < count; i++) {
                    inserted = _bfs(this.root, val !== null ? new BinaryTreeNode<T>(id, val, 1) : null);
                }
            } else {
                this.root = new BinaryTreeNode<T>(id, val, 1);
                inserted = this.root;
                this._size = 1;
                for (let i = 0; i < count - 1; i++) {
                    inserted = _bfs(this.root, val !== null ? new BinaryTreeNode<T>(id, val, 1) : null);
                }
            }
        } else {

            const existNode = val !== null ? this.getNode(val, 'val') : null;
            if (this.root) {
                if (existNode) {
                    existNode.count += count;
                    inserted = existNode;
                } else {
                    inserted = _bfs(this.root, val !== null ? new BinaryTreeNode<T>(id, val, count) : null);
                }
            } else {
                this.root = val !== null ? new BinaryTreeNode<T>(id, val, count) : null;
                this._size = 1;
                inserted = this.root;
            }
        }
        return inserted;
    }

    insertMany(data: T[]): boolean {
        try {
            for (let i = 0; i < data.length; i++) {
                this.insert(i + 1, data[i]);
            }
        } catch (e) {
            return false;
        }
        return true;
    }

    fill(data: T[]): boolean {
        this.root = null;
        this.size = 0;
        try {
            for (let i = 0; i < data.length; i++) {
                this.insert(i, data[i]);
            }
        } catch (e) {
            return false;
        }
        return true;
    }

    remove(id: BinaryTreeNodeId): BinaryTreeDeletedResult<T>[] {
        let nodes: BinaryTreeNode<T>[] = [];
        nodes = this.getNodes(id);
        for (const node of nodes) {
            switch (node.familyPosition) {
                case 0:
                    // if (node.left) {
                    //
                    // } else if (node.right) {
                    //
                    // }
                    break;
                case 1:
                    break;
                case 2:
                    break;
            }
        }
        return [{deleted: null, needBalanced: null}];
    }

    getDepth(node: BinaryTreeNode<T>): number {
        let depth = 0;
        while (node.parent) {
            depth++;
            node = node.parent;
        }
        return depth;
    }

    getMinHeight(beginRoot?: BinaryTreeNode<T> | null): number {
        const _beginRoot = beginRoot || this.root;
        const _getMinHeight = (cur: BinaryTreeNode<T> | null | undefined): number => {
            if (!cur) return 0;
            if (!cur.left && !cur.right) return 0;
            const leftMinHeight = _getMinHeight(cur.left);
            const rightMinHeight = _getMinHeight(cur.right);
            return Math.min(leftMinHeight, rightMinHeight) + 1;
        };

        if (_beginRoot) {
            return _getMinHeight(_beginRoot);
        } else {
            return -1;
        }
    }

    getHeight(beginRoot?: BinaryTreeNode<T> | null): number {
        const _beginRoot = beginRoot || this.root;
        const _getMaxHeight = (cur: BinaryTreeNode<T> | null | undefined): number => {
            if (!cur) return 0;
            if (!cur.left && !cur.right) return 0;
            const leftHeight = _getMaxHeight(cur.left);
            const rightHeight = _getMaxHeight(cur.right);
            return Math.max(leftHeight, rightHeight) + 1;
        };

        if (_beginRoot) {
            return _getMaxHeight(_beginRoot);
        } else {
            return -1;
        }
    }

    isBalanced(beginRoot?: BinaryTreeNode<T> | null): boolean {
        console.log('minHeight: ', this.getMinHeight(beginRoot));
        console.log('height: ', this.getHeight(beginRoot));
        // TODO maybe logic is wrong
        return (this.getMinHeight(beginRoot) + 1 >= this.getHeight(beginRoot));
    }

    getNodes(nodeProperty: BinaryTreeNodeId | T, propertyName ?: BinaryTreeNodePropertyName, onlyOne ?: boolean) {
        if (propertyName === undefined) {
            propertyName = 'id';
        }

        const result: BinaryTreeNode<T>[] = [];

        function _traverse(cur: BinaryTreeNode<T>) {
            switch (propertyName) {
                case 'id':
                    if (cur.id === nodeProperty) {
                        result.push(cur);
                        if (onlyOne) return;
                    }
                    break;
                case 'count':
                    if (cur.count === nodeProperty) {
                        result.push(cur);
                        if (onlyOne) return;
                    }
                    break;
                case 'val':
                    if (cur.val === nodeProperty) {
                        result.push(cur);
                        if (onlyOne) return;
                    }
                    break;
                case 'allLesserSum':
                    if (cur.allLesserSum === nodeProperty) {
                        result.push(cur);
                        if (onlyOne) return;
                    }
                    break;
                default:
                    if (cur.id === nodeProperty) {
                        result.push(cur);
                        if (onlyOne) return;
                    }
                    break;
            }

            if (!cur.left && !cur.right) return null;
            cur.left ? _traverse(cur.left) : null;
            cur.right ? _traverse(cur.right) : null;
        }

        this.root && _traverse(this.root);
        return result;
    }

    getNode(nodeProperty: BinaryTreeNodeId | T, propertyName ?: BinaryTreeNodePropertyName): BinaryTreeNode<T> | null {
        if (propertyName === undefined) {
            propertyName = 'id';
        }
        const node = this.getNodes(nodeProperty, propertyName, true)[0];
        if (node) {
            return node;
        } else {
            return null;
        }
    }

    getPathToRoot(node: BinaryTreeNode<T>): BinaryTreeNode<T>[] {
        const result: BinaryTreeNode<T>[] = [];
        while (node.parent) {
            result.unshift(node);
            node = node.parent;
        }
        result.unshift(node);
        return result;
    }

    protected _visitedId: BinaryTreeNodeId[] = [];
    protected _visitedVal: Array<T> = [];
    protected _visitedNode: BinaryTreeNode<T>[] = [];
    protected _visitedCount: number[] = [];
    protected _visitedLeftSum: number[] = [];

    protected _resetResults() {
        this._visitedId = [];
        this._visitedVal = [];
        this._visitedNode = [];
        this._visitedCount = [];
        this._visitedLeftSum = [];
    }

    protected _pushByPropertyName(node: BinaryTreeNode<T>, nodeOrPropertyName ?: NodeOrPropertyName) {
        if (nodeOrPropertyName === undefined) {
            nodeOrPropertyName = 'id';
        }

        switch (nodeOrPropertyName) {
            case 'id':
                this._visitedId.push(node.id);
                break;
            case 'val':
                this._visitedVal.push(node.val);
                break;
            case 'node':
                this._visitedNode.push(node);
                break;
            case 'count':
                this._visitedCount.push(node.count);
                break;
            case 'allLesserSum':
                this._visitedLeftSum.push(node.allLesserSum);
                break;
            default:
                this._visitedId.push(node.id);
                break;
        }
    }

    protected _getResultByPropertyName(nodeOrPropertyName ?: NodeOrPropertyName): ResultsByType<T> {
        if (nodeOrPropertyName === undefined) {
            nodeOrPropertyName = 'id';
        }

        switch (nodeOrPropertyName) {
            case 'id':
                return this._visitedId;
            case 'val':
                return this._visitedVal;
            case 'node':
                return this._visitedNode;
            case 'count':
                return this._visitedCount;
            case 'allLesserSum':
                return this._visitedLeftSum;
            default:
                return this._visitedId;
        }
    }

    BFS(): BinaryTreeNodeId[];
    BFS(nodeOrPropertyName: 'id'): BinaryTreeNodeId[];
    BFS(nodeOrPropertyName: 'val'): T[];
    BFS(nodeOrPropertyName: 'node'): BinaryTreeNode<T>[];
    BFS(nodeOrPropertyName: 'count'): number[];
    BFS(nodeOrPropertyName: 'allLesserSum'): number[];    // TODO in BinaryTree not implemented
    BFS(nodeOrPropertyName ?: NodeOrPropertyName): ResultsByType<T> {
        if (nodeOrPropertyName === undefined) {
            nodeOrPropertyName = 'id';
        }

        this._resetResults();

        const queue = new Array<BinaryTreeNode<T> | null | undefined>();
        queue.push(this.root);
        while (queue.length !== 0) {
            const cur = queue.shift();
            if (cur) {
                this._pushByPropertyName(cur, nodeOrPropertyName);
                if (cur?.left !== null) queue.push(cur.left);
                if (cur?.right !== null) queue.push(cur.right);
            }
        }
        return this._getResultByPropertyName(nodeOrPropertyName);
    }

    DFS(): BinaryTreeNodeId[];
    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'id'): BinaryTreeNodeId[];
    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'val'): T[];
    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'node'): BinaryTreeNode<T>[];
    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'count'): number[];
    DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'allLesserSum'): number[]; // TODO in BinaryTree not implemented
    DFS(pattern ?: 'in' | 'pre' | 'post', nodeOrPropertyName ?: NodeOrPropertyName): ResultsByType<T> {
        if (pattern === undefined) {
            pattern = 'in';
        }

        if (nodeOrPropertyName === undefined) {
            nodeOrPropertyName = 'val';
        }

        this._resetResults();

        const _traverse = (node: BinaryTreeNode<T>) => {
            switch (pattern) {
                case 'in':
                    if (node.left) _traverse(node.left);
                    this._pushByPropertyName(node, nodeOrPropertyName);
                    if (node.right) _traverse(node.right);
                    break;
                case 'pre':
                    this._pushByPropertyName(node, nodeOrPropertyName);
                    if (node.left) _traverse(node.left);
                    if (node.right) _traverse(node.right);
                    break;
                case 'post':
                    if (node.left) _traverse(node.left);
                    if (node.right) _traverse(node.right);
                    this._pushByPropertyName(node, nodeOrPropertyName);
                    break;
            }

        };

        this.root && _traverse(this.root);
        return this._getResultByPropertyName(nodeOrPropertyName);
    }

    DFSIterative(): BinaryTreeNodeId[];
    DFSIterative(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'id'): BinaryTreeNodeId[];
    DFSIterative(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'val'): T[];
    DFSIterative(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'node'): BinaryTreeNode<T>[];
    DFSIterative(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'count'): number[];
    DFSIterative(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'allLesserSum'): number[]; // TODO in BinaryTree not implemented
    /**
     * Time complexity is O(n)
     * Space complexity of Iterative DFS equals to recursive DFS which is O(n) because of the stack
     * @param pattern
     * @param nodeOrPropertyName
     * @constructor
     */
    DFSIterative(pattern ?: 'in' | 'pre' | 'post', nodeOrPropertyName ?: NodeOrPropertyName): ResultsByType<T> {
        pattern = pattern || 'in';
        nodeOrPropertyName = nodeOrPropertyName || 'id';
        this._resetResults();
        if (!this.root) return this._getResultByPropertyName(nodeOrPropertyName);
        // 0: visit, 1: print
        const stack: { opt: 0 | 1, node: BinaryTreeNode<T> | null | undefined }[] = [];
        stack.push({opt: 0, node: this.root});
        while (stack.length > 0) {
            const cur = stack.pop();
            if (!cur || !cur.node) continue;
            if (cur.opt === 1) {
                this._pushByPropertyName(cur.node, nodeOrPropertyName);
            } else {
                switch (pattern) {
                    case 'in':
                        stack.push({opt: 0, node: cur.node.right});
                        stack.push({opt: 1, node: cur.node});
                        stack.push({opt: 0, node: cur.node.left});
                        break;
                    case 'pre':
                        stack.push({opt: 0, node: cur.node.right});
                        stack.push({opt: 0, node: cur.node.left});
                        stack.push({opt: 1, node: cur.node});
                        break;
                    case 'post':
                        stack.push({opt: 1, node: cur.node});
                        stack.push({opt: 0, node: cur.node.right});
                        stack.push({opt: 0, node: cur.node.left});
                        break;
                    default:
                        stack.push({opt: 0, node: cur.node.right});
                        stack.push({opt: 1, node: cur.node});
                        stack.push({opt: 0, node: cur.node.left});
                        break;
                }
            }
        }
        return this._getResultByPropertyName(nodeOrPropertyName);
    }

    levelIterative(node: BinaryTreeNode<T> | null): BinaryTreeNodeId[];
    levelIterative(node: BinaryTreeNode<T> | null, nodeOrPropertyName?: 'id'): BinaryTreeNodeId[];
    levelIterative(node: BinaryTreeNode<T> | null, nodeOrPropertyName?: 'val'): T[];
    levelIterative(node: BinaryTreeNode<T> | null, nodeOrPropertyName?: 'node'): BinaryTreeNode<T>[];
    levelIterative(node: BinaryTreeNode<T> | null, nodeOrPropertyName?: 'count'): number[];
    levelIterative(node: BinaryTreeNode<T> | null, nodeOrPropertyName?: 'allLesserSum'): number[];
    levelIterative(node: BinaryTreeNode<T> | null, nodeOrPropertyName ?: NodeOrPropertyName): ResultsByType<T> {
        nodeOrPropertyName = nodeOrPropertyName || 'id';
        node = node || this._root;
        if (!node) {
            return [];
        }
        this._resetResults();
        const queue: BinaryTreeNode<T>[] = [];

        queue.push(node);
        while (queue.length > 0) {
            const cur = queue.shift();
            if (cur) {
                this._pushByPropertyName(cur, nodeOrPropertyName);
                if (cur.left) {
                    queue.push(cur.left);
                }
                if (cur.right) {
                    queue.push(cur.right);
                }
            }
        }
        return this._getResultByPropertyName(nodeOrPropertyName);
    }

    listLevels(node: BinaryTreeNode<T> | null): BinaryTreeNodeId[][];
    listLevels(node: BinaryTreeNode<T> | null, nodeOrPropertyName?: 'id'): BinaryTreeNodeId[][];
    listLevels(node: BinaryTreeNode<T> | null, nodeOrPropertyName?: 'val'): T[][];
    listLevels(node: BinaryTreeNode<T> | null, nodeOrPropertyName?: 'node'): BinaryTreeNode<T>[][];
    listLevels(node: BinaryTreeNode<T> | null, nodeOrPropertyName?: 'count'): number[][];
    listLevels(node: BinaryTreeNode<T> | null, nodeOrPropertyName?: 'allLesserSum'): number[][];
    listLevels(node: BinaryTreeNode<T> | null, nodeOrPropertyName?: NodeOrPropertyName): ResultsByTypeItem<T>[][] {
        nodeOrPropertyName = nodeOrPropertyName || 'id';
        node = node || this._root;
        if (!node) {
            return [];
        }
        const levelsNodes: ResultsByTypeItem<T>[][] = [];

        const _recursive = (node: BinaryTreeNode<T>, level: number) => {
            if (!levelsNodes[level]) {
                levelsNodes[level] = [];
            }
            switch (nodeOrPropertyName) {
                case 'id':
                    levelsNodes[level].push(node.id);
                    break;
                case 'val':
                    levelsNodes[level].push(node.val);
                    break;
                case 'node':
                    levelsNodes[level].push(node);
                    break;
                case 'count':
                    levelsNodes[level].push(node.count);
                    break;
                case 'allLesserSum':
                    levelsNodes[level].push(node.allLesserSum);
                    break;
                default:
                    levelsNodes[level].push(node.id);
                    break;
            }

            if (node.left) {
                _recursive(node.left, level + 1);
            }
            if (node.right) {
                _recursive(node.right, level + 1);
            }
        };

        _recursive(node, 0);

        return levelsNodes;
    }

    getPredecessor(node: BinaryTreeNode<T>): BinaryTreeNode<T> {
        if (node.left) {
            let predecessor: BinaryTreeNode<T> | null = node.left;
            while (predecessor.right && predecessor.right !== node) {
                predecessor = predecessor.right;
            }
            return predecessor;
        } else {
            return node;
        }
    }

    morris(): BinaryTreeNodeId[];
    morris(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'id'): BinaryTreeNodeId[];
    morris(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'val'): T[];
    morris(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'node'): BinaryTreeNode<T>[];
    morris(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'count'): number[];
    morris(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'allLesserSum'): number[];
    /**
     * The time complexity of Morris traversal is O(n), it's may slower than others
     * The space complexity  Morris traversal is O(1) because no using stack
     * @param pattern
     * @param nodeOrPropertyName
     */
    morris(pattern?: 'in' | 'pre' | 'post', nodeOrPropertyName?: NodeOrPropertyName): ResultsByType<T> {
        if (this.root === null) {
            return [];
        }

        pattern = pattern || 'in';
        nodeOrPropertyName = nodeOrPropertyName || 'id';

        this._resetResults();

        let cur: BinaryTreeNode<T> | null | undefined = this.root;
        const reverseEdge = (node: BinaryTreeNode<T> | null | undefined) => {
            let pre: BinaryTreeNode<T> | null | undefined = null;
            let next: BinaryTreeNode<T> | null | undefined = null;
            while (node) {
                next = node.right;
                node.right = pre;
                pre = node;
                node = next;
            }
            return pre;
        };
        const printEdge = (node: BinaryTreeNode<T> | null) => {
            const tail: BinaryTreeNode<T> | null | undefined = reverseEdge(node);
            let cur: BinaryTreeNode<T> | null | undefined = tail;
            while (cur) {
                this._pushByPropertyName(cur, nodeOrPropertyName);
                cur = cur.right;
            }
            reverseEdge(tail);
        };
        switch (pattern) {
            case 'in':
                while (cur) {
                    if (cur.left) {
                        const predecessor = this.getPredecessor(cur);
                        if (!predecessor.right) {
                            predecessor.right = cur;
                            cur = cur.left;
                            continue;
                        } else {
                            predecessor.right = null;
                        }
                    }
                    this._pushByPropertyName(cur, nodeOrPropertyName);
                    cur = cur.right;
                }
                break;
            case 'pre':
                while (cur) {
                    if (cur.left) {
                        const predecessor = this.getPredecessor(cur);
                        if (!predecessor.right) {
                            predecessor.right = cur;
                            this._pushByPropertyName(cur, nodeOrPropertyName);
                            cur = cur.left;
                            continue;
                        } else {
                            predecessor.right = null;
                        }
                    } else {
                        this._pushByPropertyName(cur, nodeOrPropertyName);
                    }
                    cur = cur.right;
                }
                break;
            case 'post':

                while (cur) {
                    if (cur.left) {
                        const predecessor = this.getPredecessor(cur);
                        if (predecessor.right === null) {
                            predecessor.right = cur;
                            cur = cur.left;
                            continue;
                        } else {
                            predecessor.right = null;
                            printEdge(cur.left);
                        }
                    }
                    cur = cur.right;
                }
                printEdge(this.root);
                break;
        }

        return this._getResultByPropertyName(nodeOrPropertyName);
    }

    subTreeSum(subTreeRoot: BinaryTreeNode<T>, propertyName ?: BinaryTreeNodePropertyName): number {
        if (propertyName === undefined) {
            propertyName = 'val';
        }
        let sum = 0;

        function _traverse(cur: BinaryTreeNode<T>): void {
            let needSum: number;
            switch (propertyName) {
                case 'id':
                    needSum = cur.id;
                    break;
                case 'count':
                    needSum = cur.count;
                    break;
                case 'allLesserSum':
                    needSum = cur.allLesserSum;
                    break;
                case 'val':
                    needSum = typeof cur.val === 'number' ? cur.val : 0;
                    break;
                default:
                    needSum = cur.id;
                    break;
            }
            sum += needSum;
            if (!cur.left && !cur.right) return;
            cur.left && _traverse(cur.left);
            cur.right && _traverse(cur.right);
        }

        subTreeRoot && _traverse(subTreeRoot);

        return sum;
    }
}

export class BinaryTreeNode<T> {
    protected _id: BinaryTreeNodeId;
    public get id(): BinaryTreeNodeId {
        return this._id;
    }

    public set id(v: BinaryTreeNodeId) {
        this._id = v;
    }

    protected _val: T;
    public get val(): T {
        return this._val;
    }

    public set val(v: T) {
        this._val = v;
    }

    protected _left?: BinaryTreeNode<T> | null;
    public get left(): BinaryTreeNode<T> | null | undefined {
        return this._left;
    }

    public set left(v: BinaryTreeNode<T> | null | undefined) {
        if (v) {
            v.parent = this;
            v.familyPosition = 1;
        }
        this._left = v;
    }

    protected _right?: BinaryTreeNode<T> | null;
    public get right(): BinaryTreeNode<T> | null | undefined {
        return this._right;
    }

    public set right(v: BinaryTreeNode<T> | null | undefined) {
        if (v) {
            v.parent = this;
            v.familyPosition = 2;
        }
        this._right = v;
    }

    protected _parent: BinaryTreeNode<T> | null | undefined = undefined;
    public get parent(): BinaryTreeNode<T> | null | undefined {
        return this._parent;
    }

    public set parent(v: BinaryTreeNode<T> | null | undefined) {
        this._parent = v;
    }

    protected _familyPosition: FamilyPosition = 0;
    public get familyPosition(): FamilyPosition {
        return this._familyPosition;
    }

    public set familyPosition(v: FamilyPosition) {
        this._familyPosition = v;
    }

    protected _count = 1;
    public get count(): number {
        return this._count;
    }

    public set count(v: number) {
        this._count = v;
    }

    protected _height = 0;

    public get height(): number {
        return this._height;
    }

    public set height(v: number) {
        this._height = v;
    }

    protected _allLesserSum = 0;
    public get allLesserSum(): number {
        return this._allLesserSum;
    }

    public set allLesserSum(v: number) {
        this._allLesserSum = v;
    }

    constructor(id: BinaryTreeNodeId, val: T, count?: number) {
        if (count === undefined) {
            count = 1;
        }
        this._id = id;
        this._val = val;
        this._count = count;
    }

    replaceLocation(replaceNode: BinaryTreeNode<T>): boolean {
        this._id = replaceNode.id;
        this._val = replaceNode.val;
        this._count = replaceNode.count;
        this._allLesserSum = replaceNode.allLesserSum;
        this._height = replaceNode.height;
        return true;
    }

    swapLocation(swapNode: BinaryTreeNode<T>): BinaryTreeNode<T> {
        const {val, count, height, allLesserSum} = swapNode;
        const tempNode = new BinaryTreeNode<T>(swapNode.id, val);
        tempNode.val = val;
        tempNode.count = count;
        tempNode.height = height;
        tempNode.allLesserSum = allLesserSum;

        swapNode.id = this._id;
        swapNode.val = this._val;
        swapNode.count = this._count;
        swapNode.height = this._height;
        swapNode.allLesserSum = this._allLesserSum;

        this._id = tempNode.id;
        this._val = tempNode.val;
        this._count = tempNode.count;
        this._height = tempNode.height;
        this._allLesserSum = tempNode.allLesserSum;
        return swapNode;
    }

    clone(): BinaryTreeNode<T> {
        return new BinaryTreeNode<T>(this._id, this._val, this._count);
    }
}

export class BinaryTree<T> extends AbstractBinaryTree<T> {
    constructor()
    constructor(nodeOrData: T[], allowDuplicate?: boolean)
    constructor(nodeOrData: BinaryTreeNode<T>, allowDuplicate?: boolean)
    constructor(nodeOrData: BinaryTreeNodeParam<T>, allowDuplicate?: boolean)
    constructor(nodeOrData?: BinaryTreeNodeParam<T> | BinaryTreeNode<T> | T[], allowDuplicate?: boolean) {
        super();
        if (nodeOrData !== undefined) {
            if (Array.isArray(nodeOrData)) {
                super(nodeOrData, allowDuplicate); // Typescript requires code logic to judge the parameters and then call the parent class constructor.
            } else if (nodeOrData.id) {
                super(nodeOrData, allowDuplicate); // Typescript requires code logic to judge the parameters and then call the parent class constructor.
            }
        }
    }

    createNode(id: BinaryTreeNodeId, val: T | null, count?: number): BinaryTreeNode<T> | null {
        return val !== null ? new BinaryTreeNode(id, val, count) : null;
    }
}
