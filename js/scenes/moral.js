// ********************************************************* //
// ********************* MORALE DU JEU ********************* //
// ********************************************************* //

class Moral extends Phaser.Scene {
  constructor() {
    super('moral')
  }

  create() {
    this.paper =  this.add.rectangle(config.width*.5, config.height*.5, config.width, config.height, 0xffffff)

    this.add.image(config.width*.5, config.height*.35, 'happySun').setOrigin(0.5, 0.5).setScale(.4)

    this.add.text(config.width*.5, config.height*.75, 
      "La positivité, l’aide et l’espoir sont primordiaux pour le bonheur de tous, alors aide tes proches et ceux que tu aimes, et n’abandonne jamais, quoi qu’il arrive !", 
      {fontFamily: 'Normal', align: 'center', fontSize: '4em', color:'#444', wordWrap: {width: config.width*.8}}).setOrigin(.5, .5)
  
    this.instruction = this.add.text(config.width*.5, config.height*.95, "Clique pour continuer", {fontFamily: 'Normal', fontSize: '2em', color: 'black'}).setOrigin(.5,.5)
  
    this.input.on('pointerup', function () {
      game.scene.stop('moral')
      game.scene.start('thanks') 
    })
  }
}