//Win condition
Events.on(engine, 'collisionStart', event => {
  event.pairs.forEach(collision => {
    const labels = ['ball', 'goal'];
    //condition for checking if ball collide to square box then we fall down all the
    // maze walls and ball gravity will no longer to static
    if (
      labels.includes(collision.bodyA.label) &&
      labels.includes(collision.bodyB.label)
    ) {
      document.querySelector('.winner').classList.remove('hidden');
      world.gravity.y = 1;
      world.bodies.forEach(body => {
        if (body.label === 'wall') {
          Body.setStatic(body, false); //ball gravity will no longer to static
        }
      });
    }
  });
});
