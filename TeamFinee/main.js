var frmNewPlayer = document.getElementById("frmNewPlayer");
var NP_inpName = document.getElementById("NP_inpName");
var NP_startFine = document.getElementById("NP_startFine");

var frmNewFine = document.getElementById("frmNewFine");
var NF_inpName = document.getElementById("NF_inpName");
var NF_amount = document.getElementById("NF_amount");

var assignFineCompletePopup = document.getElementById("assignFineCompletePopup");
var frmAssignFine = document.getElementById("frmAssignFine");
var playerNames = document.getElementById("playerNames");
var AF_name = document.getElementById("AF_name");
var AF_cost = document.getElementById("AF_cost");

var content = document.getElementById("content");
var table = document.getElementById("table");
var tableHead = document.getElementById("tableHead");
var assignFineHTML = document.getElementById("assignFineHTML");
var tblFines = document.getElementById("tblFines");
var personList = new Map();
var fineList = new Map();
var logo = document.getElementById("logo");



logo.onclick = function(){
    table.innerHTML = "";
}
//A function that marks player when clicking on them
function markedPlayers(player){
    var css = document.getElementById(player);
    var obj = personList.get(player);
    console.log(obj.payed + "payed," + obj.total + "total");
    if(obj.status === 0){
        obj.status = 1;
        css.style.backgroundColor = "orange";
    }
    else if(obj.status === 1){
        obj.status = 0;
        css.style.backgroundColor = "white";
    }
}

//Updates table in a popup window that comes up when giving fines
function updateTblFine(){
    tblFines.innerHTML = `<tr style="color:green; border-bottom: 1px solid;" onclick="chooseFine('Payment',0)"><td>Pay</td><td>--</td></tr>`;
    for(var fine of fineList.values()){
        tblFines.innerHTML += fine.tableRowAssign;
    }

}

//This will remove a chosen fine from a players fines.
function remove(remove, player){
    var box = confirm("Delete this fine?");
    box;
    if(box){
        var thisPlayer = personList.get(player);
        thisPlayer.fines.splice(remove,1);
        thisPlayer.totalFine = 0;
        for(var p of person.fines){
            thisPlayer.totalFine += p.cost;
        }
        thisPlayer.totalFine = 0;
        for(var p of thisPlayer.fines){
            thisPlayer.totalFine += p.cost;
        }
        seePlayerFines(thisPlayer.name);
    }


}

// Used to delete a player
function removePlayer(player){
    var pop = confirm("Remove " + player + "?");
    pop;
    if(pop){
        personList.delete(player);
        updateTable(0);
        var personListAsArray = Array.from(personList.values());
        localStorage.savedPersons = JSON.stringify(personListAsArray);
    }

}

//Used to delete a fine
function removeFine(name){
    var pop = confirm("Remove " + name + "?");
    pop;
    if(pop){
        fineList.delete(name);
        updateTable(1);
        var fineListAsArray = Array.from(fineList.values());
        localStorage.savedFines = JSON.stringify(fineListAsArray);
    }
}

//Updates the table with the fines and info of a given player
function seePlayerFines(player){
    var thisPlayer = personList.get(player);
    table.innerHTML = "";
    var index = 0;
    tableHead.innerHTML = `<tr><td>${thisPlayer.name}</td><td colspan="2">Total: <span style="color:grey; font-size: 1.7vw;">${thisPlayer.total}<span></td><td colspan="2">Payed:<span style="color:grey; font-size: 1.7vw;"> ${thisPlayer.payed}</span></td></tr>
                            <tr><td>Fine</td><td></td><td></td><td>Date</td><td colspan="2">Cost</td></tr>`
    for(var k of thisPlayer.fines){
        if(k.name === "Payment"){
            table.innerHTML += `<tr style="color:green;"><td>${k.name}</td><td colspan="2"></td><td style="color:grey;">${k.date}</td><td>${k.cost}</td><td><button onclick="remove('${index}','${thisPlayer.name}')">Delete</button></tr>`
        }
        else{
            table.innerHTML += `<tr><td>${k.name}</td><td colspan="2"></td><td style="color:grey;">${k.date}</td><td>${k.cost}</td><td><button onclick="remove('${index}','${thisPlayer.name}')">Delete</button></td></tr>`
        }

        index++;
    }
    savePersonList();
}

//Saving Persons to local memory
function savePersonList(){
    var personListAsArray = Array.from(personList.values());
    localStorage.savedPersons = JSON.stringify(personListAsArray);
}

//This will choose which fine to give the players that is marked
function chooseFine(name,cost){
    var array = [];
    for(player of personList.values()){
        if(player.status === 1){
            array.push(player.name);
        }
    }
    var players = array.toString();
    playerNames.innerHTML = players;
    AF_name.value = name;
    AF_cost.value = cost;
    assignFineCompletePopup.style.display = "block";
    assignFinePopup.style.display = "none";
}

