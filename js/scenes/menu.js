// ********************************************************* //
// ********************* MENU PRINCIPAL ******************** //
// ********************************************************* //

class MainMenu extends Phaser.Scene {
  constructor() {
    super('menu')
  }

  create() {
    //* Récupération de la donnée de sauvegarde du jeu dans la session
    if (typeof sessionStorage.step !== 'undefined' && sessionStorage.step < 10) {
      game.step = parseInt(sessionStorage.getItem('step'))
    }
    else {
      sessionStorage.setItem('step', 0)
      game.step = parseInt(sessionStorage.getItem('step'))
    }

    //* Arrière-plan du village 
    this.background = this.add.image(config.width*.5, config.height*.5, 'backgroundMenu')
    this.background.height = config.height
    this.background.width = config.width
   
    //* Logo
    this.title = this.add.image(config.width*.5, config.height*.25, 'title').setOrigin(0.5, 0.5)
    this.title.setScale(.5)

    //* Boutons
    this.rectPlay = this.add.rexRoundRectangle(config.width*.5, config.height*.5, 200, 75, 15, 0x666666).setInteractive({ cursor: 'pointer' })
    this.rectControls = this.add.rexRoundRectangle(config.width*.5, config.height*.65, 200, 75, 15, 0x666666).setInteractive({ cursor: 'pointer' })
    this.rectQuit = this.add.rexRoundRectangle(config.width*.5, config.height*.8, 200, 75, 15, 0x666666).setInteractive({ cursor: 'pointer' })

    this.clickPlay = this.add.text(config.width*.5, config.height*.5, "Jouer", {fontFamily: 'Normal', fontSize: '4em',  color:'#fff'}).setInteractive({ cursor: 'pointer' }).setOrigin(0.5, 0.5)
    this.clickControls = this.add.text(config.width*.5, config.height*.65, "Options", {fontFamily: 'Normal', fontSize: '4em',  color:'#fff'}).setInteractive({ cursor: 'pointer' }).setOrigin(0.5, 0.5)
    this.clickQuit = this.add.text(config.width*.5, config.height*.8, "Quitter", {fontFamily: 'Normal', fontSize: '4em', color:'#fff'}).setInteractive({ cursor: 'pointer' }).setOrigin(0.5, 0.5)
    
    //* Evénements du survolage de la souris sur les boutons
    this.rectPlay.on('pointerover',function(){this.fillColor = 0x999999, game.scene.keys.music.playSound('hoverBtn')})
    this.rectPlay.on('pointerout',function(){this.fillColor = 0x666666})  
    this.clickPlay.on('pointerover',function(){this.scene.rectPlay.fillColor = 0x999999})
    this.clickPlay.on('pointerout',function(){this.scene.rectPlay.fillColor = 0x666666}) 

    this.rectControls.on('pointerover',function(){this.fillColor = 0x999999, game.scene.keys.music.playSound('hoverBtn')})
    this.rectControls.on('pointerout',function(){this.fillColor = 0x666666})  
    this.clickControls.on('pointerover',function(){this.scene.rectControls.fillColor = 0x999999})
    this.clickControls.on('pointerout',function(){this.scene.rectControls.fillColor = 0x666666})  

    this.rectQuit.on('pointerover',function(){this.fillColor = 0x999999, game.scene.keys.music.playSound('hoverBtn')})
    this.rectQuit.on('pointerout',function(){this.fillColor = 0x666666}) 
    this.clickQuit.on('pointerover',function(){this.scene.rectQuit.fillColor = 0x999999})
    this.clickQuit.on('pointerout',function(){this.scene.rectQuit.fillColor = 0x666666})  

    this.clickPlay.on('pointerup', function () {
      game.scene.keys.music.playSound('click')
      game.scene.stop('menu') 
      switch (game.step) {
        case 0: 
          game.scene.start('walk', {
            helper: 'mayor',
            helped: 'masonGrey',
            people: ['masonGrey', 'fishermanGrey', 'kidGrey', 'gardenerGrey', 'postmanGrey'],
            startX: 0
          })
          break
        case 1: 
          game.scene.start('gameOne')
          break
        case 2: 
          game.scene.start('walk', { 
            helper: 'mason', 
            helped: 'fishermanGrey', 
            people: ['mayor', 'fishermanGrey', 'kidGrey', 'gardenerGrey', 'postmanGrey'],
            startX: -1000
          })
        break
        case 3: 
          game.scene.start('gameTwo')
          break
        case 4: 
          game.scene.start('walk', { 
            helper: 'fisherman', 
            helped: 'kidGrey', 
            people: ['mayor', 'mason', 'kidGrey', 'gardenerGrey', 'postmanGrey'],
            startX: -2000
          })
          break
        case 5: 
          game.scene.start('gameThree')
        break
        case 6: 
          game.scene.start('walk', { 
            helper: 'kid', 
            helped: 'gardenerGrey', 
            people: ['mayor', 'mason', 'fisherman', 'gardenerGrey', 'postmanGrey'],
            startX: -2750 
          })
          break
        case 7: 
          game.scene.start('gameFour')
        break
        case 8: 
          game.scene.start('walk', { 
            helper: 'gardener', 
            helped: 'postmanGrey', 
            people: ['mayor', 'mason', 'fisherman', 'kid', 'postmanGrey'],
            startX: -3500
          })
        break
        case 9: 
          game.scene.start('gameFive')
        break
        default :
          game.scene.start('error')
        break
      }
    })
    this.rectPlay.on('pointerup', function () {
      game.scene.keys.music.playSound('click')
      game.scene.stop('menu') 
      switch (game.step) {
        case 0: 
          game.scene.start('walk', {
            helper: 'mayor',
            helped: 'masonGrey',
            people: ['masonGrey', 'fishermanGrey', 'kidGrey', 'gardenerGrey', 'postmanGrey']
          })
        break
        case 1: 
          game.scene.start('gameOne')
        break
        case 3: 
          game.scene.start('walk', { 
            helper: 'mason', 
            helped: 'fishermanGrey', 
            people: ['mayor', 'fishermanGrey', 'kidGrey', 'gardenerGrey', 'postmanGrey']
          })
        break
        case 4: 
          game.scene.start("gameTwo")
        break
        case 5: 
          game.scene.start('walk', { 
            helper: 'fisherman', 
            helped: 'kidGrey', 
            people: ['mayor', 'mason', 'kidGrey', 'gardenerGrey', 'postmanGrey']
          })
        break
        case 6: 
          game.scene.start('gameThree')
          break
        case 7: 
          game.scene.start('walk', { 
            helper: 'kid', 
            helped: 'gardenerGrey', 
            people: ['mayor', 'mason', 'fisherman', 'gardenerGrey', 'postmanGrey']
          })
        break
        case 8: 
          game.scene.start('gameFour')
        break
        case 9: 
          game.scene.start('walk', { 
            helper: 'gardener', 
            helped: 'postmanGrey', 
            people: ['mayor', 'mason', 'fisherman', 'kid', 'postmanGrey']
          })
        break
        case 10: 
          game.scene.start('gameFive')
        break
        default :
          game.scene.start('error')
        break
      }
    })

    this.clickControls.on('pointerup', function () {
      game.scene.keys.music.playSound('click')
      game.scene.stop('menu'), game.scene.start('controls')
    })
    this.rectControls.on('pointerup', function () {
      game.scene.keys.music.playSound('click')
      game.scene.stop('menu'), game.scene.start('controls')
    })

    this.clickQuit.on('pointerup', function () {
      game.scene.keys.music.playSound('click')
      game.destroy(true)
    })
    this.rectQuit.on('pointerup', function () {
      game.scene.keys.music.playSound('click')
      game.destroy(true)
    })
  }
}