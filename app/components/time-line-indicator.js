import Ember from 'ember';

const {
  Component,
  inject
} = Ember;

export default Component.extend({
  className: ['time-line-indicator'],
  classNameBindings: ['modifierVisible'],

  // BEM Modifier
  modifierVisible: computed('targeting.currentPreview', 'targeting.currentChapter', function () {
    if (this.get('targeting.currentChapter') || this.get('targeting.currentPreview')) {
      return 'time-line-indicator--visible';
    }
  }),
  
  // Targeting Service
  targeting: inject.service('targeting'),
});
