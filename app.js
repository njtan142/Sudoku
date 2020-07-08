const buttons = document.querySelectorAll(".btn-containers button");
const values = document.querySelectorAll(".values button");
const reset = document.getElementById("reset");
const title = document.getElementById("title");
const win = document.getElementById("win");
console.log(title);
reset.onclick = function () {
  gameReset();
};
var value;
const array = [];
array.length = 81;
console.log(array);
var groupedValues = [];
var columnGroups = [];
var rowGroups = [];
for (let i = 0; i < values.length - 1; i++) {
  values[i].addEventListener("click", function () {
    if (values[i].innerHTML == " ") {
      value = undefined;
    } else {
      value = i + 1;
    }
    values.forEach(function (button) {
      if (button.innerHTML != "Reset") {
        button.style.backgroundColor = "rgb(177, 175, 175)";
      }
    });
    values[i].style.backgroundColor = "blue";
  });
}
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    buttons[i].innerHTML = value == undefined ? "" : value;
    array[i] = value;
    groupedValues = arrayChunk(array, 9);
    columnGroups = columnValues(array);
    rowGroups = rowValues(array);
    if (
      checkChunk(groupedValues) ||
      checkChunk(columnGroups) ||
      checkChunk(rowGroups)
    ) {
      buttons.forEach(function (button) {
        button.style.border = "1px solid red";
        title.style.color = "red";
      });
    } else {
      buttons.forEach(function (button) {
        button.style.border = "1px solid gray";
        title.style.color = "black";
      });
    }
    if (
      checkWin(groupedValues) &&
      checkWin(columnGroups) &&
      checkWin(rowGroups)
    ) {
      win.style.display = "flex";
    }
  });
}
function arrayChunk(array, num) {
  let chunkedArray = [];
  for (let i = 0; i * num < array.length; i++) {
    let groupedArray = [];
    for (let j = 0; j < num; j++) {
      groupedArray.push(array[i * num + j]);
    }
    chunkedArray.push(groupedArray);
  }
  return chunkedArray;
}
function gameReset() {
  buttons.forEach(function (button) {
    button.innerHTML = "";
  });
  values.forEach(function (button) {
    if (button.innerHTML != "Reset") {
      button.style.backgroundColor = "rgb(177, 175, 175)";
    }
  });
  value = undefined;
  for (let i = 0; i < array.length; i++) {
    array[i] = undefined;
  }
  buttons.forEach(function (button) {
    button.style.border = "1px solid gray";
    title.style.color = "black";
  });
  win.style.display = "none";
}
function checkChunk(array) {
  for (let group of array) {
    let values = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
    };
    for (let value of group) {
      if (value == undefined) {
      } else if (values[value] >= 1) {
        return true;
      } else {
        values[value]++;
      }
    }
  }
  return false;
}
function columnValues(array) {
  let groupedArray = [];
  let columns = [0, 1, 2, 9, 10, 11, 18, 19, 20];
  for (let i = 0; i < 9; i++) {
    let group = [
      array[columns[i]],
      array[columns[i] + 3],
      array[columns[i] + 6],
      array[columns[i] + 27],
      array[columns[i] + 30],
      array[columns[i] + 33],
      array[columns[i] + 54],
      array[columns[i] + 57],
      array[columns[i] + 60],
    ];
    groupedArray.push(group);
  }
  return groupedArray;
}
function rowValues(array) {
  let groupedArray = [];
  let rows = [0, 3, 6, 27, 30, 33, 54, 57, 60];
  for (let i = 0; i < 9; i++) {
    let group = [
      array[rows[i]],
      array[rows[i] + 1],
      array[rows[i] + 2],
      array[rows[i] + 9],
      array[rows[i] + 10],
      array[rows[i] + 11],
      array[rows[i] + 18],
      array[rows[i] + 19],
      array[rows[i] + 20],
    ];
    groupedArray.push(group);
  }
  return groupedArray;
}
function checkWin(array) {
  for (let group of array) {
    let values = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
    };
    for (let value of group) {
      if (value == undefined) {
        return false;
      } else if (values[value] >= 1) {
        return false;
      } else {
        values[value]++;
      }
    }
  }
  return true;
}
// for(let i = 0; i < buttons.length; i++){
//   setTimeout(function(){
//     buttons[i].style.padding = '2em';
//   },i*5)
//   setTimeout(function(){
//     buttons[i].style.padding ='0';
//   },(buttons.length-1+i)*5)
// }