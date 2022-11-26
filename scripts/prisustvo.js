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
    },
    {
        "ime": "Cetvrti Nekic",
        "index": 12348
    },
    {
        "ime": "Peti Nekic",
        "index": 12349
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
        "sedmica": 4,
        "predavanja": 1,
        "vjezbe": 0,
        "index": 12347
    },
    {
        "sedmica": 3,
        "predavanja": 2,
        "vjezbe": 2,
        "index": 12347
    },
    {
        "sedmica": 1,
        "predavanja": 0,
        "vjezbe": 0,
        "index": 12348
    }, 
    {
        "sedmica": 4,
        "predavanja": 1,
        "vjezbe": 0,
        "index": 12348
    }, 
    {
        "sedmica": 5,
        "predavanja": 1,
        "vjezbe": 1,
        "index": 12349
    }
],
"predmet": "Razvoj mobilnih aplikacija",
"brojPredavanjaSedmicno": 2,
"brojVjezbiSedmicno": 2
};


const nazivPredmeta = document.getElementById("nazivPredmeta");
nazivPredmeta.innerHTML= "<b>"+"Naziv predmeta: " + "</b>"+ object.predmet + "<br>" + "<b>"+ "Broj predavanja sedmicno: " + "</b>" + object.brojPredavanjaSedmicno + "<br>" + "<b>"+ "Broj vjezbi sedmicno: " + "</b>" + object.brojVjezbiSedmicno + "</b>";
const { prethodnaSedmica, sljedecaSedmica } = TabelaPrisustvo(div, object);
nazivPredmeta.classList="osnovneInformacije";

const buttonsContainer = document.getElementById("dugmici");

dugmad(buttonsContainer,prethodnaSedmica, sljedecaSedmica);
//prisustvo.sljedecaSedmica();
//prisustvo.prethodnaSedmica();
