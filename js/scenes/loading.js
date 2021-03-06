// ********************************************************* //
// ********************** CHARGEMENT *********************** //
// ********************************************************* //

class Loading extends Phaser.Scene {
  constructor() {
    super('loading')
  }

  preload() {
    this.showLoadingText()

    this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true)
    
    //* Menu 
    this.load.image('title','./assets/img/title.png')
    this.load.image('backgroundMenu','./assets/img/background/background.jpg')
    this.load.image('musicOn','./assets/img/musicOn.png')
    this.load.image('musicOff','./assets/img/musicOff.png')
    this.load.image('happySun','./assets/img/happySun.png')
    this.load.image('sadSun','./assets/img/sadSun.png')

    //* Audio
    this.load.audio('music', './assets/audio/main_theme.wav')
    this.load.audio('getObject', './assets/audio/get.wav')
    this.load.audio('hoverBtn', './assets/audio/hover.wav')
    this.load.audio('click', './assets/audio/click.wav')
    this.load.audio('winGame', './assets/audio/win.wav')
    this.load.audio('planeFixed', './assets/audio/planeFixed.wav')

    //* Marche
    this.load.image('sky','./assets/img/sky.png')
    this.load.image('mailbox','./assets/img/mailbox.png')
    this.load.image('mailbox1','./assets/img/mailbox1.png')
    this.load.image('village','./assets/img/village/village.png')
    this.load.image('village1','./assets/img/village/village1.png')
    this.load.image('village2','./assets/img/village/village2.png')
    this.load.image('village3','./assets/img/village/village3.png')
    this.load.image('village4','./assets/img/village/village4.png')
    this.load.image('foreground','./assets/img/foreground/foreground.png')
    this.load.image('foreground1','./assets/img/foreground/foreground1.png')
    this.load.image('foreground2','./assets/img/foreground/foreground2.png')
    this.load.image('background','./assets/img/background/background.png')
    this.load.image('background1','./assets/img/background/background1.png')
    this.load.image('background2','./assets/img/background/background2.png')

    //* Personnages
    this.load.image('mayor','./assets/img/characterGrey/mayor.png')
    this.load.image('mayorHappy','./assets/img/characterColor/mayorHappy.png')
  
    this.load.image('masonGrey','./assets/img/characterGrey/masonGrey.png')
    this.load.image('mason','./assets/img/characterColor/mason.png')

    this.load.image('kidGrey','./assets/img/characterGrey/kidGrey.png')
    this.load.image('kid','./assets/img/characterColor/kid.png')

    this.load.image('fishermanGrey','./assets/img/characterGrey/fishermanGrey.png')
    this.load.image('fisherman','./assets/img/characterColor/fisherman.png')

    this.load.image('postmanGrey','./assets/img/characterGrey/postmanGrey.png')
    this.load.image('postman','./assets/img/characterColor/postman.png')

    this.load.image('gardenerGrey','./assets/img/characterGrey/gardenerGrey.png')
    this.load.image('gardener','./assets/img/characterColor/gardener.png')

    //* Jeu n??1
    this.load.image('wood','./assets/img/wood.png')
    this.load.image('pencil','./assets/img/pencil.png')

    //* Jeu n??2
    this.load.image('rod','./assets/img/rod.png')
    this.load.image("rodIcon",'./assets/img/rodIcon.png')

    //* Jeu n??3
    this.load.image('part1','./assets/img/plane/part1.png')
    this.load.image('part2','./assets/img/plane/part2.png')
    this.load.image('part3','./assets/img/plane/part3.png')
    this.load.image('partIcon1','./assets/img/plane/partIcon1.png')
    this.load.image('partIcon2','./assets/img/plane/partIcon2.png')
    this.load.image('partIcon3','./assets/img/plane/partIcon3.png')
    this.load.image('planeIcon','./assets/img/plane/planeIcon.png')

    //* Jeu n??4
    this.load.image('rose','./assets/img/flowers/rose.png')
    this.load.image('tulip','./assets/img/flowers/tulip.png')
    this.load.image('daisy','./assets/img/flowers/daisy.png')
    this.load.image('sunflower','./assets/img/flowers/sunflower.png')
    this.load.image('orchid','./assets/img/flowers/orchid.png')
    this.load.image('lily','./assets/img/flowers/lily.png')
    this.load.image('pansy','./assets/img/flowers/pansy.png')

    this.load.image('shovel','./assets/img/shovel.png')
  
    //* Remerciements  
    this.load.image('instagram','./assets/img/instagram.png')
    this.load.image('forms','./assets/img/forms.png')

