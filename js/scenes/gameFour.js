// ********************************************************* //
// ************ 4ÈME MINI-JEU - JARDINIER (VERT) *********** //
// ********************************************************* //

class GameFour extends Phaser.Scene {
  constructor() {
    super('gameFour')
  }

  create() {
    //* Définition des variables
    this.instructionArray = ["Où sont les graines de tulipe ?", "Où sont les graines de rose ?", "Où sont les graines d'orchidée ?"]
    this.choiceArray = [['tulip', 'sunflower', 'daisy'],['pansy', 'rose', 'lily'],['sunflower', 'daisy', 'orchid']]
    this.responseArray = ['tulip', 'rose', 'orchid']
    this.messageArray = ["Bravo ! C'est la bonne réponse ! Appuie sur "+game.controls[2]+" pour continuer","Ce n'est pas la bonne réponse... Retente ta chance !"]
    game.round = 0

    //* Touche d'action
    this.keyAction = this.input.keyboard.addKey(game.controls[2])

    //* Arrière-plan du village
    this.background =  this.add.image(config.width*.5, config.height*.5, 'wood')
    this.background.displayWidth = config.width
    this.background.displayHeight = config.height

    //* Feuille de papier et son ombre
    this.shadowPaper = this.add.rectangle(config.width*.5+100, config.height*.6, config.width*.6, config.height, 0x000000)
    this.shadowPaper.tint = 0x000000
    this.shadowPaper.alpha = .3
    this.paper =  this.add.rectangle(config.width*.5, config.height*.6, config.width*.7, config.height, 0xffffff).setInteractive()

    //* Crayon et son ombre
    this.shadowShovel = this.add.image(config.width*.92+10, config.height*.6, 'shovel')
    this.shadowShovel.setScale(.25)
    this.shadowShovel.angle = -20
    this.shadowShovel.tint = 0x000000
    this.shadowShovel.alpha = .3

    this.shovel = this.add.image(config.width*.92, config.height*.6, 'shovel')
    this.shovel.setScale(.25)
    this.shovel.angle = -20

    //* Texte présent sur la feuille
    this.title = this.add.text(config.width*.5, config.height*.2, "Retrouve les bonnes graines !", {fontFamily: 'Normal', fontSize: '4em', color: 'black', wordWrap: { width: config.width*.6}}).setOrigin(.5, .5)
    this.title = this.add.text(config.width*.5, config.height*.35, "Le jardiner a oublié ses lunettes et il n'arrive pas à savoir quelles graines planter. Aide le en cliquant sur le bon sachet !", {fontFamily: 'Normal', fontSize: '2em', color: 'black', wordWrap: { width: config.width*.6}, align: 'center'}).setOrigin(0.5, 0.5)
    
    this.instruction = this.add.text(config.width*.5, config.height*.5, this.instructionArray[game.round], {fontFamily: 'Normal', fontSize: '3em', color: "black"}).setOrigin(.5, .5)

    //*
    this.response1 = this.add.image(config.width*.25, config.height*.7, this.choiceArray[game.round][0]).setOrigin(.5, .5).setInteractive({ cursor: 'pointer' })
    this.response1.setScale(.15)
    this.response2 = this.add.image(config.width*.5, config.height*.7, this.choiceArray[game.round][1]).setOrigin(.5, .5).setInteractive({ cursor: 'pointer' })
    this.response2.setScale(.15)
    this.response3 = this.add.image(config.width*.75, config.height*.7, this.choiceArray[game.round][2]).setOrigin(.5, .5).setInteractive({ cursor: 'pointer' })
    this.response3.setScale(.15)

    this.message = this.add.text(config.width*.5, config.height*.9, this.responseArray[0], {fontFamily: 'Normal', fontSize: '3em', color: 'black', wordWrap: { width: config.width*.6}, align: 'center'}).setOrigin(0.5, 0.5)
    this.message.visible = false
    this.goodAnswers = -1

    this.play()
  }

  checkAnswer(text) {
    if (this.responseArray.includes(text)){
      game.scene.keys.music.playSound('hoverBtn')

      this.message.setText(this.messageArray[0])
      this.message.visible = true
      this.goodAnswers++

      this.response1.disableInteractive()
      this.response2.disableInteractive()
      this.response3.disableInteractive()

      this.nextRound()
    }
    else {
      game.scene.keys.music.playSound('click')
      this.message.setText(this.messageArray[1])
      this.message.visible = true
    }
  }

  nextRound() {
    this.keyAction.on('down', function () {
      if(game.round < 2 && this.scene.scene.goodAnswers === game.round) {

        this.message.visible = false
        game.round++

        this.response1.setInteractive({ cursor: 'pointer' })
        this.response2.setInteractive({ cursor: 'pointer' })
        this.response3.setInteractive({ cursor: 'pointer' })
        
        this.response1.setTexture(this.choiceArray[game.round][0])
        this.response2.setTexture(this.choiceArray[game.round][1])
        this.response3.setTexture(this.choiceArray[game.round][2])

        this.instruction.setText(this.instructionArray[game.round])
      }
      else if (this.scene.scene.goodAnswers === 2) this.win()
    }, this)
  }

  play() {
    this.response1.on('pointerup', function() {
      this.scene.checkAnswer(this.texture.key)
    })
    this.response2.on('pointerup', function() {
      this.scene.checkAnswer(this.texture.key)
    })
    this.response3.on('pointerup', function() {
      this.scene.checkAnswer(this.texture.key)
    })
  }

  win() {
    game.scene.keys.music.playSound('winGame')

    game.step = 8
    sessionStorage.setItem('step', game.step)

    game.scene.stop('gameFour')
    game.scene.start('hadHelp', { 
      helped: 'gardener', 
      helper: 'kid', 
      textArray: game.textArray[7],
      firstToTalk: 0
    })
  }
}