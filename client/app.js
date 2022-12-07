const helper = require('./postHelper.js')

let app
let player
let keys = {}
let score = 0
let money = 0
//Platform class that extends sprite that carries an x an y coord


//Player class same as platform yet has a move method

window.onload = async function() {
    
    app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0xAAAAA
    });
    
    document.querySelector("#content").appendChild(app.view)
    document.querySelector("#submitScore").addEventListener('click',(e)=>{
      helper.sendPost('/postScore', { score, money });
      return false;
    });
    const response1 = await fetch('/getAccountDetails')
    const data2 = await response1.json()
    

    const text = new PIXI.Text(`Score: ${score}, Currency ${money}`, { fontFamily: 'Arial', fontSize: 24, fill: 0xFFFFFF });
    text.x = 150;
    text.y = 550;
    player = PIXI.Sprite.from(`/assets/img/${data2.profile.currentSkin}`);
    player.anchor.set(0.5)
    player.x = app.view.width  / 2;
    player.y = app.view.height / 2;
    player.width = 32;
    player.height =32;

    app.stage.addChild(player)

    app.stage.interactive = true;

    function keysDown(e)
    {
      keys[e.keyCode] = true
    }

    function keysUp(e)
    {
      keys[e.keyCode] = false
    }
    window.addEventListener("keydown", keysDown)
    window.addEventListener("keyup", keysUp)
    app.stage.addChild(text);
    app.ticker.add(loop)

    function loop() {
        if(keys["87"]){
            player.y -= 5;
            money++;
            score++;
        }

        if(keys["65"])
        {
            player.x -=5;
            score++;
        }

        if(keys["83"])
        {
            player.y += 5;
            score++;
        }

        if(keys["68"])
        {
            player.x += 5;
            score++;
        }
        text.text = `Score: ${score}, Currency: ${money}`;
    }


    // Cursor movement
    // app.stage.on("pointermove", movePlayer)

    // function movePlayer(e) {
    //     let pos = e.data.global;
        
    //     player.x = pos.x
    //     player.y = pos.y
    // }
} 