    //* Dialogues
    game.textArray = [
      //* 0
      //* Dialogue entre le maire et le ma??on
      //* Avant le jeu
      [      
        "Bonjour cher ma??on ! Comment allez-vous aujourd'hui ?",
        "??a pourrait aller mieux...",
        "Je suis navr?? d'entendre cela. Que se passe-t-il ?",
        "Depuis la catastrophe, beaucoup de gens me demandent de r??parer leurs maisons. Cependant, je n'ai pas assez de b??ton...",
        "Vous ne pouvez pas en commander davantage ?",
        "Je peux... mais je n'y arrive pas...",
        "Comment ??a ?",
        "Les math??matiques ne sont pas ma sp??cialit?? et je n'arrive pas ?? savoir combien de b??ton il faut pour chaque maison...",
        "Oh ??a ne me pose aucun probl??me ! Laissez-moi vous aider !",
        "Vraiment ? Merci beaucoup !"
      ],
      //* 1
      //* Dialogue entre le maire et le ma??on
      //* Apr??s le jeu
      [      
        "Vous avez r??ussi ! Merci beaucoup ! Je vais d??sormais pouvoir r??parer les maisons du village tout entier !",
        "Je vous en prie ! ??a me fait plaisir d'aider.",
        "Je vous admire ! J'aimerais aussi aider les autres.",
        "Alors allez-y ! N'h??sitez pas ?? discuter avec les habitants du village !",
        "Vous avez raison ! Passez une bonne journ??e Monsieur le Maire ! Et merci encore pour votre aide !",
      ],
      //* 2
      //* Dialogue entre le ma??on et le p??cheur
      //* Avant le jeu
      [
        "Bonjour monsieur le p??cheur ! ??a ne va pas ? Vous avez une petite mine aujourd???hui !",
        "En effet??? Cela fait des heures enti??res que je cherche ma canne ?? p??che...",
        "O?? l'avez-vous vue pour la derni??re fois ?",
        "Je suis all?? p??cher ce matin ?? l'ext??rieur du village et quand je suis rentr?? dans ma cabane, je ne l'avais plus !",
        "Je vais vous aider ?? la chercher !",
        "Oh ! C'est gentil de votre part ! Merci !"
      ],
      //* 3
      //* Dialogue entre le ma??on et le p??cheur
      //* Apr??s le jeu
      [
        "Voici votre canne ?? p??che !",
        "Oh merci beaucoup ! O?? l'avez-vous trouv??e ?",
        "Elle se trouvait juste ?? c??t?? de l'??tang ! Vous avez s??rement d?? oublier de la prendre au retour !",
        "Que suis-je b??te ! Pour vous remercier, je vais p??cher le poisson le plus beau, le plus frais et le plus gros que vous ayez jamais vu !",
        "Merci de votre g??n??rosit?? ! Passez une bonne journ??e !"
      ],
      //* 4
      //* Dialogue entre le p??cheur et l'enfant
      //* Avant le jeu
      [
        "*Sniff sniff*",
        "Bonjour jeune homme ! Pourquoi pleures-tu ?",
        "Bonjour monsieur le p??cheur... J'ai cass?? mon jouet pr??f??r?? en jouant avec... *sniff*",
        "Ah bon ? Que s'est-il pass?? ?",
        "M??me si maman m'a dit de ne pas jouer pendant la catastrophe, je suis sorti jouer avec mon avion super puissant ! Mais je l'ai fait tomber et le vent a emport?? les pi??ces...",
        "Oh non ! Tu aurais d?? l'??couter ! Je vais essayer de les retrouver et le r??parer pour toi !",
        "Merci beaucoup monsieur le p??cheur !"
      ],
      //* 5
      //* Dialogue entre le p??cheur et l'enfant
      //* Apr??s le jeu
      [
        "Et voil?? pour toi jeune homme ! D??sormais, ton avion est comme neuf !",
        "Ouaaah ! Trop bien ! Monsieur, vous ??tes un super-h??ros !",
        "Oh ne t'inqui??te pas ! ??a ne me pose aucun probl??me ! Tu sais, toi aussi tu peux devenir un super-h??ros !",
        "Ah bon ? Comment ?",
        "Depuis la catastrophe, les habitants du village ont besoin d'aide. Rends leur service avec tes super-pouvoirs !",
        "Tr??s bien chef ! J'accepte cette mission ! Au revoir !"
      ],
      //* 6
      //* Dialogue entre l'enfant et le jardinier
      //* Avant le jeu
      [
        "Bonjour monsieur le jardinier ! Est-ce que je peux vous aider ?",
        "Bonjour petit. Justement, j'ai un probl??me...",
        "Que se passe t-il ?",
        "Le maire m'a demand?? de planter des fleurs dans le village pour redonner le sourire aux habitants, mais je n'arrive pas ?? le faire...",
        "Ah bon ? Pourquoi ?",
        "J'ai oubli?? de prendre mes lunettes ce matin et je n'arrive plus ?? savoir quelles graines je dois planter pour avoir les bonnes fleurs...",
        "Laissez-moi vous aider avec ma vue de super-h??ros ! Je vais retrouver les bons sachets de graines pour vous monsieur !",
        "Merci petit, c'est gentil de vouloir m'aider !"
      ],
      //* 7
      //* Dialogue entre l'enfant et le jardinier
      //* Apr??s le jeu
      [
        "Voil?? monsieur ! Les bonnes graines sont celles-ci !",
        "Oh parfait ! Merci beaucoup petit ! Notre village sera bien plus beau gr??ce ?? toi !",
        "De rien monsieur ! C'est mon r??le de super-h??ros d'aider les gens !",
        "Tes parents peuvent ??tre fiers de toi ! Continue comme ??a !",
        "Merci monsieur ! Au revoir !"
      ],
      //* 8
      //* Dialogue le jardinier et le facteur
      //* Avant le jeu
      [
        "Bonjour monsieur le facteur ! Vous avez l'air paniqu?? ! Tout va bien ? ",
        "Oh euh bonjour ! ??a ne va pas du tout ! J'ai un tr??s gros probl??me !",
        "Que se passe t-il ?",
        "Je viens de me rendre compte qu'il me restait une lettre ?? d??poser avant de finir ma journ??e et mais celle-ci a ??t?? ab??m??e ?? cause de la pluie et l'adresse est illisible !",
        "Oh mince ! Et vous ne savez pas ?? qui elle est destin??e ?",
        "Non pas du tout ! Je ne connais personne ici ! En plus d'apr??s le timbre, la lettre ?? l'air tr??s importante !",
        "Qui est l'exp??diteur de la lettre ?",
        "Je ne sais pas vraiment... Mais on peut voir sur l'enveloppe le symbole du village !",
        "Je pense savoir qui est le destinataire ! Suivez-moi, je vais vous montrer o?? le trouver !",
        "Vraiment ? Merci beaucoup !"
      ],
      //* 9
      //* Dialogue le jardinier et le facteur
      //* Apr??s le jeu
      [
        "Voil?? ! La lettre est tr??s probablement destin??e ?? la mairie de ce village !",
        "Mais bien s??r ! Voil?? pourquoi on pouvait voir le symbole du village sur l'enveloppe ! Je vais le lui transmettre imm??diatement ! Merci beaucoup monsieur !",
        "Je vous en prie ! J'esp??re que le message de cette lettre est une bonne nouvelle !"
      ],
      //* 10
      //* Message de fin
      [
        "Le facteur tend la lettre au maire qui la prend.",
        "En voyant le nom de l'exp??diteur, il ouvre tout de suite la lettre et demande aux villageois de se rapprocher.",
        "La ville d'?? c??t?? a observ?? la bienveillance du village et ?? d??cid?? d'apporter ??galement son aide !",
        "Nos villageois n'auront plus jamais ?? se soucier du passage de la catastrophe !"
      ]
    ]

