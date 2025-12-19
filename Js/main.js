var addContactBtn = document.getElementById("addContactBtn");
var cancelContactBtn = document.getElementById("cancelContactBtn");

var editContactBtn = document.getElementById("editContactBtn");
var editcancelContactBtn = document.getElementById("editcancelContactBtn");

var addContactModal = document.querySelector("#addContactModal");
var editContactModal = document.querySelector("#editContactModal");

// contact
var fullname = document.getElementById("fullname");
var number = document.getElementById("number");
var email = document.getElementById("email");
var address = document.getElementById("address");
var groupCat = document.getElementById("groupCat");
var contactInfo = document.getElementById("contactInfo");
var favCheck = document.querySelector("#favCheck");
var emCheck = document.querySelector("#emCheck");

var editfullname = document.getElementById("editfullname");
var editnumber = document.getElementById("editnumber");
var editemail = document.getElementById("editemail");
var editaddress = document.getElementById("editaddress");
var editgroupCat = document.getElementById("editgroupCat");
var editcontactInfo = document.getElementById("editcontactInfo");
var editfavCheck = document.getElementById("editfavCheck");
var editemCheck = document.getElementById("editemCheck");

//Totals
var totalContacts = document.getElementById("totalContacts");
var totalFavContacts = document.getElementById("totalFavContacts");
var totalEmContacts = document.getElementById("totalEmContacts");

//Search bar
var search = document.getElementById("search");

// Contact Card
var ContactCardHolder = document.getElementById("ContactCardHolder");
var FavBodyWidget = document.getElementById("FavBodyWidget");
var EmBodyWidget = document.getElementById("EmBodyWidget");

var FavCardIcon = document.getElementById("FavCardIcon");
var EmCardIcon = document.getElementById("EmCardIcon");
var EmergencyCatTag = document.getElementById("EmergencyCatTag");

var editBtn = document.getElementById("editBtn");


var contactList;
if(localStorage.getItem("contactList")){
    contactList = JSON.parse(localStorage.getItem("contactList"));
    displayAllContactInfo(contactList);

} else {
    contactList = [];
}

function saveToLocalStorage(cList){
    localStorage.setItem("contactList" , JSON.stringify(cList))
}

var globalIndex;


function addContact(){

    if(ValidateNumber() && ValidateEmail() && EmptyFieldValidation()){
        var contact = {
            fullname : fullname.value,
            number : number.value,
            email : email.value,
            address : address.value,
            groupCat : groupCat.value,
            contactInfo : contactInfo.value,
            favCheck : favCheck.checked,
            emCheck : emCheck.checked,
        }

        // console.log(contact);
        contactList.push(contact);
        // console.log(contactList);
        displayAllContactInfo(contactList);
        clearForm();
        saveToLocalStorage(contactList)
    } else {
        console.log("Validation Error");
    }

    
}


addContactBtn.addEventListener("click", function(){
    addContact();
    clearForm();

    document.querySelector("#addContactModal .btn-close").click();
});

cancelContactBtn.addEventListener("click", function(){
    clearForm();
    document.querySelector("#addContactModal .btn-close").click();
})

function clearForm() {
    fullname.value = "";
    number.value = "";
    email.value = "";
    address.value = "";
    groupCat.value = "";
    contactInfo.value = "";
    favCheck.checked = false;
    emCheck.checked = false;
}

function displayAllContactInfo(cList){
    displayContactCard(cList);
    displayTotalNumbers(cList);
    displayFav(cList);
    displayEmergency(cList);
}

function displayTotalNumbers(cList)
{
    let AllFav = 0;
    let AllEm = 0;

    totalContacts.innerHTML = cList.length;

    for(let i = 0; i < cList.length ; i++){
        if (cList[i].favCheck) {
            AllFav++;
        }
    }
    totalFavContacts.innerHTML = AllFav;
    
    for(let i = 0; i < cList.length ; i++){
        if (cList[i].emCheck) {
            AllEm++;
        }
    }
    totalEmContacts.innerHTML = AllEm;
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

                            <div id="FavCardIcon" class="fav ${cList[i].favCheck ? '' : 'd-none'}">
                                <i class="fa-solid fa-star"></i>
                            </div>

                            <div id="EmCardIcon" class="emergency ${cList[i].emCheck ? '' : 'd-none'}">
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
                    
                    <div class="otherInfo ${cList[i].email === '' &&  cList[i].address === '' ? 'd-none' : 'mb-3'}">
                        <div class="iconTag ${cList[i].email === '' ? 'd-none' : 'mb-2'}">
                            <div class="msgTag">
                                <i class="fa-solid fa-envelope"></i>
                            </div>
                            <p>${cList[i].email}</p>
                        </div>

                        <div class="iconTag ${cList[i].address === '' ? 'd-none' : ''}">
                            <div class="locationTag">
                                <i class="fa-solid fa-location-dot"></i>
                            </div>
                            <p>${cList[i].address}</p>
                        </div>
                        
                    </div>
                    
                    <div class="infoTags d-flex justify-content-start align-items-center flex-wrap column-gap-2">
                        <div class="family-tag ${cList[i].groupCat === '' ? 'd-none' : ''}">
                            ${cList[i].groupCat === "" ? "" : cList[i].groupCat}
                        </div>

                        <div id="EmergencyCatTag" class="emergency-tag ${cList[i].EmergencyCatTag ? '' : 'd-none'}">
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
                            <div class="unmarked ${cList[i].favCheck ? 'd-none' : ''}">
                                <i class="fa-regular fa-star"></i>
                            </div>
                            <div class="marked ${cList[i].favCheck ? '' : 'd-none'}">
                                <i class="fa-solid fa-star"></i>
                            </div>
                        </div>

                        <div class="emergencyIcon">
                            <div class="unmarked ${cList[i].emCheck ? 'd-none' : ''}">
                                <i class="fa-regular fa-heart"></i>
                            </div>
                            <div class="marked ${cList[i].emCheck ? '' : 'd-none'}">
                                <i class="fa-solid fa-heart-pulse"></i>
                            </div>
                        </div>

                        <div id="editBtn" onclick="setFormToUpdate(${i})" class="editIcon">
                            <i class="fa-solid fa-pen" data-bs-toggle="modal" data-bs-target="#editContactModal"></i>
                        </div>

                        <div class="deleteIcon" onclick="deleteProduct(${i})">
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;

        ContactCardHolder.innerHTML = box;
    }
}

