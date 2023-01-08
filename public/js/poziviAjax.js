const PoziviAjax = (()=>{
    //fnCallback u svim metodama se poziva kada stigne odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data, error je null ako je status 200 i data je tijelo
    // odgovora
    // ako postoji greška poruka se prosljeđuje u error parametar callback-a, a data je tada null
    function impl_getPredmet(naziv,fnCallback){
    }
    // vraća listu predmeta za loginovanog nastavnika ili grešku da nastavnik nije loginovan
    function impl_getPredmeti(fnCallback){
    }


    
    function impl_postLogin(username,password,fnCallback){
        // console.log(username);
        // console.log(password);
        //pravim xhr objekat
        var ajax = new XMLHttpRequest();

      //otvaramo konekciju na server
      ajax.open("POST", "/login", true);
      ajax.setRequestHeader("Content-Type", "application/json");
      const podaci = {
        "username": username, 
        "password": password
      }
      
      
      console.log(typeof JSON.stringify(podaci, null, 2))
      ajax.send(JSON.stringify(podaci, null, 2));
    
      ajax.onreadystatechange = function() {
        //samo cu morati ukinuti css i dodat novi il nest tako...sad samo testiram, poslije cemo dalje raditi sta treba
	     if (ajax.readyState == 4 && ajax.status == 200)
		    document.body.innerHTML = ajax.responseText;
	     if (ajax.readyState == 4 && ajax.status == 404)
		    document.body.innerHTML = "Greska: nepoznat URL";
       } 

    }


    
    function impl_postLogout(fnCallback){
    }
    //prisustvo ima oblik {sedmica:N,predavanja:P,vjezbe:V}
    function impl_postPrisustvo(naziv,index,prisustvo,fnCallback){
    }
    return{
    postLogin: impl_postLogin,
    postLogout: impl_postLogout,
    getPredmet: impl_getPredmet,
    getPredmeti: impl_getPredmeti,
    postPrisustvo: impl_postPrisustvo
    };
    })();