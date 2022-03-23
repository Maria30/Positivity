var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xffffff,
  scene: [
    Loading,
    MainMenu,
    Walk,
    AskHelp,
    HadHelp,
    GameOne,
    GameTwo,
    GameThree,
    GameFour,
    GameFive,
    Thanks,
    ThanksJPO,
    Controls,
    Music,
    Moral,
    End
  ]
}

var game = new Phaser.Game(config)