    game.controls = ['Q','D','E']

    //* Vitesse du personnage jou??
    game.speed = 10
  }

  showLoadingText() {
    let i = 0
    this.loadingText1 = this.add.text(config.width*.5, config.height*.5, "Chargement.", {fontFamily: 'Normal', fontSize: '4em', color:'black'}).setOrigin(0.5, 0.5)
    this.loadingText2 = this.add.text(config.width*.5, config.height*.5, "Chargement..", {fontFamily: 'Normal', fontSize: '4em', color:'black'}).setOrigin(0.5, 0.5)
    this.loadingText3 = this.add.text(config.width*.5, config.height*.5, "Chargement...", {fontFamily: 'Normal', fontSize: '4em', color:'black'}).setOrigin(0.5, 0.5)

    this.loadingText1.visible = true
    this.loadingText2.visible = false
    this.loadingText3.visible = false

    setInterval(function () {
      i++
      switch (i) {
        case 1:
          this.game.scene.scenes[0].loadingText1.visible = true
          this.game.scene.scenes[0].loadingText2.visible = false
          this.game.scene.scenes[0].loadingText3.visible = false
          break
        case 2:
          this.game.scene.scenes[0].loadingText1.visible = false
          this.game.scene.scenes[0].loadingText2.visible = true
          this.game.scene.scenes[0].loadingText3.visible = false
          break
        case 3:
          this.game.scene.scenes[0].loadingText1.visible = false
          this.game.scene.scenes[0].loadingText2.visible = false
          this.game.scene.scenes[0].loadingText3.visible = true
          break
        default: i = 0
      }
    }, 500)
  }

  create() {    
    game.scene.stop('loading')
    game.scene.start('music')
    game.scene.start('menu')
  }
}