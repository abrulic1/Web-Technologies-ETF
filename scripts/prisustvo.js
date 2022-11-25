//import { TabelaPrisustvo, dugmad } from "./TabelaPrisustvo.js";
//<script src="../scripts/TabelaPrisustvo.js"></script>

const div = document.getElementById("divSadrzaj");
//instanciranje

const object = {
	"studenti": [{
        "ime": "Neko Nekic",
        "index": 12345
    },
    {
        "ime": "Drugi Neko",
        "index": 12346
    }
],
"prisustva": [{
        "sedmica": 1,
        "predavanja": 2,
        "vjezbe": 1,
        "index": 12345
    },
    {
        "sedmica": 1,
        "predavanja": 2,
        "vjezbe": 2,
        "index": 12346
    },
    {
        "sedmica": 2,
        "predavanja": 2,
        "vjezbe": 0,
        "index": 12345
    },
    {
        "sedmica": 2,
        "predavanja": 2,
        "vjezbe": 0,
        "index": 12346
    },
    {
        "sedmica": 3,
        "predavanja": 2,
        "vjezbe": 2,
        "index": 12345
    },
    {
        "sedmica": 3,
        "predavanja": 1,
        "vjezbe": 2,
        "index": 12346
    },
    {
        "sedmica": 4,
        "predavanja":2,
        "vjezbe": 2,
        "index": 12345
    },
    {
        "sedmica": 4,
        "predavanja": 0,
        "vjezbe": 1,
        "index": 12346
    },
],
"predmet": "Razvoj mobilnih aplikacija",
"brojPredavanjaSedmicno": 2,
"brojVjezbiSedmicno": 2
};


const nazivPredmeta = document.getElementById("nazivPredmeta");
nazivPredmeta.innerHTML= "<b>"+"Naziv predmeta: " + object.predmet + "<br>" + "Broj predavanja sedmicno: " + object.brojPredavanjaSedmicno + "<br>" + "Broj vjezbi sedmicno: " + object.brojVjezbiSedmicno + "</b>";
//ovdje sam dodala broj predavanja i vjezbi jer nemamo informacije o ciklusu, smjeru isl. kao na prosloj spirali sto smo proizvoljno dodavali
const { prethodnaSedmica, sljedecaSedmica } = TabelaPrisustvo(div, object);
const prisustvo = TabelaPrisustvo(div,object);
//pozivanje metoda
const div2 = document.getElementById("dugmici");


dugmad(div2,prethodnaSedmica, sljedecaSedmica);
//prisustvo.sljedecaSedmica();
//prisustvo.prethodnaSedmica();
