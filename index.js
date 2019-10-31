function innerjoin(list1, list2) {
    let short, long;
    if (list1.length > list2.length) {
        long = [...list1];
        short = [...list2];
    } else {
        long = [...list2];
        short = [...list1];
    }

    for (let i = 0; i < short.length; i++) {
        const temp = short[i];
        for (let j = 0; j < long.length; j++) {
            if (temp === )
        }
    }
}

const a = [1, 1];
const b = [1];
const result = innerjoin(a, b);
console.log(result);