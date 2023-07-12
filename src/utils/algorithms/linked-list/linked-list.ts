/* --- start Linked List ---*/
// 2	Add Two Numbers	★★	445							traversal
// 24	Swap Nodes in Pairs	★★								reverse
// 206	Reverse Linked List	★★								reverse
// 141	Linked List Cycle	★★	142							fast/slow
// 23	Merge k Sorted Lists	★★★	21							priority_queue / mergesort
// 147	Insertion Sort List	★★★								insertion sort
// 148	Sort List	★★★★								merge sort O(1) space
// 707	Design Linked List	★★★★

//206. Reverse Linked List
import {SinglyLinkedListNode} from '../../data-structures/linked-list';
import {DeepProxy, TProxyHandler} from '@qiwi/deep-proxy';
import {wait} from '../../utils';

export type ReverseLinkedListVariables = {
    pre: SinglyLinkedListNode | null
}

export async function reverseLinkedList(head: SinglyLinkedListNode | null, proxyHandler: TProxyHandler): Promise<SinglyLinkedListNode | null> {
    const pre = null;
    const variables: ReverseLinkedListVariables = {
        pre: null
    };
    const variablesProxy = new DeepProxy<ReverseLinkedListVariables>(variables, proxyHandler);
    while (head) {
        await wait(500);
        const next = head.next;
        head.next = variablesProxy.pre;
        variablesProxy.pre = head;
        head = next;
    }
    return pre;
}

/* --- end Linked List ---*/
