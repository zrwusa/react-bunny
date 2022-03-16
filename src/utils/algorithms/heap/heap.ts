/* --- start heap --- */
// 215. Kth Largest Element in an Array ★★★★
// O(nLog(k))
import {runAlgorithm} from '../helpers';
import {
    findKthLargestCase1,
    findKthLargestCase2,
    findKthLargestCase3,
    findKthLargestCase9,
    mergeKListsCase1,
    mergeKListsCase2,
    reorganizeStringCase1,
    topKFrequentCase1
} from './cases';
import {SinglyLinkedListNode} from '../../data-structures/linked-list';
import {Heap} from '../../data-structures/heap/heap';

export function findKthLargestMinHeap(nums: number[], k: number): number {
    const heap = new Heap<number>({nodes: [], comparator: (a, b) => a - b});
    for (const i of nums) {
        // TODO after no-non-null-assertion not ensure the logic
        const peek = heap.peek();
        if (peek) {
            if (heap.size < k || i >= peek) {
                heap.insert(i);
            }
        }

        if (heap.size > k) {
            heap.poll();
        }
    }
    const peek = heap.peek();
    if (peek) {
        return peek;
    } else {
        return NaN;
    }
}

const runAllFindKthLargest = async () => {
    await runAlgorithm(findKthLargestMinHeap, false, findKthLargestCase1);
    await runAlgorithm(findKthLargestMinHeap, false, findKthLargestCase2);
    await runAlgorithm(findKthLargestMinHeap, false, findKthLargestCase3);
    await runAlgorithm(findKthLargestMinHeap, false, findKthLargestCase9);
};

// runAllFindKthLargest().then();

//23. Merge k Sorted Lists
function mergeKLists(lists: SinglyLinkedListNode[]): SinglyLinkedListNode | null {
    // TODO dev tools was disconnected issue
    const heap = new Heap<SinglyLinkedListNode>({nodes: [], comparator: (a, b) => a.value - b.value});
    for (const l of lists) {
        if (l) {
            heap.insert(l.value);
        }
    }
    if (heap.size < 1) {
        return null;
    }
    // TODO after no-non-null-assertion not ensure the logic
    const polled = heap.poll();
    const ans: SinglyLinkedListNode | null = polled ? polled : null;
    if (ans) {
        ans.prev = null;
        if (ans.next) {
            heap.insert(ans.next);
        }
        let prev: SinglyLinkedListNode = ans;
        while (!heap.isEmpty()) {
            // TODO after no-non-null-assertion not ensure the logic
            const polled = heap.poll();
            const cur = polled ? polled : null;
            if (cur) {
                cur.prev = prev;
                prev.next = cur;
                prev = prev.next;
                if (cur.next) {
                    heap.insert(cur.next.value);
                }
            }
        }

    }
    return ans;
}

const runAllMergeKLists = async () => {
    await runAlgorithm(mergeKLists, false, mergeKListsCase1);
    await runAlgorithm(mergeKLists, false, mergeKListsCase2);
};

// runAllMergeKLists().then();

//347. Top K Frequent Elements
function topKFrequent(nums: number[], k: number): number[] {
    const hash: Map<number, number> = new Map<number, number>();
    for (const num of nums) {
        if (hash.has(num)) {
            const val = hash.get(num);
            if (val !== undefined) {
                hash.set(num, val + 1);
            }
        } else {
            hash.set(num, 1);
        }
    }

    const minHeap = new Heap<[number, number]>({nodes: [], comparator: (a, b) => a[1] - b[1]});

    for (const entry of hash) {
        if (minHeap.size < k) {
            minHeap.insert(entry);
        } else if (minHeap.size === k) {
            const peek = minHeap.peek();
            // TODO after no-non-null-assertion not ensure the logic
            if (peek) {
                if (peek[1] < entry[1]) {
                    minHeap.poll();
                    minHeap.insert(entry);
                }
            }
        }

    }

    return minHeap.toArray().map(item => {
        // TODO after no-non-null-assertion not ensure the logic
        if (item) {
            return item[0];
        } else {
            return NaN;
        }
    });
}

function topKFrequentByBucket(nums: number[], k: number): number[] {
    const hash: Map<number, number> = new Map<number, number>();
    let maxFrequency = 1;
    for (const num of nums) {
        if (hash.has(num)) {
            const val = hash.get(num);
            if (val !== undefined) {
                if (val + 1 > maxFrequency) maxFrequency = val + 1;
                hash.set(num, val + 1);
            }
        } else {
            hash.set(num, 1);
        }
    }

    const buckets = new Array<number[]>(maxFrequency + 1);
    for (let i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }

    for (const entry of hash) {
        buckets[entry[1]].push(entry[0]);
    }

    let ans: number[] = [];
    while (ans.length < k) {
        const bucket = buckets.pop();
        if (bucket && bucket.length > 0) {
            ans = ans.concat(bucket);
        }
    }
    return ans;
}

