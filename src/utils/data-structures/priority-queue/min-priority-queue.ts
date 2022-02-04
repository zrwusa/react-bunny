/**
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */
import {PriorityQueue, PriorityQueueItem, PriorityQueueOptions} from './priority-queue';
import {Heap} from '../heap';


/**
 * @class MinPriorityQueue
 * @extends PriorityQueue
 */
export class MinPriorityQueue<T> extends PriorityQueue<T> {
    protected _heap: Heap<PriorityQueueItem<T>>;

    constructor(options?: PriorityQueueOptions<T>) {
        super(options);
        this._heap = new Heap({
            comparator: (a, b) => {
                return a.priority - b.priority;
            }
        });
    }
}


