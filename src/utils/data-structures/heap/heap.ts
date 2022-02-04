// Online Algorithms use Heap (e.g. Top K problems)
// Offline Algorithms use sort
export type HeapDFSOrderPattern = 'pre' | 'in' | 'post';

export interface HeapOptions<T> {
    nodes?: T[];
    comparator: (i: T, j: T) => number;
}

export class Heap<T> {
    protected _nodes: T[] = [];
    protected _comparator: (a: T, b: T) => number;

    constructor(options: HeapOptions<T>) {
        const {nodes, comparator} = options;
        this._comparator = comparator;

        if (nodes && nodes instanceof Array && nodes.length > 0) {
            // TODO support distinct
            this._nodes = Array.isArray(nodes) ? [...nodes] : [];
            this._fix();
        }
    }

    protected _compare(parentIndex: number, childIndex: number): boolean {
        return this._comparator(this._nodes[parentIndex], this._nodes[childIndex]) > 0;
    }

    protected _shouldSwap(parentIndex: number, childIndex: number) {
        if (!this._isParentIndex(parentIndex)) return false;
        if (!this._isChildIndex(childIndex)) return false;
        return this._compare(parentIndex, childIndex);
    }

    protected _isValidIndex(index: number): boolean {
        return index > -1 && index < this.size;
    }

    protected _isParentIndex(index: number) {
        return index >= 0 && index < this.size - 1;
    }

    protected _isChildIndex(index: number): boolean {
        return index >= 1 && index <= this.size - 1;
    }

    protected _getParentIndex(childIndex: number): number {
        const parentIndex = Math.floor((childIndex - 1) / 2);
        return this._isParentIndex(parentIndex) ? parentIndex : -1;
    }

    protected _getLeftChildIndex(parentIndex: number): number {
        const leftChildIndex = parentIndex * 2 + 1;
        return this._isChildIndex(leftChildIndex) ? leftChildIndex : -1;
    }

    protected _getRightChildIndex(parentIndex: number): number {
        const rightChildIndex = parentIndex * 2 + 2;
        return this._isChildIndex(rightChildIndex) ? rightChildIndex : -1;
    }

    protected _getComparedChild(parentIndex: number): number {
        if (!this._hasLeftChild(parentIndex) && !this._hasRightChild(parentIndex)) return -1;
        const leftChildIndex = this._getLeftChildIndex(parentIndex),
            rightChildIndex = this._getRightChildIndex(parentIndex);
        if (!this._hasLeftChild(parentIndex)) return rightChildIndex;
        if (!this._hasRightChild(parentIndex)) return leftChildIndex;
        return this._compare(leftChildIndex, rightChildIndex) ? rightChildIndex : leftChildIndex;
    }

    protected _hasParent(childIndex: number): boolean {
        return this._getParentIndex(childIndex) > -1;
    }

    protected _hasLeftChild(parentIndex: number) {
        return this._getLeftChildIndex(parentIndex) !== -1;
    }

    protected _hasRightChild(parentIndex: number) {
        return this._getRightChildIndex(parentIndex) !== -1;
    }

    protected _swap(i: number, j: number) {
        [this._nodes[i], this._nodes[j]] = [this._nodes[j], this._nodes[i]];
    }

    heapifyUp(startingIndex: number): number {
        let childIndex = startingIndex;
        let parentIndex = this._getParentIndex(childIndex);
        while (this._shouldSwap(parentIndex, childIndex)) {
            this._swap(parentIndex, childIndex);
            childIndex = parentIndex;
            parentIndex = this._getParentIndex(childIndex);
        }
        return childIndex;
    }

    heapifyDown(startingIndex: number): number {
        let parentIndex = startingIndex;
        let childIndex = this._getComparedChild(parentIndex);
        while (this._shouldSwap(parentIndex, childIndex)) {
            this._swap(parentIndex, childIndex);
            parentIndex = childIndex;
            childIndex = this._getComparedChild(parentIndex);
        }
        return parentIndex;
    }

    insert(node: T): void {
        // TODO may bugs exist for priorities
        this._nodes.push(node);
        this.heapifyUp(this._nodes.length - 1);
    }

    poll(): T | undefined {
        // TODO after no-non-null-assertion not ensure the logic
        let res: T | undefined = undefined;
        if (this.size > 1) {
            this._swap(0, this._nodes.length - 1);
            res = this._nodes.pop();
            this.heapifyDown(0);
        } else {
            if (this.size === 1) {
                res = this._nodes.pop();
            }
        }
        return res;
    }

