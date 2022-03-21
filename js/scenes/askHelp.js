class AskHelp extends Phaser.Scene {
  constructor() {
    super("askHelp")
  }

  //* Récupération des données
  init(data){
    this.helper = data.helper
    this.helped = data.helped
    this.textArray = data.textArray
    this.firstToTalk = data.firstToTalk
  }

  create() {
    //* Définition des variables
    this.textCount = 0

    //* Arrière-plan du village 
    this.background =  this.add.tileSprite(0, 0, window.width, window.height, "background")
    this.background.setOrigin(0,0)

    //* Personnage joué
    this.character =  this.add.image(config.width/4, config.height/1.1, this.helper)
    this.character.flipX = true

    //* Personnage à aider
    this.npc =  this.add.image((config.width/4)*3, config.height/1.1, this.helped)

    //* Bulle de discussion
    this.bubble = this.add.rexRoundRectangle(config.width*.5, config.height*.25, config.width*.8, config.height*.3, 25, 0xeeeeee)

    this.triangleOne = this.add.triangle(config.width*.3, config.height*.4, 0, 0, 100, 0, 0, 100, 0xeeeeee).setOrigin(0, 0)
    this.triangleTwo = this.add.triangle(config.width*.7, config.height*.4, 0, 0, -100, 0, 0, 100, 0xeeeeee).setOrigin(0, 0)

    if (this.firstToTalk === 0) this.triangleTwo.visible = false
    else if (this.firstToTalk === 1) this.triangleOne.visible = false

    //* Indication
    this.instruction = this.add.text(config.width*.5, config.height*.05, "Clique pour continuer", {fontFamily: 'Normal', fontSize: '2em', color: "black"}).setOrigin(.5,.5)
    
    //* Dialogue
    this.text = this.add.text(config.width*.5, config.height*.25, this.textArray[this.textCount], {fontFamily: 'Normal', fontSize: '3em', color: "black", wordWrap: {width: config.width*.7}}).setOrigin(.5, .5)
    this.nextDialogue() 
  }

  nextDialogue() {
    this.input.on('pointerup', function () {
      this.scene.triangleOne.visible = !this.scene.triangleOne.visible
      this.scene.triangleTwo.visible = !this.scene.triangleTwo.visible

      this.scene.textCount++
      this.scene.text.setText(this.scene.textArray[this.scene.textCount])

      if (this.scene.textCount >= this.scene.textArray.length) {
        console.log(game.step)
        game.scene.stop('askHelp')
        switch (game.step) {
          case 1: 
            game.scene.start('gameOne') 
            break
          case 3: 
            game.scene.start('gameTwo')
            break
          case 5: 
            game.scene.start('gameThree')
            break
          case 7: 
            game.scene.start('gameFour')
            break
          case 9: 
            game.scene.start('gameFive')
            break
        }
      }
    })
  }
}