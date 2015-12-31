var fs = require('fs');

function compareLetters(a,b) {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

function compareNumbers(a,b) {
  return a - b;
}

function indexer(files) {
  var fileArr = arguments;
  var obj = {};
  finalObj = {};
  for (var i = 0; i < fileArr.length; i++) {
    var fileContents = fs.readFileSync(fileArr[i], 'utf8');
    var fileNoSpecChar = fileContents.replace(/[^\w\s]/gi, '');
    var linesArr = fileNoSpecChar.split('\n');
    obj[fileArr[i]] = linesArr;
  }
  for (var i = 0; i < fileArr.length; i++) {
    var fileName = fileArr[i];
    var fileLines = obj[fileName];
    for (var j = 0; j < fileLines.length; j++) {
      var words = fileLines[j].split(' ');
      var lineNum = j + 1;
      for (var k = 0; k < words.length; k++) {
        var wordLowerCase = words[k].toLowerCase();
        if (wordLowerCase !== '') {
          if (finalObj.hasOwnProperty(wordLowerCase)) {
            if (finalObj[wordLowerCase].hasOwnProperty(fileName)) {
              if (finalObj[wordLowerCase][fileName].indexOf(lineNum) === -1) finalObj[wordLowerCase][fileName].push(lineNum);
            } else {
              finalObj[wordLowerCase][fileName] = [lineNum];
            }
          } else {
            finalObj[wordLowerCase] = {};
            finalObj[wordLowerCase][fileName] = [lineNum];
          }
        }
      }
    }
  }
  var wordsAlphabetize = Object.keys(finalObj).sort(compareLetters);
  for (var i = 0; i < wordsAlphabetize.length; i++) {
    var wordToPrint = wordsAlphabetize[i];
    var fileNamesAlphabetize = Object.keys(finalObj[wordToPrint]).sort(compareLetters);
    console.log(wordToPrint);
    for (var j = 0; j < fileNamesAlphabetize.length; j++) {
      var fileNameToPrint = fileNamesAlphabetize[j];
      var lineNumsOrdered = finalObj[wordToPrint][fileNameToPrint].sort(compareNumbers);
      var lineNumsStr = '';
      for (var k = 0; k < lineNumsOrdered.length; k++) {
        lineNumsStr += " " + lineNumsOrdered[k];
      }
      console.log('\t', fileNameToPrint, lineNumsStr);
    }
  }

}

indexer('file1.txt','file2.txt','file3.txt');
