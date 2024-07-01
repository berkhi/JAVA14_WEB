const userList = [];
let editUserId = -1;
/* tabloYukle(); */
function tabloYukle(){
    let tabloUserList = document.getElementById('userList');
    tabloUserList.innerHTML = '';
    fetch('http://localhost:9090/user/get-all', {
        method: 'GET',
        mode: 'cors'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data=> data.json())
    .then(response=>{
        userList=response;
        userList.forEach((u,index)=>{
            tabloUserList.innerHTML += `<tr  id="${index}">
            <td>${u.id}</td>
            <td>${u.ad} ${u.soyad}</td>
            <td>${u.adres}</td>
            <td>${u.yas}</td>
            <td>
                <button onclick="sil(${index})"> X </button>
                <button onclick="duzenle(${index})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit
                </button>
            </td>
        </tr>`; 
        }); 
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}
function sil(index){
    //userList.splice(index,1);
    let id = userList[index].id;
    tabloYukle();
}
function duzenle(index){
    let user = userList[index];
    let ad = document.getElementById('ad_guncelle');
    let soyad = document.getElementById('soyad_guncelle');
    let adres = document.getElementById('adres_guncelle');
    let yas = document.getElementById('yas_guncelle');
    console.log(user);
    ad.value = user.ad;
    soyad.value = user.soyad;
    adres.value = user.adres;
    yas.value = user.yas;
    editUserId = index;
}
function guncelle(){
    let ad = document.getElementById('ad_guncelle').value;
    let soyad = document.getElementById('soyad_guncelle').value;
    let adres = document.getElementById('adres_guncelle').value;
    let yas = document.getElementById('yas_guncelle').value;
    userList[editUserId].ad = ad;
    userList[editUserId].soyad = soyad;
    userList[editUserId].adres = adres;
    userList[editUserId].yas = yas;
    tabloYukle();
}

function ekle(){
    let ad = document.getElementById('ad').value;
    let soyad = document.getElementById('soyad').value;
    let adres = document.getElementById('adres').value;
    let yas = document.getElementById('yas').value;

    fetch('http://localhost:9090/user/add-user', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        mode: 'cors',
        body: JSON.stringify({
            ad,
            soyad,
            adres,
            yas
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert("Kayıt başarılı");
        tabloYukle();
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        alert("Kayıt başarısız: " + error.message);
    });
}