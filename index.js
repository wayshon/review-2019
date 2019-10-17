// 求两个日期中间的有效日期
// 如 2015-2-8 到 2015-3-3，返回【2015-2-8 2015-2-9...】

function calcDate(s, e) {
    const result = [];
    const start = new Date(s);
    const end = new Date(e);
    let temp = start;
    while (end.getTime() >= temp.getTime()) {
        result.push(temp.toLocaleDateString().replace('/', '-'));
        let next = temp.getTime() + (1000 * 60 * 60 * 24);
        temp = new Date(next);
    }
    return result;
}
console.log(calcDate('2012-2-26', '2012-3-3'));