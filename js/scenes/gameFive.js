// ********************************************************* //
// ************ 5ÈME MINI-JEU - FACTEUR (JAUNE) ************ //
// ********************************************************* //

class GameFive extends Phaser.Scene {
  constructor() {
    super('gameFive')
  }

  create() { 
    //* Définitions des variables
    this.people = ['mayor', 'mason', 'fisherman', 'kid', 'postmanGrey']
    this.isFound = false
    this.talking = false
    game.isReadyToTalk = false
    this.count = 0
    this.distance = -3500
    
    //* Touches de déplacement et d'action
    this.keyLeft = this.input.keyboard.addKey(game.controls[0])
    this.keyRight = this.input.keyboard.addKey(game.controls[1])
    this.keyAction = this.input.keyboard.addKey(game.controls[2])

    this.arrowRight = this.input.keyboard.addKey('right')
    this.arrowLeft = this.input.keyboard.addKey('left')

    //* Arrière-plan du village
    this.sky = this.add.image(0, config.height, 'sky').setOrigin(0,1)
    this.background = this.add.image(0, config.height, 'village3').setOrigin(0,1)
    this.background.setScale(.7)
  
    this.background.x = this.distance
    this.background.x = this.distance

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
      child.setInteractive({cursor: 'pointer'})
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
    this.character =  this.add.image(config.width*.5, config.height-40, 'gardener').setOrigin(0, 1)
    this.character.setScale(.5)
    this.character.flipX = true

    //* Ajout de l'indice d'événement de discussion
    this.talkRect = this.add.rexRoundRectangle(this.character.x+350, this.character.y-300, 45, 45, 15, 0xeeeeee).setOrigin(.5,.5)
    this.talkText = this.add.text(this.character.x+350, this.character.y-300, game.controls[2], {fontFamily: 'Normal', color: 'black', fontSize: '2em'}).setOrigin(.5,.5)
    this.talkText.visible = false
    this.talkRect.visible = false

    //* Consigne
    this.bubble = this.add.rexRoundRectangle(config.width*.5, config.height*.1, config.width*.5, config.height*.1, 25, 0xeeeeee)
    this.instruction = this.add.text(config.width*.5, config.height*.1, "Clique sur la boîte aux lettres de la bonne maison", {fontFamily: 'Normal', fontSize: '2.5em', color: 'black'}).setOrigin(.5,.5)
    this.bubble.geom.width = this.instruction.width+50
    this.bubble.displayOriginX = (this.instruction.width+50)*.5

    //* Premier-plan du village 
    this.foreground = this.add.image(0, config.height, 'foreground2').setOrigin(0,1)
    this.foreground.setScale(.7)
    this.foreground.x = this.distance

    for (let i=0; i<this.mailboxes.children.entries.length; i++) {
      this.mailboxes.children.entries[i].on('pointerup', function() {

        if (i === 0) {
          game.scene.keys.music.playSound('getObject')

          this.scene.instruction.setText("Bravo ! C'est la bonne réponse ! Retourne parler au facteur")
          this.scene.bubble.displayWidth = this.scene.instruction.width+50
          this.scene.isFound = true
          this.scene.mailboxes.children.iterate((child) => {
            child.disableInteractive()
          })
        }
        else {
          if(!this.scene.isFound) {
            this.scene.instruction.setText("Ce n'est pas la bonne réponse... Retente ta chance !")
            this.scene.bubble.displayWidth = this.scene.instruction.width+50
          }
        }
      })
    }

    this.keyAction.on('down', function () {
      if (game.isReadyToTalk === true) {
        game.scene.keys.music.playSound('winGame')

        game.step = 10
        sessionStorage.setItem('step', game.step)
        
        game.scene.stop('gameFive')
        game.scene.start('hadHelp', { 
          helped: 'postman', 
          helper: 'gardener', 
          textArray: game.textArray[9],
          firstToTalk: 0
        })
      }
    })
  }

  readyToTalk(direction) {
    if (this.isFound === true) {
      this.talkText.visible = true
      this.talkRect.visible = true
      game.isReadyToTalk = true
      if (direction === 'right') {
        this.talkText.x -= game.speed
        this.talkRect.x -= game.speed
      }
      else if (direction === 'left') {
        this.talkText.x += game.speed
        this.talkRect.x += game.speed
      }
    }
  }

  move() {
    //* Avancer vers l'avant
    if(this.keyRight.isDown || this.arrowRight.isDown) {
      
      this.character.flipX = true

      if (this.background.x >= -3800) {
        this.background.x -= game.speed
        this.foreground.x -= game.speed

        for (var i=0; i<this.npc.children.entries.length; i++) {
          this.npc.children.entries[i].x -= game.speed
        }

        for (var i=0; i<this.mailboxes.children.entries.length; i++) {
          this.mailboxes.children.entries[i].x -= game.speed
        }
  
        if (this.npc.children.entries[4].x < this.character.x + 300 && this.npc.children.entries[4].x > this.character.x) {
          if (!game.isReadyToTalk) game.isReadyToTalk = true
          this.readyToTalk('right')
        }
        else {this.talkText.visible = false, this.talkRect.visible = false, game.isReadyToTalk = false}
      }
    }

    //* Avancer vers l'arrière
    else if (this.keyLeft.isDown || this.arrowLeft.isDown) {
      this.character.flipX = false

      if (this.background.x <= -12) {
        this.background.x += game.speed
        this.foreground.x += game.speed

        for (var i=0; i<this.npc.children.entries.length; i++) {
          this.npc.children.entries[i].x += game.speed
        }

        for (var i=0; i<this.mailboxes.children.entries.length; i++) {
          this.mailboxes.children.entries[i].x += game.speed
        }
        
        if (this.npc.children.entries[4].x < this.character.x + 300 && this.npc.children.entries[4].x > this.character.x) {
          if (!game.isReadyToTalk) game.isReadyToTalk = true
          this.readyToTalk('left')
        }
        else {this.talkText.visible = false, this.talkRect.visible = false, game.isReadyToTalk = false}
      }
    }
  }

  update() {
    this.move()
  }
}