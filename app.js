function randomValue(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            battleLog: []
        }
    },
    computed: {
        monsterStyleBar() {
            if(this.monsterHealth <= 0) {
                return {width: 0 + '%'};
            }
            return {width: this.monsterHealth + '%'};
        },
        playerStyleBar() {
            if(this.playerHealth <= 0) {
                return {width: 0 + '%'};
            }
            return {width: this.playerHealth + '%'};
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value) {
            if(value <= 0 && this.monsterHealth > 0) {
                this.winner = 'monster';
            } else if(value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            }
        },
        monsterHealth(value) {
            if(value <= 0 && this.playerHealth > 0) {
                this.winner = 'player';
            } else if(value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            }
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const attackValue = randomValue(12, 5);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.battleLog.push(`You attacked the Monster and dealt ${attackValue} damage`);
        },
        attackPlayer() {
            const attackValue = randomValue(18, 8);
            this.playerHealth -= attackValue;
            this.battleLog.push(`The monster dealt you ${attackValue} damage`);
        },
        specialAttack() {
            const specialValue = randomValue(15,25);
            this.monsterHeal-= specialValue;
            this.attackPlayer();
            this.battleLog.push(`Special attack dealt ${specialValue} damage`);
        },
        healPlayer() {
            const healValue = randomValue(8, 20);
            if(this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.attackPlayer();
            this.battleLog.push(`You healed ${healValue} life points`)
        },
        resetGame() {
            this.currentRound = 0;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null
        },
        surrender() {
            this.winner = 'monster';
        }
    }
})

app.mount('#game');