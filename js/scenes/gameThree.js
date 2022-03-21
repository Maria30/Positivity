class GameThree extends Phaser.Scene {
  constructor() {
    super("gameThree")
  }

  create() { 
    //* Définitions des variables du mini-jeu
    this.people = ['mayor', 'mason', 'kidGrey', 'gardenerGrey', 'postmanGrey']
    this.talking = false
    this.count = 0
    this.isFound = 0
    this.isReadyToTalk = false
    this.isRepaired = false

    //* Arrière-plan du village 
    this.background = this.add.image(0, config.height, 'test').setOrigin(0,1)
    this.background.setScale(.7)

    //* Touches de déplacement et d'actions
    this.keyLeft = this.input.keyboard.addKey(game.controls[0])
    this.keyRight = this.input.keyboard.addKey(game.controls[1])
    this.keyAction = this.input.keyboard.addKey(game.controls[2])

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
    })

    //* Parties de l'avion
    this.part1 = this.add.image(4145, config.height-140, "part1").setInteractive({cursor: 'pointer'})
    this.part1.displayHeight = 50
    this.part1.displayWidth = 50

    this.part2 = this.add.image(1085, config.height-370, "part2").setInteractive({cursor: 'pointer'})
    this.part2.angle = 30
    this.part2.displayHeight = 50
    this.part2.displayWidth = 50

    this.part3 = this.add.image(2245, config.height-360, "part3").setInteractive({cursor: 'pointer'})
    this.part3.displayHeight = 50
    this.part3.displayWidth = 50

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

    //* Personnage joué
    this.character =  this.add.image(config.width*.5, config.height*.75, "fisherman")
    this.character.setScale(.5)
    this.character.flipX = true

    //* Premier-plan du village 
    this.foreground = this.add.image(0, config.height, 'foreground').setOrigin(0,1)
    this.foreground.setScale(.7)

    //* Icônes des parties de l'avion
    this.partIcon1 = this.add.image(0, config.height, "partIcon1").setOrigin(0,1).setInteractive({cursor: 'pointer'})
    this.partIcon1.setScale(.15)
    this.partIcon1.visible = false

    this.partIcon2 = this.add.image(90, config.height-20, "partIcon2").setOrigin(0,1).setInteractive({cursor: 'pointer'})
    this.partIcon2.setScale(.15)
    this.partIcon2.visible = false

    this.partIcon3 = this.add.image(200, config.height, "partIcon3").setOrigin(0,1).setInteractive({cursor: 'pointer'})
    this.partIcon3.setScale(.15)
    this.partIcon3.visible = false

    //* Icône de l'avion réparé
    this.planeIcon = this.add.image(0, config.height, "planeIcon").setOrigin(0,1)
    this.planeIcon.setScale(.35)
    this.planeIcon.visible = false

    //* Indice d'événement de discussion 
    this.talkRect = this.add.rexRoundRectangle(this.character.x+350, this.character.y-150, 45, 45, 15, 0xeeeeee).setOrigin(.5,.5)
    this.talkText = this.add.text(this.character.x+350, this.character.y-150, game.controls[2], {fontFamily: 'Normal', color: "black", fontSize: '2em'}).setOrigin(.5,.5)
    this.talkText.visible = false
    this.talkRect.visible = false

    //* Consigne
    this.bubble = this.add.rexRoundRectangle(config.width*.5, config.height*.1, config.width*.5, config.height*.1, 25, 0xeeeeee)
    this.instruction = this.add.text(config.width*.5, config.height*.1, "Cherche les différentes parties de l'avion", {fontFamily: 'Normal', fontSize: '2.5em', color: "black"}).setOrigin(.5,.5)
    this.bubble.geom.width = this.instruction.width+50
    this.bubble.displayOriginX = (this.instruction.width+50)/2

    //* Récupération des différentes parties de l'avion
    this.part1.on('pointerup', function() {
      game.scene.keys.music.playSound('getObject')

      this.scene.isFound++
      this.scene.part1.visible = false
      this.scene.partIcon1.visible = true
      this.scene.checkPartsFound()
    })
    this.part2.on('pointerup', function() {
      game.scene.keys.music.playSound('getObject')

      this.scene.isFound++
      this.scene.part2.visible = false
      this.scene.partIcon2.visible = true
      this.scene.checkPartsFound()
    })
    this.part3.on('pointerup', function() {
      game.scene.keys.music.playSound('getObject')

      this.scene.isFound++
      this.scene.part3.visible = false
      this.scene.partIcon3.visible = true
      this.scene.checkPartsFound()
    })
    
    //* Evénement de discussion
    this.input.keyboard.on('keydown-E', function () {
      if (this.scene.isReadyToTalk === true) {
        game.scene.keys.music.playSound('winGame')

        game.step = 6
        sessionStorage.setItem("step", game.step)

        game.scene.stop("gameThree")
        game.scene.start("hadHelp", { 
          helped: "kid", 
          helper: "fisherman", 
          textArray: game.textArray[5],
          firstToTalk: 0
        })
      }
    })
  }

  checkPartsFound() {
    if (this.isFound === 3) {
      this.changeInstruction("Clique sur l'avion pour le réparer")
      this.repairPlane()
    }
  }

  repairPlane() {
    this.partIcon1.on('pointerup', function() {
      this.scene.partIcon1.visible = false
      this.scene.partIcon2.visible = false
      this.scene.partIcon3.visible = false
      this.scene.planeIcon.visible = true
      this.scene.isRepaired = true

      game.scene.keys.music.playSound('planeFixed')
      this.scene.changeInstruction("Redonne l'avion à l'enfant")
    })
    this.partIcon2.on('pointerup', function() {
      this.scene.partIcon1.visible = false
      this.scene.partIcon2.visible = false
      this.scene.partIcon3.visible = false
      this.scene.planeIcon.visible = true
      this.scene.isRepaired = true

      game.scene.keys.music.playSound('planeFixed') 
      this.scene.changeInstruction("Redonne l'avion à l'enfant")
    })
    this.partIcon3.on('pointerup', function() {
      this.scene.partIcon1.visible = false
      this.scene.partIcon2.visible = false
      this.scene.partIcon3.visible = false
      this.scene.planeIcon.visible = true
      this.scene.isRepaired = true

      game.scene.keys.music.playSound('planeFixed')
      this.scene.changeInstruction("Redonne l'avion à l'enfant")
    })
  }

  changeInstruction(text) {
    this.instruction.setText(text)
    this.bubble.displayWidth = this.instruction.width+50
  }

  readyToTalk(direction) {
    if (this.isFound === 3 && this.isRepaired === true) {
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
      
      if (this.background.x >= -4060) {
        this.part1.x -= game.speed
        this.part2.x -= game.speed
        this.part3.x -= game.speed
  
        this.background.x -= game.speed
        this.foreground.x -= game.speed

        for (var i=0; i<this.npc.children.entries.length; i++) {
          this.npc.children.entries[i].x -= game.speed
        }

        for (var i=0; i<this.mailboxes.children.entries.length; i++) {
          this.mailboxes.children.entries[i].x -= game.speed
        }
  
        if (this.npc.children.entries[2].x < this.character.x + 300 && this.npc.children.entries[2].x > this.character.x) {
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
        this.part1.x += game.speed
        this.part2.x += game.speed
        this.part3.x += game.speed
        this.background.x += game.speed
        this.foreground.x += game.speed

        for (var i=0; i<this.npc.children.entries.length; i++) {
          this.npc.children.entries[i].x += game.speed
        }

        for (var i=0; i<this.mailboxes.children.entries.length; i++) {
          this.mailboxes.children.entries[i].x += game.speed
        }
        
        if (this.npc.children.entries[2].x < this.character.x + 300 && this.npc.children.entries[2].x > this.character.x) {
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
