require.config({
    paths: {
        "M1": "./M1",
        "M2": "./M2",
        "M3": "./M3",

    }
});

console.log('this is main')

require(['M1', 'M2'], function (M1, M2) {
    console.log(M1)
    console.log(M2)
});