alert("You can make a sudoku puzzle by clicking on each cell and putting a value in it.\n\nClick on solve button for solution to puzzle.");
alert("Thanks for trying my program.");

window.onload = function() {
  puzzleTable = document.getElementById('puzzle');
};

function resetPuzzle() {    
  Array.from(document.getElementsByTagName('td'))
  .forEach(cell =>{ cell.textContent = ''; });
}

function isRowValid(row, y) {
    for(var i=0;i<9;i++)
      if((puzzleTable.children[0].children[row-1]
      .children[i].textContent) == y)
        return 0;    
    return 1; 
}

function isColValid(col, y) {
    for(var i=0;i<9;i++)
      if((puzzleTable.children[0].children[i]
      .children[col-1].textContent) == y)
        return 0;
    return 1;     
}

function isBoxValid(row, col, y) {
    var bx=3*Math.floor(row/3), by=3*Math.floor(col/3);
    for(var i=0;i<3;i++)
      for(var j=0;j<3;j++)
        if((puzzleTable.children[0].children[bx+i]
        .children[by+j].textContent)==y)
          return 0;
    return 1;
}

function takeInput(obj, row, col) {
  var y = prompt("Enter a number from 1 to 9");        
  if(y == ''){
    alert("Cell is left blank, enter a number from 1 to 9");
    return;
  }    
  if(y<1 || y>9 || ((y-Math.floor(y)) != 0)){
    alert("Enter an integer number from 1 to 9 only");
    return;
  }        
  if(!isRowValid(row, y)){
    alert(y+ " is already present in row, enter another number from 1 to 9");          
    return;
  }        
  if(!isColValid(col, y)){
    alert(y+ " is already present in column, enter another number from 1 to 9"); 
    return;
  }        
  if(!isBoxValid(row-1, col-1, y)){
    alert(y+ " is already present in colored 3×3 box, enter another number from 1 to 9");
    return;
  } 
  obj.textContent = y;
}    

function boxClicked(row, col) {    
  let clickedBox = puzzleTable.children[0].
  children[row-1].children[col-1]  
  takeInput(clickedBox,row,col);   
}

function canPlace(r, c, y){ 
  for(var i=0;i<9;i++){
    if(mat[i][c]==y)
      return 0;
    if(mat[r][i]==y)
      return 0;
  }  
  var bx=3*Math.floor(r/3);
  var by=3*Math.floor(c/3);  
  for(var i=0;i<3;i++)
    for(var j=0;j<3;j++)
      if((mat[bx+i][by+j])==y)
        return 0;
  return 1;
}

function solve(r, c){
    if(r == 9)
      return 1;
    if(c == 9)
      return solve(r+1, 0);
    if(mat[r][c] != 0)
      return solve(r, c+1);
    for(var y=1;y<=9;y++){
      if(canPlace(r, c, y)){
        mat[r][c]=y;           
        var success=solve(r, c+1);
        if(success)            
          return 1;
        mat[r][c]=0;    
      }
    }
    return 0;
}  

function solveSudoku() {    
  var k;
  mat=[];
  for(var i=0;i<9;i++)
    mat[i] = [];
  for(var i=0;i<9;i++)
    for(var j=0;j<9;j++){
      k=puzzleTable.children[0].children[i]
        .children[j].textContent;
      if(k=='')
        mat[i][j]=0;
      else
        mat[i][j]=k;
    }
  var solFound = solve(0, 0);
  if(!solFound)
    alert("No solution to this sudoku puzzle found, you can modify or reset this puzzle");
  else
    for(var i=0;i<9;i++)
      for(var j=0;j<9;j++)
        puzzleTable.children[0].children[i]
        .children[j].textContent = mat[i][j];      
}

