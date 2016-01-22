import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component,
  computed,
  $,
  run: {
    bind
  }
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
  gestures: ['pan'],

  recognizers: {
    pan: {direction: Hammer.DIRECTION_HORIZONTAL}
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

  pan: function () {
    this.get('targeting').backToStory();
  }
});
