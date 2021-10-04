// Fonction pour le listener du bouton recherche.
function rechercher(event){
    let input = document.getElementById('article-search'); // On récupère ce que l'utilisateur à entrer.
    if(input.value == ""){ // On vérifie si la barre de recherche est vide.
        console.log("NUll");
    }
    else{
        // On appelle l'api pour récupérer les articles en fonction de la recherche effectuée.
        let url = 'https://newsapi.org/v2/top-headlines?' +
            'country=fr&' +
            'q=' +
            input.value +
            '&' +
            'apiKey=3337409b517a4956a505420d50ce684f';
        let req = new Request(url);
        fetch(req).then((res)=>{
            return res.json();
        }).then((data)=>{
            createResult(data.articles); // On récupère les articles, et on les envoie dans la fonction createResult.
        })
    }
}
//Fonction permettant d'afficher les articles rechercher par l'utilisateur.
function createResult(response){
    /* On vérifie s'il n'existait pas de résultat précédent, auquel cas on le supprime de la page */
    let previousResult = document.getElementById('divResult');
    let previousResultArticle = document.getElementById('ulResult');
    let div = document.getElementById('div1');
    if(previousResult != null || previousResultArticle != null){
        div.innerHTML = ''; //On supprime les éléments de la page
    }
    if(response.length == 0){ // On vérifie s'il existe un résultat, si ce n'est pas le cas on affiche qu'il n'y en a pas.
        let h2 = document.createTextNode("Il n'y a aucun résultat pour votre recherche");
        let newDiv = document.createElement("div");
        newDiv.setAttribute('id','divResult');
        newDiv.appendChild(h2);
        let currentDiv = document.getElementById('div1');
        currentDiv.appendChild(newDiv);
    }
    else {
        let tabTitle = []; // Tableau qui va nous servir pour obtenir les détails d'un article
        let compt = 0; // Compteur pour la boucle sur les articles.
        response.forEach(article =>{ // On boucle sur tous les articles.
            let listInformation = document.createElement('ul'); //Création du ul pour la liste des informations
            listInformation.setAttribute('id','ulResult'); // On ajoute un id à l'ul.
            // On ajoute un li contenant le nom de l'article, ce même nom est un lien vers l'URL de l'article.
            let insertArticleName = document.createElement('li');
            let createA = document.createElement('a');
            let articleName = document.createTextNode(article.title);
            createA.setAttribute('href',article.url);
            createA.appendChild(articleName);
            insertArticleName.appendChild(createA);
            listInformation.appendChild(insertArticleName);
            // On ajoute un li contenant le bouton qui va permettre d'afficher les détails de l'article en question.
            let insertButtonDetail = document.createElement('li');
            let createB = document.createElement('button');
            let idButton = "detailArticle" + compt;
            createB.setAttribute('id',idButton);
            let buttonText = document.createTextNode("Detail");
            createB.appendChild(buttonText);
            insertButtonDetail.appendChild(createB);
            listInformation.appendChild(insertButtonDetail);
            // On ajoute un li contenant l'image de l'article.
            let insertImage = document.createElement('li');
            let createI = document.createElement('img');
            createI.setAttribute('src',article.urlToImage);
            let altImage = "Image : " + article.title;
            createI.setAttribute('alt',altImage);
            insertImage.appendChild(createI);
            listInformation.appendChild(insertImage);
            // Finalement on ajoute notre ul dans la division déjà présente sur la page HTML
            document.getElementById('div1').appendChild(listInformation);

            tabTitle[compt] = article.title;
            compt ++;
        })
        // On crée un listener sur tous les boutons détail des articles (c'est ici que notre tableau est utilisé).
        let inputDetail;
        for(let i = 0; i < response.length ; i++){
            inputDetail = document.getElementById("detailArticle" + i);
            inputDetail.addEventListener("click",function(){detail(tabTitle[i])});
        }
    }
}
// La fonction détail est la fonction du listener pour le bouton détail, elle permet d'envoyer l'utilisateur
// vers les détails de l'article voulu.
function detail(titleArticle){
    let myStorage = window.localStorage;
    myStorage.clear();
    myStorage.setItem('article',titleArticle);// J'utilise le localStorage pour que la page se souvienne de l'article sélectionné.
    document.location.href="detail.html";// On envoie l'utilisateur vers la page de détail.
}
// Fonction du listener pour le bouton de retour à la page d'accueil.
function returnHomePage(event){
    document.location.href="index.html";
}
// On place le listener pour le bouton de recherche d'article.
let inputRechercher = document.getElementById("article-input")
inputRechercher.addEventListener("click",rechercher);
// On place le listener pour le bouton de retour à l'accueil.
let inputHomePage = document.getElementById("returnHome");
inputHomePage.addEventListener("click",returnHomePage);






