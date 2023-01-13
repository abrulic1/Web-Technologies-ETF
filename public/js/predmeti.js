let redovi = [];
let tabela=null;
document.getElementById('logout').addEventListener('click', odjaviSe);

window.onload = function () {
    PoziviAjax.getPredmeti((err, data) => {
        if (err != null) {
            alert('Neispravni podaci, ne mogu se dohvatiti predmeti za profesora!');
        }
        else {
            data = JSON.parse(data);
            lista = document.createElement('ul');
            lista.id = 'lista';
            for (let i = 0; i < data.length; i++) {
                let stavka = document.createElement('li');
                stavka.innerHTML = data[i];
                lista.appendChild(stavka);
            }
            let nav = document.getElementById('nav');
            nav.appendChild(lista);
            let items = document.querySelectorAll('#lista li');
            //ne uzimam logout dugme
            for (let i = 1; i < items.length; i++)
                items[i].onclick = function () {
                    var current = document.getElementsByClassName('active');
                    if (current.length != 0) current[0].className = current[0].className.replace(' active', '');
                    items[i].className += " active";
                    debugger
                    PoziviAjax.getPredmet(items[i].innerHTML, (err, data) => {
                        if (err != null)
                            console.log('Ne moze se dohvatiti predmet iz poziviAjax!')
                        else {
                            data = JSON.parse(data);
                            let div = document.getElementById('tabelaPrisustva');
                            const { prethodnaSedmica, sljedecaSedmica } = TabelaPrisustvo(div, data);
                            tabela = document.getElementById('glavna-tabela');
                            const buttonsContainer = document.getElementById("dugmici");
                            dugmad(buttonsContainer, prethodnaSedmica, sljedecaSedmica);
                            redovi = document.getElementsByTagName('tr');
                            debugger
                            tabela.addEventListener('click', function(event){
                            console.log('poziva se table listener'); 
                            promijeniPrisustvo(items[i].innerHTML, event)
                            })
                            // tabela.onclick=function(){
                            //    console.log('poziva se table listener'); 
                            // promijeniPrisustvo(items[i].innerHTML)
                            // }
                        
                        }
                    })
                }
        }
    })
}



function odjaviSe() {
    PoziviAjax.postLogout((err, data) => {
        if (err != null) {
            alert('Neispravni podaci!');
        }
        else {
            window.location.href = "/prijava";
        }
    });
}


 function promijeniPrisustvo(naziv, event) {
    //uzimam svaki drugi iz razloga sto mi ne treba da prolazim kroz redove koji imaju ovu informaciju ime i prezime, index...onda ovo P1 P2 V1 V2....
    //Ovo moram rijesiti, previse for petlji, previse pristupa memoriji...ubacit streamove isl. 
    for (let i = 0; i < redovi.length; i += 2) {
        let row = redovi[i];
        for (let j = 0; j < row.cells.length; j++) { 
        row.cells[j].addEventListener('click', function (event) {
            console.log("pozvan je listener");
            if (event.target.tagName === "TD") {
                let clickedCell = event.target;
                let clickedRow = row;
                let clickedColumn;
                    let cell = row.cells[j];
                    if (cell === clickedCell) {
                        //trazim sedmicu
                        var thElements = document.querySelectorAll("th");
                        let trenutniTH = 0;
                        for (let k = 0; k < thElements.length; k++)
                            if (thElements[k].colSpan != 1) {
                                trenutniTH = k;
                                break;
                            }
                        clickedRow = i;
                        clickedColumn = j;
                        //redovi gdje se nalaze celije koje su nam od interesa su u parnim redovima, a kolone su na segmentu [0, brpred+brvjezbi]
                        //ovdje moram da prebrojim predavanja i vjezbe na koje je student prisustvovao
                        let predavanjaUkupno = 0;
                        let vjezbeUkupno = 0;
                        let predavanjaPrisustvo = 0;
                        let vjezbePrisustvo = 0;

                        for (let k = 0; k < row.cells.length; k++) {
                            if (row.cells[k].classList.contains('predavanja')) {
                                predavanjaUkupno++;
                                if (row.cells[k].classList.contains('prisutan')) predavanjaPrisustvo++;
                            }
                            else if (row.cells[k].classList.contains('vjezbe')) {
                                vjezbeUkupno++;
                                if (row.cells[k].classList.contains('prisutan')) vjezbePrisustvo++;
                            }
                        }
                      
                        let vjezbeSuAzurirane = 0;
                        let predavanjaSuAzurirana = 0;
                        if (clickedColumn >= predavanjaUkupno) vjezbeSuAzurirane = 1;
                        else predavanjaSuAzurirana = 1;
                       
                        for (let k = 0; k < row.cells.length; k++) {
                            if (clickedColumn == k) {
                                //Da li se treba ovdje zamijenit klasa???....
                                if (row.cells[k].classList.contains('predavanja') && row.cells[k].classList.contains('prisutan')) {
                                    predavanjaPrisustvo--;
                                    break;
                                }
                                else if (row.cells[k].classList.contains('predavanja') && (row.cells[k].classList.contains('odsutan') || row.cells[k].classList.contains('praznaCelija'))) {
                                    predavanjaPrisustvo++;
                                    break;
                                }
                                else if (row.cells[k].classList.contains('vjezbe') && row.cells[k].classList.contains('prisutan')) {
                                    vjezbePrisustvo--;
                                    break;
                                }
                                else if (row.cells[k].classList.contains('vjezbe') && (row.cells[k].classList.contains('odsutan') || row.cells[k].classList.contains('praznaCelija'))) {
                                    vjezbePrisustvo++;
                                    break;
                                }
                            }
                        }

                        //sedmice tj th idu indexacijom 0, 1, 2... da idu od 1, 2, .. umanjili bi za 2 jer nam ne trebaju ime prezime i index kolone
                        let celija = { "sedmica": trenutniTH - 1, "predavanja": predavanjaPrisustvo, "vjezbe": vjezbePrisustvo };
                        let index = redovi[clickedRow - 1].cells[1].textContent;
                   
                         PoziviAjax.postPrisustvo(naziv, index, celija, (err, data) => {
                            if (err != null)
                                console.log('ne valja');
                            else {
                                console.log('valja i iscrtava se ponovo sve ispocetka');
                                    data = JSON.parse(data); 
                                    let div = document.getElementById('tabelaPrisustva');
                                    const { prethodnaSedmica, sljedecaSedmica } = TabelaPrisustvo(div, data);
                                    tabela = document.getElementById('glavna-tabela');
                                    const buttonsContainer = document.getElementById("dugmici");
                                    dugmad(buttonsContainer, prethodnaSedmica, sljedecaSedmica);
                                    redovi = document.getElementsByTagName('tr');
                                    tabela.addEventListener('click', function(event){
                                        console.log('poziva se table listener'); 
                                        promijeniPrisustvo(items[i].innerHTML, event)
                                        })
                            }
                        })
                }
            }  //if event je kliknuta celija
        })
        // if(kliknutaJe) break;
    }
}
}

