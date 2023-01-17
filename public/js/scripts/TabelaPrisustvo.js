var iscrtajDugmad = true;
// trenutnaSedmica = podaci.prisustva[podaci.prisustva.length - 1].sedmica
window.trenutnaSedmica = 0;
const TabelaPrisustvo = function (divRef, podaci) {
    podaci=JSON.parse(podaci);
    divRef.textContent = "";
    let kopija = JSON.parse(JSON.stringify(podaci));
    if(window.trenutnaSedmica===0)window.trenutnaSedmica = kopija[kopija.length - 1].sedmica;
    let ispravni = provjeriValidnostPodataka(podaci);
    const ukupnoUnesenihSedmica = izracunajKolikoSedmicaJeUneseno(podaci);
    sortirajPodatkePoSedmicama(podaci);

    if (!ispravni){
        let tekstNevalidno = document.createElement("p");
        tekstNevalidno.innerHTML="Podaci o prisustvu nisu validni!";
        tekstNevalidno.classList="nevalidnoError";
        divRef.appendChild(tekstNevalidno);
        iscrtajDugmad=false;
    }
    else
        crtanjeTabele(divRef, podaci, window.trenutnaSedmica);

    const sljedecaSedmica = function () {
        if (ukupnoUnesenihSedmica > window.trenutnaSedmica) {
            window.trenutnaSedmica++;
            divRef.textContent = "";
            crtanjeTabele(divRef, podaci, window.trenutnaSedmica);
        }
    }
    const prethodnaSedmica = function () {
        if (window.trenutnaSedmica > 1) {
            window.trenutnaSedmica--;
            divRef.textContent = "";
            crtanjeTabele(divRef, podaci, window.trenutnaSedmica);
        }
    }

    return {
        sljedecaSedmica,
        prethodnaSedmica
    }
};

function izracunajKolikoSedmicaJeUneseno(podaci) {
    let sedmica = 0;
    for (let i = 0; i < podaci.length; i++)
        if (podaci[i].sedmica > sedmica) sedmica = podaci[i].sedmica;
    return sedmica;
};

function provjeriDaLiSvakaSedmicaImaPrisustvo(podaci) {
    //prvo moram znati koja je maximalna unesena sedmica
    let maxSedmica = 0;
    for (let i = 0; i < podaci.length; i++) {
        if (podaci[i].sedmica > maxSedmica)
            maxSedmica = podaci[i].sedmica;
    }

    let niz = new Array(maxSedmica).fill(0);
    console.log(niz);
    for (let i = 0; i < podaci.length; i++) {
        niz[podaci[i].sedmica - 1] = 1;
    }

    for (let i = 0; i < niz.length; i++)
        if (niz[i] === 0)
            return false;

    return true;
};

function provjeriValidnostPodataka(podaci) {
    //ovo je potrebno jos doraditi...
    //dodati ako ima vise od 14 sedmica da je false jer semestar nema preko 14 sedmica...
    //
    //  let ispravni = true;
    for (let i = 0; i < podaci.length; i++) {

        if (podaci[i].predavanja > podaci.brojPredavanjaSedmicno || podaci[i].vjezbe > podaci.brojVjezbiSedmicno){
            console.log('ima vise predavanja zabiljezenih nego stvarnih, ili vjezbi')
            return false;
        }
        else if (podaci[i].predavanja < 0 || podaci[i].vjezbe < 0){
            console.log('predmeti ili vjezbe su negativni')
            return false;
        }
        if (i != podaci.length - 1)
            for (let j = i + 1; j < podaci.length; j++) {
                if (podaci[i].index === podaci[j].index && podaci[i].sedmica === podaci[j].sedmica){
                    console.log('podaci[i].index je ', podaci[i].index);
                    console.log('podaci[j].index je ', podaci[j].index);
                    console.log('podaci[i].sedmica je ', podaci[i].sedmica);
                    console.log('podaci[j].sedmica je ', podaci[j].sedmica);
                    return false;
                }
            }

        let imaUListi = false;
        for (let j = 0; j < podaci.length; j++) {
            if (podaci[i].index === podaci[j].index)
                imaUListi = true;
        }
        if (!imaUListi) {console.log('nesto zlj ne kotnm') ; return false;}
    }

    // for (let i = 0; i < podaci.length - 1; i++) {
    //     for (let j = i + 1; j < podaci.length; j++) {
    //         if (podaci[i].index === podaci[j].index){
    //             console.log('fmdks;fmdsfndks4fnas4')
    //             return false;
    //         }
    //     }
    // }

    return provjeriDaLiSvakaSedmicaImaPrisustvo(podaci);

    //return ispravni;
};

