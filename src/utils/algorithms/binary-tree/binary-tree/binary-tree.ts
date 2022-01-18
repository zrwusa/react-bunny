import {DeepProxy, TProxyHandler} from '@qiwi/deep-proxy';
import {BinaryTree, BinaryTreeNode} from '../../../data-structures';
import {wait, WaitManager} from '../../../utils';
import {runAlgorithm} from '../../helpers';
import {pathSumIIICase3, testBSTCase1, testSymmetricTreeCase1} from '../bst';

const waitManager = new WaitManager(10);
const {time1, time2, time3} = waitManager;

export async function testBinaryTree(arr: number[], proxyHandler?: TProxyHandler) {
    const arrCopy = [...arr];
    const rest = arrCopy.splice(1);
    const proxyVariables: { binaryTree: BinaryTree<number> } = new DeepProxy({binaryTree: new BinaryTree<number>({
            idOrNode: arrCopy[0],val: arrCopy[0]
        })}, proxyHandler);

    for (const i of rest) {
        console.log(`insert ${i}`, proxyVariables.binaryTree.insert(i, i));
        await wait(time1);
    }

    const node6 = proxyVariables.binaryTree.getNode(6);
    console.log('getHeight(getNode 6)', node6 && proxyVariables.binaryTree.getHeight(node6));
    console.log('getDepth(getNode 6)', node6 && proxyVariables.binaryTree.getDepth(node6));
    await wait(time2);
    const getNodeById = proxyVariables.binaryTree.getNode(10, 'id');
    console.log('getNode, 10, id', getNodeById);

    await wait(time2);
    const getNodesByCount = proxyVariables.binaryTree.getNodes(1, 'count');
    console.log('getNodes, 1, count', getNodesByCount);

    await wait(time2);
    const getNodesByLeftSum = proxyVariables.binaryTree.getNodes(2, 'allLesserSum');
    console.log('getNodes, 2, allLesserSum', getNodesByLeftSum);

    await wait(time2);
    const node15 = proxyVariables.binaryTree.getNode(15);
    const subTreeSum = node15 && proxyVariables.binaryTree.subTreeSum(node15);
    console.log('subTreeSum, 15', subTreeSum);

    await wait(time3);
    console.log('DFS ,in, node', proxyVariables.binaryTree.DFS('in', 'node'));

    await wait(time1);
    console.log('DFSIterative, in', proxyVariables.binaryTree.DFSIterative('in'));

    await wait(time3);
    console.log('DFS ,pre, node', proxyVariables.binaryTree.DFS('pre', 'node'));

    await wait(time1);
    console.log('DFSIterative, pre', proxyVariables.binaryTree.DFSIterative('pre'));

    await wait(time1);
    console.log('levelIterative, node', proxyVariables.binaryTree.levelIterative(null, 'node'));

    await wait(time1);
    console.log('levelIterative, id', proxyVariables.binaryTree.levelIterative(null, 'id'));

    await wait(time1);
    console.log('levelIterative, val', proxyVariables.binaryTree.levelIterative(null, 'val'));

    await wait(time1);
    console.log('levelIterative, count', proxyVariables.binaryTree.levelIterative(null, 'count'));

    await wait(time1);
    console.log('levelIterative, allLesserSum', proxyVariables.binaryTree.levelIterative(null, 'allLesserSum'));

    await wait(time1);
    console.log('listLevels, node', proxyVariables.binaryTree.listLevels(null, 'node'));

    await wait(time1);
    console.log('listLevels, id', proxyVariables.binaryTree.listLevels(null, 'id'));

    await wait(time1);
    console.log('listLevels, val', proxyVariables.binaryTree.listLevels(null, 'val'));

    await wait(time1);
    console.log('listLevels, count', proxyVariables.binaryTree.listLevels(null, 'count'));

    await wait(time1);
    console.log('listLevels, allLesserSum', proxyVariables.binaryTree.listLevels(null, 'allLesserSum'));

    await wait(time1);
    console.log('morris, in, node', proxyVariables.binaryTree.morris('in', 'node'));

    await wait(time1);
    console.log('morris, pre', proxyVariables.binaryTree.morris('pre'));

    await wait(time1);
    console.log('morris, post', proxyVariables.binaryTree.morris('post'));

    await wait(time3);
    console.log('DFS ,post, node', proxyVariables.binaryTree.DFS('post', 'node'));

    await wait(time1);
    console.log('DFSIterative, post, node', proxyVariables.binaryTree.DFSIterative('post', 'node'));

    console.log('waiting for balancing');

    await wait(time3);

    await wait(time1);
    console.log('BFS', proxyVariables.binaryTree.BFS());

    await wait(time1);
    console.log('BFS, node', proxyVariables.binaryTree.BFS('node'));

    return proxyVariables.binaryTree;
}

