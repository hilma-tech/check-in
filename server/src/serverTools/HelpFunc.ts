module.exports.fixString = (str: string): string => {
    let searchArr = str.split("'");
    let newStr = '';
    for (let i = 0; i < searchArr.length; i++) {
      newStr += searchArr[i] + (searchArr.length - 1 === i ? '' : "\\'");
    }
    newStr = '%' + newStr.split('%').join('\\%') + '%';
  
    return newStr;
  };