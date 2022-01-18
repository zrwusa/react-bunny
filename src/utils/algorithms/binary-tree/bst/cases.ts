export const testBSTCase1: [number[]] = [[11, 3, 15, 1, 8, 13, 16, 2, 6, 9, 12, 14, 4, 7, 10, 5]];
export const testBSTCase2: [number[]] = [[1, 2, 3, 4, 5, 6, 7, 8, 9]];
export const testBSTCase3: [number[]] = [[1, 4, 2, 1, 3, 6, 5, 2, 3]];
export const testBSTCase4: [number[]] = [[1, 2, 2, 2, 2, 6, 5, 2, 3]];

export const testSymmetricTreeCase1: [number[]] = [[1, 2, 2, 3, 4, 4, 3]];
export const testSymmetricTreeCase2: [Array<number | null>] = [[1, 2, 2, null, 3, null, 3]];

export type PathSumIIIParams = [Array<number | null>, number];
export const pathSumIIICase1: PathSumIIIParams = [[10, 5, -3, 3, 2, null, 11, 3, -2, null, 1], 8];
export const pathSumIIICase3: PathSumIIIParams = [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], 22];
export const pathSumIIICase4: PathSumIIIParams = [[0, 1, 1], 1]; // The question description does not match the test case, according the description this should return 2, but returned 4
export const pathSumIIICase5: PathSumIIIParams = [[0, 1, 1, 0, 1, 1], 1];

export type TrimABSTParams = [Array<number | null>, number, number];
export const trimABSTCase1: TrimABSTParams = [[3, 0, 4, null, 2, null, null, 1], 1, 3];

