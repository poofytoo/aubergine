define(["jquery", "underscore", "app/main", "app/common", "easel"], function($,_,main,common) {
  return function() {
    var stage = new createjs.Stage("gameCanvas");
    this.stage = stage;
    
    var ball = new createjs.Shape();
    ball.graphics.beginFill("red").drawCircle(0, 0, 32);
    ball.cache(-32,-32,64,64);
    ball.x = 200; ball.y = 200;
    stage.addChild(ball);
    
    this.onkeydown = function(e) {
      switch (e.which) {
      case 27:
        main.quit();
        break;
      }
    }
    
    var vX = 200; var vY = 200;
    this.tick = function(event) {
      var dt = (event.delta)/1000;
      
      ball.x += dt * vX;
      ball.y += dt * vY;
      
      if (ball.x < 32) {
        vX = 200;
      } else if (ball.x > 540-32) {
        vX = -200;
      }
      if (ball.y < 32) {
        vY = 200;
      } else if (ball.y > 420-32) {
        vY = -200;
      }
      
      stage.update(event);
    }
  };
});