const runTestBinaryTree = async () => {
    await runAlgorithm(testBinaryTree, false, ...testBSTCase1);
};

// runTestBinaryTree().then()
export async function testSymmetricTree(arr: Array<number | null>, proxyHandler?: TProxyHandler) {
    const arrCopy = [...arr];
    const rest = arrCopy.splice(1);
    const proxyVariables: { binaryTree: BinaryTree<number | null> } = new DeepProxy({binaryTree: new BinaryTree<number | null>(arrCopy)}, proxyHandler);

    // const binaryTree = new BinaryTree<number>(0, arrCopy[0]);
    // for (let i = 0; i < rest.length; i++) {
    //     proxyVariables.binaryTree.insert(i + 1, rest[i]);
    // }

    const root = proxyVariables.binaryTree.root;

    if (root) {
        return symmetricHelper(root.left, root.right);
    } else {
        return true;
    }

    function symmetricHelper(left: BinaryTreeNode<number | null> | null, right: BinaryTreeNode<number | null> | null): boolean {
        if (left === null && right === null) {
            return true;
        } else if (left === null || right === null) {
            return false;
        } else {
            return left.val === right.val && symmetricHelper(left.left, right.right) && symmetricHelper(left.right, right.left);
        }
    }


}

const runTestSymmetricTree = async () => {
    await runAlgorithm(testSymmetricTree, false, ...testSymmetricTreeCase1);
};

// runTestSymmetricTree().then();


// 543. Diameter of Binary Tree
function diameterOfBinaryTree(root: BinaryTreeNode<number> | null): number {
    let ans = 0;

    function dfs(cur: BinaryTreeNode<number> | null): number {
        if (!cur) {
            return 0;
        }
        const leftH = dfs(cur.left);
        const rightH = dfs(cur.right);
        ans = Math.max(leftH + rightH, ans);
        return Math.max(leftH, rightH) + 1;
    }

    dfs(root);
    return ans;
}

// 687. Longest Univalue Path
function longestUnivaluePath(root: BinaryTreeNode<number> | null): number {
    let ans = 0;

    function dfs(cur: BinaryTreeNode<number> | null, parentVal: number): number {
        if (!cur) {
            return 0;
        }
        const leftH = dfs(cur.left, cur.val || NaN);
        const rightH = dfs(cur.right, cur.val || NaN);
        ans = Math.max(leftH + rightH, ans);
        if (cur.val === parentVal) {
            return Math.max(leftH, rightH) + 1;
        } else {
            return 0;
        }

    }

    if (root) {
        dfs(root, root.val || NaN);
    }
    return ans;
}

// 337. House Robber III
function rob(root: BinaryTreeNode<number> | null): number {
    function dfs(cur: BinaryTreeNode<number> | null): [number, number] {
        if (!cur) {
            return [0, 0];
        }
        const maxArrLeft = dfs(cur.left);
        const maxArrRight = dfs(cur.right);

        return [
            Math.max(...maxArrLeft) + Math.max(...maxArrRight),
            maxArrLeft[0] + maxArrRight[0] + (cur.val || 0)
        ];

    }
    return Math.max(...dfs(root));
}

