define(["jquery", "underscore", "easel"], function($,_) {
  return new Game();
  
  function Game() {
    var stage = new createjs.Stage("gameCanvas"),
        text = new createjs.Text("MIT the Game V2\n\n'q' for bouncing ball\n'w' for hero block\nescape to quit", "20px Arial", "#000000"),
        game = {};
    this.stage = stage;
    text.x = 100; text.y = 100;
    stage.addChild(text);
    
    this.stage = new createjs.Stage("gameCanvas");
    
    function start(gameName) {
      require(["app/" + gameName], function(Game) {
        game = new Game();
        bindhandlers(game);
      });
    }
    this.quit = function() {
      game.stage.removeAllChildren();
      game.stage.removeAllEventListeners();
      bindhandlers(this);
    };
    
    this.onkeydown = function(e) {
      switch (e.which) {
      case 'q':
        start("bouncingball");
        break;
      case 'w':
        start("heroblock");
        break;
      }
    };
    this.tick = function(event) {
      var dt = (event.delta)/1000;
      stage.update(event);
    };
    
    var oldhandlers = {};
    function bindhandlers(obj) {
      createjs.Ticker.removeEventListener("tick", oldhandlers.tick);
      $(document).off('keyup', oldhandlers.onkeyup);
      $(document).off('keydown', oldhandlers.onkeydown);
      $(document).on('keyup', obj.onkeyup);
      $(document).on('keydown', obj.onkeydown);
      createjs.Ticker.addEventListener("tick", obj.tick);
      oldhandlers = obj;
    }
    bindhandlers(this);
    
    createjs.Ticker.setFPS(60);
  }
});
