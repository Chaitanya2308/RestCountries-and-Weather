document.body.style.backgroundColor="gray";
var container=document.createElement('div');
container.setAttribute('class','container')
var title_text=document.createElement('h1');
title_text.classList.add('text-center','fold-weight-bold','text-white');
title_text.innerText="RestCountries and Weather Using fetch Api";

var main_div=document.createElement('div');
 main_div.setAttribute('class','row');

async function CountryData(url)
{
    let data=await fetch(url);
    let countrydata= await data.json();
    return countrydata;
}
async function WeatherData(lat, long)
{
    let data=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=933c8f1b8cac4156b70f2f2b2d8303bf`)
    let weatherdata=await data.json();
    alert("Temparature: " +weatherdata.main.temp+" F " +"\n Description: "+weatherdata.weather[0].description);
}

async function DisplayData()
{
    try{
        let data=await CountryData('https://restcountries.eu/rest/v2/all')
        console.log(data);
        for(let i=0;i<data.length;i++)
        {
            
            let  outer_div=document.createElement('div');
            outer_div.setAttribute("style","display:flex;justify-content:center;padding:5px;")
            outer_div.classList.add('col-lg-4','col-sm-12');
            
            let card_div=document.createElement('div');
            card_div.classList.add('card');

            let country=document.createElement('div');
            country.classList.add('text-white','card-header','bg-dark','text-center');
            country.innerText=data[i]["name"];

            let flag=document.createElement('img');
            flag.classList.add('card-iamge-top','img-fluid','img-thumbnail');
            flag.alt="Country Flag";
            flag.src=data[i]["flag"];

            let card_body = document.createElement("div")
            card_body.setAttribute("class","card-body")

            let card_capital=document.createElement('p');
            card_capital.classList.add('card-text');
            card_capital.innerText="Capital: "+ data[i]['capital'];

            let card_region=document.createElement('p');
            card_region.classList.add('card-text');
            card_region.innerText="Region: "+data[i]["region"];


            let card_location=document.createElement('p');
            card_location.setAttribute('class','card-text');
            card_location.innerText="LatLong: "+data[i]['latlng'];
            let lat=data[i]['latlng'][0];
            let long=data[i]['latlng'][1];
            
            let card_code= document.createElement('p');
            card_code.setAttribute('class','card-text');
            card_code.innerText="Code: "+data[i]["cioc"];


            let button=document.createElement('button');
            button.classList.add('btn','btn-primary');
            button.setAttribute("onclick",`WeatherData(${lat},${long})`)
            button.innerText="Click For Weather"


            card_body.append(card_capital,card_region,card_location, card_code,button);
            card_div.append(country,flag,card_body);
            outer_div.append(card_div)
            main_div.append(outer_div);
            container.append(title_text, main_div);
            document.body.append(container)

        }

    }
    catch(error)
    {
        console.log(error);
    }
}

DisplayData();
