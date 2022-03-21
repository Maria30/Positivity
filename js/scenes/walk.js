class Walk extends Phaser.Scene {
  constructor() {
    super("walk")
  }

  //* Récupération des données
  init(data){
    this.helper = data.helper
    this.helped = data.helped
    this.people = data.people
  }

  create() {
    //* Définitions des variables
    game.isReadyToTalk = false
    this.talking = false
    this.count = 0

    //* Touches de déplacement et d'action
    this.keyLeft = this.input.keyboard.addKey(game.controls[0])
    this.keyRight = this.input.keyboard.addKey(game.controls[1])
    this.keyAction = this.input.keyboard.addKey(game.controls[2])

    //* Arrière-plan du village 
    this.background = this.add.image(0, config.height, 'test').setOrigin(0,1)
    this.background.setScale(.7)

    console.log(game.controls)

    //* Boîtes aux lettres
    this.mailboxes = this.add.group({
      key: "mailbox",
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

    //* Personnages non-joueurs (NPC)
    this.npc = this.add.group({
      key: this.people,
      setXY:
      {
          x: 1512,
          y: config.height*.75,
          stepX: 756
      }
    })
    this.npc.children.iterate((child) => {
      child.setScale(.5, .5)
      child.setOrigin(.5, .5)
    })

    //* Personnage joué
    this.character =  this.add.image(config.width*.5, config.height*.75, this.helper)
    this.character.setScale(.5)
    this.character.flipX = true

    //* Consigne
    this.personToHelp = 'la prochaine personne'
    switch (this.helped) {
      case 'masonGrey': 
        this.personToHelp = 'le maçon' 
        break
      case 'fishermanGrey': 
        this.personToHelp = 'le pêcheur'
        break
      case 'kidGrey': 
        this.personToHelp = "l'enfant"
        break
      case 'gardenerGrey': 
        this.personToHelp = 'le jardinier'
        break
      case 'postmanGrey': 
        this.personToHelp = 'le facteur'
        break
      default: 
        this.personToHelp = 'la prochaine personne'
        break
    }

    this.bubble = this.add.rexRoundRectangle(config.width*.5, config.height*.1, config.width*.5, config.height*.1, 25, 0xeeeeee)
    this.instruction = this.add.text(config.width*.5, config.height*.1, 'Va aider '+this.personToHelp, {fontFamily: 'Normal', fontSize: '2.5em', color: "black"}).setOrigin(.5,.5)
    this.bubble.geom.width = this.instruction.width+50
    this.bubble.displayOriginX = (this.instruction.width+50)/2

    //* Premier-plan du village 
    this.foreground = this.add.image(0, config.height, 'foreground').setOrigin(0,1)
    this.foreground.setScale(.7)

    //* Indice d'événement de discussion
    this.talkRect = this.add.rexRoundRectangle(this.character.x+350, this.character.y-150, 45, 45, 15, 0xeeeeee).setOrigin(.5,.5)
    this.talkText = this.add.text(this.character.x+350, this.character.y-150, game.controls[2], {fontFamily: 'Normal', color: "black", fontSize: '2em'}).setOrigin(.5,.5)
    this.talkText.visible = false
    this.talkRect.visible = false

    //* Evénement de discussion
    this.keyAction.on('down', function() { 
      if (game.isReadyToTalk === true){
        game.sound.play('click')
        game.isReadyToTalk = false
        game.scene.stop('walk')

        switch (game.step) {
          case 0: 
            game.scene.start("askHelp", { 
              helper: "mayor", 
              helped: "masonGrey", 
              textArray: game.textArray[0],
              firstToTalk: 0
            })
            break
          case 2: 
            game.scene.start("askHelp", { 
              helper: "mason", 
              helped: "fishermanGrey", 
              textArray: game.textArray[2],
              firstToTalk: 0
            })
          break
          case 4: 
            game.scene.start("askHelp", { 
              helper: "fisherman", 
              helped: "kidGrey", 
              textArray: game.textArray[4],
              firstToTalk: 1
            })
          break
          case 6: 
            game.scene.start("askHelp", { 
              helper: "kid", 
              helped: "gardenerGrey", 
              textArray: game.textArray[6],
              firstToTalk: 0
            })
          break
          case 8: 
            game.scene.start("askHelp", { 
              helper: "gardener", 
              helped: "postmanGrey", 
              textArray: game.textArray[8],
              firstToTalk: 0
            })
          break
        }
        game.step++
        sessionStorage.setItem("step", game.step)
      }
    })

    for (let i = 0; i < this.npc.children.entries.length; i++) {
      if (this.helped === this.npc.children.entries[i].texture.key) {
        this.idHelped = i
      }
    }
  }

  readyToTalk(direction) {
    if (game.isReadyToTalk === true) {
      this.talkText.visible = true
      this.talkRect.visible = true
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

        for (var i=0; i<this.npc.children.entries.length; i++) {
          this.npc.children.entries[i].x -= game.speed
        }

        for (var i=0; i<this.mailboxes.children.entries.length; i++) {
          this.mailboxes.children.entries[i].x -= game.speed
        }
  
        if (this.npc.children.entries[this.idHelped].x < this.character.x + 300 && this.npc.children.entries[this.idHelped].x > this.character.x) {
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

        for (var i=0; i<this.npc.children.entries.length; i++) {
          this.npc.children.entries[i].x += game.speed
        }

        for (var i=0; i<this.mailboxes.children.entries.length; i++) {
          this.mailboxes.children.entries[i].x += game.speed
        }
        
        if (this.npc.children.entries[this.idHelped].x < this.character.x + 300 && this.npc.children.entries[this.idHelped].x > this.character.x) {
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