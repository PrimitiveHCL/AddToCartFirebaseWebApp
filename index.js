import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    // old "Playground" Database
    // databaseURL: "[Paste databaseURL]"

    // "Realtime Database"
    // databaseURL: "[Paste databaseURL]"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shopItems")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")


addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    // add item into database
    push(shoppingListInDB, inputValue)
    console.log(`${inputValue} added to database`)

    // appendToShoppingList(inputValue)
    clearInputField()
}

)

onValue(shoppingListInDB, function(snapshot) {
    
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingList()
        
        for (let i=0; i<itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
    
            appendToShoppingList(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }

})


function clearInputField() {
    inputFieldEl.value = ""
}

function clearShoppingList() {
    shoppingListEl.innerHTML = ""
}

function appendToShoppingList(item) {
    // shoppingListEl.innerHTML += `<li>${itemValue }</li>`
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    shoppingListEl.append(newEl)

    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database,`shopItems/${itemID}`)

        remove(exactLocationOfItemInDB)
    })
}

