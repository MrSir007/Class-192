// Registering component in Collider.js
AFRAME.registerComponent("flying-birds", {
  init: function () {
    for (var i = 1; i <= 20; i++) {
      //id
      var id = `hurdle${i}`;

      //position variables
      var posX = Math.random() * 1000 + -600;
      var posY = Math.random() * 2 + -3;
      var posZ = Math.random() * 1000 + -600;

      var position = { x: posX, y: posY, z: posZ };
      var speed = Math.random(20,50)

      //call the function
      this.flyingBirds(id, position,speed);
    }
  },
  flyingBirds: (id, position, speed) => {
    //Get the terrain element
    var backgroundEl = document.querySelector("#scene");

    //creating the bird model entity
    var birdEl = document.createElement("a-entity");

    //Setting multiple attributes
    birdEl.setAttribute("id", id);

    birdEl.setAttribute("position", position);
    birdEl.setAttribute("scale", { x: 500, y: 500, z: 500 });

    //set the gLTF model attribute
    birdEl.setAttribute("gltf-model", "./assets/models/flying_bird/scene.gltf");

    //set animation mixer of models with animation
    birdEl.setAttribute("animation-mixer", {});

    //set the static body of the physic system
    birdEl.setAttribute("static-body", {
      shape: "sphere",
      sphereRadius: 3.2,
    });

    //set the bird to move
    var camera = document.querySelector("#camera").object3D;

    var direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    

    birdEl.setAttribute("velocity", direction.multiplyScalar(speed));

    //set the game play attribute
    birdEl.setAttribute("game-play", {
      birdId: `#${id}`,
    });

    //append the bird entity as the child of the terrain entity
    backgroundEl.appendChild(birdEl);
  },
});
