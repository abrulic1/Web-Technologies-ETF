
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
        // console.log(items[i].innerHTML)
        PoziviAjax.getPredmet(items[i].innerHTML, (err,data)=>{
            if(err!=null)
             console.log('ne valja')
             else{ 
             console.log(data)}
             document.getElementById('tabelaPrisustva').innerHTML=data;
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
        //console.log('Bez greske');
        //ovdje nisam sigurna da li se treba otvoriti nova stranica ili da se nekako zamijeni bez refreshanja
        window.location.href="/prijava";
        }
     });
    }
   

        // let items = document.querySelectorAll('#lista');
        // let elements=[];
        // console.log(items, typeof items)
        // for(let i=0; i<items.length; i++){
        //     elements.push(items[i].innerHTML);
        // }
    
        // function kliknutaLista(){
        // console.log('prfmkdlfnadfgmafmdfkmdasl= ', predmeti);
        
        // }

    //    let items = document.querySelectorAll('#lista');
    //    console.log(items);