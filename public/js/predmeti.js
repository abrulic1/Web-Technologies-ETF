
//document.getElementById('logout').addEventListener('click', odjaviSe);
window.onload=function(){
    PoziviAjax.getPredmeti((err, data)=>{
// console.log("pget predmeti iz predmeti")
if(err!=null){
    alert('Neispravni podaci!');
    }
    else{
        data = JSON.parse(data);
    console.log(data, typeof data, data.length);
    lista = document.createElement('ul');
    for(let i=0; i<data.length; i++){
        console.log('data[i] ',data[i])
        let stavka = document.createElement('li');
        stavka.innerHTML=data[i];
        console.log(typeof stavka);
        lista.appendChild(stavka);
    }
    let stavka = document.createElement('li');
    stavka.innerHTML='Logout';
    stavka.id='logout';
    lista.appendChild(stavka);
    let nav = document.getElementById('nav');
    nav.appendChild(lista);
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
   