// 979. Distribute Coins in Binary Tree
function distributeCoins(root: BinaryTreeNode<number> | null): number {
    let ans = 0;

    function reqDFS(cur: BinaryTreeNode<number> | null): number {
        if (!cur) return 0;
        const cR = cur.val || 0 - 1;
        const lR = reqDFS(cur.left);
        const rR = reqDFS(cur.right);
        const totalR = cR + lR + rR;
        ans += Math.abs(totalR);
        return totalR;
    }

    reqDFS(root);
    return ans;
}

// 113. Path Sum II
function pathSum(root: BinaryTreeNode<number> | null, targetSum: number): number[][] {
    const ans: number[][] = [];

    function dfs(cur: BinaryTreeNode<number>, acc: number[], rest: number) {
        acc.push(cur.val || NaN);
        rest -= cur.val || 0;

        if (cur.left === null && cur.right === null && rest === 0) {
            ans.push([...acc]);
        }

        if (cur.left) dfs(cur.left, acc, rest);
        if (cur.right) dfs(cur.right, acc, rest);
        acc.pop();

    }

    if (root) {
        dfs(root, [], targetSum);
    }
    return ans;
}

// 437. Path Sum III (Brute force)
function pathSumIIIBruteForce1(root: BinaryTreeNode<number> | null, targetSum: number): number {
    const nodes: BinaryTreeNode<number>[] = [];
    function flatDFS(cur: BinaryTreeNode<number> | null): void {
        if (cur) {nodes.push(cur)} else return;
        flatDFS(cur.left);
        flatDFS(cur.right);
    }
    flatDFS(root);


    let ans = 0;
    function pathDFS(cur: BinaryTreeNode<number> | null, rest: number): void {
        if (cur) {
            rest -= cur.val || NaN;
            if (rest === 0) {
                ans += 1;
            }
            if (cur.left) pathDFS(cur.left, rest);
            if (cur.right) pathDFS(cur.right, rest);
        }
    }
    for(const sNode of nodes) {
        pathDFS(sNode, targetSum);
    }

    return ans;
}

function pathSumIIIBruteForce2(root: BinaryTreeNode<number> | null, targetSum: number): number {
    let ans = 0;

    function pathDFS(cur: BinaryTreeNode<number> | null, rest: number): void {
        if (cur) {
            rest -= cur.val || 0;
            if (rest === 0) {
                ans += 1;
            }
            if (cur.left) pathDFS(cur.left, rest);
            if (cur.right) pathDFS(cur.right, rest);
        }
    }

    function flatDFS(cur: BinaryTreeNode<number> | null): void {
        if (cur) {pathDFS(cur, targetSum);} else return;
        flatDFS(cur.left);
        flatDFS(cur.right);
    }
    flatDFS(root);


    return ans;
}


export async function pathSumIII(data: Array<number | null>, targetSum: number, proxyHandler?: TProxyHandler): Promise<number> {
    const arrCopy = [...data];
    const proxy: { binaryTree: BinaryTree<number | null> } = new DeepProxy({binaryTree: new BinaryTree<number | null>({idOrNode:0, val:arrCopy[0]})}, proxyHandler);
    proxy.binaryTree.fill(arrCopy.slice(1));
    const root = proxy.binaryTree.root;

    const sumMap: {[key in number]: number} = {0: 1};

    let ans = 0;
    function dfs(cur: BinaryTreeNode<number | null>, sum: number): void {
        sum += cur.val || 0;
        const x = sum - targetSum;
        if (sumMap[x]) {
            ans+= sumMap[x];
        }


        if (sumMap[sum]) {
            sumMap[sum]++;
        } else {
            sumMap[sum] = 1;
        }


        if (cur.left) dfs(cur.left, sum);
        if (cur.right) dfs(cur.right, sum);

        sumMap[sum]--;
    }

    if (root) dfs(root, 0);

    return ans;

}


const runPathSumIII = async () => {
    await runAlgorithm(pathSumIII, false, ...pathSumIIICase3);
};

// runPathSumIII().then();
