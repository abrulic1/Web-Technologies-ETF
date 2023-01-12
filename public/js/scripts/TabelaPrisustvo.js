var iscrtajDugmad = true;

const TabelaPrisustvo = function (divRef, podaci, trenutnaSedmica = podaci.prisustva[podaci.prisustva.length - 1].sedmica) {
    divRef.textContent = "";
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
        crtanjeTabele(divRef, podaci, trenutnaSedmica);

    const sljedecaSedmica = function () {
        if (ukupnoUnesenihSedmica > trenutnaSedmica) {
            trenutnaSedmica++;
            divRef.textContent = "";
            crtanjeTabele(divRef, podaci, trenutnaSedmica);
        }
    }
    const prethodnaSedmica = function () {
        if (trenutnaSedmica > 1) {
            trenutnaSedmica--;
            divRef.textContent = "";
            crtanjeTabele(divRef, podaci, trenutnaSedmica);
        }
    }

    return {
        sljedecaSedmica,
        prethodnaSedmica
    }
};

function izracunajKolikoSedmicaJeUneseno(podaci) {
    let sedmica = 0;
    for (let i = 0; i < podaci.prisustva.length; i++)
        if (podaci.prisustva[i].sedmica > sedmica) sedmica = podaci.prisustva[i].sedmica;
    return sedmica;
};