const runAllTopKFrequent = async () => {
    await runAlgorithm(topKFrequent, false, topKFrequentCase1);
    await runAlgorithm(topKFrequentByBucket, false, topKFrequentCase1);
};

// runAllTopKFrequent().then();
//253
//295. Find Median from Data Stream  ★★★★
class MedianFinder {
    private _leftHeap: Heap<number>;
    private _rightHeap: Heap<number>;

    constructor() {
        this._leftHeap = new Heap<number>({nodes: [], comparator: (a, b) => b - a});
        this._rightHeap = new Heap<number>({nodes: [], comparator: (a, b) => a - b});
    }

    addNum(num: number): void {
        if (this._leftHeap.size === 0) {
            this._leftHeap.insert(num);
        } else {
            const leftPeek = this._leftHeap.peek();
            if (leftPeek !== undefined) {
                if (num > leftPeek) {
                    this._rightHeap.insert(num);
                } else {
                    this._leftHeap.insert(num);
                }
            }
        }
        const leftSize = this._leftHeap.size;
        const rightSize = this._rightHeap.size;
        if (leftSize - rightSize >= 2) {
            // TODO after no-non-null-assertion not ensure the logic
            const leftPolled = this._leftHeap.poll();
            if (leftPolled) {
                this._rightHeap.insert(leftPolled);
            }
        } else if (rightSize > leftSize) {
            // TODO after no-non-null-assertion not ensure the logic
            const rightPolled = this._rightHeap.poll();
            if (rightPolled) {
                this._leftHeap.insert(rightPolled);
            }
        }
    }

    findMedian(): number {
        const leftSize = this._leftHeap.size;
        const rightSize = this._rightHeap.size;
        // TODO after no-non-null-assertion not ensure the logic
        const leftPeek = this._leftHeap.peek();
        const rightPeek = this._rightHeap.peek();
        if (leftSize > rightSize) {
            if (leftPeek) {
                return leftPeek;
            } else {
                return NaN;
            }
        } else {
            if (leftPeek && rightPeek) {
                return (leftPeek + rightPeek) / 2;
            } else {
                return NaN;
            }
        }
    }
}

function medianFind() {
    const medianFinder = new MedianFinder();
    medianFinder.addNum(-1);
    console.log(medianFinder.findMedian());
    medianFinder.addNum(-2);
    console.log(medianFinder.findMedian());
    medianFinder.addNum(-3);
    console.log(medianFinder.findMedian());
    medianFinder.addNum(-4);
    console.log(medianFinder.findMedian());
    medianFinder.addNum(-5);
    console.log(medianFinder.findMedian());
}

const runAllMedianFind = async () => {
    await runAlgorithm(medianFind, false);
};

// runAllMedianFind().then();

// 767. Reorganize String
function reorganizeString(s: string): string {
    const hash: Map<string, number> = new Map<string, number>();
    for (const char of s) {
        if (hash.has(char)) {
            let count = hash.get(char);
            if (count) {
                hash.set(char, ++count);
            }
        } else {
            hash.set(char, 1);
        }
    }

    const heap = new Heap<[string, number]>({comparator: (a, b) => b[1] - a[1]});

    for (const entry of hash) {
        heap.insert(entry);
    }
    let ans = '';
    // TODO after no-non-null-assertion not ensure the logic
    const peek = heap.peek();
    const peekVal = peek ? peek : null;
    if (peek && peekVal) {
        if (peekVal[1] <= Math.ceil(s.length / 2)) {
            const conveyor: string[][] = [];
            // TODO after no-non-null-assertion not ensure the logic
            const polled = heap.poll();
            if (polled) {
                for (let i = 0; i < polled[1]; i++) {
                    const polledVal = polled;
                    // TODO after no-non-null-assertion not ensure the logic
                    if (polledVal) {
                        conveyor.push([polledVal[0]]);
                    }
                }
            }
            let processCount = 0;
            while (heap.size > 0) {
                const polled1 = heap.poll();
                if (polled1) {
                    const count = polled1[1];
                    for (let j = 0; j < count; j++) {
                        processCount++;
                        // TODO after no-non-null-assertion not ensure the logic
                        const cur = conveyor.shift();
                        if (cur !== undefined) {
                            const polled1Val = polled1;
                            if (polled1Val) {
                                cur.push(polled1Val[0]);
                            }
                            conveyor.push(cur);
                        }
                    }
                }

            }
            const needOrderedCount = conveyor.length - processCount % conveyor.length;

            for (let m = 0; m < needOrderedCount; m++) {
                // TODO after no-non-null-assertion not ensure the logic
                const conveyorShifted = conveyor.shift();
                if (conveyorShifted !== undefined) {
                    conveyor.push(conveyorShifted);
                }
            }
            ans = conveyor.join().replaceAll(',', '');
        }
    }

    return ans;
}

const runAllReorganizeString = async () => {
    await runAlgorithm(reorganizeString, false, reorganizeStringCase1);
};

