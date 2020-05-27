/*
Promise.all([
    doTask1a(),
    doTask1b(),
    doTask1c()
])
.then(function(results) {
    return doTask2(
        Math.max(
            results[0],
            results[1],
            results[2]
        )
    )
})

Here we want to wait until all of them resolve. And only afterwards do sth with the result
.all requlres successful completion of all of the provided promises

Its called a gate in oldschool programming. All tasks need to finish before we proceed further

Promise.rece, first comes first wins. Rest is thrown away

*/
