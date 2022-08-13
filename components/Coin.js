AFRAME.registerComponent("target-coins", {
  init: function () {
    for (var i = 1; i <= 20; i++) {
      //id
      var id = `coin${i}`;

      //position variables
      var posX = Math.random() * 1000 + -600;
      var posY = Math.random() * 2 + -3;
      var posZ = Math.random() * 1000 + -600;

      var rotX = 0
      var rotY = Math.random() * 0 + 180
      var rotZ = 0

      var position = { x: posX, y: posY, z: posZ };
      var rotation = { x: rotX, y: rotY, z: rotZ };

      //call the function
      this.createCoins(id, position, rotation);
    }
  },

  createCoins: function (id, position, rotation) {
    var backgroundEl = document.querySelector("#scene");
    var coinEl = document.createElement("a-entity");
    coinEl.setAttribute("id", id);
    coinEl.setAttribute("gltf-model", "./assets/models/coin/scene.gltf")
    coinEl.setAttribute("scale", { x: 0.4, y: 0.4, z: 0.4 })
    coinEl.setAttribute("rotation", rotation)
    coinEl.setAttribute("position", position)

    var camera = document.querySelector("#camera").object3D;

    var direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    coinEl.setAttribute("velocity", direction.multiplyScalar(20));

    coinEl.setAttribute("game-play", {
      coinId: `#${id}`,
    });

    backgroundEl.appendChild(coinEl);
  },
});
