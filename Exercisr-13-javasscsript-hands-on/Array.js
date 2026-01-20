// let myArr = ['tor', 25];
// // console.log('name: ' + myArr[0]);
// // console.log('age: ' + myArr[1]);
// // console.log(myArr[10]);
// myArr.push('Fri', 2007);
// console.log(myArr);

// let myArr2 = [ 'tor', 25, 'Fri', 2007]

// let newArr = myArr2.slice(1,3)
// console.log(newArr)

// let myArr2 = [ 'tor', 25, 'Fri', 2007]

// let newArr2 = myArr2.concat('hello', 'world')
// console.log(newArr2)

let newArr2 = [ 'tor', 25, 'Fri', 2007, 'hello', 'world' ]
let indexArr = newArr2.indexOf('Fri')
console.log(indexArr)

// let newArr2 = [ 'tor', 25, 'Fri', 2007, 'hello', 'world' ]
// if (newArr2.indexOf("Fri") !== -1) {
//     console.log("เจอ")
// } else {
//     console.log("ไม่เจอ")
// }

// let numbers = [1, 3, 5, 7, 8, 9];
// let hasEven = numbers.some(num => num % 2 === 0);
// console.log(hasEven);
// let names = ['สมชาย', 'สมหญิง','ต่อ'];
// let withTitle = names.map(name => 'คุณ' + name);
// console.log(withTitle); // ['คุณสมชาย', 'คุณสมหญิง']

// let users = [ { name: 'สมชาย', age: 20 }, { name: 'สมหญิง', age: 25 } ];
// let names = users.map(user => user.name);
// console.log(names); // ['สมชาย', 'สมหญิง']
// let numbers = [1, 2, 3, 4, 5];
// numbers.forEach((num) => {
//     sum += num;
// });
// console.log(`ผลรวม: ${sum}`); // ผลรวม: 15
// let sum=0
// let numbers = [1, 2, 3, 4, 5];
// numbers.forEach((num) => {
//     sum += num;
// });
// console.log(`ผลรวม: ${sum}`); // ผลรวม: 15

// let students = [
//     { name: 'สมชาย', score: 80 },
//     { name: 'สมหญิง', score: 90 },
//     { name: 'สมศรี', score: 85 },
// ];

// แสดงข้อมูลนักเรียน
// students.forEach((student) => {
//     console.log(`${student.name} ได้คะแนน ${student.score} คะแนน`);
// });
// let numbers = [1, 2, 3, 4, 5];
// let allPositive = numbers.every(num => num > 16);
// console.log(allPositive);
// let arr = [1, 2, 3, 4, 5];   // [0][1][2][3][4]  <- index
// let result = arr.slice(1,3);

// console.log(result); // [3, 4, 5] (ตั้งแต่ index 2 ถึงจบ)
// console.log(arr);    // [1, 2, 3, 4, 5] (ไม่เปลี่ยน)
// let electronics = ['ทีวี', 'ตู้เย็น'];
// let clothing = ['เสื้อ', 'กางเกง'];
// let books = ['นิยาย', 'การ์ตูน'];

// let allProducts = electronics.concat(clothing, books);

// console.log(allProducts); // ['ทีวี', 'ตู้เย็น', 'เสื้อ', 'กางเกง', 'นิยาย', 'การ์ตูน']
// const letters = ['H', 'e', 'l', 'l', 'o'];
// let word = letters.join('');
// console.log(word);  // "Hello"
//  (default = comma)
// const colors = ['red', 'green', 'blue'];
// console.log(colors.join());  // "red,green,blue"

// const numbers = [10, 20, 30, 40];
// console.log(numbers.toString());  // "10,20,30,40"
// let thai = 'สวัสดี';
// let thaiArr = Array.from(thai);
// console.log(thaiArr);  // ['ส', 'ว', 'ั', 'ส', 'ด', 'ี']
// let doubled = Array.from([1, 2, 3], x => x * 2);
// console.log(doubled);  // [2, 4, 6]
// var globalVar = "I'm global"
// let globalLet = "I'm also global"
// const globalconst = "door"

// function anyFunction() {
//     console.log(globalVar) // ✅  เข้าถึงได้
//     console.log(globalLet) // ✅  เข้าถึงได้
//     // console.log(globalconst)
// }
// for (let i = 0; i < 5; i++) {
//     console.log('helloWorld');
// }
function sayHello(){
    console.log("hi");
}

function greet(callback){
    console.log("starting");
    callback();
}
greet(sayHello);