function sortirajPodatkePoSedmicama(podaci) {
    for (let i = 0; i < podaci.length - 1; i++) {
        for (let j = i + 1; j < podaci.length; j++) {
            if (podaci[i].index > podaci[j].index) {
                let temp = podaci[i];
                podaci[i] = podaci[j]
                podaci[j] = temp;
            }
            if (podaci[i].sedmica > podaci[j].sedmica) {
                let temp = podaci[i];
                podaci[i] = podaci[j];
                podaci[j] = temp;
            }
        }
    }
    return podaci;
}

function crtanjeTabele(divRef, podaci, trenutnaSedmica) {
    //ISCRTAVANJE HEADERA GLAVNE TABELE
    let table = document.createElement("table");
    // table.classList.add("glavna-tabela");
    table.id='glavna-tabela';
    const header = document.createElement("tr");
    table.append(header);
    const nameAndSurname = document.createElement("th");
    const index = document.createElement("th");
    header.appendChild(nameAndSurname);
    header.appendChild(index);
    divRef.appendChild(table);
    nameAndSurname.appendChild(document.createTextNode("Ime i prezime"));
    index.appendChild(document.createTextNode("Indeks"));

    let i = 0;
    for (i = 0; i < podaci[podaci.length - 1].sedmica; i++) {
        if (i == window.trenutnaSedmica - 1) {
            const sedmica = document.createElement("th");
            sedmica.colSpan = podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno;
            header.appendChild(sedmica);
            sedmica.appendChild(document.createTextNode(i + 1));
            continue;
        }
        const sedmice = document.createElement("th");
        header.appendChild(sedmice);
        sedmice.appendChild(document.createTextNode(i + 1));
    }

    const buduceSedmice = document.createElement("th");
    if (podaci[podaci.length - 1].sedmica != 14) {
        header.appendChild(buduceSedmice);
        buduceSedmice.appendChild(document.createTextNode((i + 1).toString().concat(" ", " - ", (14).toString())));
    }

    //POPUNJAVANJE PODACIMA
    for (let i = 0; i < podaci.length; i++) {
        let row = document.createElement("tr");
        table.append(row);
        row.insertCell().appendChild(document.createTextNode(podaci[i].ime));
        row.cells[0].rowSpan = 2;
        row.insertCell().appendChild(document.createTextNode(podaci[i].index));
        row.cells[1].rowSpan = 2;

        let maxSedmica = 0;
        for (let i = 0; i < podaci.length; i++) {
            if (podaci[i].sedmica > maxSedmica)
                maxSedmica = podaci[i].sedmica;
        }

        let niz = new Array(maxSedmica).fill(0);
        for (let j = 0; j < podaci.length; j++) {
            if (podaci[j].index === podaci[i].index)
                niz[podaci[j].sedmica - 1] = podaci[j].sedmica;
        }

        
        for (let j = 0; j < niz.length; j++) {
            if(niz[j]===0 && (j+1)===trenutnaSedmica){
                iscrtajZaglavljeTrenutneSedmice(divRef, podaci, trenutnaSedmica, row, table);
                continue;
            }
            if (niz[j] === 0) {
                let cel = row.insertCell();
                cel.appendChild(document.createTextNode(" "));
                cel.rowSpan = 2;
                continue;
            }
            if (niz[j] === window.trenutnaSedmica) {
                iscrtajZaglavljeTrenutneSedmice(divRef, podaci, window.trenutnaSedmica, row, table);
            }

            else {
                let cel = row.insertCell();
                //prima j a to je sedmica i trebamo jos 1 dodat + moze primiti studenta
                cel.appendChild(document.createTextNode(vratiPostotakPrisustva(j+1, podaci[i].index, podaci)));
                cel.rowSpan = 2;
            }

        }

        //  ovdje moram prvo za one buduce sedmice da nacrtam jednu novu celiju ali ako je vec svih 14 sedmica nacrtano, onda necemo dodavati
        if (window.trenutnaSedmica < 14) {
            const celija = document.createElement("td");
            row.appendChild(celija);
            celija.rowSpan = 2;
        }

        let row2 = document.createElement("tr");
        table.append(row2);
        let prisustvovaoPredavanjima = -1;
        let prisustvovaoVjezbama = -1;
        for (let j = 0; j < podaci.length; j++) {
            if (podaci[j].index === podaci[i].index && podaci[j].sedmica===window.trenutnaSedmica) {
                prisustvovaoPredavanjima = podaci[j].predavanja;
                prisustvovaoVjezbama = podaci[j].vjezbe;
                break;
            }
        }

        let brojac = 0;
        for (let a = 0; a < podaci.brojPredavanjaSedmicno; a++) {
            const celija = document.createElement("td");
            row2.appendChild(celija);
            celija.classList = "predavanja";
            brojac++;
            if (brojac > prisustvovaoPredavanjima && prisustvovaoPredavanjima != -1)
                celija.classList.add("odsutan");
            else if (prisustvovaoPredavanjima === -1) {
                celija.classList.add("praznaCelija");
            }
            else celija.classList.add('prisutan');
        }
        brojac = 0;
        for (let a = 0; a < podaci.brojVjezbiSedmicno; a++) {
            const celija = document.createElement("td");
            row2.appendChild(celija);
            celija.classList = "prisutan";
            celija.classList = "vjezbe";
            brojac++;
            if (brojac > prisustvovaoVjezbama && prisustvovaoVjezbama != -1)
                celija.classList.add("odsutan");
            else if (prisustvovaoVjezbama === -1) {
                celija.classList.add("praznaCelija");
            }
            else celija.classList.add('prisutan');
        }
     }
};

