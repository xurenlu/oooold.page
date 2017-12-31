const fs = require('fs');
const path = require("path");



function tDebug(msg) {
  console.log(msg);
}

module.exports = (dataDirectoryName, markdownDirectoryName) => {
  tizi = {};
  tizi.markdownDirectoryName = markdownDirectoryName;
  tizi.dataDirectoryName = dataDirectoryName;

  tizi.formatTime = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return [year, month, day].map(tizi.formatNumber).join('-') + ' ' + [hour, minute, second].map(tizi.formatNumber).join(':');
  };
  tizi.formatNumber = n => {
    n = n.toString();
    return n[1] ? n : '0' + n;
  };

  tizi.guessNameByFileName = (filename) => {
    return filename.replace(".md", "");
  };


  tizi.writeIndex = (items) => {
    fs.writeFileSync(tizi.dataDirectoryName + "/index.json", JSON.stringify(items));
  };
  tizi.readIndexFile = () => {
    try {
      let content = fs.readFileSync(tizi.dataDirectoryName + "/index.json", "UTF-8");
      items = JSON.parse(content);
      return items;
    }catch(e){
      return [];
    }
  };
  tizi.searchBlog = (title) => {

    let database = tizi.readIndexFile();
    for (let item of database) {
      if (item.title.indexOf(title)) {
        console.log((item.postId + "\t" + item.postDate + "\t" + item.title));
      }
    }
  };
  tizi.removeBlog = (postId) => {
    let database = readIndexFile();
    let newDatabase = [];
    console.log("目前有:" + database.length + " 篇博文. " + database.length + " posts now.");

    if (postId === 0) {
      console.log(("您中止了操作制作"));
      return;
    }

    for (let item of database) {
      let migrate = true;
      if (item.postId == postId) {
        console.log("found the post:" + item.title);
        migrate = false;
      }
      if (migrate) {
        newDatabase.push(item);
      }
    }
    database = newDatabase;
    tizi.writeIndex(database);
    console.log("目前有:" + database.length + " 篇博文. " + database.length + " posts now.");
  };

  tizi.importFiles = (silence) => {

    let database = tizi.readIndexFile();
    console.log("目前有:" + database.length + " 篇博文. " + database.length + " posts now.");
    let files = fs.readdirSync(tizi.markdownDirectoryName);
    let fromLocalFiles = {};
    let self = tizi;
    files.forEach(function (filename) {
      let fullname = path.join(self.markdownDirectoryName, filename);
      let stats = fs.statSync(fullname);
      if (!stats.isDirectory()) {
        for (let item of database) {
        }
        fromLocalFiles[filename] = fs.readFileSync(self.markdownDirectoryName + filename);
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
        tDebug("change to maxId:" + maxId);
      }
      let fullname = self.markdownDirectoryName + item.file;
      if (!fs.existsSync(fullname)) {
        tDebug("remove file " + fullname);
        fs.unlink(path.join(tizi.dataDirectoryName + item.postId + ".json"));
        migrate = false;
      }
      if (migrate) {
        newDatabase.push(item);
      }
      filesInDB[item.file] = 1;
    }
    tDebug("we got maxId " + maxId);
    database = newDatabase;

    tizi.writeIndex(database);
    let inFile;
    let chooseToPost = ["发表新文章/Post"];
    for (inFile in fromLocalFiles) {
      if (!filesInDB.hasOwnProperty(inFile)) {
        tDebug("new file:" + inFile);
        let articleTitle  = tizi.guessNameByFileName(inFile);
        let newItem = {
          title: articleTitle,
          zzzContent: fs.readFileSync(tizi.markdownDirectoryName + inFile, "UTF-8"),
          postDate: tizi.formatTime(new Date()),
          postId: ++maxId,
          type: "post",
          status: "publish",
          imported: false,
          file: inFile
        };
        database.push(newItem);
        tizi.writeIndex(database);
      }
    }
    tDebug("目前有:" + database.length + " 篇博文. " + database.length + " posts now.");
  };

  tizi.importWordpress = (xmlFile) => {
    const parseString = require('xml2js').parseString;
    const yaml = require('js-yaml');
    const TurndownService = require('turndown');
    if(!yaml){
      let msg = "you should install yarm:\nnpm install ys-yaml";
      tDebug(msg);
      throw new Error(msg);
    }
    if(!TurndownService) {
      let msg = "you should install turndown:\nnpm install turndown";
      tDebug(msg);
      throw new Error(msg);
    }

    let statusField = "wp:status";
    let idField = "wp:post_id";
    let postTypeField = 'wp:post_type';
    let contentField = 'content:encoded';
    let dateField = 'wp:post_date';
    let titleField = "title";
    let turndownService = new TurndownService();

    //先检测xmlFile是否存在;
    if(!fs.existsSync(xmlFile)){
      let msg = "xmlFile "+ xmlFile +" not exists. PROCESS.CWD:" + process.cwd();
      tDebug(msg);
      throw new Error(msg);
    }

    let xml = fs.readFileSync(xmlFile);
    let published = [];
    parseString(xml, function (err, result) {
      let items = result['rss']['channel'][0]['item'];
      for (let item of items) {
        let id = parseInt(item[idField][0]);
        if (!(id > 0)) {
          continue;
        }
        let object = {
          title: item[titleField][0],
          zzzContent: item[contentField][0],
          postDate: item[dateField][0],
          postId: id,
          type: item[postTypeField][0],
          status: item[statusField][0],
          imported: true
        };
        object.file = object.postId + ".md";
        if (object.status != "draft") {
          fs.writeFileSync(tizi.markdownDirectoryName + object.postId + ".md", turndownService.turndown(object.zzzContent));
          fs.writeFileSync(tizi.dataDirectoryName + object.postId + ".json", JSON.stringify(object));
          published.push({title: object.title, postId: object.postId, file: object.file, postDate: object.postDate});
        }
      }
    });
    tizi.writeIndex(published);
  };
  return tizi;
};
