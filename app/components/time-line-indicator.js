import Ember from 'ember';
import MathHelper from '../mixins/math-helper';
import moment from 'moment';


const {
  Component,
  computed,
  inject
} = Ember;

export default Component.extend(MathHelper, {
  classNames: ['time-line-indicator'],
  classNameBindings: ['modifierVisible'],
  attributeBindings: ['style'],

  // BEM Modifier
  modifierVisible: computed('indicator', function () {
    if (this.get('indicator')) {
      return 'time-line-indicator--visible';
    }
  }),

  // Attributes
  style: computed('indicator', 'transitionSpeed', function () {
    let position = this.scale(
      this.get('indicator.unixDate'),
      moment(this.get('indicator.story.start')).format('X'),
      moment(this.get('indicator.story.end')).format('X'),
      0,
      100
    );

    return 'transition-duration: ' + this.get('transitionSpeed') + 'ms; left: ' + position + '%';
  }),

  // Targeting Service
  targeting: inject.service('targeting'),

  // Computed Properties
  indicator: computed('targeting.currentPreview', 'targeting.currentChapter', function () {
    if(this.get('targeting.currentPreview')) {
      return this.get('targeting.currentPreview');
    } else if(this.get('targeting.currentChapter')) {
      return this.get('targeting.currentChapter');
    }
  }),

  transitionSpeed: computed('targeting.currentPreview', 'targeting.currentChapter', function () {
    if(this.get('targeting.currentPreview')) {
      return 300;
    } else if(this.get('targeting.currentChapter')) {
      return this.get('targeting.transitionSpeed');
    }
  })
});
