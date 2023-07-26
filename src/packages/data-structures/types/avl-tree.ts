import {AVLTreeNode} from 'data-structure-typed';

export interface AVLTreeDeleted<T> {
    deleted: AVLTreeNode<T> | null;
    needBalanced: AVLTreeNode<T> | null;
}