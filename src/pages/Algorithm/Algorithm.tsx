import React, {useState} from 'react';
import {
    BFS,
    binaryTreeInorderTraversal,
    countSmallerBST,
    countSmallerCase1,
    cutOffTree,
    cutOffTreeCase8,
    deleteLeaves,
    deleteLeavesCase1,
    DFS,
    isValidParenthesis,
    ladderLengthCase1,
    ladderLengthDFS,
    lengthOfLongestSubstring,
    letterCombinations,
    networkDelayTime,
    networkDelayTimeCase3,
    pathSumIII,
    pathSumIIICase5,
    regionsBySlashes,
    reverseLinkedList,
    testAVLTree,
    testBinaryTree,
    testBST,
    testBSTCase1,
    testBSTCase3,
    testGraphs,
    testPriorityQueue,
    testSymmetricTree,
    testSymmetricTreeCase2,
    treeData,
    treeMaxDepth,
    trimABST,
    trimABSTCase2
} from '../../utils/algorithms';
import {BinaryTree, BinaryTreeNode, SinglyLinkedList} from '../../utils/data-structures';
import {runAllWordBreakII} from '../../utils/algorithms/uncategorized';
import {AlgorithmPanel} from '../../components/AlgorithmPanel/AlgorithmPanel';
import {canPartition} from '../../utils/algorithms/dp/dynamic-programing';
import {canPartitionCase3} from '../../utils/algorithms/dp/cases';

export const AlgorithmScreen: React.FC = () => {

    const binaryTreeNode1 = new BinaryTreeNode<number>(1, 1);
    const binaryTree = new BinaryTree<number>(binaryTreeNode1);

    const [parenthesisInput, setParenthesisInput] = useState('');

    const [lengthOfLongestSubstringValue, setLengthOfLongestSubstringValue] = useState('');

    const linkedList = SinglyLinkedList.from([1, 2, 3, 4, 5, 6]);

    return (
        <div title="Algorithms">
            <AlgorithmPanel algorithm={DFS} testCase={[treeData, 'PreOrder']} buttonLabel={'DFS PreOrder'}
                            referenceData={treeData}
                            relatedNodeKey="nodeNeedPrint"/>
            <AlgorithmPanel algorithm={DFS} testCase={[treeData, 'InOrder']} buttonLabel={'DFS InOrder'}
                            referenceData={treeData}
                            relatedNodeKey="nodeNeedPrint"/>
            <AlgorithmPanel algorithm={DFS} testCase={[treeData, 'PostOrder']} buttonLabel={'DFS PostOrder'}
                            referenceData={treeData}
                            relatedNodeKey="nodeNeedPrint"/>
            <AlgorithmPanel algorithm={BFS} testCase={[treeData]} buttonLabel={'BFS'} referenceData={treeData}
                            relatedNodeKey="node"/>
            <AlgorithmPanel algorithm={binaryTreeInorderTraversal} testCase={[binaryTree.root]}
                            buttonLabel={'Binary Tree Inorder Traversal'}
                            referenceData={binaryTree.root} relatedNodeKey="node"/>
            <AlgorithmPanel algorithm={letterCombinations} testCase={['29']} buttonLabel={'Letter Combinations'}/>
            <input value={parenthesisInput} onChange={(e) => {
                setParenthesisInput(e.target.value);
            }}/>
            <AlgorithmPanel algorithm={isValidParenthesis} testCase={[parenthesisInput]}
                            buttonLabel={'Parenthesis Check'}/>
            <input value={lengthOfLongestSubstringValue}
                   onChange={(e) => {
                       setLengthOfLongestSubstringValue(e.target.value);
                   }}/>
            <AlgorithmPanel algorithm={lengthOfLongestSubstring} testCase={[lengthOfLongestSubstringValue]}
                            buttonLabel={'Length Of Longest Substring'}/>
            <AlgorithmPanel algorithm={reverseLinkedList} testCase={[linkedList.head]}
                            buttonLabel={'Reverse Linked List'}/>
            <AlgorithmPanel algorithm={ladderLengthDFS} testCase={ladderLengthCase1} buttonLabel={'Ladder Length'}/>
            <AlgorithmPanel algorithm={treeMaxDepth} testCase={[treeData]} buttonLabel={'Max Depth'}/>
            <AlgorithmPanel algorithm={cutOffTree} testCase={cutOffTreeCase8}
                            buttonLabel={'Cut Off Tree For Golf Event'} relatedNodeKey="cur"
                            referenceData={cutOffTreeCase8[0]}
                            relatedRouteKey="route"/>
            <AlgorithmPanel algorithm={countSmallerBST} testCase={countSmallerCase1}
                            buttonLabel={'Count Smaller BST'}/>
            <AlgorithmPanel algorithm={testBinaryTree} testCase={testBSTCase3} buttonLabel={'Test BinaryTree'}/>
            <AlgorithmPanel algorithm={testBST} testCase={testBSTCase1} buttonLabel={'Test BST'}/>
            <AlgorithmPanel algorithm={testAVLTree} testCase={testBSTCase1} buttonLabel={'Test AVL'}/>
            <AlgorithmPanel algorithm={testGraphs} testCase={[]} buttonLabel={'Test Graphs'}/>
            <AlgorithmPanel algorithm={networkDelayTime} testCase={networkDelayTimeCase3}
                            buttonLabel={'Network Delay Time'}/>
            <AlgorithmPanel algorithm={regionsBySlashes} testCase={[[]]} buttonLabel={'Regions by Slashes'}/>
            <AlgorithmPanel algorithm={testPriorityQueue} testCase={[]} buttonLabel={'Test PriorityQueue'}/>
            <AlgorithmPanel algorithm={runAllWordBreakII} testCase={[]} buttonLabel={'Run All BreakWordII'}/>
            <AlgorithmPanel algorithm={regionsBySlashes} testCase={[]} buttonLabel={'Regions by Slashes'}/>
            <AlgorithmPanel algorithm={testSymmetricTree} testCase={testSymmetricTreeCase2}
                            buttonLabel={'Symmetric Tree'}/>
            <AlgorithmPanel algorithm={pathSumIII} testCase={pathSumIIICase5} buttonLabel={'Path Sum III'}/>
            <AlgorithmPanel algorithm={trimABST} testCase={trimABSTCase2} buttonLabel={'Trim a BST'}/>
            <AlgorithmPanel algorithm={deleteLeaves} testCase={deleteLeavesCase1}
                            buttonLabel={'Delete Leaves With a Given Value'}/>
            <AlgorithmPanel algorithm={canPartition} testCase={canPartitionCase3}
                            buttonLabel={'Partition Equal Subset Sum'}/>
        </div>
    );
}



