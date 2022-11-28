import { new_user } from "./server.js";

class multGame{}

multGame.prototype.main = function(){
    console.log("inside of main")
};

(function start(){
    new_user();
    var myGame = new multGame();
    console.log("hello")
    myGame.main();
})();


