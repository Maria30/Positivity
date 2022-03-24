class Error extends Phaser.Scene {
  constructor() {
    super("error")
  }

  create() {
    this.paper =  this.add.rectangle(config.width*.5, config.height*.5, config.width, config.height, 0xffffff)

    this.add.image(config.width*.5, config.height*.3, "sadSun").setOrigin(0.5, 0.5).setScale(.4)

    this.add.text(config.width*.5, config.height*.65, 
      "Une erreur s'est produite", 
      {fontFamily: 'Normal', align: 'center', fontSize: '4em', color:'#444', wordWrap: {width: config.width*.8}}).setOrigin(.5, .5)
    
    this.add.text(config.width*.5, config.height*.75, 
      "Nous sommes désolés, il semblerait que Positivity a eu un problème...", 
      {fontFamily: 'Normal', align: 'center', fontSize: '2em', color:'#444', wordWrap: {width: config.width*.8}}).setOrigin(.5, .5)
  
    this.rectPlay = this.add.rexRoundRectangle(config.width*.5, config.height*.9, 200, 75, 15, 0x444444).setInteractive({cursor: 'pointer'})
    this.clickPlay = this.add.text(config.width*.5, config.height*.9, "Menu", {fontFamily: 'Normal', fontSize: '4em', color:'#fff'}).setInteractive({cursor: 'pointer'}).setOrigin(0.5, 0.5)

    this.rectPlay.on('pointerover',function(){this.fillColor = 0x777777, game.scene.keys.music.playSound('hoverBtn')})
    this.rectPlay.on('pointerout',function(){this.fillColor = 0x444444})  
    this.clickPlay.on('pointerover',function(){this.scene.rectPlay.fillColor = 0x777777, game.scene.keys.music.playSound('hoverBtn')})
    this.clickPlay.on('pointerout',function(){this.scene.rectPlay.fillColor = 0x444444})  

    this.clickPlay.on('pointerup', function () {
      game.scene.keys.music.playSound('click')

      game.scene.stop("error")
      game.scene.start("menu")
    }, this)
  }
}