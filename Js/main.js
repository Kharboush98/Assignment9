var addContactBtn = document.getElementById("addContactBtn");
var editContactBtn = document.getElementById("editContactBtn");

// contact
var fullname = document.getElementById("fullname");
var number = document.getElementById("number");
var email = document.getElementById("email");
var address = document.getElementById("address");
var groupCat = document.getElementById("groupCat");
var contactInfo = document.getElementById("contactInfo");
var favCheck = document.getElementById("favCheck");
var emCheck = document.getElementById("emCheck");

//Totals
var totalContacts = document.getElementById("totalContacts");
var totalFavContacts = document.getElementById("totalFavContacts");
var totalContotalEmContactstacts = document.getElementById("totalEmContacts");

// Contact Card
var ContactCardHolder = document.getElementById("ContactCardHolder");

var FavCardIcon = document.getElementById("FavCardIcon");
var EmCardIcon = document.getElementById("EmCardIcon");
var EmergencyCatTag = document.getElementById("EmergencyCatTag");

// var editBtn;

var cList = [];


var AllFav = 0;
var AllEm = 0;

// if(localStorage.getItem("contactList")){
//     cList = JSON.parse(localStorage.getItem("contactList"));
//     displayProducts(productList);
// }else{
//     cList = [];
// }


function addContact(){

    var contact = {
        id: 0,
        fullname : fullname.value,
        number : number.value,
        email : email.value,
        address : address.value,
        groupCat : groupCat.value,
        contactInfo : contactInfo.value,
        favCheck : favCheck.value,
        emCheck : emCheck.value,
    }

    // console.log(contact);
    cList.push(contact);
    displayAllContactInfo(cList);
    clearForm();
    // `saveToLocalStorage`(productList);
}

function saveToLocalStorage(cList){
    localStorage.setItem("contactList" , JSON.stringify(cList))
}

function clearForm() {
    fullname.value = "";
    number.value = "";
    email.value = "";
    address.value = "";
    groupCat.value = "";
    contactInfo.value = "";
    favCheck.value = "";
    emCheck.value = "";
}

function displayAllContactInfo(cList){
    displayContactCard(cList);
    displayTotalNumbers(cList);

}

function displayTotalNumbers(cList)
{
    totalContacts.innerHTML = cList.length;
}

function displayContactCard(cList)
{
    box = "";
    for(var i = 0 ; i < cList.length ; i++ )
    {
        box += 
        `
            <div class="card">
                <div class="content">
                    <div class="header mb-3">
                        <div class="pic">
                            <div class="profile">
                                <span id="firstletter">${cList[i].fullname.slice(0, 1).toUpperCase()}</span>
                            </div>

                            <div id="FavCardIcon" class="fav">
                                <i class="fa-solid fa-star"></i>
                            </div>

                            <div id="EmCardIcon" class="emergency">
                                <i class="fa-solid fa-heart-pulse"></i>
                            </div>
                        </div>

                        <div class="mainInfo">
                            <h3>${cList[i].fullname}</h3>
                            <div class="iconTag">
                                <div class="callTag">
                                    <i class="fa-solid fa-phone"></i>
                                </div>
                                <p>${cList[i].number}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="otherInfo mb-3">

                        <div class="iconTag mb-2">
                            <div class="msgTag">
                                <i class="fa-solid fa-envelope"></i>
                            </div>
                            <p>${cList[i].email}</p>
                        </div>

                        <div class="iconTag">
                            <div class="locationTag">
                                <i class="fa-solid fa-location-dot"></i>
                            </div>
                            <p>${cList[i].address}</p>
                        </div>
                        
                    </div>
                    
                    <div class="infoTags d-flex justify-content-start align-items-center flex-wrap column-gap-2">
                        <div class="family-tag">
                            ${cList[i].groupCat}
                        </div>

                        <div id="EmergencyCatTag" class="emergency-tag">
                            <i class="fa-solid fa-heart-pulse"></i>
                            Emergency
                        </div>
                    </div>

                </div>

                <div class="actions">
                    <div class="left">
                        <div class="icon callIcon">
                            <a href="tel:">
                                <i class="fa-solid fa-phone"></i>
                            </a>
                        </div>
                        <div class="icon msgIcon">
                            <a href="mailto:">
                                <i class="fa-solid fa-envelope"></i>
                            </a>
                        </div>
                    </div>

                    <div class="right">
                        <div class="favIcon">
                            <div class="unmarked">
                                <i class="fa-regular fa-star"></i>
                            </div>
                            <div class="marked d-none">
                                <i class="fa-solid fa-star"></i>
                            </div>
                        </div>

                        <div class="emergencyIcon">
                            <div class="unmarked ">
                                <i class="fa-regular fa-heart"></i>
                            </div>
                            <div class="marked d-none">
                                <i class="fa-solid fa-heart-pulse"></i>
                            </div>
                        </div>

                        <div id="editBtn" onclick="updateProduct()" class="editIcon">
                            <i class="fa-solid fa-pen" data-bs-toggle="modal" data-bs-target="#editContactModal"></i>
                        </div>

                        <div class="deleteIcon">
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;

        ContactCardHolder.innerHTML = box;

        // if(cList[i].favCheck === "fav"){
        //     FavCardIcon.classList.remove("d-none");
        // } else {
        //     FavCardIcon.classList.add("d-none");
        // }

        // if(cList[i].emCheck === "emergency"){
        //     EmCardIcon.classList.remove("d-none");
        //     EmergencyCatTag.classList.remove("d-none");
        // } else {
        //     EmCardIcon.classList.add("d-none");
        //     EmergencyCatTag.classList.add("d-none");
        // }

        
    }
}


function setFormToUpdate(index){
    fullname.value = cList[index].fullname;
    number.value = cList[index].number;
    email.value = cList[index].email;
    address.value = cList[index].address;
    groupCat.value = cList[index].groupCat;
    contactInfo.value = cList[index].contactInfo;
    favCheck.value = cList[index].favCheck;
    emCheck.value = cList[index].emCheck;

    editContactBtn.setAttribute("data-index", index);
}

function updateProduct(){
    var index = editContactBtn.getAttribute("data-index");

    cList[index].fullname = fullname.value;
    cList[index].number = number.value;
    cList[index].email = email.value;
    cList[index].address = address.value;
    cList[index].groupCat = groupCat.value;
    cList[index].contactInfo = contactInfo.value;
    cList[index].favCheck = favCheck.value;
    cList[index].emCheck = emCheck.value ;

    displayProducts(cList);
    // saveToLocalStorage(cList);

    clearForm();
}

addContactBtn.addEventListener("click", addContact);

editContactBtn.addEventListener("click", updateProduct);