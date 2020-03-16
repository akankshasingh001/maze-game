document.addEventListener('keydown', event => {
  const { x, y } = ball.velocity;
  switch (event.keyCode) {
    //w or up arrow
    case 87:
    case 38:
      Body.setVelocity(ball, { x, y: y - 5 });
      break;
    //d or right arrow
    case 68:
    case 39:
      Body.setVelocity(ball, { x: x + 5, y });
      break;
    //s or down arrow
    case 83:
    case 40:
      Body.setVelocity(ball, { x, y: y + 5 });
      break;
    //a or left arrow
    case 65:
    case 37:
      Body.setVelocity(ball, { x: x - 5, y });
      break;
  }
});
