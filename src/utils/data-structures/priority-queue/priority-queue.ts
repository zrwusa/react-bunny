import {Heap} from '../heap';

export interface PriorityQueueOptions<T> {
    priority?: (element: T) => number;
}

export interface PriorityQueueItem<T> {
    priority: number;
    element: T | null;
}


/**
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 *
 * @abstract
 * @class PriorityQueue
 */
export abstract class PriorityQueue<T> {
    protected abstract _heap: Heap<PriorityQueueItem<T>>;
    protected _priorityCb: (element: T) => number;

    /**
     * Creates a priority queue
     * @public
     * @params {object} [options]
     */
    protected constructor(options?: PriorityQueueOptions<T>) {
        if (options) {
            const {priority} = options;
            if (priority !== undefined && typeof priority !== 'function') {
                throw new Error('.constructor expects a valid priority function');
            }
            this._priorityCb = priority || ((el) => +el);
        } else {
            this._priorityCb = (el) => +el;
        }
    }

    /**
     * @public
     * @returns {number}
     */
    get size(): number {
        return this._heap.size;
    }

    /**
     * @public
     * @returns {boolean}
     */
    isEmpty(): boolean {
        return this._heap.isEmpty();
    }

    /**
     * Returns an element with highest priority in the queue
     * @public
     * @returns {object}
     */
    front(): PriorityQueueItem<T> | null {
        const peek = this._heap.peek();
        if (!peek) {
            return null;
        }
        return peek;
    }

    /**
     * Returns an element with lowest priority in the queue
     * @public
     * @returns {object}
     */
    back(): PriorityQueueItem<T> | null {
        const leaf = this._heap.leaf();
        if (!leaf) {
            return null;
        }
        return leaf;
    }

    /**
     * Adds an element to the queue
     * @public
     * @param {any} element
     * @param priority
     * @throws {Error} if priority is not a valid number
     */
    enqueue(element: T, priority?: number): PriorityQueue<T> {
        if (typeof element === 'number') {
            priority = element;
        } else {
            if (priority === undefined) {
                throw new Error('.enqueue expects a numeric priority');
            }
        }

        if (priority && Number.isNaN(+priority)) {
            throw new Error('.enqueue expects a numeric priority');
        }

        if (Number.isNaN(+priority) && Number.isNaN(this._priorityCb(element))) {
            throw new Error(
                '.enqueue expects a numeric priority '
                + 'or a constructor callback that returns a number'
            );
        }

        const _priority = !Number.isNaN(+priority) ? priority : this._priorityCb(element);
        this._heap.insert({priority: _priority, element});
        return this;
    }

    /**
     * Removes and returns an element with highest priority in the queue
     * @public
     * @returns {object}
     */
    dequeue(): PriorityQueueItem<T> | null {
        const top = this._heap.poll();
        if (!top) {
            return null;
        }
        return top;
    }

    /**
     * Returns a sorted list of elements
     * @public
     * @returns {array}
     */
    toArray(): PriorityQueueItem<T>[] {
        return this._heap.toArray();
    }

    /**
     * Clears the queue
     * @public
     */
    clear(): void {
        this._heap.clear();
    }
}
