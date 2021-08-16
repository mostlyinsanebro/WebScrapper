//let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";

let request=require("request");
let cheerio=require("cheerio");
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
        console.log(playerName);
      }
    }
    console.log("```````````````````````````````````````````");
  }

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