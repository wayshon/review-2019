function quickSort(list, startIndex, endIndex) {
    if (startIndex > endIndex) {
        return;
    }
    let left = startIndex, right = endIndex, base = list[startIndex];
    while(left !== right) {
        while(right > left && list[right] >= base) {
            right--;
        }
        while(left < right && list[left] <= base) {
            left++
        }
        if (list[left] > list[right]) {
            const temp = list[left];
            list[left] = list[right];
            list[right] = temp;
        }
    }

    list[startIndex] = list[right];
    list[right] = base;

    quickSort(list, startIndex, right - 1);
    quickSort(list, right + 1, endIndex);
}

const arr = [2, 3, 9, 1, 5, 6, 4, 7, 8];

quickSort(arr, 0, arr.length - 1);

console.log(arr)