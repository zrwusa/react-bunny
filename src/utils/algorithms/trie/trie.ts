import {Trie} from '../../data-structures/trie';
import {testTrieCase1} from './cases';
import {runAlgorithm} from '../helpers';

export const testTrie = (words: string[]) => {
    console.log('Words need to be inserted', words);
    const trie = new Trie();
    for (const word of words) {
        trie.insert(word);
    }

    console.log('Is word: doll', trie.search('doll'));
    console.log('Is word: dor', trie.search('dor'));
    console.log('Is word: dorf', trie.search('dorf'));
    console.log('Is Absolute prefix: dor', trie.isAbsPrefix('dor'));
    console.log('Is Absolute prefix: do', trie.isAbsPrefix('do'));
    console.log('Is prefix: do', trie.isPrefix('do'));
    console.log('Is word: do', trie.search('do'));
    console.log('Is prefix: dorm', trie.isPrefix('dorm'));
    console.log('Get all words with prefix: dor', trie.getAllWords('dor'));
};


async function runTestTrie() {
    await runAlgorithm(testTrie, false, testTrieCase1)
}

// runTestTrie().then();
