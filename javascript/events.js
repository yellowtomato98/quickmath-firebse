document.addEventListener("keypress", function(event){
    if (document.activeElement === document.getElementById("user-input")){
        if (event.key == "Enter"){
            myGame.check_answer_enter()
        }
    }
})

document.addEventListener("input", function(){
    myGame.check_answer()
})

document.getElementById("enter-lobby-screen").onclick = function(){
    document.getElementById("home-page").style.visibility="hidden";
    document.getElementById("lobby-input").value="";
    document.getElementById("lobby-code-entry").style.visibility="visible";
}

const lobbyinput = document.getElementById("lobby-input");

lobbyinput.addEventListener("focusin", function(){
    lobbyinput.placeholder="";
});

lobbyinput.addEventListener("focusout", function(){
    lobbyinput.placeholder="#123456";
});

document.getElementById("back-lobby").onclick = function(){
    document.getElementById("home-page").style.visibility="visible";
    document.getElementById("lobby-code-entry").style.visibility="hidden";
}