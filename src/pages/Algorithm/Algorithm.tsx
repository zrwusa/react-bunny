import React, {useState} from 'react';
import {OrderType, TreeNode} from '../../types';
import {
    BFS,
    binaryTreeInorderTraversal,
    countSmallerBST,
    countSmallerCase1,
    cutOffTree,
    cutOffTreeCase8,
    DFS,
    isValidParenthesis,
    ladderLengthCase1,
    ladderLengthDFS,
    lengthOfLongestSubstring,
    letterCombinations,
    networkDelayTime,
    networkDelayTimeCase3, pathSumIII, pathSumIIICase1, pathSumIIICase3, pathSumIIICase4, pathSumIIICase5,
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
    testSymmetricTreeCase1, testSymmetricTreeCase2,
    treeData,
    treeMaxDepth
} from '../../utils/algorithms';
import {VividAlgorithm} from '../../components/VividAlgorithm';
import {BinaryTree, BinaryTreeNode, SinglyLinkedList} from '../../utils/data-structures';
import {THandlerContext} from '@qiwi/deep-proxy';
import {runAllWordBreakII} from '../../utils/algorithms/uncategorized';

export function AlgorithmScreen() {

    const [binaryTreeInorderTraversalVariables, setBinaryTreeInorderTraversalVariables] = useState<{ [key in string]: BinaryTreeNode<any> }>();
    const binaryTreeNode1 = new BinaryTreeNode<number>(1);
    const binaryTree = new BinaryTree<number>(binaryTreeNode1);

    const proxyFactory = (setVars: React.Dispatch<React.SetStateAction<{ [p: string]: unknown } | undefined>>) => {
        return ({value, key, DEFAULT}: THandlerContext<any>) => {
            if (key !== undefined) {
                setVars(prevState => ({...prevState, [key.toString()]: value}));
            }
            return DEFAULT;
        };
    };

    const _binaryTreeInorderTraversal = async () => {
        if (binaryTree.root) {
            await binaryTreeInorderTraversal(binaryTree.root, ({value, key, DEFAULT}) => {
                if (key !== undefined) {
                    console.log(key, value);
                    setBinaryTreeInorderTraversalVariables(prevState => ({...prevState, [key.toString()]: value}));
                }
                return DEFAULT;
            });
        }

    };

    const [DFSVariables, setDFSVariables] = useState<{ [key in string]: TreeNode<number> }>();

    const handleDFS = async (type: OrderType) => {
        await DFS(treeData, type, ({value, key, DEFAULT}) => {
            if (key !== undefined) {
                // console.log(key, value);
                setDFSVariables(prevState => ({...prevState, [key.toString()]: value}));
            }
            return DEFAULT;
        });
    };

    const [BFSVariables, setBFSVariables] = useState<{ [key in string]: TreeNode<number> }>();
    const handleBFS = async () => {
        console.log(await BFS(treeData, ({value, key, DEFAULT}) => {
            if (key !== undefined) {
                console.log(key, value);
                setBFSVariables(prevState => ({...prevState, [key.toString()]: value}));
            }
            return DEFAULT;
        }));
    };

    const [letterCombinationsVariables, setLetterCombinationsVariables] = useState<{ [key in string]: string }>();
    const _letterCombinations = async () => {
        console.log(await letterCombinations('29', ({value, key, DEFAULT}) => {
            if (key !== undefined) {
                console.log(key, value);
                setLetterCombinationsVariables(prevState => ({...prevState, [key.toString()]: value}));
            }
            return DEFAULT;
        }));
    };


    const [parenthesisInput, setParenthesisInput] = useState('');
    const [parenthesisVariables, setParenthesisVariables] = useState<{ [key in string]: unknown }>();
    const _parenthesisInput = async () => {
        const result = await isValidParenthesis(parenthesisInput, proxyFactory(setParenthesisVariables));
        console.log('result', result);
    };

    const [lengthOfLongestSubstringValue, setLengthOfLongestSubstringValue] = useState('');
    const [lengthOfLongestSubstringVariables, setLengthOfLongestSubstringVariables] = useState<{ [key in string]: unknown }>();
    const _lengthOfLongestSubstring = async () => {
        const result = await lengthOfLongestSubstring(lengthOfLongestSubstringValue, proxyFactory(setLengthOfLongestSubstringVariables));
        console.log('result', result);
    };

    const linkedList = SinglyLinkedList.from([1, 2, 3, 4, 5, 6]);
    const [reverseLinkedListVariables, setReverseLinkedListVariables] = useState<{ [key in string]: unknown }>();
    const _reverseLinkedList = async () => {
        const result = await reverseLinkedList(linkedList.head, proxyFactory(setReverseLinkedListVariables));
        console.log(result);
    };


    const [ladderLengthVariables, setLadderLengthVariables] = useState<{ [key in string]: unknown }>();
    const _ladderLength = async () => {
        const result = await ladderLengthDFS(...ladderLengthCase1, proxyFactory(setLadderLengthVariables));
        console.log(result);
    };

    const [cutOffTreeVariables, setCutOffTreeVariables] = useState<{ [key in string]: unknown }>();
    const _cutOffTree = async () => {
        const result = await cutOffTree(...cutOffTreeCase8, proxyFactory(setCutOffTreeVariables));
        console.log(result);
    };

    const [countSmallerVariables, setCountSmallerVariables] = useState<{ [key in string]: unknown }>();
    const _countSmallerBST = async () => {
        const result = await countSmallerBST(...countSmallerCase1, proxyFactory(setCountSmallerVariables));
    };

    const [testBinaryTreeVariables, setTestBinaryTreeVariables] = useState<{ [key in string]: unknown }>();
    const _testBinaryTree = async () => {
        const result = await testBinaryTree(...testBSTCase3, proxyFactory(setTestBinaryTreeVariables));
    };

    const [testBSTVariables, setGenBSTVariables] = useState<{ [key in string]: unknown }>();
    const _testBST = async () => {
        const result = await testBST(...testBSTCase1, proxyFactory(setGenBSTVariables));
    };

    const [testAVLVariables, setGenAVLVariables] = useState<{ [key in string]: unknown }>();
    const _testAVL = async () => {
        const result = await testAVLTree(...testBSTCase1, proxyFactory(setGenAVLVariables));
    };

    const [testGraphVars, setTestGraphVars] = useState<{ [key in string]: unknown }>();
    const _testGraphs = async () => {
        await testGraphs(proxyFactory(setTestGraphVars));
    };

    const [netWorkDelayTimeVars, setNetWorkDelayTimeVars] = useState<{ [key in string]: unknown }>();
    const _netWorkDelayTime = async () => {
        await networkDelayTime(...networkDelayTimeCase3, proxyFactory(setNetWorkDelayTimeVars));
    };

    const [regionsBySlashesVars, setRegionsBySlashesVars] = useState<{ [key in string]: unknown }>();
    const _regionsBySlashes = async () => {
        await regionsBySlashes([], proxyFactory(setRegionsBySlashesVars));
    };

    const _testPriorityQueue = async () => {
        testPriorityQueue();
    };

    const _runAllBreakWordII = async () => {
        await runAllWordBreakII();
    };


    const [testSymmetricTreeVariables, setTestSymmetricTreeVariables] = useState<{ [key in string]: unknown }>();
    const _testSymmetricTree = async () => {
        const result = await testSymmetricTree(...testSymmetricTreeCase2, proxyFactory(setTestSymmetricTreeVariables));
        console.log('Is symmetric tree: ', result);
    };

    const [testPathSumIIIVariables, setTestPathSumIIIVariables] = useState<{ [key in string]: unknown }>();
    const _testPathSumIII = async () => {
        const result = await pathSumIII(...pathSumIIICase5, proxyFactory(setTestPathSumIIIVariables));
        console.log('Test PathSumIII: ', result);
    };


    return (
        <div>
            <div style={{flex: 1}}>
                <div>
                    <div title="Algorithms">
                        <button onClick={() => _binaryTreeInorderTraversal()}>
                            <span>Binary Tree Inorder Traversal</span>
                        </button>
                        <button onClick={() => handleDFS('PreOrder')}>
                            <span>DFS PreOrder</span>
                        </button>
                        <button onClick={() => handleDFS('InOrder')}>
                            <span>DFS InOrder</span>
                        </button>
                        <button onClick={() => handleDFS('PostOrder')}>
                            <span>DFS PostOrder</span>
                        </button>
                        <button onClick={() => handleBFS()}>
                            <span>BFS</span>
                        </button>
                        <button onClick={() => _letterCombinations()}>
                            <span>Letter Combinations</span>
                        </button>
                        <input value={parenthesisInput} onChange={(e) => {
                            setParenthesisInput(e.target.value);
                        }}/>
                        <button onClick={_parenthesisInput}>
                            <span>Parenthesis Check</span>
                        </button>
                        <input value={lengthOfLongestSubstringValue}
                               onChange={(e) => {
                                   setLengthOfLongestSubstringValue(e.target.value);
                               }}/>
                        <button onClick={_lengthOfLongestSubstring}>
                            <span>Length Of Longest Substring</span>
                        </button>
                        <button onClick={_reverseLinkedList}>
                            <span>Reverse Linked List</span>
                        </button>
                        <button onClick={_ladderLength}>
                            <span>Ladder Length</span>
                        </button>
                        <button onClick={() => {
                            console.log(treeMaxDepth(treeData));
                        }}>
                            <span>Max Depth</span>
                        </button>
                        <button onClick={_cutOffTree}>
                            <span>Cut Off Tree For Golf Event</span>
                        </button>
                        <button onClick={_countSmallerBST}>
                            <span>Count Smaller BST</span>
                        </button>
                        <button onClick={_testBinaryTree}>
                            <span>Test BinaryTree</span>
                        </button>
                        <button onClick={_testBST}>
                            <span>Test BST</span>
                        </button>
                        <button onClick={_testAVL}>
                            <span>Test AVL</span>
                        </button>
                        <button onClick={_testGraphs}>
                            <span>Test Graphs</span>
                        </button>
                        <button onClick={_netWorkDelayTime}>
                            <span>Network Delay Time</span>
                        </button>
                        <button onClick={_regionsBySlashes}>
                            <span>Regions By Slashes</span>
                        </button>
                        <button onClick={_testPriorityQueue}>
                            <span>Test PriorityQueue</span>
                        </button>
                        <button onClick={_runAllBreakWordII}>
                            <span>Run All BreakWordII</span>
                        </button>
                        <button onClick={_testSymmetricTree}>
                            <span>Test Symmetric Tree</span>
                        </button>

                        <button onClick={_testPathSumIII}>
                            <span>Test PathSum III</span>
                        </button>
                    </div>
                    {
                        binaryTreeInorderTraversalVariables
                            ? <VividAlgorithm data={binaryTreeInorderTraversalVariables}
                                              referenceData={binaryTree.root} relatedNodeKey="node"/>
                            : null
                    }
                    {
                        DFSVariables
                            ? <VividAlgorithm data={DFSVariables} referenceData={treeData}
                                              relatedNodeKey="nodeNeedPrint"/>
                            : null
                    }
                    {
                        letterCombinationsVariables
                            ? <VividAlgorithm data={letterCombinationsVariables}/>
                            : null
                    }
                    {
                        BFSVariables
                            ? <VividAlgorithm data={BFSVariables} referenceData={treeData}
                                              relatedNodeKey="node"/>
                            : null
                    }
                    {
                        lengthOfLongestSubstringVariables
                            ? <VividAlgorithm data={lengthOfLongestSubstringVariables}/>
                            : null
                    }
                    {
                        parenthesisVariables
                            ? <VividAlgorithm data={parenthesisVariables}/>
                            : null
                    }
                    {
                        reverseLinkedListVariables
                            ? <VividAlgorithm data={reverseLinkedListVariables}/>
                            : null
                    }
                    {
                        ladderLengthVariables
                            ? <VividAlgorithm data={ladderLengthVariables}/>
                            : null
                    }
                    {
                        cutOffTreeVariables
                            ? <VividAlgorithm data={cutOffTreeVariables} relatedNodeKey="cur"
                                              referenceData={cutOffTreeCase8[0]}
                                              relatedRouteKey="route"/>
                            : null
                    }
                    {
                        countSmallerVariables
                            ? <VividAlgorithm data={countSmallerVariables}/>
                            : null
                    }
                    {
                        testBinaryTreeVariables
                            ? <VividAlgorithm data={testBinaryTreeVariables}/>
                            : null
                    }
                    {
                        testBSTVariables
                            ? <VividAlgorithm data={testBSTVariables}/>
                            : null
                    }
                    {
                        testAVLVariables
                            ? <VividAlgorithm data={testAVLVariables}/>
                            : null
                    }
                    {
                        testGraphVars
                            ? <VividAlgorithm data={testGraphVars}/>
                            : null
                    }
                    {
                        netWorkDelayTimeVars
                            ? <VividAlgorithm data={netWorkDelayTimeVars}/>
                            : null
                    }
                    {
                        regionsBySlashesVars
                            ? <VividAlgorithm data={regionsBySlashesVars}/>
                            : null
                    }

                    {
                        testSymmetricTreeVariables
                            ? <VividAlgorithm data={testSymmetricTreeVariables}/>
                            : null
                    }
                    {
                        testPathSumIIIVariables
                            ? <VividAlgorithm data={testPathSumIIIVariables}/>
                            : null
                    }
                </div>
            </div>
        </div>
    );
}



