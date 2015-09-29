import Ember from 'ember';

const {
  Mixin,
  run,
  run: {
    next,
    later
  }
} = Ember;

export default Mixin.create({
  animationIn: function(prop, speed, delay) {
    delay = delay || 0;
    speed = speed || 300;

    later(this, function() {
      this.set(prop, true);

      next(this, prop + 'In', speed);
    }, delay);

  },

  animationOut: function(prop, speed, delay) {
    delay = delay || 0;
    speed = speed || 300;

    later(this, function() {
      run(this, prop + 'Out', speed);

      later(this, function() {
        this.set(prop, false);
      }, speed);
    }, delay);
  },
});
