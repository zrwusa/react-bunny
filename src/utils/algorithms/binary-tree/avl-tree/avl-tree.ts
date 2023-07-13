import {AVLTree} from 'data-structure-typed';
import {runAlgorithm} from '../../helpers';
import {DeepProxy, TProxyHandler} from '@qiwi/deep-proxy';
import {wait, WaitManager} from '../../../utils';
import {testBSTCase1} from '../bst';
import {testAVLCase6} from './cases';

const avlTree = new AVLTree<number>();

export const performanceAVLTree = () => {
    for (let i = 0; i < 1e+5; i++) {
        avlTree.put(i, i);
    }
};

export const performanceAVLTreeIsBST = () => {
    return avlTree.isBST();
};

const waitManager = new WaitManager(10);
const {time1} = waitManager;

export const testAVLTree = async (arr: number[], proxyHandler?: TProxyHandler) => {
    const clonedData = [...arr];
    const proxyVariables = new DeepProxy({
        tree: new AVLTree<number>({
            // nodeOrData: {
            //     id: clonedData[0],
            //     val: clonedData[0]
            // },
            // loopType: LoopType.recursive,
            // comparator: (a, b) => b - a
        })
    }, proxyHandler);


    for (const i of clonedData) {
        proxyVariables.tree.put(i, i);
        await wait(time1);
    }

    await testAVLCase6(proxyVariables);

    return proxyVariables.tree;
};

export const runTestAVLTree = async () => {
    await runAlgorithm(testAVLTree, false, testBSTCase1);
};

// runTestAVLTree().then();
