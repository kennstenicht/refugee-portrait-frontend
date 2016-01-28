import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';


const {
  Component,
  computed
} = Ember;

export default Component.extend(Gestures, {
  classNames: ['chapter-navigation'],
  classNameBindings: ['modifierDirection', 'modifierVisible'],

  // BEM Modifier
  modifierDirection: computed('direction', function () {
    return 'chapter-navigation--' + this.get('direction');
  }),

  modifierVisible: computed('targeting.isVisible', function () {
    return this.get('targeting.isVisible') ? 'chapter-navigation--visible' : 'chapter-navigation--hidden';
  }),

  // Gesture Settings
  gestures: ['tap', 'pan'],

  recognizers: {
    tap: {threshold: 20},
    pan: {direction: Hammer.DIRECTION_HORIZONTAL}
  },

  // Targeting Service
  targeting: Ember.inject.service('targeting'),

  tap: function (e) {
    e.stopPropagation();
    this.setChapter();
  },

  pan: function (e) {
    e.stopPropagation();
    this.setChapter();
  },

  setChapter: function () {
    var chapters = this.get('model.story.sortedChapters'),
      direction = (this.get('direction') === 'prev') ? -1 : 1,
      index = chapters.indexOf(this.get('model')),
      newChapter = (index < chapters.get('length') - 1) ? index + direction : 0;

    this.get('targeting').setChapter(chapters.objectAt(newChapter));
  }
});
