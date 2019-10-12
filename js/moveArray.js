const origin = [0,1,0,3,12,0,5];
const fn = function(list) {
    let len = list.length;
    let i = 0;
    while (i < len) {
        if (list[i] === 0) {
            const item = list.splice(i, 1)[0];
            list.push(item);
            len--;
        } else {
            i++;
        }
    }
}

fn(origin);
console.log(origin)
