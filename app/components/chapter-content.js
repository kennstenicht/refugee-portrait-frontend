import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';
import animationIf from '../mixins/animation-if';

const {
  Component,
  computed
} = Ember;

export default Component.extend(Gestures, animationIf, {
  classNames: ['chapter-content'],
  classNameBindings: ['modifierNumber'],

  // BEM modifier
  modifierNumber: computed('model.number', function() {
    return 'chapter-content--' + this.get('model.number');
  }),

  gestures: ['pan', 'panleft', 'press', 'pressup'],

  recognizers: {
    pan: {direction: Hammer.DIRECTION_HORIZONTAL}
  },

  targeting: Ember.inject.service('targeting'),

  didInsertElement: function () {
    Ember.run.next(this, function () {
      this.get('targeting').setChapter(this.get('model'));
    });
  },

  pan: function () {
    this.get('targeting').setChapter('');
  }
});
