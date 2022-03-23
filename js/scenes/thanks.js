class Thanks extends Phaser.Scene {
  constructor() {
    super("thanks")
  }

  create() {
    this.paper =  this.add.rectangle(config.width*.5, config.height*.5, config.width, config.height, 0xffffff)

    this.add.text(config.width*.5, config.height*.1, "Merci beaucoup d'avoir joué à", {fontFamily: 'Normal', fontSize: '4em', color:'#444'}).setOrigin(0.5, 0.5)
    this.title = this.add.image(config.width*.5, config.height*.3, "title").setOrigin(0.5, 0.5)
    this.title.setScale(.5)
  
    this.add.text(config.width*.5, config.height*.45, "N'hésite pas à t'abonner à notre page Instagram et à remplir notre formulaire de satisfaction !", {fontFamily: 'Normal', fontSize: '2.5em', color:'#444'}).setOrigin(0.5, 0.5)

    this.instagram = this.add.image(config.width*.35, config.height*.65, "instagram").setOrigin(0.5, 0.5).setInteractive({cursor: 'pointer'})
    this.instagram.displayHeight = 100
    this.instagram.displayWidth = 100
    this.add.text(config.width*.35, config.height*.75, "@positivity.game", {fontFamily: 'Normal', fontSize: '2em', color:'#444'}).setOrigin(0.5, 0.5)

    this.forms = this.add.image(config.width*.65, config.height*.65, "forms").setOrigin(0.5, 0.5).setInteractive({cursor: 'pointer'})
    this.forms.displayHeight = 100
    this.forms.displayWidth = 100
    this.add.text(config.width*.65, config.height*.75, "Formulaire", {fontFamily: 'Normal', fontSize: '2em', color:'#444'}).setOrigin(0.5, 0.5)

    this.rectPlay = this.add.rexRoundRectangle(config.width*.5, config.height*.9, 200, 75, 15, 0x444444).setInteractive({cursor: 'pointer'})
    this.clickPlay = this.add.text(config.width*.5, config.height*.9, "Menu", {fontFamily: 'Normal', fontSize: '4em', color:'#fff'}).setInteractive({cursor: 'pointer'}).setOrigin(0.5, 0.5)

    this.rectPlay.on('pointerover',function(){this.fillColor = 0x777777})
    this.rectPlay.on('pointerout',function(){this.fillColor = 0x444444})  
    this.clickPlay.on('pointerover',function(){this.scene.rectPlay.fillColor = 0x777777})
    this.clickPlay.on('pointerout',function(){this.scene.rectPlay.fillColor = 0x444444})  

    this.clickPlay.on('pointerup', function () {
      game.scene.stop("thanks")
      game.scene.start("menu")
    }, this)

    this.instagram.on('pointerup', function () {
      window.open('https://www.instagram.com/posivity.game/')
    }, this)

    this.forms.on('pointerup', function () {
      window.open('https://docs.google.com/forms/d/e/1FAIpQLScyZqbeMU51uKCpj0obOwwczEthaE320Veepkx2OGj_uxiGCg/viewform?usp=sf_link')
    }, this)
  }
}