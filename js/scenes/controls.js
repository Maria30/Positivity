// ********************************************************* //
// ********** CHANGEMENT DES TOUCHES DE CONTRÔLES ********** //
// ********************************************************* //

class Controls extends Phaser.Scene {
  constructor() {
    super('controls')
  }

  create() {
    //* Définitions des variables
    this.allowKeyChange = false

    //* Arrière-plan
    this.background = this.add.image(config.width*.5, config.height*.5, 'background')
    this.background.height = config.height
    this.background.width = config.width

    this.shadow= this.add.image(config.width*.5, config.height*.5, 'background')
    this.shadow.height = config.height
    this.shadow.width = config.width
    this.shadow.tint = 0x000000
    this.shadow.alpha = .3

    //* Feuille blanche
    this.paper =  this.add.rectangle(config.width*.5, config.height*.5, config.width*.8, config.height*.8, 0xffffff).setOrigin(.5, .5) 

    this.title = this.add.text(config.width*.5, config.height*.2, "Commandes", {fontFamily: 'Normal', fontSize: '4em', color: 'black', wordWrap: { width: config.width*.6}}).setOrigin(.5, .5)

    this.rectFinish = this.add.rexRoundRectangle(config.width*.5, config.height*.8, 150, 50, 15, 0x666666).setInteractive({ cursor: 'pointer' })
    this.clickFinish = this.add.text(config.width*.5, config.height*.8, "Terminé", {fontFamily: 'Normal', fontSize: '3em', color:'#fff'}).setInteractive({ cursor: 'pointer' }).setOrigin(0.5, 0.5)
  
    //* Actions correspondantes
    this.leftText = this.add.text(config.width*.55, config.height*.35, "Aller à gauche :", {fontFamily: 'Normal', fontSize: '2.5em', color: 'black'}).setOrigin(1, 0)
    this.rightText = this.add.text(config.width*.55, config.height*.45, "Aller à droite :", {fontFamily: 'Normal', fontSize: '2.5em', color: 'black'}).setOrigin(1, 0)
    this.actionText = this.add.text(config.width*.55, config.height*.55, "Faire une action :", {fontFamily: 'Normal', fontSize: '2.5em', color: 'black'}).setOrigin(1, 0)

    //* Touches de commande
    this.leftKey = this.add.text(config.width*.58, config.height*.35, game.controls[0], {fontFamily: 'Normal', fontSize: '2.5em', color: 'black'}).setOrigin(0, 0).setInteractive({cursor: 'pointer'})
    this.rightKey = this.add.text(config.width*.58, config.height*.45, game.controls[1], {fontFamily: 'Normal', fontSize: '2.5em', color: 'black'}).setOrigin(0, 0).setInteractive({cursor: 'pointer'})
    this.actionKey = this.add.text(config.width*.58, config.height*.55, game.controls[2], {fontFamily: 'Normal', fontSize: '2.5em', color: 'black'}).setOrigin(0, 0).setInteractive({cursor: 'pointer'})
  
    //* Message
    this.message = this.add.text(config.width*.5, config.height*.7, "Appuie sur n'importe quelle touche", {fontFamily: 'Normal', fontSize: '2em', color: 'black', wordWrap: { width: config.width*.6}}).setOrigin(.5, .5)
    this.message.visible = false

    this.leftKey.on('pointerup', function() {
      this.scene.allowKeyChange = true
      this.scene.changeKey(this, 0)
    })
    this.rightKey.on('pointerup', function() {
      this.scene.allowKeyChange = true
      this.scene.changeKey(this, 1)
    })
    this.actionKey.on('pointerup', function() {
      this.scene.allowKeyChange = true
      this.scene.changeKey(this, 2)
    })

    this.rectFinish.on('pointerup', function () {
      game.scene.keys.music.playSound('click')
      game.scene.stop('controls')  
      game.scene.start('menu')
    })
    this.clickFinish.on('pointerup', function () {
      game.scene.keys.music.playSound('click')
      game.scene.stop('controls')  
      game.scene.start('menu')
    })

    this.rectFinish.on('pointerover',function(){this.fillColor = 0x999999, game.scene.keys.music.playSound('hoverBtn')})
    this.rectFinish.on('pointerout',function(){this.fillColor = 0x666666}) 
    this.clickFinish.on('pointerover',function(){this.scene.rectFinish.fillColor = 0x999999})
    this.clickFinish.on('pointerout',function(){this.scene.rectFinish.fillColor = 0x666666})  
  }

  changeKey(text, control) {

    this.leftKey.style.setColor('black')
    this.rightKey.style.setColor('black')
    this.actionKey.style.setColor('black')
    this.currentControl = control

    console.log(game.controls)

    if (this.allowKeyChange) {
      this.message.visible = true
    
      text.style.setColor('#999999')
      
      this.input.keyboard.on('keydown', function (event) {
        if(this.scene.allowKeyChange) {
          this.scene.allowKeyChange = false

          //* Vérification que la valeur de la touche est une lettre
          if (event.keyCode, 65 <= event.keyCode && event.keyCode <= 90){

            console.log(this.scene.allowKeyChange, game.controls.includes(event.key.toUpperCase()), game.controls, event.key.toUpperCase())

            //* Vérification que la valeur de la touche n'est pas déjà utilisée
            if (!game.controls.includes(event.key.toUpperCase())) {

              this.scene.message.visible = false

              game.controls[this.scene.currentControl] = event.key.toUpperCase()

              this.scene.leftKey.setText(game.controls[0])
              this.scene.rightKey.setText(game.controls[1])
              this.scene.actionKey.setText(game.controls[2])

              text.style.setColor('black')
            }
            else {
              text.style.setColor('black')
              alert("Cette touche a déjà été choisie pour une autre action")
            }
          }
          else {
            text.style.setColor('black')
            alert("Seules les lettres sont acceptées")
          }
        }
      })
    }
    else {
      this.message.visible = false
      text.style.setColor('black')
    }
  }
}