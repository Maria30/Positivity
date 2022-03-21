class GameOne extends Phaser.Scene {
  constructor() {
    super("gameOne")
  }

  create() {
    //* Définitions des variables
    this.instructionArray = ["Combien font 4+5x3 ?", "Combien font 9-8/2 ?", "Combien font 25/5 + 18/9 ?"]
    this.choiceArray = [['27', '35', '19'],['O.5', '5', '4'],['7', '9', '1O']]
    this.responseArray = ['19', '5', '7']
    this.messageArray = ["Bravo ! C'est la bonne réponse ! Appuie sur E pour continuer","Ce n'est pas la bonne réponse... Retente ta chance !"]
    game.round = 0
    game.goodAnswers = -1

    //* Touche d'action
    this.keyAction = this.input.keyboard.addKey(game.controls[2])

    //* Arrière-plan
    this.background =  this.add.image(config.width*.5, config.height*.5, "wood")
    this.background.displayWidth = config.width
    this.background.displayHeight = config.height

    //* Feuille de papier son ombre
    this.shadowPaper = this.add.rectangle(config.width*.5+100, config.height*.6, config.width*.6, config.height, 0x000000)
    this.shadowPaper.tint = 0x000000
    this.shadowPaper.alpha = .3
    this.paper =  this.add.rectangle(config.width*.5, config.height*.6, config.width*.7, config.height, 0xffffff).setInteractive()

    //* Crayon et son ombre
    this.shadowPencil = this.add.image(config.width*.95+10, config.height*.6, "pencil")
    this.shadowPencil.setScale(.25)
    this.shadowPencil.angle = -20
    this.shadowPencil.tint = 0x000000
    this.shadowPencil.alpha = .3

    this.pencil = this.add.image(config.width*.95, config.height*.6, "pencil")
    this.pencil.setScale(.25)
    this.pencil.angle = -20

    //* Texte présent sur la feuille
    this.title = this.add.text(config.width*.5, config.height*.2, "Commande du béton !", {fontFamily: 'Normal', fontSize: '4em', color: "black", wordWrap: { width: config.width*.6}}).setOrigin(.5, .5)
    this.context = this.add.text(config.width*.5, config.height*.35, "Le maçon n'arrive pas à savoir combien de béton commander afin de réparer les maisons. Aide le en résolvant ces problèmes de mathématiques.", {fontFamily: 'Normal', fontSize: '2em', color: "black", wordWrap: { width: config.width*.6}, align: 'center'}).setOrigin(0.5, 0.5)
    
    this.instruction = this.add.text(config.width*.5, config.height*.5, this.instructionArray[game.round], {fontFamily: 'Normal', fontSize: '3em', color: "black"}).setOrigin(.5, .5)

    this.response1 = this.add.text(config.width*.25, config.height*.65, this.choiceArray[game.round][0], {fontFamily: 'Normal', fontSize: '4em', color: "black"}).setOrigin(.5, .5).setInteractive({ cursor: 'pointer' })
    this.response2 = this.add.text(config.width*.5, config.height*.65, this.choiceArray[game.round][1], {fontFamily: 'Normal', fontSize: '4em', color: "black"}).setOrigin(.5, .5).setInteractive({ cursor: 'pointer' })
    this.response3 = this.add.text(config.width*.75, config.height*.65, this.choiceArray[game.round][2], {fontFamily: 'Normal', fontSize: '4em', color: "black"}).setOrigin(.5, .5).setInteractive({ cursor: 'pointer' })
  
    this.message = this.add.text(config.width*.5, config.height*.8, this.messageArray[0], {fontFamily: 'Normal', fontSize: '3em', color: "black", wordWrap: { width: config.width*.6}, align: 'center'}).setOrigin(0.5, 0.5)
    this.message.visible = false

    this.play()
  }

  checkAnswer(text) {
    if (this.responseArray.includes(text)){
      game.scene.keys.music.playSound('hoverBtn')

      this.message.setText(this.messageArray[0])
      this.message.visible = true
      game.goodAnswers++

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
      if(game.round < 2 && game.goodAnswers === game.round) {

        this.message.visible = false
        game.round++

        this.response1.setInteractive({ cursor: 'pointer' })
        this.response2.setInteractive({ cursor: 'pointer' })
        this.response3.setInteractive({ cursor: 'pointer' })
        
        this.response1.setText(this.choiceArray[game.round][0])
        this.response2.setText(this.choiceArray[game.round][1])
        this.response3.setText(this.choiceArray[game.round][2])

        this.instruction.setText(this.instructionArray[game.round])
      }
      else if (game.goodAnswers === 2) this.win()
    }, this)
  }

  play() {
    this.response1.on('pointerup', function() {this.scene.checkAnswer(this._text)})
    this.response2.on('pointerup', function() {this.scene.checkAnswer(this._text)})
    this.response3.on('pointerup', function() {this.scene.checkAnswer(this._text)})
  }

  win() {
    game.scene.keys.music.playSound('winGame')
    game.step = 2
    sessionStorage.setItem("step", game.step)

    game.scene.stop("gameOne")
    game.scene.start("hadHelp", { 
      helped: "mason", 
      helper: "mayor", 
      textArray: game.textArray[1],
      firstToTalk: 1
    })
  }
}