function provjeriDaLiSvakaSedmicaImaPrisustvo(podaci) {
    //prvo moram znati koja je maximalna unesena sedmica
    let maxSedmica = 0;
    for (let i = 0; i < podaci.prisustva.length; i++) {
        if (podaci.prisustva[i].sedmica > maxSedmica)
            maxSedmica = podaci.prisustva[i].sedmica;
    }

    let niz = new Array(maxSedmica).fill(0);
    console.log(niz);
    for (let i = 0; i < podaci.prisustva.length; i++) {
        niz[podaci.prisustva[i].sedmica - 1] = 1;
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
    for (let i = 0; i < podaci.prisustva.length; i++) {

        if (podaci.prisustva[i].predavanja > podaci.brojPredavanjaSedmicno || podaci.prisustva[i].vjezbe > podaci.brojVjezbiSedmicno)
            return false;

        else if (podaci.prisustva[i].predavanja < 0 || podaci.prisustva[i].vjezbe < 0)
            return false;

        if (i != podaci.prisustva.length - 1)
            for (let j = i + 1; j < podaci.prisustva.length; j++) {
                if (podaci.prisustva[i].index === podaci.prisustva[j].index && podaci.prisustva[i].sedmica === podaci.prisustva[j].sedmica)
                    return false;
            }

        let imaUListi = false;
        for (let j = 0; j < podaci.studenti.length; j++) {
            if (podaci.prisustva[i].index === podaci.studenti[j].index)
                imaUListi = true;
        }
        if (!imaUListi) return false;
    }

    for (let i = 0; i < podaci.studenti.length - 1; i++) {
        for (let j = i + 1; j < podaci.studenti.length; j++) {
            if (podaci.studenti[i].index === podaci.studenti[j].index)
                return false;
        }
    }

    return provjeriDaLiSvakaSedmicaImaPrisustvo(podaci);

    //return ispravni;
};

function sortirajPodatkePoSedmicama(podaci) {
    for (let i = 0; i < podaci.prisustva.length - 1; i++) {
        for (let j = i + 1; j < podaci.prisustva.length; j++) {
            if (podaci.prisustva[i].index > podaci.prisustva[j].index) {
                let temp = podaci.prisustva[i];
                podaci.prisustva[i] = podaci.prisustva[j];
                podaci.prisustva[j] = temp;
            }
            if (podaci.prisustva[i].sedmica > podaci.prisustva[j].sedmica) {
                let temp = podaci.prisustva[i];
                podaci.prisustva[i] = podaci.prisustva[j];
                podaci.prisustva[j] = temp;
            }
        }
    }
    return podaci;
}

function crtanjeTabele(divRef, podaci, trenutnaSedmica) {
    //ISCRTAVANJE HEADERA GLAVNE TABELE
    let table = document.createElement("table");
    table.classList.add("glavna-tabela");
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
    for (i = 0; i < podaci.prisustva[podaci.prisustva.length - 1].sedmica; i++) {
        if (i == trenutnaSedmica - 1) {
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
    if (podaci.prisustva[podaci.prisustva.length - 1].sedmica != 14) {
        header.appendChild(buduceSedmice);
        buduceSedmice.appendChild(document.createTextNode((i + 1).toString().concat(" ", " - ", (14).toString())));
    }

    //POPUNJAVANJE PODACIMA
    for (let i = 0; i < podaci.studenti.length; i++) {
        let row = document.createElement("tr");
        table.append(row);
        row.insertCell().appendChild(document.createTextNode(podaci.studenti[i].ime));
        row.cells[0].rowSpan = 2;
        row.insertCell().appendChild(document.createTextNode(podaci.studenti[i].index));
        row.cells[1].rowSpan = 2;

        let maxSedmica = 0;
        for (let i = 0; i < podaci.prisustva.length; i++) {
            if (podaci.prisustva[i].sedmica > maxSedmica)
                maxSedmica = podaci.prisustva[i].sedmica;
        }

        let niz = new Array(maxSedmica).fill(0);
        for (let j = 0; j < podaci.prisustva.length; j++) {
            if (podaci.prisustva[j].index === podaci.studenti[i].index)
                niz[podaci.prisustva[j].sedmica - 1] = podaci.prisustva[j].sedmica;
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
            if (niz[j] === trenutnaSedmica) {
                iscrtajZaglavljeTrenutneSedmice(divRef, podaci, trenutnaSedmica, row, table);
            }

            else {
                let cel = row.insertCell();
                //prima j a to je sedmica i trebamo jos 1 dodat + moze primiti studenta
                cel.appendChild(document.createTextNode(vratiPostotakPrisustva(j+1, podaci.studenti[i].index, podaci)));
                cel.rowSpan = 2;
            }

        }

        //  ovdje moram prvo za one buduce sedmice da nacrtam jednu novu celiju ali ako je vec svih 14 sedmica nacrtano, onda necemo dodavati
        if (trenutnaSedmica < 14) {
            const celija = document.createElement("td");
            row.appendChild(celija);
            celija.rowSpan = 2;
        }

        let row2 = document.createElement("tr");
        table.append(row2);
        let prisustvovaoPredavanjima = -1;
        let prisustvovaoVjezbama = -1;
        for (let j = 0; j < podaci.prisustva.length; j++) {
            if (podaci.prisustva[j].index === podaci.studenti[i].index && podaci.prisustva[j].sedmica===trenutnaSedmica) {
                prisustvovaoPredavanjima = podaci.prisustva[j].predavanja;
                prisustvovaoVjezbama = podaci.prisustva[j].vjezbe;
                break;
            }
        }

        let brojac = 0;
        for (let a = 0; a < podaci.brojPredavanjaSedmicno; a++) {
            const celija = document.createElement("td");
            row2.appendChild(celija);
            celija.classList = "predavanja";
            brojac++;
            if (brojac > prisustvovaoPredavanjima)
                celija.classList += " odsutan";
            else if(prisustvovaoPredavanjima===-1)
            celija.classList += " praznaCelija";
            else celija.classList += " prisutan";
        }
        brojac = 0;
        for (let a = 0; a < podaci.brojVjezbiSedmicno; a++) {
            const celija = document.createElement("td");
            row2.appendChild(celija);
            celija.classList = "vjezbe"
            brojac++;
            if (brojac > prisustvovaoVjezbama)
                celija.classList += " odsutan";
               else if(prisustvovaoPredavanjima===-1)
                    celija.classList+=" praznaCelija";
                    else celija.classList += " prisutan"; 
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
    for(let i=0; i<podaci.prisustva.length; i++)
      if(podaci.prisustva[i].sedmica===sedmica && podaci.prisustva[i].index===indexStudenta){
           obracun = ((podaci.prisustva[i].predavanja + podaci.prisustva[i].vjezbe) * 1.0) / (podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno);
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