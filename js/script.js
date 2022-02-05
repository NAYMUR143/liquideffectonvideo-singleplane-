import {
  Curtains,
  Plane,
  Vec2,
} from "https://cdn.jsdelivr.net/npm/curtainsjs@7.2.0/src/index.mjs";

window.addEventListener("load", () => {
  // Define the mouse position and deltas

  // set up our WebGL context and append the canvas to our wrapper

  // get our plane element

  // create our plane

  // handle the mouse move event
  function handleMovement(e, plane) {
    // update mouse last pos
    mouseLastPosition.copy(mousePosition);

    const mouse = new Vec2();

    // touch event
    if (e.targetTouches) {
      mouse.set(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
    }
    // mouse event
    else {
      mouse.set(e.clientX, e.clientY);
    }

    // lerp the mouse position a bit to smoothen the overall effect
    mousePosition.set(
      curtains.lerp(mousePosition.x, mouse.x, 0.3),
      curtains.lerp(mousePosition.y, mouse.y, 0.3)
    );

    // convert our mouse/touch position to coordinates relative to the vertices of the plane and update our uniform
    plane.uniforms.mousePosition.value =
      plane.mouseToPlaneCoords(mousePosition);

    // calculate the mouse move strength
    if (mouseLastPosition.x && mouseLastPosition.y) {
      let delta =
        Math.sqrt(
          Math.pow(mousePosition.x - mouseLastPosition.x, 2) +
            Math.pow(mousePosition.y - mouseLastPosition.y, 2)
        ) / 30;
      delta = Math.min(4, delta);
      // update max delta only if it increased
      if (delta >= deltas.max) {
        deltas.max = delta;
      }
    }
  }
});
