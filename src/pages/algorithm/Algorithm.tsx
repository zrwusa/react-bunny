import React, {useEffect, useState} from 'react';
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
    runAllLongestCommonPrefix,
    runAllTestPriorityQueue,
    runAllThreeSum,
    runCombinationPermutation,
    runGroupAnagrams,
    runIsAnagram,
    runTestTrie,
    runTopKFrequentBucket,
    runTopKFrequentHash,
    showBinaryTree,
    testAVLTree,
    testBinaryTree,
    testBinaryTreeCase2,
    testBST,
    testBST2,
    testBSTCase1,
    testGraphs,
    testHeap,
    testSymmetricTree,
    testSymmetricTreeCase2,
    treeData,
    treeMaxDepth,
    trimABST,
    trimABSTCase2
} from '../../algorithms';
import {BinaryTree, Navigator, SinglyLinkedList} from 'data-structure-typed';
import {runAllWordBreakII} from '../../algorithms/uncategorized';
import {AlgorithmPanel} from '../../components/algorithm-panel/AlgorithmPanel';
import {canPartition, fibonacci} from '../../algorithms/dp';
import {canPartitionCase3} from '../../algorithms/dp/cases';
import Button from '@mui/material/Button';
import {runAllCharacterReplacement} from '../../algorithms/two-pointers/sliding-window';
import {runAllMaxSlidingWindow} from '../../algorithms/deque';

export function AlgorithmScreen() {

    const binaryTree = new BinaryTree<number>({});
    binaryTree.fill([1, 2, 3]);

    const [binaryTreeDataInput, setBinaryTreeDataInput] = useState('[-10,9,20,null,null,15,7]');
    const [binaryTreeData, setBinaryTreeData] = useState('[-10,9,20,null,null,15,7]')
    useEffect(() => {
        try {
            JSON.parse(binaryTreeDataInput);
            setBinaryTreeData(binaryTreeDataInput);
        } catch (e) {
            console.log(e, 'Invalid input binary tree nodes')
        }
    }, [binaryTreeDataInput]);

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
            <AlgorithmPanel algorithm={binaryTreeInorderTraversal} testCase={[binaryTree.getRoot()]}
                            buttonLabel={'Binary Tree Inorder Traversal'}
                            referenceData={binaryTree.getRoot()} relatedNodeKey="node"/>
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
            <AlgorithmPanel algorithm={testBinaryTree} testCase={testBinaryTreeCase2} buttonLabel={'Test BinaryTree'}/>
            <input value={binaryTreeDataInput}
                   onChange={(e) => {
                       setBinaryTreeDataInput(e.target.value);
                   }}
            />
            <AlgorithmPanel algorithm={showBinaryTree} testCase={[binaryTreeData ? JSON.parse(binaryTreeData) : []]}
                            buttonLabel={'Show BinaryTree'}/>
            <AlgorithmPanel algorithm={testBST} testCase={testBSTCase1} buttonLabel={'Test BST'}/>
            <AlgorithmPanel algorithm={testBST2} testCase={[[3, 4, 2, 1, 2, 3, 4]]} buttonLabel={'Test BST II'}/>
            <AlgorithmPanel algorithm={testAVLTree} testCase={testBSTCase1} buttonLabel={'Test AVL'}/>
            <AlgorithmPanel algorithm={testGraphs} testCase={[]} buttonLabel={'Test Graphs'}/>
            <AlgorithmPanel algorithm={networkDelayTime} testCase={networkDelayTimeCase3}
                            buttonLabel={'Network Delay Time'}/>
            <AlgorithmPanel algorithm={regionsBySlashes} testCase={[[]]} buttonLabel={'Regions by Slashes'}/>
            <AlgorithmPanel algorithm={runAllTestPriorityQueue} testCase={[]} buttonLabel={'Test PriorityQueue'}/>
            <AlgorithmPanel algorithm={testHeap} testCase={[]} buttonLabel={'Test Heap'}/>
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
            <AlgorithmPanel algorithm={fibonacci} testCase={[6]} buttonLabel="Test fibonacci"/>
            <Button onClick={() => {
                const navigator = new Navigator({
                    matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
                    onMove: (cur) => {
                        console.log(cur, new Date().getTime());
                    },
                    init: {
                        cur: [0, 0],
                        charDir: 'right',
                        VISITED: 1000
                    },
                    turning: {up: 'right', right: 'down', down: 'left', left: 'up'}
                });
                navigator.start();
            }}>Navigator</Button>
            <Button onClick={() => {
                runCombinationPermutation().then()
            }}>Test Combination & Permutation</Button>
            <Button onClick={() => {
                runAllCharacterReplacement().then()
            }}>Character Replacement</Button>
            <Button onClick={() => {
                runAllThreeSum().then()
            }}>Three Sum</Button>
            <Button onClick={() => {
                runAllMaxSlidingWindow().then()
            }}>Max Sliding Window</Button>
            <Button onClick={() => {
                runTestTrie().then()
            }}>Test Trie</Button>
            <Button onClick={() => {
                runIsAnagram().then()
            }}>Valid Anagram
            </Button>
            <Button onClick={() => {
                runGroupAnagrams().then();
            }}>Group Anagrams
            </Button>
            <Button onClick={() => {
                runTopKFrequentHash().then();
            }}>Top K Frequent Elements - Hash
            </Button>
            <Button onClick={() => {
                runTopKFrequentBucket().then();
            }}>Top K Frequent Elements - Bucket
            </Button>
            <Button onClick={() => {
                runAllLongestCommonPrefix().then();
            }}>Longest Common Prefix - Trie
            </Button>
            <Button onClick={() => {
                runTestTrie().then();
            }}>Test Trie
            </Button>
        </div>
    );
}