import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';
import animationIf from '../mixins/animation-if';

const {
  Component
} = Ember;

export default Component.extend(Gestures, animationIf, {
  classNames: ['chapter-content'],

  gestures: ['swipe', 'swipedown'],

  recognizers: {
    swipe: {direction: Hammer.DIRECTION_VERTICAL}
  },

  swipedown: function () {
    this.sendAction('closeChapter');
  }
});
