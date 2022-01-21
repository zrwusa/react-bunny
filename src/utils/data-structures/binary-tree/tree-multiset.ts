import {BST, BSTNode, I_BST} from './bst';
import {BinaryTreeNodeId} from './binary-tree';

export type TreeMultiSetDeletedResult<T> = { deleted: BSTNode<T> | null, needBalanced: BSTNode<T> | null };


export class TreeMultiSet<T> extends BST<T> implements I_BST<T> {
    createNode(id: BinaryTreeNodeId, val: T, count?: number): BSTNode<T> {
        return new BSTNode<T>(id, val, count);
    }

    insert(id: BinaryTreeNodeId, val: T | null, count?: number): BSTNode<T> | null {
        const inserted = super.insert(id, val, count);
        return inserted;
    }

    remove(id: BinaryTreeNodeId, isUpdateAllLeftSum?: boolean): TreeMultiSetDeletedResult<T>[] {
        const deletedResults = super.remove(id, isUpdateAllLeftSum);
        return deletedResults;
    }
}


