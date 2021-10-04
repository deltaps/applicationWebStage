// Fonction permettant d'afficher tous les détails de l'article sélectionner.
function printDetail(articles){
    let article = articles[0]; // On récupère l'article
    let listInformation = document.createElement('ul');// Création du ul pour la liste des informations
    // On ajoute un li contenant le nom de l'article.
    let insertArticleName = document.createElement('li');
    let createName = document.createElement('p');
    let articleName = document.createTextNode("Titre de l'article : " + article.title);
    createName.appendChild(articleName);
    insertArticleName.appendChild(createName);
    listInformation.appendChild(insertArticleName);
    // On ajoute un li contenant le contenu de l'article.
    let insertArticleContent = document.createElement('li');
    let createContent = document.createElement('p');
    let articleContent = document.createTextNode("Contenu de l'article : " + article.content);
    createContent.appendChild(articleContent);
    insertArticleContent.appendChild(createContent);
    listInformation.appendChild(insertArticleContent);
    // On ajoute un li contenant la description de l'article.
    let insertArticleDescription = document.createElement('li');
    let createDescription = document.createElement('p');
    let articleDescription = document.createTextNode("Description de l'article : " + article.description);
    createDescription.appendChild(articleDescription);
    insertArticleDescription.appendChild(createDescription);
    listInformation.appendChild(insertArticleDescription);
    // On ajoute un li contenant la date de publication de l'article.
    let insertArticleDate = document.createElement('li');
    let createDate = document.createElement('p');
    let articleDate = document.createTextNode("Date de publication de l'article : " + article.publishedAt);
    createDate.appendChild(articleDate);
    insertArticleDate.appendChild(createDate);
    listInformation.appendChild(insertArticleDate);
    // On ajoute un li contenant le lien de l'article.
    let insertArticleUrl = document.createElement('li');
    let createUrl = document.createElement('p');
    let createA = document.createElement('a');
    let articleHref = document.createTextNode(article.url);
    createA.setAttribute('href',article.url);
    createA.appendChild(articleHref);
    let articleUrl = document.createTextNode("Lien de l'article : ");
    createUrl.appendChild(articleUrl);
    createUrl.appendChild(createA);
    insertArticleUrl.appendChild(createUrl);
    listInformation.appendChild(insertArticleUrl);
    // Finalement on ajoute notre ul dans la division déjà présente sur la page HTML
    document.getElementById('div1').appendChild(listInformation);
}
// Fonction du listener pour le bouton de retour à la page d'accueil.
function homePage(event){
    document.location.href="index.html";
}
// "Main" ----------------------------------------------------------
// On récupère le titre de l'article dans le localStorage.
let myStorage = window.localStorage;
let titleArticle = myStorage.getItem('article');
let url = 'https://newsapi.org/v2/top-headlines?' +
    'country=fr&' +
    'q=' +
    titleArticle + // On demande à l'api de faire une recherche pour le nom de l'article (cela nous donne donc l'article sélectionner)
    '&' +
    'apiKey=3337409b517a4956a505420d50ce684f';
let req = new Request(url);
fetch(req).then((res)=>{
    return res.json();
}).then((data)=>{
    printDetail(data.articles); // On récupère l'article, et on l'envoie dans la fonction printResult.
})
// On place le listener pour le bouton de retour à l'accueil.
let inputHomePage = document.getElementById("returnHome");
inputHomePage.addEventListener("click",homePage);
