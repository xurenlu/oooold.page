const fs = require('graceful-fs');

const path = require("path");
const readlineSync = require("readline-sync");
const clicolor = require("cli-color");


let parseString = require('xml2js').parseString;

const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
};

function guessNameByFileName(filename) {
  return filename.replace(".md", "");
}

function tDebug(msg) {
  console.log(msg);
}

function readIndexFile() {
  let content = fs.readFileSync("data/index.json", "UTF-8");
  items = JSON.parse(content);
  return items;
}
function searchBlog(title) {
  if(title===""){
    title = readlineSync.questionInt( clicolor.green("请输入要搜索的关键字\n"));
  }
  let database = readIndexFile();
  for(let item of database){
    if(item.title.indexOf(title)){
      console.log(clicolor.yellow( item.postId + "\t" + item.postDate+"\t"+item.title));
    }
  }
}
function removeBlog(postId) {
  let database = readIndexFile();
  let newDatabase = [];
  console.log("目前有:" + database.length+" 篇博文. " + database.length+" posts now.");
  if(postId===0) {
    postId = readlineSync.questionInt(clicolor.green("请输入要删除的Blog的postId,如果不知道，请使用tizi search [来搜索],输0取消\n"));
  }
  if(postId === 0){
    console.log(clicolor.yellow("您中止了操作制作"));
    return;
  }

  for (let item of database) {
    let migrate = true;
    if(item.postId == postId){
      console.log("found the post:"+item.title);
      migrate = false;
    }
    if(migrate){
      newDatabase.push(item);
    }
  }
  database = newDatabase;
  fs.writeFileSync("./data/index.json",JSON.stringify(database));
  console.log("目前有:" + database.length+" 篇博文. " + database.length+" posts now.");
}

function importFiles(silence) {

  let database = readIndexFile();
  console.log("目前有:" + database.length+" 篇博文. " + database.length+" posts now.");
  let files = fs.readdirSync(path.join(process.cwd() + "/md/"));
  let fromLocalFiles = {};
  files.forEach(function (filename) {
    let fullname = path.join(process.cwd() + "/md/", filename);
    let stats = fs.statSync(fullname);
    if (!stats.isDirectory()) {
      for (let item of database) {
      }
      fromLocalFiles[filename] = fs.readFileSync("md/" + filename);
    }
  });
  //先检测一下database里的文件，还有没，没有的话，要删掉;
  let filesInDB = {};
  let maxId = 0;
  let newDatabase = [];
  for (let item of database) {
    let migrate = true;
    if (item.postId > maxId) {
      maxId = item.postId;
    }
    let fullname = "md/" + item.file;
    let chooseToRemove = ["确定要删除文章吗?"];
    if (!fs.existsSync(fullname)) {
      //
      tDebug("remove file " + fullname);
      let index;
      let sure;
      if(silence){
        index = true;
      }else {
        index = readlineSync.keyInSelect(chooseToRemove, clicolor.green(item.file + '已经找不到了，要删除这个发表[' + item.file + ']吗?' + "\n"));

        if (index === 0) {
          if(silence) {
            sure = "Y";
          }else{
            sure = readlineSync.question(clicolor.red("确认删除，请输入Y或y或YES或Yes\n"));
          }
          if (sure === "YES" || sure === "Y" || sure === "Yes" || sure === "y") {
            fs.unlink(path.join(process.cwd() + "/data/" + item.postId + ".json"));
            migrate = false;
          }
        }
      }
    }
    if(migrate){
      newDatabase.push(item);
    }
    filesInDB[item.file] = 1;
  }

  database = newDatabase;
  fs.writeFileSync("./data/index.json",JSON.stringify(database));
  let inFile;
  let chooseToPost = ["发表新文章/Post"];
  for (inFile in fromLocalFiles) {

    if (!filesInDB.hasOwnProperty(inFile)) {
      tDebug("new file:" + inFile);

      let index = readlineSync.keyInSelect(chooseToPost, clicolor.green('发表新文章吗?'+"\n"));
      if (index === 0) {
        //接下来问标题;
        let title = readlineSync.question(clicolor.green("请输入标题,留空则使用文件件名(" + guessNameByFileName(inFile) + ")\n"));
        console.log(clicolor.yellow("将以[" + title + "]的标题生成新文章\n"));
        let articleTitle = title.replace(/\s+/g, "");
        if (articleTitle == "") {
          articleTitle = guessNameByFileName(inFile);
        }

        let newItem = {
          title: articleTitle,
          zzzContent: fs.readFileSync(path.join(process.cwd()+"/md/"+inFile), "UTF-8"),
          postDate: formatTime(new Date()),
          postId: ++maxId,
          type: "post",
          status: "publish",
          imported: false
        };
        database.push(newItem);
        fs.writeFileSync("./data/index.json", JSON.stringify(database));
      }
    }
  }

  console.log("目前有:" + database.length+" 篇博文. " + database.length+" posts now.");

}

function importWordpress(xmlFile) {
  const yaml = require('js-yaml');
  const TurndownService = require('turndown');

  let statusField = "wp:status";
  let idField = "wp:post_id";
  let postTypeField = 'wp:post_type';
  let contentField = 'content:encoded';
  let dateField = 'wp:post_date';
  let titleField = "title";
  let turndownService = new TurndownService();
  let xml = fs.readFileSync(xmlFile);
  let allIndexes = [];
  let published = [];
  parseString(xml, function (err, result) {
    let items = result['rss']['channel'][0]['item'];
    for (let item of items) {
      let object = {
        title: item[titleField][0],
        zzzContent: item[contentField][0],
        postDate: item[dateField][0],
        postId: item[idField][0],
        type: item[postTypeField][0],
        status: item[statusField][0],
        imported: true
      };
      object.file = object.postId + ".md";
      // let text = yaml.safeDump(object, {
      //   'styles': {
      //     '!!null': 'canonical' // dump null as ~
      //   },
      //   'sortKeys': true        // sort object keys
      // });


      if (object.status != "draft") {
        fs.writeFileSync("./md/" + object.postId + ".md", turndownService.turndown(object.zzzContent));
        fs.writeFileSync("./data/" + object.postId + ".json", JSON.stringify(object));
        published.push({title: object.title, postId: object.postId, file: object.file});
      }
      //allIndexes.push({title: object.title, postId: object.postId});
    }
  });
  fs.writeFileSync("./data/index.json", JSON.stringify(published));
}

module.exports = {
  importFiles: importFiles,
  importWordpress: importWordpress,
  readIndexFile: readIndexFile,
  searchBlog:searchBlog,
  removeBlog:removeBlog
};
