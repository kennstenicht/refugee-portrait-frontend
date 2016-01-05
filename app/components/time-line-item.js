import Ember from 'ember';
import MathHelper from '../mixins/math-helper';

const {
  Component,
  observer
} = Ember;

export default Component.extend(MathHelper, {
  classNames: ['time-line-item'],

  targeting: Ember.inject.service('targeting'),

  setPosition: observer('chapter.date', function () {
    let story = this.get('chapter.story');

    let position = this.scale(
      this.get('chapter.date'),
      story.get('start'),
      story.get('end'),
      0,
      100
    );

    this.$().css({
      left: position + "%"
    });
  }),

  click: function () {
    this.get('targeting').setTarget(this.get('chapter'));
  }
});