function displayFav(cList){
    
    box = "";
    for(var i = 0 ; i < cList.length ; i++ )
    {
        if (cList[i].favCheck) {
            box+= 
            `
                <div class="fav-body">
                    <div class="details d-flex justify-content-start align-items-center column-gap-2">
                        <div class="icon">
                            ${cList[i].fullname.slice(0, 1).toUpperCase()}
                        </div>

                        <div class="info">
                            <h4>${cList[i].fullname}</h4>
                            <p>${cList[i].number}</p>
                        </div>
                    </div>

                    <div class="call">
                        <a href="tel:">
                            <i class="fa-solid fa-phone"></i>
                        </a>
                    </div>
                </div>
            `;
        }
        
    }
    FavBodyWidget.innerHTML = box;
}

function displayEmergency(cList){
    
    box = "";
    for(var i = 0 ; i < cList.length ; i++ )
    {
        if (cList[i].emCheck) {
            box+= 
            `
                <div class="em-body">
                    <div class="details d-flex justify-content-start align-items-center column-gap-2">
                        <div class="icon">
                            ${cList[i].fullname.slice(0, 1).toUpperCase()}
                        </div>

                        <div class="info">
                            <h4>${cList[i].fullname}</h4>
                            <p>${cList[i].number}</p>
                        </div>
                    </div>

                    <div class="call">
                        <a href="tel:">
                            <i class="fa-solid fa-phone"></i>
                        </a>
                    </div>
                </div>
            `;
        }
        
    }
    EmBodyWidget.innerHTML = box;
}

function setFormToUpdate(index){
    editfullname.value = contactList[index].fullname;
    editnumber.value = contactList[index].number;
    editemail.value = contactList[index].email;
    editaddress.value = contactList[index].address;
    editgroupCat.value = contactList[index].groupCat;
    editcontactInfo.value = contactList[index].contactInfo;
    editfavCheck.value = contactList[index].favCheck;
    editemCheck.value = contactList[index].emCheck;

    globalIndex = index;
}

function updateProduct()
{
    contactList[globalIndex].fullname = editfullname.value;
    contactList[globalIndex].number = editnumber.value;
    contactList[globalIndex].email = editemail.value;
    contactList[globalIndex].address = editaddress.value;
    contactList[globalIndex].groupCat = editgroupCat.value;
    contactList[globalIndex].contactInfo = editcontactInfo.value;
    contactList[globalIndex].favCheck = editfavCheck.value;
    contactList[globalIndex].emCheck = editemCheck.value ;

    displayAllContactInfo(contactList);
    saveToLocalStorage(contactList);

    clearForm();
}

editContactBtn.addEventListener("click", function(){
    updateProduct();
    clearForm();

    document.querySelector("#editContactModal .btn-close").click();
});

editcancelContactBtn.addEventListener("click", function(){
    clearForm();
    document.querySelector("#editContactModal .btn-close").click();
});

function deleteProduct(index){
    contactList.splice(index ,1);
    // console.log(contactList.length);
    
    displayAllContactInfo(contactList);
    saveToLocalStorage(contactList);
}

function searchOnContacts(){
    var searchVal = search.value.toLowerCase();
    console.log(search.value);
    var searchList = [];

    for(var i=0 ; i < contactList.length; i++){
        if(contactList[i].fullname.toLowerCase().includes(searchVal)
        || contactList[i].number.toLowerCase().includes(searchVal)
        || contactList[i].email.toLowerCase().includes(searchVal))
        {
            searchList.push(contactList[i]);
        }  

        displayAllContactInfo(searchList);
    }
}

function ValidateNumber()
{
    var Regex = /^(002)?01[0125][0-9]{8}$/
    if(Regex.test(number.value))
    {
        console.log("match num");
        return true;

    } else {
        console.log("no match num");
        return false;
    }
}

function ValidateEmail()
{
    var Regex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/
    if(Regex.test(email.value))
    {
        console.log("match email");
        return true;

    } else {
        console.log("no match email");
        return false;
    }
}

function EmptyFieldValidation()
{
    if(fullname.value === "")
    {
        //Show eror
        console.log("no match empty name");
        return false;
    }

    if(number.value === "")
    {
        //show error
        console.log("no match empty number");
        return false;
    }

    if(email.value === "")
    {
        //show error
        console.log("no match empty email");
        return false;
    }

    return true;
}