    peek(): T | undefined {
        return this._isValidIndex(0) ? this._nodes[0] : undefined;
    }

    leaf(): T | undefined {
        return this._isValidIndex(this.size - 1) ? this._nodes[this.size - 1] : undefined;
    }

    get size(): number {
        return this._nodes.length;
    }

    isEmpty() {
        return this.size === 0;
    }

    clear() {
        this._nodes = [];
    }

    protected _fix() {
        for (let i = Math.floor(this.size / 2); i > -1; i--) {
            this.heapifyDown(i);
        }
    }

    // --- start additional functions
    static heapify<T>(options: HeapOptions<T>) {
        const heap = new Heap(options);
        heap._fix();
        return heap;
    }


    clone(): Heap<T> {
        return new Heap<T>({nodes: this._nodes, comparator: this._comparator});
    }

    toArray(): T[] {
        return this._nodes;
    }

    isValid(): boolean {
        const isValidRecursive = (parentIndex: number): boolean => {
            let isValidLeft = true;
            let isValidRight = true;

            if (this._hasLeftChild(parentIndex)) {
                const leftChildIndex = (parentIndex * 2) + 1;
                if (!this._compare(parentIndex, leftChildIndex)) return false;
                isValidLeft = isValidRecursive(leftChildIndex);
            }

            if (this._hasRightChild(parentIndex)) {
                const rightChildIndex = (parentIndex * 2) + 2;
                if (!this._compare(parentIndex, rightChildIndex)) return false;
                isValidRight = isValidRecursive(rightChildIndex);
            }

            return isValidLeft && isValidRight;
        };

        return isValidRecursive(0);
    }

    sort(): T[] {
        const visitedNode: T[] = [];
        while (!this.isEmpty()) {
            const top = this.poll();
            if (top) {
                visitedNode.push(top);
            }
        }

        return visitedNode;
    }

    DFS(dfsMode: HeapDFSOrderPattern): T[] {
        const visitedNode: T[] = [];

        const _traverse = (cur: number) => {
            const leftChildIndex = cur * 2 + 1;
            const rightChildIndex = cur * 2 + 2;
            switch (dfsMode) {
                case 'in':
                    if (this._isValidIndex(leftChildIndex)) _traverse(leftChildIndex);
                    visitedNode.push(this._nodes[cur]);
                    if (this._isValidIndex(rightChildIndex)) _traverse(rightChildIndex);
                    break;
                case 'pre':
                    visitedNode.push(this._nodes[cur]);
                    if (this._isValidIndex(leftChildIndex)) _traverse(leftChildIndex);
                    if (this._isValidIndex(rightChildIndex)) _traverse(rightChildIndex);
                    break;
                case 'post':
                    if (this._isValidIndex(leftChildIndex)) _traverse(leftChildIndex);
                    if (this._isValidIndex(rightChildIndex)) _traverse(rightChildIndex);
                    visitedNode.push(this._nodes[cur]);
                    break;
            }

        };

        this._isValidIndex(0) && _traverse(0);
        return visitedNode;
    }

    // --- end additional functions
}

class MinHeap {
    nodes: number[] = [];

    private getParentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }


    private compare(parentIndex: number, childIndex: number): boolean {
        const {nodes} = this;
        return nodes[parentIndex] < nodes[childIndex];
    }

    private shouldSwap(parentIndex: number, childIndex: number): boolean {
        const {nodes} = this;
        return nodes[parentIndex] !== undefined && nodes[childIndex] !== undefined && this.compare(parentIndex, childIndex);
    }

    private swap(i: number, j: number) {
        const {nodes} = this;
        [nodes[i], nodes[j]] = [nodes[j], nodes[i]];
    }

    private heapifyUp(childIndex: number) {
        let parentIndex = this.getParentIndex(childIndex);
        while (this.shouldSwap(parentIndex, childIndex)) {
            this.swap(parentIndex, childIndex);
            childIndex = parentIndex;
            parentIndex = this.getParentIndex(childIndex);
        }
    }

    insert(val: number) {
        const {nodes} = this;
        nodes.push(val);
        this.heapifyUp(nodes.length - 1);
    }

    peek(): number | undefined {
        return this.nodes[0];
    }

    get size(): number {
        return this.nodes.length;
    }
}
