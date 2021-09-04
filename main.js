//required the needed node modules and the external js file using require()
let cheerio=require("cheerio");
let request=require("request");

let scoreCardObject=require("./Task3");

//We are given the main URL of the website
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";

//We will make a request to that website
request(url,cb);


//In the callback function call the linkExtractor() , which will extract the link 
function cb(error,response,html)
{
    if(error)
    {
        console.log("error");
    }
    else if(response.statusCode==404)
    {
        console.log("Page Not Found");
    }

    else{
        linkExtractor(html);
    }
}

function linkExtractor(html)
{

    let searchTool=cheerio.load(html);


   
    let a=searchTool(".widget-items.cta-link");
    
    let b=searchTool(a).find("a");
    let link=searchTool(b).attr("href");
    let fulllink=`https://www.espncricinfo.com${link}`;
    request(fulllink,newcb);

}

function newcb(error,response,html)
{
    if(error)
    {
        console.log("error");
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

    let scoreCardarr=searchTool('a[data-hover="Scorecard"]');
    for(let i=0;i<scoreCardarr.length;i++)
    {
        let scoreCard=searchTool(scoreCardarr[i]);
        let sclink=searchTool(scoreCard).attr("href");
        let fulllink=`https://www.espncricinfo.com${sclink}`;
        // console.log(fulllink);
        scoreCardObject.pm(fulllink);
    }
}

// function latestcb(error,response,html)
// {
//     if(error)
//     {
//         console.log("error");
//     }
//     else if(response.statusCode==404)
//     {
//         console.log("Page Not Found");
//     }

//     else{
//         statsExtractor(html);
//     }
// }

// function statsExtractor(html)
// {
//     let searchTool=cheerio.load(html);

//     let a=searchTool(".event .teams");
//     console.log(a.length);
// }