// runAllReorganizeString().then();

// 703. Kth Largest Element in a Stream
class KthLargest {
    private _heap: Heap<number>;
    private readonly _k: number;

    constructor(k: number, nums: number[]) {
        this._k = k;
        this._heap = new Heap<number>({nodes: nums, comparator: (a, b) => a - b});
        while (this._heap.size > k) {
            this._heap.poll();
        }
    }

    add(val: number): number {
        const size = this._heap.size;
        if (size < this._k) {
            this._heap.insert(val);

        } else if (size === this._k) {
            // TODO after no-non-null-assertion not ensure the logic
            const peek = this._heap.peek();
            if (peek && val > peek) {
                this._heap.poll();
                this._heap.insert(val);
            }

        }
        // TODO after no-non-null-assertion not ensure the logic
        return this._heap.peek() || NaN;
    }
}

const testKthLargest = () => {
    const kthLargest = new KthLargest(3, [4, 5, 8, 2]);
    console.log('kthLargest.add(3)', kthLargest.add(3));
    console.log('kthLargest.add(5)', kthLargest.add(5));
    console.log('kthLargest.add(10)', kthLargest.add(10));
    console.log('kthLargest.add(9)', kthLargest.add(9));
    console.log('kthLargest.add(4)', kthLargest.add(4));
};

const runAllKthLargest = async () => {
    await runAlgorithm(testKthLargest, false);
};

// runAllKthLargest().then();

const testHeap1 = () => {
    const minHeap = new Heap<number>({nodes: [5, 2, 3, 4, 6, 1], comparator: (a, b) => a - b});
    console.log(minHeap.toArray());
    console.log(minHeap.toArray());
    console.log(minHeap.peek());
    minHeap.poll();
    minHeap.poll();
    minHeap.poll();
    console.log(minHeap.toArray());
    console.log(Heap.heapify({nodes: [3, 2, 1, 5, 6, 7, 8, 9, 10], comparator: (a, b) => a - b}).toArray());
    return;
};

const testHeap2 = () => {
    // const maxHeap = new MaxHeap<number>([5, 2, 3, 4, 6, 1]);
    const maxHeap = new Heap<number>({nodes: [5, 2, 3, 4, 6, 1], comparator: (a, b) => b - a});
    console.log(maxHeap.toArray());
    console.log(maxHeap.toArray());
    console.log(maxHeap.peek());
    maxHeap.poll();
    maxHeap.poll();
    maxHeap.poll();
    console.log(maxHeap.toArray());
    console.log(Heap.heapify({nodes: [3, 2, 1, 5, 6, 7, 8, 9, 10], comparator: (a, b) => a - b}).toArray());
};

class HeapNode {
    val: {
        a: string
    };

    constructor(val: { a: string }) {
        this.val = val;
    }
}

const testHeap3 = () => {
    const heapSortTest = new Heap<number>({nodes: [2, 5, 8, 3, 1, 6, 7, 4], comparator: (a, b) => a - b});
    const sorted = heapSortTest.clone().sort();
    console.log('sorted', sorted, heapSortTest);
    console.log('DFS inOrder default', heapSortTest.DFS('in'));
    console.log('DFS inOrder id', heapSortTest.DFS('post'));
    console.log('DFS preOrder val', heapSortTest.DFS('pre'));
};

// const runAllTestHeap = async () => {
//     await runAlgorithm(testHeap1, false);
//     await runAlgorithm(testHeap2, false);
//     await runAlgorithm(testHeap3, false);
// }

// runAllTestHeap().then()

export const testHeap = () => {
    const minHeap = new Heap({nodes: [3, 2, 4, 5, 1, 9], comparator: (a, b) => a - b});
    console.log(minHeap.sort());
    console.log(minHeap.sort());
    const maxHeap = new Heap({nodes: [3, 2, 4, 5, 1, 9], comparator: (a, b) => b - a});
    console.log(maxHeap.sort());
    console.log(maxHeap.sort());
};
/* --- end heap --- */

// 378. Kth Smallest Element in a Sorted Matrix
function kthSmallest(matrix: number[][], k: number): number {
    const minHeap = new Heap<{ val: number, y: number, x: number }>({comparator: (a, b) => a.val - b.val});

    minHeap.insert({val: matrix[0][0], y: 0, x: 0});

    while (--k > 0) {
        const polled = minHeap.poll();
        if (!polled) {
            continue;
        }

        const {y, x} = polled;

        if (y < matrix.length - 1 && matrix[y + 1][x] !== Infinity) {
            minHeap.insert({val: matrix[y + 1][x], y: y + 1, x});
            matrix[y + 1][x] = Infinity;
        }

        if (x < matrix[0].length - 1 && matrix[y][x + 1] !== Infinity) {
            minHeap.insert({val: matrix[y][x + 1], y, x: x + 1});
            matrix[y][x + 1] = Infinity;
        }
    }

    return minHeap.peek()?.val || 0;
}
