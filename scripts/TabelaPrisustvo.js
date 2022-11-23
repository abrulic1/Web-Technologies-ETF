export const TabelaPrisustvo = function (divRef, podaci) {
     divRef.innerHtml="";
    let trenutnaSedmica=0; 

    const sljedecaSedmica = function () {
    }
    const prethodnaSedmica = function () {
    }

    crtanjeTabele(divRef,podaci, trenutnaSedmica);

    return {
    sljedecaSedmica,
    prethodnaSedmica
    }
};



function crtanjeTabele(divRef,podaci,trenutnaSedmica){
    const table = document.createElement("table");
    const header = document.createElement("tr");
    const nameAndSurname = document.createElement("th");
    const index = document.createElement("th");
    const buduceSedmice = document.createElement("th");
    table.classList.add("glavna-tabela");

    table.append(header);
    header.appendChild(nameAndSurname);
    header.appendChild(index);
    divRef.appendChild(table);
    nameAndSurname.appendChild(document.createTextNode("Ime i prezime"));
    index.appendChild(document.createTextNode("Indeks"));
    
    //ukupnoEvidentiranihSedmica = podaci.prisustva[podaci.prisustva.length - 1].sedmica;
    let i = 0;
    for(i = 0; i<podaci.prisustva[podaci.prisustva.length - 1].sedmica; i++){
        const sedmice = document.createElement("th");
        header.appendChild(sedmice);
        sedmice.appendChild(document.createTextNode(i+1));
    }
    trenutnaSedmica=i;

    for(let i = 0; i<podaci.studenti.length; i++){
        let row =  table.insertRow(-1);
        row.insertCell(0).appendChild(document.createTextNode(podaci.studenti[i].ime));
        row.insertCell(1).appendChild(document.createTextNode(podaci.studenti[i].index));
        if(i===trenutnaSedmica){
        iscrtajTrenutnuSedmicu(divRef, podaci, trenutnaSedmica);
        continue;
        }
        if(i===podaci.prisustva[podaci.prisustva.length - 1].sedmica)
        break;
        for(let j=0; j<podaci.prisustva.length; j++){
            if(podaci.prisustva[j].index===podaci.studenti[i].index){
                row.insertCell().appendChild(document.createTextNode(vratiPostotakPrisustva(j,podaci)));
            }
        }
        
    }
    header.appendChild(buduceSedmice);
    buduceSedmice.appendChild(document.createTextNode((i+1).toString().concat(" ", " - ", (14).toString())));
};



function iscrtajTrenutnuSedmicu(divRef, podaci, trenutnaSedmica){

};

function vratiPostotakPrisustva(j,podaci){
        let obracun = ((podaci.prisustva[j].predavanja + podaci.prisustva[j].vjezbe)*1.0)/(podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno);
        obracun=obracun*100;
        return obracun.toString().concat("%");
};



