define(["jquery", "underscore", "app/main", "app/common", "easel"], function($,_,main,common) {
  return function() {
    var stage = new createjs.Stage("gameCanvas");
    this.stage = stage;
    
    var block = new createjs.Shape();
    block.graphics.beginFill("blue").rect(-20, -20, 40, 40);
    block.cache(-20,-20,40,40);
    block.x = 200; block.y = 200;
    stage.addChild(block);
    
    var keymaps = new Array();
    var dx = 0, dy = 0;
    var pressed = {};
    
    keymaps[87] = keymaps[38] = "up";
    keymaps[65] = keymaps[37] = "left";
    keymaps[83] = keymaps[40] = "down";
    keymaps[68] = keymaps[39] = "right";
    
    // This should eventually be moved to common
    this.onkeydown = function(e) {
      switch (e.which) {
      case 27:
        main.quit();
        break;
      }
      if (keymaps[e.which]) {
        var cmp = keymaps[e.which];
        pressed[cmp] = true;
        
        if (cmp === "up") {
          dy = -1; // Note these are switched for now
        } else if (cmp === "down") {
          dy = 1;
        } else if (cmp === "left") {
          dx = -1;
        } else if (cmp === "right") {
          dx = 1;
        }
      }
    }
    this.onkeyup = function(e) {
      if (keymaps[e.which]) {
        var cmp = keymaps[e.which];
        pressed[cmp] = false;
        
        if (cmp === "up") {
          dy = pressed["down"] ? 1 : 0; // Note these are switched for now
        } else if (cmp === "down") {
          dy = pressed["up"] ? -1 : 0;
        } else if (cmp === "left") {
          dx = pressed["right"] ? 1 : 0;
        } else if (cmp === "right") {
          dx = pressed["left"] ? -1 : 0;
        }
      }
    }
    
    var v = 400;
    
    this.tick = function(event) {
      var dt = (event.delta)/1000;
      
      var diagFactor = (dx*dx+dy*dy > 1) ? Math.sqrt(2) : 1;
      
      block.x = block.x + (v * dx / diagFactor) * dt;
      block.y = block.y + (v * dy / diagFactor) * dt;
      
      if (block.x < 20) {
        block.x += v / diagFactor * dt;
      } else if (block.x > 540-20) {
        block.x -= v / diagFactor * dt;
      }
      if (block.y < 20) {
        block.y += v / diagFactor * dt;
      } else if (block.y > 420-20) {
        block.y -= v / diagFactor * dt;
      }
      
      stage.update(event);
    }
  };
});
