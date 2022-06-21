const fighters = [
    {
        name: "Hulk",
        HP: 50,
        XP: 7,
        weapon: 8,
        shield: 7
    },
    {
        name: "Thor",
        HP: 50,
        XP: 6,
        weapon: 9,
        shield: 6
    },
    {
        name: "CaptainAmerica",
        HP: 50,
        XP: 6,
        weapon: 7,
        shield: 5
    },
    {
        name: "Hawkeye",
        HP: 50,
        XP: 6,
        weapon: 6,
        shield: 5
    }
]



for(const obj of fighters){
    document.getElementById("fighters").innerHTML += "Nom : " + obj.name + "<br>" +
        "Points de vie : " + "<progress class='pv' max='50' value="+obj.HP+">" + "</progress><br>" +
        "Expérience : " + obj.XP + "<br>" +
        "Puissance d'arme : " + obj.weapon + "<br>" +
        "Puissance de bouclier : " + obj.shield + "<br><br>";
}

function reset(){
    location.reload();
}

function goFight(){
    const duel = getFighters();
    const atkVal = getAtkVal(duel[0]);
    const defVal = getDefVal(duel[1]);
    console.log(`${duel[0].name} avec une attaque de ${atkVal} fonce sur ${duel[1].name} qui a une défense de ${defVal}.`);
    const result = getResult(atkVal, defVal, duel[1]);

    document.getElementById("fighters").innerHTML = "";
    for(const obj of fighters){
        document.getElementById("fighters").innerHTML += "Nom : " + obj.name + "<br>" +
            "Points de vie : " + "<progress class='pv' max='50' value="+obj.HP+"></progress><br>" +
            "Expérience : " + obj.XP + "<br>" +
            "Puissance d'arme : " + obj.weapon + "<br>" +
            "Puissance de bouclier : " + obj.shield + "<br><br>";
    }

    const def = document.getElementById(duel[1].name);
    def.style.opacity = ((duel[1].HP)*2)/100;

    document.getElementById("result").innerHTML = `${duel[0].name} avec une attaque de ${atkVal} fonce sur ${duel[1].name} qui a une défense de ${defVal}.` +
        "<br>" + result;

    if (fighters.length === 1) {
        document.getElementById("result").innerHTML += "<br><br>Le grand gagnant est : " + fighters[0].name + " il lui reste " + fighters[0].HP + " points de vie !";
        document.getElementById("fight").style.display="none";
        document.getElementById("reset").style.display="inline";
        document.getElementById("fighters-pic").style.textAlign="center";
        document.getElementById("fighters-pic").innerHTML = "Vainqueur : <img class='winner' src='img/"+fighters[0].name+".png' alt=''>";
        // document.getElementById("winner").innerHTML = "<img src='https://zaratools.me/Assets/sprites/RosterPortraits/Portrait_Hawkeye.png' alt='Hulk'>";
        
    }

}

// const hulk = document.getElementById("Hulk");
// const hawkeye = document.getElementById("Hawkeye");
// const captainAmerica = document.getElementById("CaptainAmerica");
// const thor = document.getElementById("Thor");
// hawkeye.style.opacity = "((fighters[3].HP)*2)/100";
// console.log(((fighters[3].HP)*2)/100);

// let duel;

// while(fighters.length > 1){
//     const duel = getFighters();
//     const atkVal = getAtkVal(duel[0]);
//     const defVal = getDefVal(duel[1]);
//     console.log(`${duel[0].name} avec une attaque de ${atkVal} fonce sur ${duel[1].name} qui a une défense de ${defVal}.`);
//     getResult(atkVal, defVal, duel[1]);
    
//     // console.table(fighters);
// }

// console.log(`Le grand gagnant est ${duel[0].name} avec ${duel[0].HP} points de vie restants !`);


function getRandomChar(){
    return fighters[parseInt(Math.random()*fighters.length)];
}

function getFighters(){
    const attacker = getRandomChar();
    const defender = getRandomChar();
    if(attacker !== defender) return [attacker, defender];
    return getFighters();
}

function getAtkVal(attacker){
    return attacker.XP + parseInt(Math.random() * attacker.weapon + 1);
}

function getDefVal(defender){
    return defender.XP + parseInt(Math.random() * defender.shield + 1);
}

function getResult(atkVal, defVal, defender){
    if(atkVal <= defVal){
        console.log(`${defender.name} résiste à l'attaque !`);
        return `${defender.name} résiste à l'attaque !`;
    }
    defender.HP -= atkVal;
    if(defender.HP>0){
        console.log(`${defender.name} perd ${atkVal} points de vie, il lui en reste ${defender.HP} !`);
        return `${defender.name} perd ${atkVal} points de vie, il lui en reste ${defender.HP} !`;
    }

    fighters.splice(fighters.indexOf(defender), 1);
    document.getElementById(defender.name).style.display = "none";
    console.log(`${defender.name} n'a pas la force de résister, il vient de mourir et est donc éliminé !`);
    return `${defender.name} n'a pas la force de résister, il vient de mourir et est donc éliminé !`;
}

