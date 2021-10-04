// Fonction permettant d'afficher les 10 premiers articles donner en arguments
function printResult(articles){
    let tabTitle = []; // Tableau qui va nous servir pour obtenir les détails d'un article
    for(let i = 0; i < 10; i++){ // On boucle 10 fois pour les 10 premiers articles
        let listInformation = document.createElement('ul'); // Création du ul pour la liste des informations
        // On ajoute un li contenant le nom de l'article, ce même nom est un lien vers l'URL de l'article.
        let insertArticleName = document.createElement('li');
        let createA = document.createElement('a');
        let articleName = document.createTextNode(articles[i].title);
        createA.setAttribute('href',articles[i].url);
        createA.appendChild(articleName);
        insertArticleName.appendChild(createA);
        listInformation.appendChild(insertArticleName);
        // On ajoute un li contenant le bouton qui va permettre d'afficher les détails de l'article en question.
        let insertButtonDetail = document.createElement('li');
        let createB = document.createElement('button');
        let idButton = "detail" + i;
        createB.setAttribute('id',idButton);
        let buttonText = document.createTextNode("Détail");
        createB.appendChild(buttonText);
        insertButtonDetail.appendChild(createB);
        listInformation.appendChild(insertButtonDetail);
        // On ajoute un li contenant l'image de l'article.
        let insertImage = document.createElement('li');
        let createI = document.createElement('img');
        createI.setAttribute('src',articles[i].urlToImage);
        let altImage = "Image : " + articles[i].title;
        createI.setAttribute('alt',altImage);
        insertImage.appendChild(createI);
        listInformation.appendChild(insertImage);
        // Finalement on ajoute notre ul dans la division déjà présente sur la page HTML
        document.getElementById('div1').appendChild(listInformation);
        tabTitle[i] = articles[i].title; // On ajoute à notre tableau le titre de l'article courant
    }
    // On crée un listener sur tous les boutons détail des articles (c'est ici que notre tableau est utilisé).
    let inputDetail;
    for(let i = 0; i < 10; i++){
        inputDetail = document.getElementById("detail" + i);
        // On donne à la fonction du listener le titre de l'article concerné.
        inputDetail.addEventListener("click",function(){detail(tabTitle[i])});
    }
}
// La fonction détail est la fonction du listener pour le bouton détail, elle permet d'envoyer l'utilisateur
// vers les détails de l'article voulu.
function detail(titleArticle){
    let myStorage = window.localStorage;
    myStorage.clear();
    myStorage.setItem('article',titleArticle); // J'utilise le localStorage pour que la page se souvienne de l'article sélectionné.
    document.location.href="detail.html"; // On envoie l'utilisateur vers la page de détail.
}
// Fonction du listener pour le bouton de recherche qui renvoie vers la page de recherche.
function recherche(event){
    document.location.href="researchPage.html";
}
// "Main" -------------------------------------------------------

// J'appelle mon api avec ma clé (clé qui ne permet pas de mettre le site web en ligne,
// pour cela il faut acheter le service de News Api, dans notre cas on lance le site directement sur
// notre localHost. Pour plus d'informations consulter le readme.
let url = 'https://newsapi.org/v2/top-headlines?' + // Pour la page d'accueil, on ne récupère que les actus du moment (d'où le top-headlines).
    'country=fr&' +
    'apiKey=3337409b517a4956a505420d50ce684f';
let req = new Request(url);
fetch(req).then((res)=>{
        return res.json();
    }).then((data)=>{
        printResult(data.articles); // On récupère les articles, et on les envoie dans la fonction printResult.
    })
// On place les listeners pour les différents boutons (page de recherche et tous les boutons détails pour les articles).
let inputRecherche = document.getElementById("searchPage");
inputRecherche.addEventListener("click",recherche);
let inputDetail;
for (let i = 0; i < 10; i++) {
    let id = "detail" + i;
    inputDetail = document.getElementById(id);
    inputDetail.addEventListener("click", detail);
}