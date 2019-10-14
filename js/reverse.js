const origin = [1, 2, 3, 4, 5];
const reverse = function (list) {
    const len = Math.floor(list.length / 2);
    const lastIndex = list.length - 1;
    for (let i = 0; i < len; i++) {
        const temp = list[i];
        list[i] = list[lastIndex - i];
        list[lastIndex - i] = temp;
    }
}
reverse(origin)
console.log(origin);