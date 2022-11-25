const div = document.getElementById("divSadrzaj");

const object = {
	"studenti": [{
        "ime": "Neko Nekic",
        "index": 12345
    },
    {
        "ime": "Drugi Neko",
        "index": 12346
    },
    {
        "ime": "Treci Nekic",
        "index": 12347
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
        "sedmica": 4,
        "predavanja":2,
        "vjezbe": 2,
        "index": 12345
    },
    {
        "sedmica": 4,
        "predavanja": 1,
        "vjezbe": 2,
        "index": 12346
    },
    {
        "sedmica": 3,
        "predavanja": 2,
        "vjezbe": 1,
        "index": 12346
    },
    {
        "sedmica": 3,
        "predavanja": 2,
        "vjezbe": 2,
        "index": 12345
    },
    {
        "sedmica": 1,
        "predavanja": 0,
        "vjezbe": 0,
        "index": 12347
    }, 
    {
        "sedmica": 2,
        "predavanja": 1,
        "vjezbe": 1,
        "index": 12347
    },
    {
        "sedmica": 3,
        "predavanja": 2,
        "vjezbe": 2,
        "index": 12347
    },
    {
        "sedmica": 4,
        "predavanja": 0,
        "vjezbe": 0,
        "index": 12347
    }
],
"predmet": "Razvoj mobilnih aplikacija",
"brojPredavanjaSedmicno": 2,
"brojVjezbiSedmicno": 2
};


const nazivPredmeta = document.getElementById("nazivPredmeta");
nazivPredmeta.innerHTML= "<b>"+"Naziv predmeta: " + object.predmet + "<br>" + "Broj predavanja sedmicno: " + object.brojPredavanjaSedmicno + "<br>" + "Broj vjezbi sedmicno: " + object.brojVjezbiSedmicno + "</b>";
const { prethodnaSedmica, sljedecaSedmica } = TabelaPrisustvo(div, object);

const buttonsContainer = document.getElementById("dugmici");
dugmad(buttonsContainer,prethodnaSedmica, sljedecaSedmica);
//prisustvo.sljedecaSedmica();
//prisustvo.prethodnaSedmica();
