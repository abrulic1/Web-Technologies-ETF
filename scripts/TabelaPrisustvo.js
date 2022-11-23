export const TabelaPrisustvo = function (divRef, podaci) {
   
    //Ako se nalazi nesto u divu, treba isprazniti sadrzaj
     divRef.innerHtml="";

    //privatni atributi modula
    let trenutnaSedmica=0; 

    //implementacija metoda
    const sljedecaSedmica = function () {
    }
    const prethodnaSedmica = function () {
    }

    function crtanjeTabele(podaci){
        const table = document.createElement("table");
        const header = document.createElement("tr");
        const nameAndSurname = document.createElement("th");
        const index = document.createElement("th");
        const week = document.createElement("th");
        table.classList.add("glavna-tabela");

        // dodaj klase ovim headerima itd
        // dodaj values sto dole nadjes kao child i to je to
        table.append(header);
        header.appendChild(nameAndSurname);
        header.appendChild(index);
        divRef.appendChild(table);

        nameAndSurname.appendChild(document.createTextNode("Ime i prezime"));
        index.appendChild(document.createTextNode("Indeks"));
        const ukupnoEvidentiranihSedmica = podaci.prisustva[podaci.prisustva.length - 1].sedmica;
        var i=0;
        for(i = 0; i<ukupnoEvidentiranihSedmica; i++){
            const sedmice = document.createElement("th");
            header.appendChild(sedmice);
            sedmice.appendChild(document.createTextNode(i+1));
        }
        trenutnaSedmica=i;
        header.appendChild(week);
        week.appendChild(document.createTextNode((i+1).toString().concat(" ", " - ", (15-i).toString())));
    }

    crtanjeTabele(podaci);

    return {
    sljedecaSedmica,
    prethodnaSedmica
    }

};

