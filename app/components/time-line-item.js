import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';
import MathHelper from '../mixins/math-helper';

const {
  Component,
  inject,
  observer
} = Ember;

export default Component.extend(MathHelper, Gestures, {
  classNames: ['time-line-item'],

  gestures: ['tap'],

  recognizers: {
    tap: {threshold: 10},
  },

  targeting: inject.service('targeting'),

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

  tap: function () {
    this.get('targeting').setChapter(this.get('chapter'));
  }
});
