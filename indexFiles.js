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
  var finalObj = {};
  var obj1 = putArrayOfLinesIntoObj(fileArr);
  for (var i = 0; i < fileArr.length; i++) {
    var fileName = fileArr[i];
    var fileLines = obj1[fileName];
    finalObj = separateWords(fileLines, fileName, finalObj);
  }
  console.log(finalObj);
}

function putArrayOfLinesIntoObj(fileArr) {
  var objectOfLinesArray = {};
  for (var i = 0; i < fileArr.length; i++) {
    var fileContents = fs.readFileSync(fileArr[i], 'utf8');
    var fileNoSpecChar = fileContents.replace(/[^\w\s]/gi, '');
    var linesArr = fileNoSpecChar.split('\n');
    objectOfLinesArray[fileArr[i]] = linesArr;
  }
  return objectOfLinesArray;
}

function separateWords(fileLines, fileName, finalObj) {
  var tempObj1 = finalObj;
  for (var i = 0; i < fileLines.length; i++) {
    var words = fileLines[i].split(' ');
    var lineNum = i + 1;
    var tempObj2 = buildFinalObject(words, lineNum, fileName, tempObj1);
    tempObj1 = tempObj2;
  }
  return tempObj1;
}

function buildFinalObject(words, lineNum, fileName, finalObj) {
  var tempObj1 = finalObj;
  for (var i = 0; i < words.length; i++) {
    var wordLowerCase = words[i].toLowerCase();
    if (wordLowerCase !== '') {
      if (!tempObj1.hasOwnProperty(wordLowerCase))
        tempObj1[wordLowerCase] = {};
      if (!tempObj1[wordLowerCase].hasOwnProperty(fileName))
        tempObj1[wordLowerCase][fileName] = [];
      if (tempObj1[wordLowerCase][fileName].indexOf(lineNum) === -1)
        tempObj1[wordLowerCase][fileName].push(lineNum);
    }
  }
  return tempObj1;
}
//   var wordsAlphabetize = Object.keys(finalObj).sort(compareLetters);
//   for (var i = 0; i < wordsAlphabetize.length; i++) {
//     var wordToPrint = wordsAlphabetize[i];
//     var fileNamesAlphabetize = Object.keys(finalObj[wordToPrint]).sort(compareLetters);
//     console.log(wordToPrint);
//     for (var j = 0; j < fileNamesAlphabetize.length; j++) {
//       var fileNameToPrint = fileNamesAlphabetize[j];
//       var lineNumsOrdered = finalObj[wordToPrint][fileNameToPrint].sort(compareNumbers);
//       var lineNumsStr = '';
//       for (var k = 0; k < lineNumsOrdered.length; k++) {
//         lineNumsStr += " " + lineNumsOrdered[k];
//       }
//       console.log('\t', fileNameToPrint, lineNumsStr);
//     }
//   }
//
// }

indexer('file1.txt','file2.txt','file3.txt');
