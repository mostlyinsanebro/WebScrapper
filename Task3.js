//let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";

let request=require("request");
let cheerio=require("cheerio");
let path=require("path");

let xlsx=require("xlsx");
let fs=require("fs");

function processMatch(url)
{
  request(url,cb);
}

function cb(error,response,html)
{
    if(error)
    {
        console.log(error);
    }

    else if(response.statusCode==404)
    {
        console.log("Page Not Found");
    }

    else{
        dataExtractor(html);
    }
}

function dataExtractor(html)
{
  let searchTool=cheerio.load(html);

  let TeamsArr=searchTool(".Collapsible");

  let finalData="";
  for(let i=0;i<TeamsArr.length;i++)
  {
    // finalData=searchTool(TeamsArr[i]).html();
    // fs.writeFileSync(`innings${i+1}.html`,finalData);
    let teamNameArr=searchTool(TeamsArr[i]).find("h5");
    let teamName=searchTool(teamNameArr[0]).text();

    teamName=teamName.split("INNINGS")[0];
    console.log(teamName);
    console.log("->");
    
    let BatsmenTables=searchTool(TeamsArr[i]).find(".table.batsman tbody tr");
    for(let j=0;j<BatsmenTables.length;j++)
    {
      let Columns=searchTool(BatsmenTables[j]).find("td");
      if(Columns.length==8)
      {
        let playerName=searchTool(Columns[0]).text();
        let runs=searchTool(Columns[2]).text();
        let balls=searchTool(Columns[3]).text();
        let fours=searchTool(Columns[5]).text();
        let sixes=searchTool(Columns[6]).text();
        let sr=searchTool(Columns[7]).text();
      //   console.log(playerName+"played for "+teamName+" and scored "+runs+" runs in "+balls+" balls with "+fours+" fours and "+sixes+" sixes with a sr of "+sr);
      processPlayer(playerName,teamName,runs,balls,fours,sixes);
     }
    }
    console.log("```````````````````````````````````````````");
  }
}

function processPlayer(playerName, teamName, runs, balls, fours, sixes) {
  let obj = {
      playerName,
      teamName,
      runs,
      balls,
      fours,
      sixes
  }
  let dirPath = path.join(__dirname, teamName);
//    folder 
  if (fs.existsSync(dirPath) == false) {
      fs.mkdirSync(dirPath)
  }
  // playerfile 
  let playerFilePath = path.join(dirPath, playerName + ".xlsx");
  let playerArray = [];
  if (fs.existsSync(playerFilePath) == false) {
      playerArray.push(obj);
  } else {
      // append
      playerArray = excelReader(playerFilePath,playerName);
      playerArray.push(obj);
  }
  // write in the files
  // writeContent(playerFilePath, playerArray);
  excelWriter(playerFilePath,playerArray,playerName);
}


function excelWriter(filePath, json, sheetName) {
  // workbook create
  let newWB = xlsx.utils.book_new();
  // worksheet
  let newWS = xlsx.utils.json_to_sheet(json);
  xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
  // excel file create 
  xlsx.writeFile(newWB, filePath);
}
// // json data -> excel format convert
// // -> newwb , ws , sheet name
// // filePath
// read 
//  workbook get
function excelReader(filePath, sheetName) {
  // player workbook
  let wb = xlsx.readFile(filePath);
  // get data from a particular sheet in that wb
  let excelData = wb.Sheets[sheetName];
  // sheet to json 
  let ans = xlsx.utils.sheet_to_json(excelData);
  return ans;
}
module.exports={
  pm:processMatch
}












  // let searchTool=cheerio.load(html);
    // let teamNames=searchTool(".event .teams .team .name-detail");
    // //Team Name 1
    // console.log(searchTool(teamNames[0]).text());

    // let tables=searchTool(".table.batsman");
   
    // let table1=searchTool(tables[0]).find("tbody tr");
    // let fdata="";
    // for(let i=0;i<tables.length-1;i++)
    // {
    //     fdata+=searchTool(table1[i]).html();
    //     //fdata+=searchTool(ans[0]).text();
        
    // }
    // console.log(fdata);
    // // console.log("```````````````````````````````");
    // // console.log(searchTool(teamNames[1]).text().trim());
   
   
    // // let table2=searchTool(tables[1]).find("tbody tr");
    // // for(let i=0;i<table2.length-1;i++)
    // // {
    // //     let ans=searchTool(table2[i])
    // //     console.log(searchTool(ans[0]).text().trim());
        
    // // }