//Giving out the fine that was choosen in the chooseFine function.
function giveFine(){
    var obj = new Fine(AF_name.value, AF_cost.value);
    for(var person of personList.values()){
        var mapFromFines = new Map();
        if(person.status === 1){
            mapFromFines.set(obj.name,obj);
            var newArr = Array.from(mapFromFines.values());
            person.fines = person.fines.concat(newArr);
            person.totalFine = 0;
            for(var p of person.fines){
                person.totalFine += p.cost;
            }
            person.status = 0;
        }
    }
    savePersonList();
}

//Updating the table, inp = 0 gives players, and inp = 1 gives fines.
function updateTable(inp){
    table.innerHTML = "";
    for(var person of personList.values()){
        person.status = 0;
    }
    if(inp === 0){
        tableHead.innerHTML = `<tr><td>Team</td><td>Total</td><td>Payed</td><td>Outstanding</td><td></td></tr>`
        for(var person of personList.values()){
            table.innerHTML += person.tableRow;
        }
    }
    else if(inp === 1){
        tableHead.innerHTML = `<tr><td>Fines</td><td>Amount</td><td></td></tr>`
        for(var k of fineList.values()){
            table.innerHTML += k.tableRow2;
        }
    }
}

//Gets the date to be used in fines to report when they are given.
function getDate(date){
    var dateObj = date;
    var month = dateObj.getMonth() + 1;
    var day = dateObj.getDate();
    var date_formatted = month + "/" + day;

    return date_formatted;
}

//Form used when creating a new player
frmNewPlayer.onsubmit = function(evt){
    evt.preventDefault();
    var NPname = NP_inpName.value;
    var NPstartFine = [{
        name: "New Player",
        cost: Number(NP_startFine.value),
        date: getDate(new Date())
    }];
    var newPlayer = new Person(NPname,NPstartFine);
    newPlayer.totalFine = NP_startFine.value;
    personList.set(NPname,newPlayer);
    savePersonList();

    updateTable(0);
    newPersonPopup.style.display = "none";
    NP_inpName.value = NP_startFine.value = "";
}

//Form used when creating a new fine
frmNewFine.onsubmit = function(evt){
    evt.preventDefault();
    var NFname = NF_inpName.value;
    var NFamount = NF_amount.value;
    var NFtime = "";

    fineList.set(NFname, new Fine(NFname,NFamount,NFtime));
    var fineListAsArray = Array.from(fineList.values());
    localStorage.savedFines = JSON.stringify(fineListAsArray);

    updateTable(1);
    newFinePopup.style.display = "none";
    NF_inpName.value = NF_amount.value = "";
    updateTblFine();
}

//Form used when assigning a player a fine
frmAssignFine.onsubmit = function(evt){
    evt.preventDefault();
    var name = AF_name.value;
    var cost = Number(AF_cost.value);
    var date = getDate(new Date());
    var obj = new Fine(name,cost,date);
    if(obj.name === "Payment"){
        obj.cost = - obj.cost;
    }
    for(var person of personList.values()){
        var mapFromFines = new Map();
        if(person.status === 1){
            mapFromFines.set(obj.name,obj);
            var newArr = Array.from(mapFromFines.values());
            person.fines = person.fines.concat(newArr);
            person.totalFine = 0;
            for(var p of person.fines){
                person.totalFine += p.cost;
            }
            person.status = 0;
        }
    }
    assignFineCompletePopup.style.display = "none";
    assignFinePopup.style.display = "none";
    var personListAsArray = Array.from(personList.values());
    localStorage.savedPersons = JSON.stringify(personListAsArray);
    updateTable(0);
}

//sjekker om det er lagret noe i localstorage når siden lastes opp, hvis det er det kjøres funksjonen
if(localStorage.savedFines){
		var mySavedFines = JSON.parse(localStorage.savedFines); //Lager ett array av lagrede oppdrag
		for(var k of mySavedFines){
			var newFine = new Fine(k.name,k.cost); //lager objekter ut av det
			fineList.set(newFine.name, newFine); //Legger objektene inn i et map.
		}
	}

//sjekker om det er lagret noe i localstorage når siden lastes opp, hvis det er det kjøres funksjonen
if(localStorage.savedPersons){
		var mySavedPersons = JSON.parse(localStorage.savedPersons); //Lager ett array av lagrede oppdrag
		for(var k of mySavedPersons){
			var newPerson = new Person(k.name,k.fines); //lager objekter ut av det
			personList.set(newPerson.name, newPerson); //Legger objektene inn i et map.
		}
	}
    for(var person of personList.values()){
        for(var p of person.fines){
            person.totalFine += p.cost;
        }
    }
//localStorage.savedFines = "";
//localStorage.savedPersons = "";
updateTable(0);
updateTblFine();
