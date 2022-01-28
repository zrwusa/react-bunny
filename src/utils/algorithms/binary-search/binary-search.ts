export function lowerBound(nums: number[], target: number): number {
    const len = nums.length;
    let l = 0, r = len - 1;
    while (l < r) {
        const m = l + Math.floor((r - l) / 2);
        if (nums[m] >= target) {
            r = m;
        } else {
            l = m + 1;
        }
    }
    return l;
}

export function upperBound(nums: number[], target: number): number {
    const len = nums.length;
    let l = 0, r = len - 1;
    while (l < r) {
        const m = l + Math.floor((r - l) / 2);
        if (nums[m] > target) {
            r = m;
        } else {
            l = m + 1;
        }
    }
    return l;
}


// 34. Find First and Last Position of Element in Sorted Array
function searchRange(nums: number[], target: number): number[] {
    let i = -1;
    const len = nums.length;

    function rcv(l: number, r: number) {
        const m = l + Math.floor((r - l) / 2);
        if (l > r) {
            return;
        }
        if (nums[m] > target) {
            rcv(l, m - 1);
        } else if (nums[m] === target) {
            i = m;
            return;
        } else {
            rcv(m + 1, r);
        }
    }

    rcv(0, len - 1);

    let prev: number = i - 1;
    while (nums[prev] === target) {
        prev--;
    }

    let next: number = i + 1;
    while (nums[next] === target) {
        next++;
    }

    return [prev >= -1 ? prev + 1 : -1, next <= len ? next - 1 : -1];
}

function searchRangeIterative(nums: number[], target: number): number[] {
    let i = -1;
    const len = nums.length;

    let l = 0, r = len - 1;
    while (l <= r) {
        const m = l + Math.floor((r - l) / 2);

        if (nums[m] > target) {
            r = m - 1;
        } else if (nums[m] === target) {
            i = m;
            break;
        } else {
            l = m + 1;
        }
    }

    let prev: number = i - 1;
    while (nums[prev] === target) {
        prev--;
    }

    let next: number = i + 1;
    while (nums[next] === target) {
        next++;
    }

    return [prev >= -1 ? prev + 1 : -1, next <= len ? next - 1 : -1];
}

function searchRangeBias(nums: number[], target: number): number[] {
    function helper(nums: number[], target: number, lBias: boolean) {
        let i = -1;
        const len = nums.length;

        let l = 0, r = len - 1;
        while (l <= r) {
            const m = l + Math.floor((r - l) / 2);

            if (nums[m] > target) {
                r = m - 1;
            } else if (nums[m] === target) {
                i = m;
                lBias ? r = m - 1 : l = m + 1;
            } else {
                l = m + 1;
            }
        }
        return i;
    }

    const left = helper(nums, target, true);
    const right = helper(nums, target, false);
    return [left, right];
}

// 33. Search in Rotated Sorted Array
function searchInRotatedSortedArray(nums: number[], target: number): number {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] >= nums[l]) {
            if (nums[l] <= target && target < nums[mid]) r = mid - 1; else l = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[r]) l = mid + 1; else r = mid - 1;
        }
    }
    return -1;
}

function searchInRotatedSortedArrayNonIncrease(nums: number[], target: number): number {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] >= nums[r]) {
            if (nums[r] <= target && target < nums[mid]) l = mid + 1; else r = mid - 1;
        } else {
            if (nums[mid] < target && target <= nums[l]) r = mid - 1; else l = mid + 1;
        }
    }
    return -1;
}
