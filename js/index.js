console.log("myTip extension")
let myLeads = []


const inputElement = document.getElementById("input-el")
const inputButton = document.getElementById("input-btn")
const ulElement = document.getElementById("ul-el")
const deleteButton = document.getElementById("delete-btn")
const saveUrlButton = document.getElementById("save-url-btn")


// localStorage.setItem("myLeads",JSON.stringify(myLeads))
// localStorage.getItem("myLeads")
//localStorage.clear()
const localStorageLeads = JSON.parse(localStorage.getItem("myLeads"))
if (localStorageLeads) {
    myLeads = localStorageLeads
    renderLeads()
}

inputButton.addEventListener("click", function () {
    if (inputElement.value != "") {
        myLeads.push(inputElement.value)
        inputElement.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads()
    }
})

saveUrlButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorageLeads.setItem("myLeads", JSON.stringify())
    })
    renderLeads()

})

deleteButton.addEventListener("click", function () {
    localStorage.clear()
    myLeads = []
    renderLeads()
})



function renderLeads() {
    let listItems = ""
    for (let i = 0; i < myLeads.length; i++) {
        /* renderHtml - 1
        ulElement.innerHTML += "<li>" + myLeads[i] + "</li>"
        */

        /* renderHtml - 2
            const li= document.createElement("li")
            li.textContent = myLeads[i]
            ulElement.append(li) 
        */

        // renderHtml - template strings/literals
        listItems +=
            `        
            <li>
                <a href='${myLeads[i]}' target='_blank'> 
                    ${myLeads[i]}
                </a>
                <button id="delete-mark"> &#9746 </button>
            </li>
            `
    }
    ulElement.innerHTML = listItems
}

