const btnInsert = document.getElementById("btnInsert");
const btnClearEntry = document.getElementById("btnClearEntry");
const btnClearItems = document.getElementById("btnClearItems");
const btnTotal = document.getElementById("btnTotal");
const btnIdentify = document.getElementById("btnIdentify");
const sortOrder = document.getElementById("sortOrder");
const tblNumbers = document.getElementById("tblNumbers");
const highestNum = document.getElementById("highestNum");
const lowestNum = document.getElementById("lowestNum");

let numbersArr = [];

function insertNumber() {
    const txtNum = document.getElementById("txtNum").value.trim();
    const regex = /^[0-9]+$/;

    if (!txtNum.match(regex)) {
        alert("Please input a positive number.");
        document.getElementById("txtNum").value = "";
        return;
    }

    const num = parseInt(txtNum);
    numbersArr.push(num);
    document.getElementById("txtNum").value = "";

    displayNumbers();
}

function displayNumbers() {
    tblNumbers.innerHTML = "";

    if (numbersArr.length > 0) {
        numbersArr.forEach((num, index) => {
            const tr = document.createElement("tr");

            const tdNum = document.createElement("td");
            tdNum.textContent = num;

            const tdType = document.createElement("td");
            tdType.textContent = num % 2 === 0 ? "EVEN" : "ODD";
            tdType.className = num % 2 === 0 ? "even" : "odd";

            const tdRemove = document.createElement("td");
            const btnRemove = document.createElement("button");
            btnRemove.textContent = "Remove";
            btnRemove.onclick = () => removeNumber(index);
            tdRemove.appendChild(btnRemove);

            const tdEdit = document.createElement("td");
            const btnEdit = document.createElement("button");
            btnEdit.textContent = "Edit";
            btnEdit.onclick = () => editNumber(index);
            tdEdit.appendChild(btnEdit);

            tr.appendChild(tdNum);
            tr.appendChild(tdType);
            tr.appendChild(tdRemove);
            tr.appendChild(tdEdit);

            tblNumbers.appendChild(tr);
        });
    }
}

function removeNumber(index) {
    numbersArr.splice(index, 1);
    displayNumbers();
}

function editNumber(index) {
    const newNumber = prompt("Enter new number:", numbersArr[index]);
    const regex = /^[0-9]+$/;

    if (newNumber === null || newNumber.trim() === "") {
        alert("You did not input a new value!");
        return;
    }

    if (newNumber.match(regex)) {
        numbersArr[index] = parseInt(newNumber);
        displayNumbers();
    } else {
        alert("Invalid number!");
    }
}

function clearEntry() {
    document.getElementById("txtNum").value = "";
}

function clearItems() {
    numbersArr = [];
    highestNum.textContent = "-";
    lowestNum.textContent = "-";
    displayNumbers();
}

function getTotal() {
    alert("Total: " + numbersArr.reduce((sum, num) => sum + num, 0));
}

function identifyHighestLowest() {
    if (numbersArr.length > 0) {
        highestNum.textContent = Math.max(...numbersArr);
        lowestNum.textContent = Math.min(...numbersArr);
    } else {
        alert("No numbers to analyze.");
    }
}

function sortNumbers() {
    if (sortOrder.value === "asc") {
        numbersArr.sort((a, b) => a - b);
    } else if (sortOrder.value === "desc") {
        numbersArr.sort((a, b) => b - a);
    }
    displayNumbers();
}

// Event Listeners
btnInsert.addEventListener("click", insertNumber);
btnClearEntry.addEventListener("click", clearEntry);
btnClearItems.addEventListener("click", clearItems);
btnTotal.addEventListener("click", getTotal);
btnIdentify.addEventListener("click", identifyHighestLowest);
sortOrder.addEventListener("change", sortNumbers);

document.getElementById("txtNum").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        insertNumber();
    }
});
