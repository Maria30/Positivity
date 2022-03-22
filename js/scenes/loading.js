class Loading extends Phaser.Scene {
  constructor() {
    super("loading")
  }

  preload() {
    this.showLoadingText()

    this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true)
    
    //* Menu 
    this.load.image("title","./assets/img/title.png")
    this.load.image("background","./assets/img/background.jpg")
    this.load.image("musicOn","./assets/img/musicOn.png")
    this.load.image("musicOff","./assets/img/musicOff.png")

    //* Audio
    this.load.audio('music', './assets/audio/main_theme.wav')
    this.load.audio('getObject', './assets/audio/get.wav')
    this.load.audio('hoverBtn', './assets/audio/hover.wav')
    this.load.audio('click', './assets/audio/click.wav')
    this.load.audio('winGame', './assets/audio/win.wav')
    this.load.audio('planeFixed', './assets/audio/planeFixed.wav')

    //* Marche
    this.load.image("mailbox","./assets/img/mailbox.png")
    this.load.image("village","./assets/img/village.jpg")
    this.load.image("foreground","./assets/img/foreground.png")

    //* Personnages
    this.load.image("mayor","./assets/img/characterGrey/mayor.png")
    this.load.image("mayorHappy","./assets/img/characterColor/mayorHappy.png")
  
    this.load.image("masonGrey","./assets/img/characterGrey/masonGrey.png")
    this.load.image("mason","./assets/img/characterColor/mason.png")

    this.load.image("kidGrey","./assets/img/characterGrey/kidGrey.png")
    this.load.image("kid","./assets/img/characterColor/kid.png")

    this.load.image("fishermanGrey","./assets/img/characterGrey/fishermanGrey.png")
    this.load.image("fisherman","./assets/img/characterColor/fisherman.png")

    this.load.image("postmanGrey","./assets/img/characterGrey/postmanGrey.png")
    this.load.image("postman","./assets/img/characterColor/postman.png")

    this.load.image("gardenerGrey","./assets/img/characterGrey/gardenerGrey.png")
    this.load.image("gardener","./assets/img/characterColor/gardener.png")

    //* Jeu n°1
    this.load.image("wood","./assets/img/wood.png")
    this.load.image("pencil","./assets/img/pencil.png")

    //* Jeu n°2
    this.load.image("rod","./assets/img/rod.png")
    this.load.image("rodIcon","./assets/img/rodIcon.png")

    //* Jeu n°3
    this.load.image("part1","./assets/img/part1.png")
    this.load.image("part2","./assets/img/part2.png")
    this.load.image("part3","./assets/img/part3.png")
    this.load.image("partIcon1","./assets/img/partIcon1.png")
    this.load.image("partIcon2","./assets/img/partIcon2.png")
    this.load.image("partIcon3","./assets/img/partIcon3.png")
    this.load.image("planeIcon","./assets/img/planeIcon.png")

    //* Jeu n°4
    this.load.image("rose","./assets/img/flowers/rose.png")
    this.load.image("tulip","./assets/img/flowers/tulip.png")
    this.load.image("daisy","./assets/img/flowers/daisy.png")
    this.load.image("sunflower","./assets/img/flowers/sunflower.png")
    this.load.image("orchid","./assets/img/flowers/orchid.png")
    this.load.image("lily","./assets/img/flowers/lily.png")
    this.load.image("pansy","./assets/img/flowers/pansy.png")

    this.load.image("shovel","./assets/img/shovel.png")
  
    //* Remerciements  
    this.load.image("instagram","./assets/img/instagram.png")
    this.load.image("forms","./assets/img/forms.png")

    //* Dialogues
    game.textArray = [
      //* 0
      //* Dialogue entre le maire et le maçon
      //* Avant le jeu
      [      
        "Bonjour cher maçon ! Comment allez-vous aujourd'hui ?",
        "Ça pourrait aller mieux...",
        "Je suis navré d'entendre cela. Que se passe-t-il ?",
        "Depuis la catastrophe, beaucoup de gens me demandent de réparer leurs maisons. Cependant, je n'ai pas assez de béton...",
        "Vous ne pouvez pas en commander davantage ?",
        "Je peux... mais je n'y arrive pas...",
        "Comment ça ?",
        "Les mathématiques ne sont pas ma spécialité et je n'arrive pas à savoir combien de béton il faut pour chaque maison...",
        "Oh ça ne me pose aucun problème ! Laissez-moi vous aider !",
        "Vraiment ? Merci beaucoup !"
      ],
      //* 1
      //* Dialogue entre le maire et le maçon
      //* Après le jeu
      [      
        "Vous avez réussi ! Merci beaucoup ! Je vais désormais pouvoir réparer les maisons du village tout entier !",
        "Je vous en prie ! Ça me fait plaisir d'aider.",
        "Je vous admire ! J'aimerais aussi aider les autres.",
        "Alors allez-y ! N'hésitez pas à discuter avec les habitants du village !",
        "Vous avez raison ! Passez une bonne journée Monsieur le Maire ! Et merci encore pour votre aide !",
      ],
      //* 2
      //* Dialogue entre le maçon et le pêcheur
      //* Avant le jeu
      [
        "Bonjour monsieur le pêcheur ! Ça ne va pas ? Vous avez une petite mine aujourd’hui !",
        "En effet… Cela fait des heures entières que je cherche ma canne à pêche...",
        "Où l'avez-vous vu pour la dernière fois ?",
        "Je suis allé pêcher ce matin à l'extérieur du village et quand je suis rentré dans ma cabane, je ne l'avais plus !",
        "Je vais vous aider à la chercher !",
        "Oh ! C'est gentil de votre part ! Merci !"
      ],
      //* 3
      //* Dialogue entre le maçon et le pêcheur
      //* Après le jeu
      [
        "Voici votre canne à pêche !",
        "Oh merci beaucoup ! Où l'avez-vous trouvée ?",
        "Elle se trouvait juste à côté de l'étang ! Vous avez sûrement dû oublier de la prendre au retour !",
        "Que suis-je bête ! Pour vous remercier, je vais pêcher le poisson le beau, le plus frais et le plus gros que vous ayez jamais vu !",
        "Merci de votre générosité ! Passez une bonne journée !"
      ],
      //* 4
      //* Dialogue entre le pêcheur et l'enfant
      //* Avant le jeu
      [
        "*Sniff sniff*",
        "Bonjour jeune homme ! Pourquoi pleures-tu ?",
        "Bonjour monsieur le pêcheur... J'ai cassé mon jouet préféré en jouant avec... *sniff*",
        "Ah bon ? Que s'est-il passé ?",
        "Même si maman m'a dit de ne pas jouer pendant la catastrophe, je suis sorti jouer avec mon avion super puissant ! Mais je l'ai fait tomber et le vent a emporté les pièces...",
        "Oh non ! Tu aurais dû l'écouter ! Je vais essayer de les retrouver et le réparer pour toi !",
        "Merci beaucoup monsieur le pêcheur !"
      ],
      //* 5
      //* Dialogue entre le pêcheur et l'enfant
      //* Après le jeu
      [
        "Et voilà pour toi jeune homme ! Désormais, ton avion est comme neuf !",
        "Ouaaah ! Trop bien ! Monsieur, vous êtes un super-héros !",
        "Oh ne t'inquiète pas ! Ça ne me pose aucun problème ! Tu sais, toi aussi tu peux devenir un super-héros !",
        "Ah bon ? Comment ?",
        "Depuis la catastrophe, les habitants du village ont besoin d'aide. Rends leur service avec tes super-pouvoirs !",
        "Très bien chef ! J'accepte cette mission ! Au revoir !"
      ],
      //* 6
      //* Dialogue entre l'enfant et le jardinier
      //* Avant le jeu
      [
        "Bonjour monsieur le jardinier ! Est-ce que je peux vous aider ?",
        "Bonjour petit. Justement, j'ai un problème...",
        "Que se passe t-il ?",
        "Le maire m'a demandé de planter des fleurs dans le village pour redonner le sourire aux habitants, mais je n'arrive pas à le faire...",
        "Ah bon ? Pourquoi ?",
        "J'ai oublié de prendre mes lunettes ce matin et je n'arrive plus à savoir quelles graines je dois planter pour avoir les bonnes fleurs...",
        "Laissez-moi vous aider avec ma vue de super-héros ! Je vais retrouver les bons sachets de graines pour vous monsieur !",
        "Merci petit, c'est gentil de vouloir m'aider !"
      ],
      //* 7
      //* Dialogue entre l'enfant et le jardinier
      //* Après le jeu
      [
        "Voilà monsieur ! Les bonnes graines sont celles-ci !",
        "Oh parfait ! Merci beaucoup petit ! Notre village sera bien plus beau grâce à toi !",
        "De rien monsieur ! C'est mon rôle de super-héros d'aider les gens !",
        "Tes parents peuvent être fiers de toi ! Continue comme ça !",
        "Merci monsieur ! Au revoir !"
      ],
      //* 8
      //* Dialogue le jardinier et le facteur
      //* Avant le jeu
      [
        "Bonjour monsieur le facteur ! Vous avez l'air paniqué ! Tout va bien ? ",
        "Oh euh bonjour ! Ça ne va pas du tout ! J'ai un très gros problème !",
        "Que se passe t-il ?",
        "Je viens de me rendre compte qu'il me restait une lettre à déposer avant de finir ma journée et mais celle-ci a été abîmée à cause de la pluie et l'adresse est illisible !",
        "Oh mince ! Et vous ne savez pas à qui elle est destinée ?",
        "Non pas du tout ! Je ne connais personne ici ! En plus d'après le timbre, la lettre à l'air très importante !",
        "Qui est l'expéditeur de la lettre ?",
        "Je ne sais pas vraiment... Mais on peut voir sur l'enveloppe le symbole du village !",
        "Je pense savoir qui est le destinataire ! Suivez-moi, je vais vous montrer où le trouver !",
        "Vraiment ? Merci beaucoup !"
      ],
      //* 9
      //* Dialogue le jardinier et le facteur
      //* Après le jeu
      [
        "Voilà ! La lettre est très probablement destinée à la mairie de ce village !",
        "Mais bien sûr ! Voilà pourquoi on pouvait voir le symbole du village sur l'enveloppe ! Je vais le lui transmettre immédiatement ! Merci beaucoup monsieur !",
        "Je vous en prie ! J'espère que le message de cette lettre est une bonne nouvelle !"
      ]
    ]

    game.controls = ["Q","D","E"]

    //* Vitesse du personnage joué
    game.speed = 10
  }

  showLoadingText() {
    let i = 0
    this.loadingText1 = this.add.text(config.width*.5, config.height*.5, "Chargement.", {fontFamily: 'Normal', fontSize: '4em', color:"black"}).setOrigin(0.5, 0.5)
    this.loadingText2 = this.add.text(config.width*.5, config.height*.5, "Chargement..", {fontFamily: 'Normal', fontSize: '4em', color:"black"}).setOrigin(0.5, 0.5)
    this.loadingText3 = this.add.text(config.width*.5, config.height*.5, "Chargement...", {fontFamily: 'Normal', fontSize: '4em', color:"black"}).setOrigin(0.5, 0.5)

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
    game.scene.stop("loading")
    game.scene.start("music")
    game.scene.start("gameThree")
  }
}