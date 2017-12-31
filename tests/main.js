const util = require("../lib/util");
const assert = require("assert");
let tests = [
  function(){
    let testWords = [
      ["hello world","hello-world"],
      ["hello\nworld","hello-world"],
      ["hello\nworld","hello-world"],
      ["hello\"-world","hello-world"]
    ];
    for(let word of testWords){
      let result = util.encode(word[0]);
      assert.equal(result,word[1]," "+word[1] +" != " + result + ",real result:"+ result + (

        result == word[1]
      ));
    }
  },

];

for(let fun of tests){
  fun();
}
