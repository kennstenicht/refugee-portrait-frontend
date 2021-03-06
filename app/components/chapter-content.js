import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component,
  computed
} = Ember;

export default Component.extend(Gestures, {
  classNames: ['chapter-content'],
  classNameBindings: ['modifierNumber', 'modifierMood', 'modifierVisible'],

  // BEM modifier
  modifierNumber: computed('model.number', function() {
    return 'chapter-content--' + this.get('model.number');
  }),

  modifierMood: computed('targeting.currentMood', function () {
    if (this.get('targeting.currentMood')) {
      return 'chapter-content--'+this.get('targeting.currentMood');
    }
  }),

  modifierVisible: computed('targeting.isVisible', function () {
    return this.get('targeting.isVisible') ? 'chapter-content--visible' : 'chapter-content--hidden';
  }),

  // Style binding
  backgroundStyle: computed('model.background', function() {
    return new Ember.Handlebars.SafeString("background-image: url(" + this.get('model.background') + ")");
  }),

  // Gesture Settings
  gestures: ['pan', 'panstart'],

  recognizers: {
    pan: {direction: Hammer.DIRECTION_ALL, threshold: 50}
  },

  // Targeting Service
  targeting: Ember.inject.service('targeting'),


  didInsertElement: function () {
    // if no currentChapter is set (load on detail), set route chapter
    if(!this.get('targeting').currentChapter) {
      Ember.run.next(this, function () {
        this.get('targeting').setChapter(this.get('model'));
      });
    }
  },

  panstart: function (e) {
    this.set('closeHintPos', e.gesture.center);
    this.set('closeHint', true);
    Ember.run.later(this, function () {
      if (this.isDestroyed) { return; }
      this.set('closeHint', false);
    }, 4000);
  }
});
