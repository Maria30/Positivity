// ********************************************************* //
// ********************* SCÈNE DE FIN ********************** //
// ********************************************************* //

class End extends Phaser.Scene {
  constructor() {
    super('end')
  }

  create() {
    //* Définition des variables
    this.textCount = 0
    this.textArray = game.textArray[10]

    //* Arrière-plan du village
    this.sky = this.add.image(0, config.height, 'sky').setOrigin(0,1)
    this.background =  this.add.image(0, config.height, 'village4')
    this.background.setOrigin(0,1)
    this.background.setScale(.7)

    //* Boîtes aux lettres
    this.mailboxes = this.add.group({
      key: 'mailbox1',
      repeat: 6,
      setXY:
      {
          x: 700,
          y: config.height*.75,
          stepX: 550
      }
    })
    this.mailboxes.children.iterate((child) => {
      child.setScale(.1, .1)
      child.setOrigin(.5,.5)
    })
    this.mailboxes.children.entries[2].visible = false
    this.mailboxes.children.entries[4].visible = false

    //* Personnages
    this.mayor =  this.add.image(config.width*.45, config.height-40, 'mayorHappy').setOrigin(.5, 1)
    this.mayor.setScale(.5)
    this.mayor.flipX = true

    this.postman =  this.add.image(config.width*.55, config.height-40, 'postman').setOrigin(.5, 1)
    this.postman.setScale(.5)

    this.mason =  this.add.image(config.width*.1, config.height-40, 'mason').setOrigin(.5, 1)
    this.mason.setScale(.5)
    this.mason.flipX = true

    this.fisherman =  this.add.image(config.width*.2, config.height-40, 'fisherman').setOrigin(.5, 1)
    this.fisherman.setScale(.5)
    this.fisherman.flipX = true

    this.kid =  this.add.image(config.width*.8, config.height-40, 'kid').setOrigin(.5, 1)
    this.kid.setScale(.5)

    this.gardener =  this.add.image(config.width*.9, config.height-40, 'gardener').setOrigin(.5, 1)
    this.gardener.setScale(.5)

    //* Premier-plan du village 
    this.foreground = this.add.image(0, config.height, 'foreground2').setOrigin(0,1)
    this.foreground.setScale(.5)

    //* Bulle de discussion
    this.bubble = this.add.rexRoundRectangle(config.width*.5, config.height*.25, config.width*.8, config.height*.3, 25, 0xeeeeee)

    //* Indication
    this.instruction = this.add.text(config.width*.5, config.height*.05, "Clique pour continuer", {fontFamily: 'Normal', fontSize: '2em', color: 'black'}).setOrigin(.5,.5)
    
    //* Dialogue
    this.text = this.add.text(config.width*.5, config.height*.25, this.textArray[0], {fontFamily: 'Normal', fontSize: '3em', color: 'black', wordWrap: {width: config.width*.7}}).setOrigin(.5, .5)
    this.nextDialogue() 
  }

  nextDialogue() {
    this.input.on('pointerup', function () {

      this.scene.textCount++
      this.scene.text.setText(this.scene.textArray[this.scene.textCount])

      if (this.scene.textCount >= this.scene.textArray.length) {
        game.scene.stop('end')
        game.scene.start('moral')
      }
    })
  }
}