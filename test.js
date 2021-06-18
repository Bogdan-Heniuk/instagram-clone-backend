function solution(str){
   return str.length % 2 === 0 ? str.split('') : [...str.split(''), '_']
}

console.log(solution('abcdef'));