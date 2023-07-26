import {BSTNode} from 'data-structure-typed';
import type {BinaryTreeNodeId} from './binary-tree';

export type BSTComparator = (a: BinaryTreeNodeId, b: BinaryTreeNodeId) => number;
export type BSTDeletedResult<T> = { deleted: BSTNode<T> | null, needBalanced: BSTNode<T> | null };
