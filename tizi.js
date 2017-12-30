
const fs = require('graceful-fs');
const path = require('path');
const yaml = require('js-yaml');
//const files = tizi.map("./md/",".md");
// console.log(files);
// for(let file of files){
//   console.log(file)
// }

let statusField = "wp:status";
let idField = "wp:post_id";
let postTypeField='wp:post_type';
let contentField = 'content:encoded';
let dateField = 'wp:post_date';
let titleField = "title";
let parseString = require('xml2js').parseString;




let xml = fs.readFileSync("./wp.xml");
let allIndexes = [];
parseString(xml, function (err, result) {
  let items = result['rss']['channel'][0]['item'];
  for(let item of items){
    if( "1430" == item[idField][0] ){
      console.log(item);
    }
    console.log(item["title"][0]);
    let object = {
      title:item[titleField][0],
      zzzContent:item[contentField][0],
      postDate:item[dateField][0],
      postId:item[idField][0],
      type:item[postTypeField][0],
      status:item[statusField][0]
    };
    let text = yaml.safeDump (object, {
      'styles': {
        '!!null': 'canonical' // dump null as ~
      },
      'sortKeys': true        // sort object keys
    });
    fs.writeFileSync("./data/"+object.postId+".yml",text);
    fs.writeFileSync("./data/"+object.postId+".json",JSON.stringify(object));
    if(object.status!="draft") {
      allIndexes.push({title: object.title, postId: object.postId});
    }
  }
});

fs.writeFileSync("./data/index.json",JSON.stringify( allIndexes) );

// try {
//   var doc = yaml.safeLoad(fs.readFileSync('/home/ixti/example.yml', 'utf8'));
//   console.log(doc);
// } catch (e) {
//   console.log(e);
// }
