/**
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

import {PriorityQueue, PriorityQueueItem, PriorityQueueOptions} from './priority-queue';
import {Heap} from '../heap';

/**
 * @class MaxPriorityQueue
 * @extends PriorityQueue
 */
export class MaxPriorityQueue<T> extends PriorityQueue<T> {
    protected _heap: Heap<PriorityQueueItem<T>>;

    constructor(options?: PriorityQueueOptions<T>) {
        super(options);
        this._heap = new Heap<PriorityQueueItem<T>>({comparator: (a, b) => b.priority - a.priority});
    }
}
