// ********************************************************* //
// ********** 2ÈME MINI-JEU - PÊCHEUR (BLEU FONCÉ) ********* //
// ********************************************************* //

class GameTwo extends Phaser.Scene {
  constructor() {
    super('gameTwo')
  }

 create() { 
    //* Définitions des variables
    this.people = ['mayor', 'fishermanGrey', 'kidGrey', 'gardenerGrey', 'postmanGrey']
    this.talking = false
    this.isReadyToTalk = false
    this.isFound = false
    this.count = 0
    this.distance = -1250

    //* Touches de déplacement et d'action
    this.keyLeft = this.input.keyboard.addKey(game.controls[0])
    this.keyRight = this.input.keyboard.addKey(game.controls[1])
    this.keyAction = this.input.keyboard.addKey(game.controls[2])

    //* Arrière-plan du village 
    this.background = this.add.image(0, config.height, 'village1').setOrigin(0,1)
    this.background.setScale(.7)
    this.background.x = this.distance

    //* Canne à pêche
    this.rod = this.add.image(4910, config.height-200, 'rod').setInteractive({cursor: 'pointer'})
    this.rod.setScale(.1)
    this.rod.angle = 25
    this.rod.x += this.distance

    //* Boîtes aux lettres
    this.mailboxes = this.add.group({
      key: 'mailbox1',
      repeat: 6,
      setXY:
      {
          x: 700,
          y: config.height-150,
          stepX: 550
      }
    })
    this.mailboxes.children.iterate((child) => {
      child.setScale(.1, .1)
      child.setOrigin(.5,.5)
      child.x += this.distance
    })
    this.mailboxes.children.entries[2].visible = false
    this.mailboxes.children.entries[4].visible = false

    //* Personnages non-joueurs (NPC)
    this.npc = this.add.group({
      key: this.people,
      setXY:
      {
        x: 1512,
        y: config.height-40,
        stepX: 756
      }
    })
    this.npc.children.iterate((child) => {
      child.setScale(.5, .5)
      child.setOrigin(.5, 1)
      child.x += this.distance
    }) 

    //* Personnage joué
    this.character =  this.add.image(config.width*.5, config.height-40, 'mason').setOrigin(0, 1)
    this.character.setScale(.5)
    this.character.flipX = true

    //* Premier-plan du village 
    this.foreground = this.add.image(0, config.height, 'foreground1').setOrigin(0,1)
    this.foreground.setScale(.7)
    this.foreground.x = this.distance

    //* Icône de la canne à pêche
    this.rodIcon = this.add.image(0, config.height, 'rodIcon').setOrigin(0,1)
    this.rodIcon.setScale(.25)
    this.rodIcon.visible = false

    //* Indice d'événement de discussion
    this.talkRect = this.add.rexRoundRectangle(this.character.x+50, this.character.y-300, 45, 45, 15, 0xeeeeee).setOrigin(.5,.5)
    this.talkText = this.add.text(this.character.x+50, this.character.y-300, game.controls[2], {fontFamily: 'Normal', color: 'black', fontSize: '2em'}).setOrigin(.5,.5)
    this.talkText.visible = false
    this.talkRect.visible = false

    //* Consigne
    this.bubble = this.add.rexRoundRectangle(config.width*.5, config.height*.1, config.width*.5, config.height*.1, 25, 0xeeeeee)
    this.instruction = this.add.text(config.width*.5, config.height*.1, "Cherche la canne à pêche du pêcheur", {fontFamily: 'Normal', fontSize: '2.5em', color: 'black'}).setOrigin(.5,.5)
    this.bubble.geom.width = this.instruction.width+50
    this.bubble.displayOriginX = (this.instruction.width+50)/2

    this.rod.on('pointerup', function() {
      game.scene.keys.music.playSound('getObject')

      this.scene.isFound = true
      this.scene.rod.visible = false
      this.scene.rodIcon.visible = true
      this.scene.instruction.setText("Donne la canne à pêche au pêcheur")
    })

    //* Evénement de discussion
    this.keyAction.on('down', function () {
      if (game.scene.keys.gameTwo.isReadyToTalk === true) {
        game.scene.keys.music.playSound('winGame')

        game.step = 4
        sessionStorage.setItem('step', game.step)

        game.scene.stop('gameTwo')
        game.scene.start('hadHelp', { 
          helped: 'fisherman', 
          helper: 'mason', 
          textArray: game.textArray[3],
          firstToTalk: 0
        })
      }
    })
  }

  readyToTalk(direction) {
    if (this.isFound === true) {
      this.talkText.visible = true
      this.talkRect.visible = true
      this.isReadyToTalk = true
      if (direction === "right") {
        this.talkText.x -= game.speed
        this.talkRect.x -= game.speed
      }
      else if (direction === "left") {
        this.talkText.x += game.speed
        this.talkRect.x += game.speed
      }
    }
  }

  move() {
    //* Avancer vers l'avant
    if(this.keyRight.isDown) {
      this.character.flipX = true

      if (this.background.x >= -3800) {
        this.background.x -= game.speed
        this.foreground.x -= game.speed
        this.rod.x -= game.speed

        for (var i=0; i<this.npc.children.entries.length; i++) {
          this.npc.children.entries[i].x -= game.speed
        }

        for (var i=0; i<this.mailboxes.children.entries.length; i++) {
          this.mailboxes.children.entries[i].x -= game.speed
        }
  
        if (this.npc.children.entries[1].x < this.character.x + 300 && this.npc.children.entries[1].x > this.character.x) {
          if (!game.isReadyToTalk) game.isReadyToTalk = true
          this.readyToTalk("right")
        }
        else {this.talkText.visible = false, this.talkRect.visible = false, game.isReadyToTalk = false}
      }
    }

    //* Avancer vers l'arrière
    else if (this.keyLeft.isDown) {
      this.character.flipX = false

      if (this.background.x <= -12) {
        this.background.x += game.speed
        this.foreground.x += game.speed
        this.rod.x += game.speed

        for (var i=0; i<this.npc.children.entries.length; i++) {
          this.npc.children.entries[i].x += game.speed
        }

        for (var i=0; i<this.mailboxes.children.entries.length; i++) {
          this.mailboxes.children.entries[i].x += game.speed
        }
        
        if (this.npc.children.entries[1].x < this.character.x + 300 && this.npc.children.entries[1].x > this.character.x) {
          if (!game.isReadyToTalk) game.isReadyToTalk = true
          this.readyToTalk("left")
        }
        else {this.talkText.visible = false, this.talkRect.visible = false, game.isReadyToTalk = false}
      }
    }
  }

  update() {
    this.move()
  }
}