let redovi=[];
document.getElementById('logout').addEventListener('click', odjaviSe);
let predmeti = "";
 window.onload=  function(){
    PoziviAjax.getPredmeti( (err, data)=>{
// console.log("pget predmeti iz predmeti")
 if(err!=null){
    alert('Neispravni podaci!');
    }
    else{
        data = JSON.parse(data);
    // console.log(data, typeof data, data.length);
    lista = document.createElement('ul');
    lista.id='lista';
    for(let i=0; i<data.length; i++){
        // console.log('data[i] ',data[i])
        predmeti = JSON.stringify(data);
        let stavka = document.createElement('li');
        stavka.innerHTML=data[i];
        // console.log(typeof stavka);
        lista.appendChild(stavka);
    }
    let nav = document.getElementById('nav');
    nav.appendChild(lista);
    let items = document.querySelectorAll('#lista li');
    for(let i=1; i<items.length; i++)
    items[i].onclick = function(){
        var current = document.getElementsByClassName('active');
        if(current.length!=0)current[0].className = current[0].className.replace(' active', '');
        items[i].className+=" active";
        // console.log(items[i].innerHTML)
        PoziviAjax.getPredmet(items[i].innerHTML, (err,data)=>{
            if(err!=null)
             console.log('ne valja')
             else{ 
                data = JSON.parse(data); 
                let div = document.getElementById('tabelaPrisustva');
                const { prethodnaSedmica, sljedecaSedmica} = TabelaPrisustvo(div, data);
                const buttonsContainer = document.getElementById("dugmici");
                dugmad(buttonsContainer,prethodnaSedmica, sljedecaSedmica);
                // console.log(JSON.parse(data).predmet);
                redovi = document.getElementsByTagName('tr');
                console.log('redovi su',redovi);
                promijeniPrisustvo(items[i].innerHTML);
                buttonsContainer.addEventListener("click", function(event){
                    promijeniPrisustvo(items[i].innerHTML);
                }) 
             }
        })
    }
    }
})
}



function odjaviSe(){
    PoziviAjax.postLogout((err, data)=>{
        if(err!=null){
         alert('Neispravni podaci!');
        }
        else{
        window.location.href="/prijava";
        }
     });
    }


    function countTableColumns() {
        var tdElements = document.querySelectorAll("th");
        var columnCount = tdElements.length;
        return columnCount;
    }

    function promijeniPrisustvo(){
        var tdElements = document.querySelectorAll("th");
        var columnCount = tdElements.length;

        for(let j=0; j<columnCount.length; j++){

        }
    }

