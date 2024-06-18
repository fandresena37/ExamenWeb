let livre = [];
let show = false;
async function fetchData() {
  const response = await fetch("Data.json");
  const data = await response.json();
  return data;
}

// recuperation des données

if (
  localStorage.getItem("livre") !== null &&
  localStorage.getItem("livre") !== undefined
) {
  livre = JSON.parse(localStorage.getItem("livre"));
  livre.sort((a, b) => {
    const comparaisonTitre = a.titre.localeCompare(b.titre);
    return comparaisonTitre;
  });
  document.querySelector(".triage select").value = "titre";
  listeLivre(livre);
} else {
  fetchData().then((data) => {
    livre = data.livre;
    localStorage.setItem("livre", JSON.stringify(livre));
    livre.sort((a, b) => {
      const comparaisonTitre = a.titre.localeCompare(b.titre);
      return comparaisonTitre;
    });
    document.querySelector(".triage select").value = "titre";
    listeLivre(livre);
  });
}

/// lister tous les livres

function listeLivre(donnee) {
  let template = document.getElementById("livre");
  let container = document.getElementById("liste");
  container.innerHTML = "";
  donnee.forEach((element) => {
    let items = template.content.cloneNode(true);
    let img = items.querySelector(".img");
    img.src = element.image;
    img.addEventListener("click", () => {
      showDetail(element);
    });
    let titre = items.querySelector(".titre");
    titre.innerHTML = "<strong>Titre : </strong>" + element.titre;
    let auteur = items.querySelector(".auteur");
    auteur.innerHTML = "<strong>Auteur : </strong>" + element.auteur;
    let page = items.querySelector(".page");
    page.innerHTML = "<strong>Nb pages : </strong>" + element.nb;
    let supp = items.querySelector(".supprimer");
    let modifier = items.querySelector(".modifier");
    container.appendChild(items);
    supp.addEventListener("click", () => suppression(element));
    modifier.addEventListener("click", () => modification(element));
  });
}

/// lvoir le details

function showDetail(donnee) {
  document.querySelector(".entete-detail").style = "display:flex";
  document.getElementById("modification").style = "display:none";
  document.querySelector(".entete-liste").style = "display:none";
  document.querySelector(".entete-ajout").style = "display:none";
  document.querySelector(".entete-modification").style = "display:none";
  let detail = document.querySelector(".detail");
  let img = detail.querySelector(".img img");
  img.src = donnee.image;
  let titre = detail.querySelector(".description .titre");
  titre.innerHTML = "<strong>Titre : </strong>" + donnee.titre;
  let auteur = detail.querySelector(".description .auteur");
  auteur.innerHTML = "<strong>Auteur : </strong>" + donnee.auteur;
  let desc = detail.querySelector(".description .desc");
  desc.innerHTML = "<strong>Resumé : </strong>" + donnee.description;
  let page = detail.querySelector(".description .page");
  page.innerHTML = "<strong>Pages : </strong>" + donnee.nb;
  let langue = detail.querySelector(".description .langue");
  langue.innerHTML = "<strong>Langue : </strong>" + donnee.langue;
  let genre = detail.querySelector(".description .genre");
  genre.innerHTML = "<strong>Genre : </strong>" + donnee.genre;
  let date = detail.querySelector(".description .date");
  date.innerHTML =
    "<strong>Date de publication : </strong>" + donnee.datePublication;
  let dispo = detail.querySelector(".description .dispo");
  dispo.innerHTML = "<strong>Disponibilité : </strong>" + donnee.disponibilite;
  let etat = detail.querySelector(".description .etat");
  etat.innerHTML = "<strong>Etat : </strong>" + donnee.etat;
  let emp = detail.querySelector(".description .emp");
  emp.innerHTML = "<strong>Emplacement : </strong>" + donnee.emplacement;
  let isbn = detail.querySelector(".description .isbn");
  isbn.innerHTML = "<strong>Isbn : </strong>" + donnee.isbn;
  let editeur = detail.querySelector(".description .editeur");
  date.innerHTML = "<strong>Editeur : </strong>" + donnee.editeur;
  detail.style = "display:flex";
  document.getElementById("liste").style = "display:none";
  document.getElementById("ajout").style = "display:none";
  document.querySelector("footer").style = "display:none";
}

/// affiche la liste

function showAjout() {
  let ajout = document.querySelector(".ajout");
  ajout.style = "display:flex";
  document.querySelector(".entete-ajout").style = "display:flex";
  document.getElementById("liste").style = "display:none";
  document.getElementById("detail").style = "display:none";
  document.getElementById("modification").style = "display:none";
  document.querySelector(".entete-liste").style = "display:none";
  document.querySelector(".entete-detail").style = "display:none";
  document.querySelector(".entete-modification").style = "display:none";
  document.querySelector("footer").style = "display:none";
  let input = document.querySelectorAll(".ajout form input");
  input.forEach((elt) => {
    elt.value = "";
  });
}

