class Game {
    constructor(){
        this.score = 0;
        this.amt_time = 120;
        this.time = this.amt_time;
        this.start_time = new Date().getTime();
    }
}

Game.prototype.generate_problem = function(){
    this.num1 = Math.floor(Math.random()*120)+1
    this.num2 = Math.floor(Math.random()*120)+1
    this.ans = this.num1+this.num2;
    document.getElementById("num1").innerHTML = this.num1;
    document.getElementById("num2").innerHTML = this.num2;
    document.getElementById("score").innerHTML = "Score: " + String(this.score);
}

Game.prototype.check_answer = function(){
    let input = document.getElementById("user-input").value
    if (input == this.ans){
        this.score+=1;
        document.getElementById("user-input").value = ''
        this.generate_problem()
        document.getElementById("check").style.visibility = "hidden"
    }
}

Game.prototype.check_answer_enter = function(){
    checkbox = document.getElementById("check")
    checkbox.removeAttribute("id");
    setTimeout(function() {
        checkbox.id = "check"
        checkbox.style.visibility="visible"
    }, 1)
}

let timerInterval = null;
Game.prototype.timer = function(){
    const now = new Date().getTime()
    this.time = this.amt_time+Math.round((this.start_time-now)/1000)
    document.getElementById("timer").innerHTML = "Time: " + String(this.time);
    if (this.time==15){
        timerIntervalFast = setInterval(() => this.timerfast(), 10)
    }
}

let timerIntervalFast=null;
Game.prototype.timerfast = function(){
    const now = new Date().getTime()
    this.time = (this.amt_time+Math.floor((this.start_time-now)/10)/100).toFixed(2)
    document.getElementById("timer").innerHTML = "Time: " + this.time;
    this.time = parseFloat(this.time)
    let fraction = (15-this.time)/15
    let r = Math.round(255*fraction)
    document.getElementById("timer").style.color = "rgb("+r+", 0, 0)"
    if (this.time==0){
        clearInterval(timerIntervalFast)
        this.end()
    }
}

Game.prototype.main = function(){
    document.getElementById("timer").innerHTML = "Time: " + String(this.time);
    this.generate_problem()
    timerInterval = setInterval(() => this.timer(), 1000)
}

Game.prototype.end = function(){
    this.time=0
    document.getElementById("user-input").value = ''
    document.getElementById("game-screen").style.visibility="hidden"
    document.getElementById("end-screen").style.visibility="visible"
    document.getElementById("end-score").innerHTML = "Score: " + this.score;
}