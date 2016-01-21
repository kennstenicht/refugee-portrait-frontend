import Ember from 'ember';

const {
  Mixin
} = Ember;

export default Mixin.create({
  scale: function(val, min, max, rangeMin, rangeMax) {
    val = (val > max) ? max : val;
    return ((val - min) / (max - min)) * (rangeMax - rangeMin) + rangeMin;
  }
});
