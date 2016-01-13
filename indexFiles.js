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
    finalObj = buildFinalObject(fileLines, fileName, finalObj);
  }
  printIndex(finalObj);
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

function buildFinalObject(fileLines, fileName, finalObj) {
  for (var i = 0; i < fileLines.length; i++) {
    var words = fileLines[i].split(' ');
    var lineNum = i + 1;
    var finalObj = organizeFinalObject(words, lineNum, fileName, finalObj);
  }
  return finalObj;
}

function organizeFinalObject(words, lineNum, fileName, finalObj) {
  for (var i = 0; i < words.length; i++) {
    var wordLowerCase = words[i].toLowerCase();
    if (wordLowerCase !== '') {
      if (!finalObj.hasOwnProperty(wordLowerCase))
        finalObj[wordLowerCase] = {};
      if (!finalObj[wordLowerCase].hasOwnProperty(fileName))
        finalObj[wordLowerCase][fileName] = [];
      if (finalObj[wordLowerCase][fileName].indexOf(lineNum) === -1)
        finalObj[wordLowerCase][fileName].push(lineNum);
    }
  }
  return finalObj;
}

function printIndex(finalObj) {
  var wordsAlphabetize = Object.keys(finalObj).sort(compareLetters);
  printWords(finalObj, wordsAlphabetize);
}

function printWords(finalObj, wordsAlphabetize) {
  for (var i = 0; i < wordsAlphabetize.length; i++) {
    var wordToPrint = wordsAlphabetize[i];
    console.log(wordToPrint);
    getFileNameAndLineNums(finalObj, wordToPrint);
  }
}

function getFileNameAndLineNums(finalObj, wordToPrint) {
  var fileNamesAlphabetize = Object.keys(finalObj[wordToPrint]).sort(compareLetters);
  for (var i = 0; i < fileNamesAlphabetize.length; i++) {
    var fileNameToPrint = fileNamesAlphabetize[i];
    var lineNumsOrdered = finalObj[wordToPrint][fileNameToPrint].sort(compareNumbers);
    printFileNameAndLineNums(fileNameToPrint, lineNumsOrdered);
  }
}

function printFileNameAndLineNums(fileNameToPrint, lineNumsOrdered){
  var lineNumsStrToPrint = '';
  for (var i = 0; i < lineNumsOrdered.length; i++) {
    lineNumsStrToPrint += " " + lineNumsOrdered[i];
  }
  console.log('\t', fileNameToPrint, lineNumsStrToPrint);
}

indexer('file1.txt','file2.txt','file3.txt');
