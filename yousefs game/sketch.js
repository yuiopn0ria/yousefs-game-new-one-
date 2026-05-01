// global vairiables
var gamestate = "play"
var score = 0
var life = 3
var bg,bg_image
var player,player_images
var platform,platform_image,platform_group
var laserbeam,laserbeam_image,laserbeam_group
var coins,coins_images,coins_group
var bat = 10
var redgem,redgem_image
var invisiblefloor
var rock,rock_image



function preload(){
    bg_image = loadImage("assets/image.png")
    player_images = loadAnimation("assets/pc1.png","assets/pc2.png","assets/pc3.png","assets/pc4.png","assets/pc5.png","assets/pc6.png","assets/pc7.png","assets/pc8.png")
    platform_image = loadImage("assets/platform.png")
    laserbeam_image = loadImage("assets/platform.png")
    coins_images = loadAnimation("assets/coin1.png","assets/coin2.png","assets/coin3.png","assets/coin4.png","assets/coin5.png","assets/coin6.png")
    redgem_image = loadImage("assets/redgem.png")
    rock_image = loadImage("assets/rock.png")

}

function setup(){
    createCanvas(1468,290)
    bg = createSprite(732,110,1468,420)
    bg.addImage(bg_image)
    bg.scale = 1.5
    player = createSprite(232,150)
    player.addAnimation("running",player_images)
    player.scale = 0.8
    
    invisiblefloor = createSprite(750,185,1500,10)
    invisiblefloor.visible = false

    platform_group = new Group()
    laserbeam_group = new Group()
    coins_group = new Group()
    redgem_group = new Group()
    rock_group = new Group()


}


function draw(){



    if(gamestate == "play"){
       
        bg.velocityX = -2
        if(bg.x < 0){
            bg.x = 734
        }
         player.velocityY += 0.5
        spawn_platform()
        spawn_gems()
         jump()
         spawn_rocks()
         coins_group.isTouching(player,destroy_coin)
         redgem_group.isTouching(player,destroy_redgem)
         rock_group.isTouching(player,destroy_rock)
         if(platform_group.isTouching(player))
        {
            // runner.velocityY = 0;
            player.collide(platform_group);
        }
        player.debug = true
       if(player.x < 10){
        player.x = 232
       }

    }

    if(gamestate == "end"){
        bg.velocityX = 0
        bg.x = 734


    }

   


    

    background("lightblue")
    player.collide(invisiblefloor)

    drawSprites()
   
    

    

 fill("black")
    textSize(20)
    text("score :"+score,player.x,player.y - 70)
    text("life :"+life,player.x,player.y - 50)
console.log(bat)

}
function spawn_platform(){
    remainder = frameCount%110
    
    if(remainder == 0){
        platform = createSprite(1500,random(110,220))
        platform.addImage(platform_image)
        platform.scale = 0.5
        platform.velocityX = -5
        platform_group.add(platform)
        platform.lifetime = width/5
       platform.debug = true
       platform.setCollider("rectangle",0,-30,200,50)

        coins = createSprite(platform.x,platform.y - 40)
        coins.addAnimation("coins",coins_images)
        coins.scale = 0.2
        coins.velocityX = -5
        coins_group.add(coins)
        coins.lifetime = width/5
        
        
    }
    
    

}
function spawn_gems(){
    remainder = frameCount%500
    if(remainder == 0){
        redgem = createSprite(1550,random(70,140))
        redgem.addImage(redgem_image)
        redgem.scale = 0.2
        redgem.velocityX = -10
        redgem_group.add(redgem)
        redgem.lifetime = width/10
    }
}
function jump(){
    if(keyDown("space") && player.y < 160){
        player.velocityY = -10

    }
}
function spawn_rocks(){
    remainder = frameCount%200
    if(remainder == 0){
        rock = createSprite(random(1550,1600),random(170,185))
        rock.addImage(rock_image)
        rock.scale = 0.025
        rock.velocityX = random(-5,-10)
        rock_group.add(rock)
        rock.lifetime = width/5

    }
}
function destroy_coin(coin){
    coin.destroy()
    score += 1
    
}
function destroy_redgem(redgem){
    redgem.destroy()
    score += 5
}
function destroy_rock(rock){
    rock.destroy()
    score -= 3
    life -= 1
}
