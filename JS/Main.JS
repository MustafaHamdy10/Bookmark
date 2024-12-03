
// --------------------------------- Set Variables -----------------------------------//
let siteNameInput = document.getElementById("bookmarkName");
let siteUrlInput = document.getElementById("bookmarkURL");
let submit = document.getElementById("submit");

// --------------------------- Set an array to store data ---------------------------//

let siteList = [];

// -----------------------------------------------------------------------------------//
// ------------------------------- Function to add Bookmark -------------------------//

// 1) Add Function .

if (localStorage.getItem("sites") != null) {
    siteList = JSON.parse(localStorage.getItem("sites"));
    displaySite();
}

function addSite() {
    if (validInputs() == true) {
        let newSiteList = {
            name: siteNameInput.value,
            url: siteUrlInput.value,
        };
        siteList.push(newSiteList);
        clearSite();
        setItemLocalStorage();
        console.log(siteList);
        displaySite();
    } else {
        alert(`Site Name or Url is not valid, Please follow the rules below :
            Please enter a valid Name and URL
            Site name must contain at least 3 characters
            Site URL must be a valid one`);
    }
}

// -----------------------------------------------------------------------------------//
// ------------------------------- Function to clear input fields ---------------------//

// 2) Clear Function .

function clearSite() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}
// -----------------------------------------------------------------------------------//

// 3) Set item local storage function .

function setItemLocalStorage() {
    localStorage.setItem("sites", JSON.stringify(siteList));
}

// -----------------------------------------------------------------------------------//
// ------------------------------- Function to display sites -------------------------//
// 4) Display Function .

function displaySite() {
    let table = "";
    for (let i = 0; i < siteList.length; i++) {
        table += `
        <tr class="text-center">
            <td>${i + 1}</td>
            <td>${siteList[i].name}</td>
            <td><a href="${siteList[i].url}" target="_blank">
            <button class="btn bg-success"><i class="fa-solid fa-eye text-white pe-2"></i>Visit</button></a>
            </td>
            <td>
            <button class="btn " onclick="deleteSite(${i});">
            <i class="fa-solid fa-trash-can text-white pe-2"></i>Delete</button></td>
        </tr>
        `;
    }
    document.getElementById("tbody").innerHTML = table;
}

// -----------------------------------------------------------------------------------//
// ------------------------------- Function to delete site -------------------------//

// 5) Delete Function .

function deleteSite(i) {
    siteList.splice(i, 1);
    setItemLocalStorage();
    displaySite();
}

// -----------------------------------------------------------------------------------//
// ------------------------- Function to validate site inputs --------------------//

// 6) Valid Inputs Function .

function validInputs() {
    let patternName = /[a-zA-Z0-9]{3,}/;
    let patternURL = /^(https?:\/\/)?(www\.)?[a-z0-9\-]+\.[a-z]{2,}([\/\w\-\.]*)*$/;
    if (
        patternName.test(siteNameInput.value) === true &&
        patternURL.test(siteUrlInput.value) === true )
    {
        return true;
    } else {
        return false;
    }
}
// ============================================//