const a = 'qwertyuiop';
const b = 'tyu';

const find = function(str1, str2) {
    if (str2.length > str1.length) return -1;
    const list1 = str1.split('');
    // 循环当前项 i 后面至少还有 str2.length 个元素
    for (let i = 0; i < list1.length - str2.length; i++) {
        let temp = '';
        for (let j = i; j < str2.length + i; j++) {
            temp += list1[j];
        }
        if (temp === str2) {
            return i;
        }
    }
    return -1;
}
console.log(find(a, b))