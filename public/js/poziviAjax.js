const PoziviAjax = (()=>{
    // ako postoji greška poruka se prosljeđuje u error parametar callback-a, a data je tada null
    function impl_getPredmet(naziv,fnCallback){
      var ajax = new XMLHttpRequest();
      ajax.onreadystatechange = function() {
	     if (ajax.readyState == 4 && ajax.status == 200){
           // document.body.innerHTML='dfdfdfdf';
            fnCallback(null, ajax.response);
         }
	     if (ajax.readyState == 4 && ajax.status == 404){
            fnCallback(ajax.status, null);
         }
       } 
      ajax.open('GET', '/predmet/'+naziv, false);
       ajax.send(JSON.stringify(naziv));
    }
    // vraća listu predmeta za loginovanog nastavnika ili grešku da nastavnik nije loginovan
    function impl_getPredmeti(fnCallback){
    
      // console.log('Pozvana je getPredmeti iz ajaxa');
      var ajax = new XMLHttpRequest();
      ajax.onreadystatechange = function() {
	     if (ajax.readyState == 4 && ajax.status == 200){
            fnCallback(null, ajax.responseText);
         }
	     if (ajax.readyState == 4 && ajax.status == 404){
            fnCallback(ajax.status, null);
         }
       } 
      ajax.open("GET", "/predmeti", false);
       ajax.send();
    }

    
    function impl_postLogin(username,password,fnCallback){
      //pravim xhr objekat
        var ajax = new XMLHttpRequest();

      //otvaramo konekciju na server
      ajax.open("POST", "/login", true);
      ajax.setRequestHeader("Content-Type", "application/json");
      const podaci = {
        "username": username, 
        "password": password
      }
      
      ajax.send(JSON.stringify(podaci, null, 2));
    
      ajax.onreadystatechange = function() {
	     if (ajax.readyState == 4 && ajax.status == 200)
            fnCallback(null, ajax.responseText);
         
	     if (ajax.readyState == 4 && ajax.status == 404)
            fnCallback(ajax.status, null);
         
       } 
    }


    
    function impl_postLogout(fnCallback){
         var ajax = new XMLHttpRequest();
         ajax.open("POST", "/logout", true);
         ajax.setRequestHeader("Content-Type", "application/json");
         //ovo mi vrv ni ne treba
         ajax.send();
         ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200){
               fnCallback(null, ajax.responseText);
            }
            if (ajax.readyState == 4 && ajax.status == 404){
               fnCallback(ajax.status, null);
            }
          } 
    }
    //prisustvo ima oblik {sedmica:N,predavanja:P,vjezbe:V}
    function impl_postPrisustvo(naziv,index,prisustvo,fnCallback){
      var ajax = new XMLHttpRequest();
      ajax.open("POST", "/prisustvo/predmet/"+naziv+"/index/"+index, true);
      ajax.setRequestHeader("Content-Type", "application/json");
      //ovo mi vrv ni ne treba
      // ajax.send(JSON.stringify(prisustvo, null, 2));
      ajax.send(JSON.stringify(prisustvo));
      ajax.onreadystatechange = function() {
         if (ajax.readyState == 4 && ajax.status == 200){
            fnCallback(null, ajax.responseText);
         }
         if (ajax.readyState == 4 && ajax.status == 404){
            fnCallback(ajax.status, null);
         }
       } 
    }
    return{
    postLogin: impl_postLogin,
    postLogout: impl_postLogout,
    getPredmet: impl_getPredmet,
    getPredmeti: impl_getPredmeti,
    postPrisustvo: impl_postPrisustvo
    };
    })();