const TabelaPrisustvo = function (divRef, podaci) {
    divRef.textContent = "";
    let ispravni = provjeriValidnostPodataka(podaci);
    let trenutnaSedmica = podaci.prisustva[podaci.prisustva.length - 1].sedmica;
    const ukupnoUnesenihSedmica = izracunajKolikoSedmicaJeUneseno(podaci);
    if (!ispravni)
        divRef.textContent = "Podaci o prisustvu nisu validni!";
    else
        crtanjeTabele(divRef, podaci, trenutnaSedmica);

    const sljedecaSedmica = function () {
        if (ukupnoUnesenihSedmica >= trenutnaSedmica)
            trenutnaSedmica++;
    }
    const prethodnaSedmica = function () {
        if (trenutnaSedmica > 0)
            trenutnaSedmica--;
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

function provjeriValidnostPodataka(podaci) {
    //ovo je potrebno jos doraditi...
    //dodati ako ima vise od 14 sedmica da je false jer semestar nema preko 14 sedmica...
    //
    let ispravni = true;
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

    return ispravni;
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

        for (let j = 0; j < podaci.prisustva.length; j++) {
            if (podaci.prisustva[j].sedmica === trenutnaSedmica) {
                iscrtajZaglavljeTrenutneSedmice(divRef, podaci, trenutnaSedmica, row, table);
                break;
            }
            if (podaci.prisustva[j].index === podaci.studenti[i].index) {
                let cel = row.insertCell();
                cel.appendChild(document.createTextNode(vratiPostotakPrisustva(j, podaci)));
                cel.rowSpan = 2;
            }
        }


        const celija = document.createElement("td");
        row.appendChild(celija);
        celija.rowSpan = 2;
        let row2 = document.createElement("tr");
        table.append(row2);
        let prisustvovaoPredavanjima = 0;
        let prisustvovaoVjezbama = 0;
        for (let j = 0; j < podaci.prisustva.length; j++) {
            if (podaci.prisustva[j].index === podaci.studenti[i].index) {
                prisustvovaoPredavanjima = podaci.prisustva[j].predavanja;
                prisustvovaoVjezbama = podaci.prisustva[j].vjezbe;
            }
        }
        let brojac = 0;
        for (let a = 0; a < podaci.brojPredavanjaSedmicno; a++) {
            const celija = document.createElement("td");
            row2.appendChild(celija);
            celija.classList = "prisutan";
            brojac++;
            if (brojac > prisustvovaoPredavanjima)
                celija.classList = "odsutan";
        }
        brojac = 0;
        for (let a = 0; a < podaci.brojVjezbiSedmicno; a++) {
            const celija = document.createElement("td");
            row2.appendChild(celija);
            celija.classList = "prisutan";
            brojac++;
            if (brojac > prisustvovaoVjezbama)
                celija.classList = "odsutan";
        }
    }
};



function iscrtajZaglavljeTrenutneSedmice(divRef, podaci, trenutnaSedmica, row, table) {
    for (let i = 0; i < podaci.brojPredavanjaSedmicno; i++) {
        const celija = document.createElement("td");
        celija.classList = "celijePrisustva";
        row.appendChild(celija);
        celija.appendChild(document.createTextNode("P" + (i + 1).toString()));
    }
    for (let i = 0; i < podaci.brojVjezbiSedmicno; i++) {
        const celija = document.createElement("td");
        celija.classList = "celijePrisustva";
        row.appendChild(celija);
        celija.appendChild(document.createTextNode("V" + (i + 1).toString()));
    }
};


function vratiPostotakPrisustva(j, podaci) {
    let obracun = ((podaci.prisustva[j].predavanja + podaci.prisustva[j].vjezbe) * 1.0) / (podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno);
    obracun = obracun * 100;
    return obracun.toString().concat("%");
};



function dugmad(buttonsContainer, prethodnaSedmica, sljedecaSedmica) {
    console.log("pozvana dugmad");
    let buttonLeft = document.createElement("button");
    buttonsContainer.appendChild(buttonLeft);
    buttonLeft.classList = "dugme";
    buttonLeft.addEventListener("click", prethodnaSedmica);
    buttonLeft.innerHTML = '<img src="../img/ikonice/WT2.png" />';
    let buttonRight = document.createElement("button");
    buttonsContainer.appendChild(buttonRight);
    buttonRight.classList = "dugme";
    buttonRight.addEventListener("click", sljedecaSedmica);
    buttonRight.innerHTML = '<img src="../img/ikonice/WT2.png" />';
};