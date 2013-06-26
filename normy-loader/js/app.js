requirejs.config({
  baseUrl: "js/lib",
  shim: {
    "easel": {
      exports: 'createjs'
    }
  },
  paths: {
    "app": "../app",
    "jquery": "jquery-2.0.2",
    "underscore": "underscore",
    "easel": "easeljs-0.6.1.min"
  }
});

requirejs(["app/main"]);