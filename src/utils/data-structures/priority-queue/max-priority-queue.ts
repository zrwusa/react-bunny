/**
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

import {HeapNode, MaxHeap} from '../heap';
import {PriorityQueue, PriorityQueueOptions} from './priority-queue';

/**
 * @class MaxPriorityQueue
 * @extends PriorityQueue
 */
export class MaxPriorityQueue<T> extends PriorityQueue<T> {
    protected _heap: MaxHeap<HeapNode<T>, T>;

    constructor(options?: PriorityQueueOptions<T>) {
        super(options);
        this._heap = new MaxHeap();
    }
}
