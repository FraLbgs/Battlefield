function getRandomValue(max) {
    return parseInt(Math.random()*max);
}

class Character {
    constructor(name, properties) {
        this.name = name;
        this.life = properties.life || 50;
        this.xp = properties.xp || 2;
        this.weapon = properties.weapon || 3;
        this.shield = properties.shield || 3;
    }

    getName() {
        return this.name;
    }

    isAlive() {
        return this.life > 0;
    }

    getAttackScore() {
        return this.xp + getRandomValue(this.weapon);
    }
    getDefenseScore() {
        return this.xp + getRandomValue(this.shield);
    }

    decreaseLife(value) {
        this.life -= value;
        return this.life;
    }

    attack(enemy) {
        const attackScore = this.getAttackScore();
        if (attackScore > enemy.getDefenseScore()) {
            enemy.decreaseLife(attackScore);
            return true;
        }
        return false;
    }
}


class SuperHero extends Character {
    constructor(name, properties) {
        super(name, properties);
    }

    getAttackScore() {
        return this.xp + this.weapon;
    }

    getDefenseScore() {
        return this.xp + this.shield;
    }
}

class Battlefield {
    constructor(charactersList) {
        this.list = charactersList;
    }

    getRandomChar(notThisOne) {
        const c = this.list[getRandomValue(this.getNbChar())];
        if (c !== notThisOne) return c;
        return this.getRandomChar(notThisOne);
    }

    getNbChar() {
        return this.list.length;
    }

    buryTheDeads() {
        this.list = this.list.filter(char => char.isAlive());
    }

    fightToDeath() {
        const attacker = this.getRandomChar();
        const defender = this.getRandomChar(attacker);
        console.log(`${attacker.name} is attacking ${defender.name}.`);
        
        const resultText = attacker.attack(defender) ? "win" : "lose";
        console.log(`${attacker.name} ${resultText}.`);
        
        this.buryTheDeads();
        this.displayInConsole();
        
        if (this.getNbChar() <= 1) {
            this.displayInConsole();
            console.log(`The winner is ${this.getWinner().getName()}.`);
            return;
        }
        return this.fightToDeath();
    }

    displayInConsole() {
        console.table(this.list);
    }

    getWinner() {
        return this.list[0];
    }
}

const battlefield = new Battlefield([
    new Character("Josephine AG", {xp: 6, weapon: 5, shield: 4}),
    new Character("Naruto", {xp: 6, weapon: 6, shield: 2}),
    new Character("King Kong", {xp: 6, weapon: 6, shield: 2}),
    new Character("Spiderman", {xp: 6, weapon: 6, shield: 2}),
    new SuperHero("Samir", {xp: 6, weapon: 6, shield: 2})
]);

battlefield.fightToDeath();