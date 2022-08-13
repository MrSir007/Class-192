//Terrain Rotation
AFRAME.registerComponent("terrain-movement-reader", {
  schema: {
    speedOfRotation: { type: "number", default: 0 },
    height: {type: "number", default: 0 }
  },
  init: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "d") {
        if (this.data.speedOfRotation < 0.1) {
          this.data.speedOfRotation += 0.01;
        }
      }
      if (e.key === "a") {
        if (this.data.speedOfRotation > -0.1) {
          this.data.speedOfRotation -= 0.01;
        }
      }
      if (e.key === "w") {
        if (this.data.height < 0.1) {
          this.data.height += 0.01;
        }
      }
      if (e.key === "s") {
        if (this.data.height > -0.1) {
          this.data.height -= 0.01;
        }
      }
    });
  },
  tick: function () {
    var mapRotation = this.el.getAttribute("rotation");
    var mapHeight = this.el.getAttribute("position");

    mapRotation.y += this.data.speedOfRotation;
    mapHeight.y += this.data.height;

    this.el.setAttribute("rotation", {
      x: mapRotation.x,
      y: mapRotation.y,
      z: mapRotation.z,
    });

    this.el.setAttribute("position", {
      x: mapHeight.x,
      y: mapHeight.y,
      z: mapHeight.z,
    });
  },
});