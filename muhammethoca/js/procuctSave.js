let userList = [];
let urunList = [];
let editUserId = -1;
//tabloYukle();
getir();

function tabloYukle(){
    let tabloUserList = document.getElementById('userList');
    tabloUserList.innerHTML = '';
    fetch('http://localhost:9090/user/get-all')
    .then(data=> data.json())
    .then(data=>{
        console.log(data)
        userList = data;
        userList.forEach((u,index)=>{
            tabloUserList.innerHTML += `
        <tr id="${index}">
            <td>${u.id}</td>
            <td>${u.ad} ${u.soyad}</td>
            <td>${u.adres}</td>
            <td>${u.yas}</td>
            <td>
            <button onclick="sil(${index})">X</button>
            <!-- Button trigger modal -->
            <button onclick="duzenle(${index})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Edit
            </button>
            </td>
        </tr>`;
        });
    })
    
    
}

function getir(){
    
    const cardList = document.getElementById('cardList');
    setInterval(()=>{
        cardList.innerHTML = '';
        fetch('http://localhost:9090/urun/get-all')
    
        .then(data=>data.json())
        .then(data=>{
            console.log(data)
   
            data.forEach(element => {
                cardList.innerHTML += `
                <div class="col col-2 border">
                    <img id="img" src="https://picsum.photos/200/200" alt="">
                    <label class="label-get" id="ad">${element.ad }</label>
                    <label class="label-get" id="marka">${element.marka }</label>
                    <label class="label-get" id="model">${element.model }</label>
                    <label class="label-get" id="fiyat">${element.fiyat}</label>
                    <label class="label-get" id="stok">${element.stok}</label>
                </div>
                
                `;
            });
        });
    },3000);
}
function sil(index){
    let id =userList[index].id;
    //userList.splice(index,1);
    tabloYukle();
}
function duzenle(index) {
    let user = userList[index];
    let id = userList[index].id;
    let ad = document.getElementById('ad_guncelle');
    let soyad = document.getElementById('soyad_guncelle');
    let adres = document.getElementById('adres_guncelle');
    let yas = document.getElementById('yas_guncelle');
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
    let marka = document.getElementById('marka').value;
    let model = document.getElementById('model').value;
    let fiyat = document.getElementById('fiyat').value;
    let stok = document.getElementById('stok').value;
    // userList.push({
    //     ad,
    //     soyad,
    //     adres,
    //     yas
    // });
    
    fetch('http://localhost:9090/urun/add-urun',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ad,
            marka,
            model,
            fiyat,
            stok
        })
    }).then(()=> {
         alert('Kayit Islemi Basarili');
        //tabloYukle();
    });
     
}