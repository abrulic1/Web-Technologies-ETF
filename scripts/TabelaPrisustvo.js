export const TabelaPrisustvo = function (divRef, podaci) {
    divRef.textContent="";
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
    //ISCRTAVANJE HEADERA
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
    trenutnaSedmica = podaci.prisustva[podaci.prisustva.length - 1].sedmica;  //zadnja zabiljezena sedmica bi trebala da bude (ne garantuje se da ce tim redoslijedom biti poredani, ali da ne bismo morali prolaziti kroz citava prisustva isl. testirat cemo nad sortiranim)

    for(i = 0; i<podaci.prisustva[podaci.prisustva.length - 1].sedmica; i++){
       if(i==trenutnaSedmica-1){
        const sedmica = document.createElement("th");
        sedmica.colSpan=podaci.brojPredavanjaSedmicno+podaci.brojVjezbiSedmicno;
        header.appendChild(sedmica);
        sedmica.appendChild(document.createTextNode(i+1));
        continue;
       }
         const sedmice = document.createElement("th");
         header.appendChild(sedmice);
         sedmice.appendChild(document.createTextNode(i+1));
    }

    const buduceSedmice = document.createElement("th");
    if(podaci.prisustva[podaci.prisustva.length-1].sedmica!=14){
       //ukupan broj sedmica je 14
        header.appendChild(buduceSedmice);
        buduceSedmice.appendChild(document.createTextNode((i+1).toString().concat(" ", " - ", (14).toString())));
    }



    //POPUNJAVANJE PODACIMA
    for(let i = 0; i<podaci.studenti.length; i++){
        let row = document.createElement("tr");
        table.append(row);
        row.insertCell().appendChild(document.createTextNode(podaci.studenti[i].ime));
        row.cells[0].rowSpan=2;
        row.insertCell().appendChild(document.createTextNode(podaci.studenti[i].index));
        row.cells[1].rowSpan=2;

        for(let j=0; j<podaci.prisustva.length; j++){
            if(podaci.prisustva[j].sedmica===trenutnaSedmica){
                    iscrtajZaglavljeTrenutneSedmice(divRef, podaci, trenutnaSedmica, row, table);
                    break;
            }
            if(podaci.prisustva[j].index===podaci.studenti[i].index){
                        let cel = row.insertCell(); 
                        cel.appendChild(document.createTextNode(vratiPostotakPrisustva(j,podaci)));
                        cel.rowSpan=2;
               }
        }
      
            //da se doda jos i celija za ove buduce sedmice
            // let celija = document.createElement("td");
            // row.appendChild(celija);
            // celija.rowSpan=2;
            
            // row.appendChild(document.createElement("tr"));
            // for(let k=0; k<podaci.brojPredavanjaSedmicno+podaci.brojVjezbiSedmicno; k++){
            //     const celija = document.createElement("td");
            //     row.appendChild(celija);
            //    }

            const celija = document.createElement("td");
            row.appendChild(celija);
            celija.rowSpan=2;
            let row2 = document.createElement("tr");
            table.append(row2);
            let prisustvovaoPredavanjima=0;
            let prisustvovaoVjezbama=0;
           for(let j=0; j<podaci.prisustva.length; j++){
                if(podaci.prisustva[j].index===podaci.studenti[i].index){
                    prisustvovaoPredavanjima=podaci.prisustva[j].predavanja;
                    prisustvovaoVjezbama=podaci.prisustva[j].vjezbe;
                }
           }
           let brojac=0;
            for(let a=0; a<podaci.brojPredavanjaSedmicno; a++){
                const celija = document.createElement("td");
                row2.appendChild(celija);
                celija.classList="prisutan";
                brojac++;
                if(brojac>prisustvovaoPredavanjima)
                celija.classList="odsutan";
               }
               brojac=0;
               for(let a=0; a<podaci.brojVjezbiSedmicno; a++){
                const celija = document.createElement("td");
                row2.appendChild(celija);
                celija.classList="prisutan";
                brojac++;
                if(brojac>prisustvovaoVjezbama)
                celija.classList="odsutan";
               }
          
    }

 

   

        //     if(podaci.prisustva[j].sedmica===trenutnaSedmica){
        //     for(let a=0; a<podaci.brojPredavanjaSedmicno; a++){
        //         let tdd = document.createElement("td");
        //         tdd.appendChild(document.createTextNode("ok"));
        //         table.appendChild(tdd);
        //     }
        //     for(let a=0; a<podaci.brojVjezbiSedmicno; a++){
        //         let tdd = document.createElement("td");
        //         tdd.appendChild(document.createTextNode("ok"));
        //         table.appendChild(tdd);
        //     }
        //    // iscrtajTrenutnuSedmicu(divRef, podaci, trenutnaSedmica);
        //     break;
        //     }
        // }

        // if(podaci.prisustva[podaci.prisustva.length-1].sedmica!=14){
        //     table.appendChild(document.createElement("td"));
        // }

        // row.insertCell();
        // row.cells[4].rowSpan=2;

        // let row2 = document.createElement("tr");
        // row2.insertCell().appendChild(document.createTextNode("tekst"));
        // table.appendChild(row2);
    
};



function iscrtajZaglavljeTrenutneSedmice(divRef, podaci, trenutnaSedmica, row, table){
    for(let i=0; i<podaci.brojPredavanjaSedmicno; i++){
     const celija = document.createElement("td");
     celija.classList="celijePrisustva";
     row.appendChild(celija);
     celija.appendChild(document.createTextNode("P" +  (i+1).toString()));
    }
    for(let i=0; i<podaci.brojVjezbiSedmicno; i++){
        const celija = document.createElement("td");
        celija.classList="celijePrisustva";
        row.appendChild(celija);
        celija.appendChild(document.createTextNode("V" +  (i+1).toString()));      
       }
};


function vratiPostotakPrisustva(j,podaci){
        let obracun = ((podaci.prisustva[j].predavanja + podaci.prisustva[j].vjezbe)*1.0)/(podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno);
        obracun=obracun*100;
        return obracun.toString().concat("%");
};



