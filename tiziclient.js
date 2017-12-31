#!/usr/bin/env node
const program = require('commander');
const fs = require('graceful-fs');
const path = require('path');
const readLineSync = require("readline-sync");
const clicolor = require("cli-color");
const CWD = process.cwd();
// const tizi = require("./lib/tizi")("/Users/r/Documents/ShuyiApp/Site/data",
//   "/Users/r/Documents/ShuyiApp/Docs/"
// );

const tizi = require("./lib/tizi")(process.cwd()+"/data/",
  process.cwd()+"/md/"
);
console.log(tizi);


program.version("0.0.1").description('static blog system base on vuejs;' + "\n" +
  "simple,very fast. ")
  .option('-C, --chdir <path>', 'change the working directory')
  .option("-S,--silence","post new markdown file automatically,remove unexists file automatically;Guess post name from filename");

program.command("list")
  .action( ()=>{
    console.log(program);
  });

program.command("import:wordpress <xmlFile>")
  .action(xmlFile => {
    tizi.importWordpress(xmlFile);
  });

program.command("import:files ")
  .action(()=>{
    tizi.importFiles(program.silence);
  });
program.command("search [keyword]").action(
  (keyword)=>{
    tizi.searchBlog(keyword);
  }
);
program.command("remove [postId]").action(
  (postId) => {
    let intValue;
    if(postId === undefined){
      intValue = 0;
    }else {
       intValue = parseInt(postId);
      if (!(intValue >= 0)) {
        intValue = 0;
      }
    }
    tizi.removeBlog(intValue);
  }
);
program.command("test")
  .action(()=>{
    let name = readLineSync.question(
      clicolor.red("What's your name")
    );
    console.log(clicolor.green("Welcome to new world.\t"+ name));
  });
program.command("*").action(
  () => {

    tizi.importFiles(program.silence);
  }
);

program.parse(process.argv);

// try {
//   var doc = yaml.safeLoad(fs.readFileSync('/home/ixti/example.yml', 'utf8'));
//   console.log(doc);
// } catch (e) {
//   console.log(e);
// }
