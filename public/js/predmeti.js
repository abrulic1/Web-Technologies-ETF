let redovi = [];
let buttonsContainer = null;
let nazivPredmeta = '';
document.getElementById('logout').addEventListener('click', odjaviSe);

function odjaviSe() {
    PoziviAjax.postLogout((err, data) => {
        if (err != null)
            alert('Neispravni podaci!');
        else
            window.location.href = "/prijava";
    });
}


window.onload = function () {
    PoziviAjax.getPredmeti((err, data) => {
        if (err != null)
            alert('Neispravni podaci, ne mogu se dohvatiti predmeti za profesora!');
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
                    window.trenutnaSedmica = 0;
                    var current = document.getElementsByClassName('active');
                    if (current.length != 0) current[0].className = current[0].className.replace(' active', '');
                    items[i].className += " active";

                    PoziviAjax.getPredmet(items[i].innerHTML, (err, data) => {
                        if (err != null)
                            console.log('Ne moze se dohvatiti predmet iz poziviAjax!')
                        else {
                            data = JSON.parse(data);
                            let div = document.getElementById('tabelaPrisustva');
                            const { prethodnaSedmica, sljedecaSedmica } = TabelaPrisustvo(div, data);
                            buttonsContainer = document.getElementById("dugmici");
                            dugmad(buttonsContainer, prethodnaSedmica, sljedecaSedmica);
                            redovi = document.getElementsByTagName('tr');
                            nazivPredmeta = items[i].innerHTML;
                            buttonsContainer.onclick = function () {
                                promijeniPrisustvo(items[i].innerHTML)
                            }
                            promijeniPrisustvo(items[i].innerHTML);
                        }
                    })
                }
        }
    })
}


function promijeniPrisustvo(naziv) {
    //nisu mi od interesa redovi koji imaju podatke o imenu, prezimenu i indexu, kao i ovi sto imaju ovo P1, P2, V1, V2, V3 isl. zato +=2 u petlji
    for (let i = 0; i < redovi.length; i += 2) {
        let row = redovi[i];
        for (let j = 0; j < row.cells.length; j++) {
            row.cells[j].onclick = function (event) {
                let clickedCell = event.target;
                let clickedRow;
                let clickedColumn;
                let cell = row.cells[j];
                if (cell === clickedCell) {
                    var thElements = document.querySelectorAll("th");
                    for (let k = 0; k < thElements.length; k++)
                        if (thElements[k].colSpan != 1) {
                            //sedmice tj th idu indecacijom 0, 1, 2... da idu od 1, 2 itd. umanjili bismo za 2 jer nam ne trebaju "ime i prezime" i "index" kolone
                            window.trenutnaSedmica = k - 1;
                            break;
                        }

                    clickedRow = i;
                    clickedColumn = j;
                    let predavanjaUkupno = 0;
                    let vjezbeUkupno = 0;
                    let predavanjaPrisustvo = 0;
                    let vjezbePrisustvo = 0;

                    for (let k = 0; k < row.cells.length; k++) {
                        const classLista = row.cells[k].classList;
                        if (classLista.contains('predavanja')) {
                            predavanjaUkupno++;
                            if (classLista.contains('prisutan')) predavanjaPrisustvo++;
                        }
                        else if (classLista.contains('vjezbe')) {
                            vjezbeUkupno++;
                            if (classLista.contains('prisutan')) vjezbePrisustvo++;
                        }
                    }

                    for (let k = 0; k < row.cells.length; k++) {
                        if (clickedColumn == k) {
                            const classLista = row.cells[k].classList;
                            if (classLista.contains('predavanja') && classLista.contains('prisutan'))
                                predavanjaPrisustvo--;
                            else if (classLista.contains('predavanja') && (classLista.contains('odsutan') || classLista.contains('praznaCelija')))
                                predavanjaPrisustvo++;
                            else if (classLista.contains('vjezbe') && classLista.contains('prisutan'))
                                vjezbePrisustvo--;
                            else if (classLista.contains('vjezbe') && (classLista.contains('odsutan') || classLista.contains('praznaCelija')))
                                vjezbePrisustvo++;
                        }
                    }

                    let celija = { "sedmica": window.trenutnaSedmica, "predavanja": predavanjaPrisustvo, "vjezbe": vjezbePrisustvo };
                    let index = redovi[clickedRow - 1].cells[1].textContent;
                    //  console.log('saljemo sedmicu ', window.trenutnaSedmica, ' predavanja ', predavanjaPrisustvo, ' i vjezbe ', vjezbePrisustvo, ' i index ', index, ' i naziv ', naziv);
                    PoziviAjax.postPrisustvo(naziv, index, celija, (err, data) => {
                        if (err != null)
                            console.log('ne valja');
                        else {
                            data = JSON.parse(data);
                            //  console.log('IZ PREDMETI SE SALJU : ', data);
                            let div = document.getElementById('tabelaPrisustva');
                            const { prethodnaSedmica, sljedecaSedmica } = TabelaPrisustvo(div, data);
                            buttonsContainer = document.getElementById("dugmici");
                            dugmad(buttonsContainer, prethodnaSedmica, sljedecaSedmica);
                            redovi = document.getElementsByTagName('tr');
                            promijeniPrisustvo(naziv);
                            buttonsContainer.onclick = function () {
                                dugmad(buttonsContainer, prethodnaSedmica, sljedecaSedmica);
                                redovi = document.getElementsByTagName('tr');
                                promijeniPrisustvo(nazivPredmeta)
                            }
                        }
                    })
                }
            }
        }
    }
}

