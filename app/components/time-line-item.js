import Ember from 'ember';

const {
  Component,
  observer
} = Ember;

export default Component.extend({
  classNames: ['time-line-item'],

  setPosition: observer('chapter.date', function () {
    let story = this.get('chapter.story'),
      start = story.get('start'),
      end = story.get('end'),
      date = this.get('chapter.date');

    let position = this.scale(date, start, end, 0, 1);
    console.log(position);
    this.$().css({
      left: window.innerWidth * position
    });
  }),

  scale: function(val, min, max, rangeMin, rangeMax) {
    return ((val - min) / (max - min)) * (rangeMax - rangeMin) + rangeMin;
  }
});
