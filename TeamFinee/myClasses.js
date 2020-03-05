class Fine{
    constructor(name, cost, date){
        this.name = name;
        this.cost = cost;
        this.date = date;
    }
    get tableRow(){
        return `<tr>
                    <td>${this.name}</td>
                    <td>${this.date}</td>
                    <td>${this.cost}</td>
                    <td><button onclick="removeFine('${this.name}')">Delete</button></td>
                </tr>`
    }
    get tableRow2(){
        return `<tr>
                    <td>${this.name}</td>
                    <td>${this.cost}</td>
                    <td><button onclick="removeFine('${this.name}')">Delete</button></td>
                </tr>`
    }
    get tableRowAssign(){
        return `<tr onclick="chooseFine('${this.name}','${this.cost}')">
                    <td>${this.name}</td>
                    <td>${this.cost}</td>
                </tr>`
    }
}
class Person{
    constructor(name,fines){
        this.name = name;
        this.fines = fines;
        this.totalFine = 0;
        this.status = 0;
    }
    get total(){
        var total = 0;
        for(var k of this.fines){
            if(k.name !== "Payment"){
                total += k.cost;
            }
        }
        return total.toFixed(2);
    }
    get payed(){
        var total = 0;
        for(var k of this.fines){
            if(k.name === "Payment"){
                total -= k.cost;
            }
        }
        return total.toFixed(2);
    }
    get totalFineRounded(){
        var nr = this.totalFine;
        return Math.abs(Number(nr).toFixed(2));
    }
    get tableRow(){
        if(Number(this.payed) < Number(this.total)){
            return `<tr id="${this.name}">
                        <td onclick="markedPlayers('${this.name}')">${this.name}</td>
                        <td onclick="markedPlayers('${this.name}')">${this.total}</td>
                        <td onclick="markedPlayers('${this.name}')">${this.payed}</td>
                        <td style="color:red;" onclick="markedPlayers('${this.name}')">${this.totalFineRounded}</td>
                        <td><button onclick="seePlayerFines('${this.name}')">Overview</button></td>
                    </tr>`
        }
        else{
            return `<tr id="${this.name}">
                        <td onclick="markedPlayers('${this.name}')">${this.name}</td>
                        <td onclick="markedPlayers('${this.name}')">${this.total}</td>
                        <td onclick="markedPlayers('${this.name}')">${this.payed}</td>
                        <td style="color:green;" onclick="markedPlayers('${this.name}')">${this.totalFineRounded}</td>
                        <td><button onclick="seePlayerFines('${this.name}')">Overview</button></td>
                    </tr>`
        }

    }
}
