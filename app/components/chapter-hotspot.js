import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component
} = Ember;

export default Component.extend(Gestures, animationIf, {
  classNames: ['chapter-hotspot'],

  gestures: ['press'],

  recognizers: {
    pan: {direction: Hammer.DIRECTION_HORIZONTAL}
  }
});
