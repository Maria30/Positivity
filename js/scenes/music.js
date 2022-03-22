class Music extends Phaser.Scene {
  constructor() {
    super("music")
  }

  create() {
    this.sound.add('music')
    game.sound.play('music', {loop: true})
    this.isPlaying = true

    this.musicToggle = this.add.image(config.width-10, 10, "musicOn").setInteractive({cursor: 'pointer'}).setOrigin(1, 0)
    this.musicToggle.setScale(.15)
    
    this.musicToggle.on('pointerup', function () {
      this.isPlaying = !this.isPlaying
   
      if (this.isPlaying) {
        this.scene.musicToggle.setTexture('musicOn')
        game.sound.mute = false
      }
      else if (!this.isPlaying) {
        this.scene.musicToggle.setTexture('musicOff')
        game.sound.mute = true
      }
    })
  }

  playSound(sound) {
    if (this.isPlaying) {
      game.sound.play(sound, {volume: .5})
    }
  }
}