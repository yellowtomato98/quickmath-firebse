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