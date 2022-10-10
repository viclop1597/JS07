const solicitudFetch = () =>{
    fetch("https://reqres.in/api/users?delay=3") 
        .then(response=>response.json()) /* convierte el formato */
        .then(users => {
            printUsers(users.data)
            usarLocalStorage(users.data); //aquí ya se guarda automaticamente 

        })
        .catch ( err => { 
            console.log(err);
        });
    }
    
    function leerUsuario(usuario){
        const user = JSON.parse(localStorage.getItem("user"));
            if (user && user.time > Date.now()){ 
                leerLocalStorage();
            }
            else{ 
                solicitudFetch(usuario);
            }
    }

    const printUser = ({ avatar, id, email, first_name, last_name }) => {
            return `
            <table class="table table-responsive">
            <tbody>
            <tr class="table-secondary">
              <td>${id}</td>
              <td>${first_name}</td>
              <td>${last_name}</td>
              <td>${email}</td>
              <td>
                <img src="${avatar}" class="rounded-circle" style="width: 50px" ></img>
              </td>
            </tr>     
            </tbody>
            `
    }    
    /* Si le puse el formato pero no jaló el redondeado :c */

    function printUsers (users){
            const container = document.getElementById("users-container")
            users.forEach(u => container.innerHTML += printUser(u))
    }    
    

    const usarLocalStorage = data => {
        const users = {
            content: [...data],
            time: Date.now() + 60000
        }
        localStorage.setItem('users', JSON.stringify(users))
    }
    
    
    function leerLocalStorage(){
        const objUser = document.getElementById("user-name"); 
        const objEmail = document.getElementById("user-email"); 

        const user = JSON.parse(localStorage.getItem("user"));
    
        objUser.value= user.name; 
        objEmail.value= user.email;
    }