function promijeniPrisustvo(naziv){
    for (let i = 0; i < redovi.length; i+=2) {
        let row = redovi[i];
        row.addEventListener('click', function(event){
            if (event.target.tagName === "TD") {
                let clickedCell = event.target;
                let clickedRow = row;
                let clickedColumn;
    for (let j = 0; j < row.cells.length; j++) {
        let cell = row.cells[j];
        if (cell === clickedCell) {
            var thElements = document.querySelectorAll("th");
            let trenutniTH=0;
            for(let k=0; k<thElements.length; k++)
            if (thElements[k].colSpan!=1){
                trenutniTH=k;
                console.log('trenutni ht je: ', trenutniTH);
                break;
            }
            clickedRow = i;
            clickedColumn = j;


            //redovi gdje se nalaze celije koje su nam od interesa su u parnim redovima, a kolone su na segmentu [0, brpred+brvjezbi]

            //ovdje moram da prebrojim predavanja i vjezbe na koje je student prisustvovao
            let predavanja=0;
            let vjezbe=0;
            
            let predavanjaPrisustvo=0;
            let vjezbePrisustvo=0;
 
            for(let k=0; k<row.cells.length; k++){
               if(row.cells[k].classList.contains('predavanja')){
                predavanja++;
                if(row.cells[k].classList.contains('prisutan')) predavanjaPrisustvo++;
               }
               else if(row.cells[k].classList.contains('vjezbe')) 
               {vjezbe++;
                if(row.cells[k].classList.contains('prisutan')) vjezbePrisustvo++;
               }
            }
            //ovo je okej
            // console.log('PREDAVANJA....: ', predavanja);
            // console.log('VJEZBE.....: ', vjezbe);
            let vjezbeSuAzurirane=0;
            let predavanjaSuAzurirana=0;
            //I OVO JE sada okej
           if(clickedColumn>=predavanja) vjezbeSuAzurirane=1;
           else predavanjaSuAzurirana=1;
            // console.log('AZURIRANE VJEZBE...:', vjezbeSuAzurirane);
            // console.log('AZURIRANJA PREDAVANJA...: ', predavanjaSuAzurirana)
        
           for(let k=0; k<row.cells.length; k++){
            
            if(clickedColumn==k){
                console.log('lista styles klasa:.... ',  row.cells[k].classList)
                //i ovo je ok
                // console.log('CLICKED COLUMN ..... : ', clickedColumn);
                // console.log('K JE ....:', k);
                //i ovo je ok
                // console.log('PREDAVANJE JE: ', row.cells[k].classList.contains('predavanja'));
                // console.log('VJEZBA JE: ', row.cells[k].classList.contains('vjezbe'));

                //da li se treba ovdje zamijenit klasa....
                if(row.cells[k].classList.contains('predavanja') && row.cells[k].classList.contains('prisutan')){
                    predavanjaPrisustvo--;
                    console.log('predavanjaPrisustvo su smanjena');
                    console.log('iznose: ', predavanjaPrisustvo)
                }
                else if(row.cells[k].classList.contains('predavanja') && (row.cells[k].classList.contains('odsutan') || row.cells[k].classList.contains('praznaCelija'))){
                    predavanjaPrisustvo++;
                    console.log('predavanaprisustvo su povecana')
                    console.log('iznose: ', predavanjaPrisustvo)
                }
            //     if(predavanjaSuAzurirana && row.cells[k].classList.contains('predavanja')){
            //         if(row.cells[k].classList.contains('prisutan')){
            //             row.cells[k].classList.remove(row.cells[k].classList.item(1));
            //             row.cells[k].classList.add('odsutan');
            //             predavanjaPrisustvo--;
            //             break;
            //         }
            //         else{
            //             if(row.cells[k].classList.contains('odsutan'))  row.cells[k].classList.remove(row.cells[k].classList.item(1));
            //             else  row.cells[k].classList.remove(row.cells[k].classList.item(1));
            //             row.cells[k].classList.add('prisutan');
            //             predavanjaPrisustvo++;
            //             break;
            //         } 
            //     }else if(vjezbeSuAzurirane && row.cells[k].classList.contains('vjezbe')){
            //     if(row.cells[k].classList.contains('prisutan')){
            //         row.cells[k].classList.remove(row.cells[k].classList.item(1));
            //         row.cells[k].classList.add('odsutan');
            //         vjezbePrisustvo--;
            //         break;
            //     }
            //     else{
            //         if(row.cells[k].classList.contains('odsutan'))  row.cells[k].classList.remove(row.cells[k].classList.item(1));
            //         else  row.cells[k].classList.remove(row.cells[k].classList.item(1));
            //         row.cells[k].classList.add('prisutan');
            //         vjezbePrisustvo++;
            //         break;
            //     } 
            // }
        }
           }

           
           
           let celija = {"sedmica": trenutniTH-1, "predavanja": predavanjaPrisustvo, "vjezbe": vjezbePrisustvo};
           let index = redovi[clickedRow-1].cells[1].textContent;
      
           PoziviAjax.postPrisustvo( naziv,  index, celija, (err,data)=>{
            if(err!=null)
            console.log('ne valja');
            else 
            {
                // clickedCell.addEventListener('click', function(data){
                //     data = JSON.parse(data); 
                //     // console.log('PODACI iz PREDMETI.js.....: ',data);
                //     console.log("duzina data je....", data.length);
                //     for(let i=0; i<data.length; i++){
                //     let div = document.getElementById('tabelaPrisustva');
                //     const { prethodnaSedmica, sljedecaSedmica} = TabelaPrisustvo(div, data[i]);
                //     const buttonsContainer = document.getElementById("dugmici");
                //     dugmad(buttonsContainer,prethodnaSedmica, sljedecaSedmica);
                //     }
                // }) 
            }
           })
            break;
        }
    }
  }})
 }
};
