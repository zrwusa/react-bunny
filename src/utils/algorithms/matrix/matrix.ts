export const matrixUnique = (arr: number[][]) => {
    const isSame = (arr1: number[], arr2: number[]) => {
        arr1 = arr1.sort((a, b) => a - b);
        arr2 = arr2.sort((a, b) => a - b);
        for (let i = 0; i < arr1.length; i++) if (arr1[i] !== arr2[i]) return false;
        return true;
    }
    for (let i = 0; i < arr.length; i++) for (let j = i + 1; j < arr.length; j++) {
        if (isSame(arr[i], arr[j])) {
            arr.splice(j, 1);
            j--;
        }
    }
    return arr;
}

export const matrixUnique1 = (matrix: number[][]) => {
    for (let i = 0; i < matrix.length; i++) {
        const listI = matrix[i];
        loopJ: for (let j = 0; j < matrix.length; j++) {
            const listJ = matrix[j].sort();
            if (listI === listJ) continue;
            for (let k = listJ.length; k >= 0; k--) {
                if (listJ[k] !== listI[k]) continue loopJ;
            }
            matrix.splice(j, 1);
        }
    }
    return matrix;
}

