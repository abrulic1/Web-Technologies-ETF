let redovi = [];
let tabela=null;
let buttonsContainer = null;
let nazivPredmeta='';
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
                    window.trenutnaSedmica=0;
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
                            tabela = document.getElementById('glavna-tabela');
                            buttonsContainer = document.getElementById("dugmici");
                            dugmad(buttonsContainer, prethodnaSedmica, sljedecaSedmica);
                            redovi = document.getElementsByTagName('tr');
                            nazivPredmeta=items[i].innerHTML;
                            buttonsContainer.onclick = function(){
                                promijeniPrisustvo(items[i].innerHTML)
                            }
                             // tabela.addEventListener('click', function(event){
                            // console.log('poziva se table listener'); 
                            promijeniPrisustvo(items[i].innerHTML)
                            // })
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


 function promijeniPrisustvo(naziv) {
    for (let i = 0; i < redovi.length; i += 2) {
        let row = redovi[i];
        for (let j = 0; j < row.cells.length; j++) { 
        row.cells[j].onclick = function (event) {
            console.log("pozvan je listener");
                let clickedCell = event.target;
                let clickedRow;
                let clickedColumn;
                    let cell = row.cells[j];
                    if (cell === clickedCell) {
                        var thElements = document.querySelectorAll("th");
                        // let trenutniTH = 0;
                        for (let k = 0; k < thElements.length; k++)
                            if (thElements[k].colSpan != 1) {
                                // trenutniTH = k;
                                window.trenutnaSedmica=k-1;
                                break;
                            }
                        clickedRow = i;
                        clickedColumn = j;
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
                                if (row.cells[k].classList.contains('predavanja') && row.cells[k].classList.contains('prisutan')) {
                                    predavanjaPrisustvo--;
                                    // row.cells[k].classList.remove('prisutan');
                                    // row.cells[k].classList.add('odsutan');
                                    break;
                                }
                                else if (row.cells[k].classList.contains('predavanja') && (row.cells[k].classList.contains('odsutan') || row.cells[k].classList.contains('praznaCelija'))) {
                                    predavanjaPrisustvo++;
                                    // row.cells[k].classList.remove('odsutan');
                                    // row.cells[k].classList.remove('praznaCelija');
                                    // row.cells[k].classList.add('prisutan');
                                    break;
                                }
                                else if (row.cells[k].classList.contains('vjezbe') && row.cells[k].classList.contains('prisutan')) {
                                    vjezbePrisustvo--;
                                    // row.cells[k].classList.remove('prisutan');
                                    // row.cells[k].classList.add('odsutan');
                                    break;
                                }
                                else if (row.cells[k].classList.contains('vjezbe') && (row.cells[k].classList.contains('odsutan') || row.cells[k].classList.contains('praznaCelija'))) {
                                    vjezbePrisustvo++;
                                    // row.cells[k].classList.remove('odsutan');
                                    // row.cells[k].classList.remove('praznaCelija');
                                    // row.cells[k].classList.add('prisutan');
                                    break;
                                }
                            }
                        }

                        //sedmice tj th idu indexacijom 0, 1, 2... da idu od 1, 2, .. umanjili bi za 2 jer nam ne trebaju ime prezime i index kolone
                        let celija = { "sedmica": window.trenutnaSedmica, "predavanja": predavanjaPrisustvo, "vjezbe": vjezbePrisustvo };
                        let index = redovi[clickedRow - 1].cells[1].textContent;
                       console.log('saljemo sedmicu ', window.trenutnaSedmica, ' predavanja ', predavanjaPrisustvo, ' i vjezbe ', vjezbePrisustvo, ' i index ', index, ' i naziv ', naziv);
                         PoziviAjax.postPrisustvo(naziv, index, celija, (err, data) => {
                            if (err != null)
                                console.log('ne valja');
                            else {
                                console.log('valja i iscrtava se ponovo sve ispocetka');
                                    data = JSON.parse(data); 
                                    console.log('IZ PREDMETI SE SALJU : ', data);
                                    let div = document.getElementById('tabelaPrisustva');
                                    const { prethodnaSedmica, sljedecaSedmica } = TabelaPrisustvo(div, data, window.trenutnaSedmica);
                                    tabela = document.getElementById('glavna-tabela');
                                     buttonsContainer = document.getElementById("dugmici");
                                    dugmad(buttonsContainer, prethodnaSedmica, sljedecaSedmica);
                                    redovi = document.getElementsByTagName('tr');
                                     promijeniPrisustvo(naziv);
                                     buttonsContainer.onclick = function(){
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

