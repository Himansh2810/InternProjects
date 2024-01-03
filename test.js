let arr = [11, 6, 3, 8, 4, 5];

let it = arr[Symbol.iterator]();

function* even(to) {
  let i = 0;
  while (i <= to) {
    yield i;
    i = i + 2;
  }
}

const en = even(20);

// for (const val of en) {
//   console.log(val);
// }

console.log(en.next());
console.log(en.next());
console.log(en.next());
console.log(en.next());
