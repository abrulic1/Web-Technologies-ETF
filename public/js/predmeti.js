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
    for (let i = 0; i < redovi.length; i++) {
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
           let celija = {sedmica: trenutniTH, red: clickedRow, kolona: clickedColumn};
           let index = redovi[clickedRow-1].cells[1].textContent;
        //    console.log('index je ', index, typeof index);
        //    console.log('naziv je ', naziv, typeof naziv);
        //    console.log('prisustvo ', celija, typeof JSON.stringify(celija))
           PoziviAjax.postPrisustvo( naziv,  index, celija, (err,data)=>{
            if(err!=null)
            console.log('ne valja');
            else 
            console.log('valja');
           })
            break;
        }
    }
  }})
            
           
 }
};
