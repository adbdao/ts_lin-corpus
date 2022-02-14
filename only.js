
// 配合timeEnd()成對出現。 打印出代碼執行的時間
console.time('共耗費了')

// 導入模組
var fs = require('fs')
var path = require('path')
// 可改寫檔名及編碼
var x = 'footnotes.json'
var ru = 'utf8'
var wu = 'utf8'
// 完成後的副檔名
var afterName = ''

// 用絕對路徑讀入檔案，使用node的readFileSync同步函數
var a = fs.readFileSync(x, ru)
// 導入陣列
var b = a.split('\n')

// 首行加一空行，後來不必了，b[0]之前，不能加任何字，否則「位元組順序記號」 EF BB BF ，會跑到第2行，變成亂碼
// b.unshift('\n')

var ff = {
    "fn1": "this is foot note one",
    "fn3": "unconsumed footnote"
}

// 進行你要的操作
// 預設變量，才能累加頁碼
var f0 = 1
var f1 = 1
for (var i = 0; i < b.length; i++) {
    // if (/<類/.test(b[i])) {
    //     b[i] = b[i].replace(/<類>([^<]+)<\/類>/, '"類' + f1 + '":"$1",')
    //     f1++
    // }
    // if (/<釋/.test(b[i])) {
    //     b[i] = b[i].replace(/<釋 n="1">　<\/釋>([^<]+)/, '",\n"fn' + f0 + '":"$1')
    //     f0++
    // }
    if (/"fn/.test(b[i])) {
        b[i] = b[i].replace(/("fn)([^"]+)(")/, '$1' + f0 + '$3')
        f0++
    }
}
// // 加上批次頁碼
// // 預設變量，才能累加頁碼
// var s0 = 0
// // var s1 = 0
// var s2 = 1
// for (var i = 0; i < b.length; i++) {
//     // <pb>不能寫在b[0]之前，否則「位元組順序記號」 EF BB BF ，會跑到第2行，變成亂碼
//     // b[i] = b[i] + '<pb n="' + j + '"/>'
//     // 先刪除舊的<頁>標記
//     b[i] = b[i].replace(/<頁 id.+>/, '')
//     // 加上頁碼
//     if (/<article/.test(b[i]) || s2 > 499) {
//         s2 = 1
//         // s1++
//         b[i] = '<pb n="'+ s2 + '"/>\n' + b[i]
//         s0 = i + 30
//     }
//     if (i == s0) {
//         s2++
//         b[i] = '<pb n="'+ s2 + '"/>\n' + b[i]
//         s0 = i + 30
//     }
// }

// 用絕對路徑寫入檔案
fs.writeFileSync(x + afterName, b.join('\n'), wu)
// 完成時返回通知
console.log('only is OK: ' + x + afterName)

// 'test'名字要和time()中的名字保持一致
console.timeEnd('共耗費了')