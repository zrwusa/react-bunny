import {MaxHeap, MinHeap} from 'data-structure-typed';

export const testHeap = () => {
    const minNumHeap = new MinHeap<number>();
    minNumHeap.offer(1);
    minNumHeap.offer(6);
    minNumHeap.offer(2);
    minNumHeap.offer(0);
    minNumHeap.offer(5);
    minNumHeap.offer(9);
    console.log('poll 0', minNumHeap.poll());
    console.log('poll 1', minNumHeap.poll());
    console.log('peek 2', minNumHeap.peek());
    console.log('toArray', minNumHeap.toArray());
    console.log('minNumHeap', minNumHeap);

    // const minStringHeap= new MinPriorityQueue<string>();
    // minStringHeap.offer('1');
    // minStringHeap.offer('6');
    // minStringHeap.offer('2');
    // minStringHeap.offer('0');
    // minStringHeap.poll();
    // console.log(minStringHeap.front());
    // console.log(minStringHeap.toArray());


    const minHeap = new MinHeap<{ a: string }>();
    console.log('offer a1', minHeap.offer({a: 'a1'}, 1));
    console.log('offer a6', minHeap.offer({a: 'a6'}, 6));
    console.log('offer a2', minHeap.offer({a: 'a2'}, 2));
    console.log('offer a0', minHeap.offer({a: 'a0'}, 0));

    console.log('minHeap', minHeap);
    console.log('peek a0', minHeap.peek());
    console.log('toArray', minHeap.toArray());
    while (minHeap.size > 0) console.log(minHeap.poll());


    const maxHeap = new MaxHeap<{ a: string }>();
    console.log('offer a1', maxHeap.offer({a: 'a1'}, 1));
    console.log('offer a6', maxHeap.offer({a: 'a6'}, 6));
    console.log('offer a5', maxHeap.offer({a: 'a5'}, 5));
    console.log('offer a2', maxHeap.offer({a: 'a2'}, 2));
    console.log('offer a0', maxHeap.offer({a: 'a0'}, 0));
    console.log('offer a9', maxHeap.offer({a: 'a9'}, 9));
    console.log('peek a9', maxHeap.peek());
    console.log('toArray', maxHeap.toArray());
    while (maxHeap.size > 0) console.log(maxHeap.poll());
};