// evenement pour afficher les listes

function List() {
  showList(livre);
}

// show liste

function showList(donnee) {
  listeLivre(donnee);
  let liste = document.querySelector(".liste");
  liste.style = "display:flex";
  document.getElementById("detail").style = "display:none";
  document.getElementById("ajout").style = "display:none";
  document.getElementById("modification").style = "display:none";
  document.querySelector(".entete-liste").style = "display:flex";
  document.querySelector(".entete-detail").style = "display:none";
  document.querySelector(".entete-ajout").style = "display:none";
  document.querySelector(".entete-modification").style = "display:none";
  document.querySelector("footer").style = "display:flex";
}

// modifier

function modification(donnee) {
  let modification = document.getElementById("modification");
  modification.innerHTML = "";
  let template = document.getElementById("modifier");
  let modifi = template.content.cloneNode(true);
  modifi.querySelector(".img").value = donnee.image;
  modifi.querySelector(".titre").value = donnee.titre;
  modifi.querySelector(".auteur").value = donnee.auteur;
  modifi.querySelector(".desc").value = donnee.description;
  modifi.querySelector(".page").value = donnee.nb;
  modifi.querySelector(".langue").value = donnee.langue;
  modifi.querySelector(".genre").value = donnee.genre;
  modifi.querySelector(".date").value = donnee.datePublication;
  modifi.querySelector(".dispo").value = donnee.disponibilite;
  modifi.querySelector(".etat").value = donnee.etat;
  modifi.querySelector(".emp").value = donnee.emplacement;
  modifi.querySelector(".isbn").value = donnee.isbn;
  modifi.querySelector(".editeur").value = donnee.editeur;
  let button = modifi.querySelector("button");
  button.addEventListener("click", () => {
    console.log("modification");
    confirmModification(donnee);
  });
  modification.appendChild(modifi);
  document.querySelector(".entete-modification").style = "display:flex";
  document.getElementById("modification").style = "display:flex";
  document.querySelector(".entete-liste").style = "display:none";
  document.querySelector(".entete-detail").style = "display:none";
  document.querySelector(".entete-ajout").style = "display:none";
  let liste = document.querySelector(".liste");
  liste.style = "display:none";
  document.getElementById("detail").style = "display:none";
  document.getElementById("ajout").style = "display:none";
  document.querySelector("footer").style = "display:none";
}

/// confirmation de la modification

function confirmModification(donnee) {
  let input = document.querySelectorAll(".modifier form input");
  console.log("len = " + input.length);
  livre.forEach((element) => {
    if (element.titre === donnee.titre) {
      let i = 0;
      for (const elt in element) {
        element[`${elt}`] = input[i].value;
        i += 1;
      }
      localStorage.setItem("livre", JSON.stringify(livre));
      showList(livre);
      return;
    }
  });
}

// ajout d'un livre

function ajouter() {
  let input = document.querySelectorAll(".ajout form input");
  let nouveauData = {};
  let i = 0;
  const key = [
    "titre",
    "auteur",
    "image",
    "description",
    "langue",
    "nb",
    "genre",
    "datePublication",
    "disponibilite",
    "etat",
    "emplacement",
    "isbn",
    "editeur",
  ];
  key.forEach((elt) => {
    nouveauData[`${elt}`] = input[i].value;
    i += 1;
  });
  livre.push(nouveauData);
  localStorage.setItem("livre", JSON.stringify(livre));
  showList(livre);
}

// suppression d'un livre

function suppression(donnee) {
  let tab = [];
  tab = livre.filter((element) => element.titre !== donnee.titre);
  console.log(tab);
  livre = tab;
  localStorage.setItem("livre", JSON.stringify(livre));
  showList(livre);
}

// rechercher

function rechercher(input) {
  let result = [];
  livre.forEach((elt) => {
    if (elt.titre.toUpperCase().includes(input.value.toUpperCase())) {
      result.push(elt);
    }
  });
  showList(result);
}

// triage dynamique

function triage(value) {
  result = livre;
  if (value === "titre") {
    result.sort((a, b) => {
      const comparaisonTitre = a.titre.localeCompare(b.titre);
      return comparaisonTitre;
    });
  } else if (value === "auteur") {
    result.sort((a, b) => {
      const comparaisonAuteur = a.auteur.localeCompare(b.auteur);
      return comparaisonAuteur;
    });
  } else if (value === "page") {
    result.sort((a, b) => {
      const comparaisonPage = parseInt(a.nb) - parseInt(b.nb);
      return comparaisonPage;
    });
  }
  showList(result);
}

/// affiche le menu qui defile pour les version smartphone

function showMenu() {
  if (show) {
    document.querySelector(".slide-menu").style = "right:-400px";
  } else {
    document.querySelector(".slide-menu").style = "right:0px";
  }
  show = !show;
}
