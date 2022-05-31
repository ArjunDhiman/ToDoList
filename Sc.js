console.log("project8.js");
let dataArr = [];
display();

{
    setInterval(() => {
        let d = new Date;
        let date = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
        let time=d.toLocaleTimeString('en-IN',{hour12:true});

        let dateTime=document.getElementById('dateTime');
        dateTime.innerHTML=`${date}<br>${time}`;
    }, 1000);
}

let submit = document.getElementById('submit');
submit.addEventListener('click', addToList);

function addToList(e) {
    // console.log("adding now");
    let input = document.getElementById('input');

    let data = JSON.parse(localStorage.getItem('data'));
    // console.log(data);
    if (data == null) {
        dataArr = [];
    }
    else {
        dataArr = data;
    }

    if (input.value === "") {
        console.log("error");
        let errorMsg = document.getElementById('errorMsg');
        errorMsg.innerHTML = ` <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Please!</strong> Enter something and the press 'Add to List' button.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
    }
    else {
        dataArr.push(input.value);
        localStorage.setItem('data', JSON.stringify(dataArr));
        input.value = "";
    }
    display();
    e.preventDefault();
}

function display() {
    let data = JSON.parse(localStorage.getItem('data'));

    if (data == null) {
        dataArr = [];
    }
    else {
        dataArr = data;
    }

    let tableBody = document.getElementById('tableBody');
    let str = '';
    let j = 0;
    for (let i = 0; i < dataArr.length; i++) {
        str += `<tr>
        <th scope="row">${i + 1}</th>
         <td id='tick${j}'>${dataArr[i]}</td>
            <td>
            <button class="btn btn-outline-primary" id='${j}' onclick='tick(this.id)'>✔</button>
            <button class="btn btn-outline-primary" id="${i}" onclick="deleteItem(this.id)">✖</button>
        </td>
        </tr>`
        j++;
    }

    if (dataArr.length != 0) {
        tableBody.innerHTML = str;
    }
    else {
        let table = document.getElementById('table');
        table.innerHTML = `Nothing to show here! Use 'Add to List' above to add tasks to the list.`;
    }
}


let delList = document.getElementById('deleteList');
delList.addEventListener('click', deleteList);
function deleteList(e) {
    if (confirm("Are you sure you want to delete the entire list.")) {
        localStorage.clear();
        tableBody.innerHTML = '';
        let table = document.getElementById('table');
        table.innerHTML = `Nothing to show here! Use 'Add to List' above to add tasks to the list.`;
    }

    e.preventDefault();
}

function deleteItem(i) {
    dataArr.splice(i, 1);
    localStorage.setItem('data', JSON.stringify(dataArr));
    display();
}

function tick(j) {
    for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i] === dataArr[j]) {
            if (dataArr[j].includes("(Completed)")) {
                dataArr[j] = dataArr[j].replace(" (Completed)", "");
                localStorage.setItem('data', JSON.stringify(dataArr));
            }
            else {
                dataArr[j] = dataArr[j] + " (Completed)";
                localStorage.setItem('data', JSON.stringify(dataArr));
            }
        }
    }
    display();
}