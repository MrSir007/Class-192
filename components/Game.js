AFRAME.registerComponent("game-play", {
  schema: {
    coinId: { type: "string", default: "#coin1" },
    birdId: { type: "string", default: "#bird1" }
  },

  init: function () {
    var duration = 120;
    var timerEl = document.querySelector("#timer");
    this.startTimer(duration, timerEl);
  },

  update: function () {
    this.shootBullets();
  },

  startTimer: function (duration, timerEl) {
    var minutes;
    var seconds;

    setInterval(()=> {
      if (duration >=0) {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);

        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        timerEl.setAttribute("text", {
          value: minutes + ":" + seconds,
        });

        duration -= 1;
      } 
      else {
        this.gameOver();        
      }
    },1000)
  },
  shootBullets: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "q") {
        var bullet = document.createElement("a-entity")

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.25
        })

        bullet.setAttribute("material", "color", "black");

        var initial = document.querySelector("#plane_model");
        var pos = initial.getAttribute("position");

        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y+2.5,
          z: pos.z+5,
        });

        var camera = document.querySelector("#camera").object3D;

        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        bullet.setAttribute("velocity", direction.multiplyScalar(-50));

        var scene = document.querySelector("#scene");

        bullet.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "0",
        });

        bullet.setAttribute("visible", true);

        //add the collide event listener to the bullet
        bullet.addEventListener("collide", this.removeBullet)

        scene.appendChild(bullet)
      }
    })
  },
  updateTargets: function () {
    var element = document.querySelector("#targets");
    var count = element.getAttribute("text").value;
    var currentTargets = parseInt(count);
    currentTargets -= 1;
    element.setAttribute("text", {
      value: currentTargets,
    });
  },
  updateScore: function () {
    var element = document.querySelector("#score");
    var count = element.getAttribute("text").value;
    var currentScore = parseInt(count);
    currentScore += 50;
    element.setAttribute("text", {
      value: currentScore,
    });
  },
  removeBullet: function (e) {
    //bullet element
    var element = e.detail.target.el;

    //element which is hit
    var elementHit = e.detail.body.el;

    if (elementHit.id.includes("coin") || elementHit.id.includes("bird")) {
      console.log("hit")
      elementHit.setAttribute("material", {
        opacity: 0,
        transparent: true,
      });

      //impulse and point vector
      var impulse = new CANNON.Vec3(-2, 2, 1);
      var worldPoint = new CANNON.Vec3().copy(
        elementHit.getAttribute("position")
      );

      elementHit.body.applyImpulse(impulse, worldPoint);

      //remove event listener
      element.removeEventListener("collide", this.removeBullet);

      //remove the bullets from the scene
      var scene = document.querySelector("#scene");
      scene.removeChild(element);
    }
  },
  gameOver: function () {
    var planeEl = document.querySelector("#plane_model");
    var element = document.querySelector("#game_over_text");
    element.setAttribute("visible", true);
    planeEl.setAttribute("dynamic-body", {
      mass: 1
    });
  },
});
  