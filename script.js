const API_KEY= process.env.NEWS_API_KEY;

const url= "https://newsapi.org/v2/everything?q=";
const queryUpdate= document.getElementById("query-update");

window.addEventListener('load', () => fetchNews("India"));

function reload(){
    window.location.reload();
}
async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    bindData(data.articles);
    queryUpdate.innerHTML= query.replace(/^./, query[0].toUpperCase());
}

function bindData(articles){
    const cardsContainer= document.getElementById("cards-container");
    const newsCardTemplate= document.getElementById("news-card-template");

    cardsContainer.innerHTML= "";

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone= newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImage= cardClone.getElementById('news-image');
    const newsTitle= cardClone.querySelector('#news-title');
    const newsSource= cardClone.querySelector('#news-source');
    const newsDescription= cardClone.querySelector('#news-description');


    const date= new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });


    newsImage.src= article.urlToImage;
    newsTitle.innerHTML= article.title;
    newsSource.innerHTML= `${article.source.name} > ${date}`;
    newsDescription.innerHTML= article.description;
    
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
    
}

let curSelectedNav= null;
function navItemClicked(id){
    fetchNews(id);
    const navItem= document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav= navItem;
    curSelectedNav.classList.add("active");
}

const inputText= document.getElementById('input-text');
const searchButton= document.getElementById("search-button");

searchButton.addEventListener("click", ()=>{
    const query= inputText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav= null;
});