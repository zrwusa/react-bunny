import {BSTNode} from 'data-structure-typed';

export type TreeMultiSetDeletedResult<T> = { deleted: BSTNode<T> | null, needBalanced: BSTNode<T> | null };