function iscrtajZaglavljeTrenutneSedmice(divRef, podaci, trenutnaSedmica, row, table) {
    for (let i = 0; i < podaci.brojPredavanjaSedmicno; i++) {
        const celija = document.createElement("td");
        celija.classList = "predavanje";
        row.appendChild(celija);
        celija.appendChild(document.createTextNode("P" + (i + 1).toString()));
    }
    for (let i = 0; i < podaci.brojVjezbiSedmicno; i++) {
        const celija = document.createElement("td");
        celija.classList = "vjezbe";
        row.appendChild(celija);
        celija.appendChild(document.createTextNode("V" + (i + 1).toString()));
    }
};

function vratiPostotakPrisustva(sedmica, indexStudenta, podaci) {
    let obracun = 0;
    for(let i=0; i<podaci.length; i++)
      if(podaci[i].sedmica===sedmica && podaci[i].index===indexStudenta){
           obracun = ((podaci[i].predavanja + podaci[i].vjezbe) * 1.0) / (podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno);
           obracun = obracun * 100;
      }
    return obracun.toString().concat("%");
};

function dugmad(buttonsContainer, prethodnaSedmica, sljedecaSedmica) {
    if(iscrtajDugmad){
      buttonsContainer.textContent='';
    // iscrtajDugmad=false;
    let buttonLeft = document.createElement("button");
    buttonsContainer.appendChild(buttonLeft);
    buttonLeft.classList = "dugme";
    buttonLeft.addEventListener("click", prethodnaSedmica);
    buttonLeft.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
    let buttonRight = document.createElement("button");
    buttonsContainer.appendChild(buttonRight);
    buttonRight.classList = "dugme";
    buttonRight.addEventListener("click", sljedecaSedmica);
    buttonRight.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
    }
};