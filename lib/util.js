const util = {
  encode(str){
    return str.replace(/[\s]/g,"-").
    replace(/[\/]/g,"-").
      replace(/[\\]/g,"-").
      replace(/[\"]/g,"-").
      replace(/[\']/g,"-").
    replace(/[-]{2,}/g,"-");
  }
};

module.exports = util;
