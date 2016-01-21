import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';


const {
  Component,
  computed
} = Ember;

export default Component.extend(Gestures, {
  classNames: ['chapter-navigation'],
  classNameBindings: ['modifierDirection'],

  // BEM Modifier
  modifierDirection: computed('direction', function () {
    return 'chapter-navigation--' + this.get('direction');
  }),

  // Gesture Settings
  gestures: ['tap'],

  // Targeting Service
  targeting: Ember.inject.service('targeting'),

  tap: function () {
    var chapters = this.get('model.story.sortedChapters'),
      direction = (this.get('direction') === 'prev') ? -1 : 1,
      index = chapters.indexOf(this.get('model')),
      newChapter = (index < chapters.get('length') - 1) ? index + direction : 0;

    this.get('targeting').setChapter(chapters.objectAt(newChapter));
  }
});
