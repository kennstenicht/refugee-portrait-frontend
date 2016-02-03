import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component,
  computed
} = Ember;

export default Component.extend(Gestures, {
  classNames: ['overlay-start'],
  classNameBindings: ['modifierVisble'],

  // BEM Modifier
  modifierVisble: computed('hidden', function () {
    if(this.get('hidden')) {
      return 'overlay-start--hidden';
    }
  }),

  // Gesture Settings
  gestures: ['press'],

  recognizers: {
    press: {theshold: 20}
  },

  // Gestures
  press: function () {
    this.set('hidden', true);
  }
});