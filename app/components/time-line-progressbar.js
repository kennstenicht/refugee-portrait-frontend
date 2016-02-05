import Ember from 'ember';
import MathHelper from '../mixins/math-helper';
import moment from 'moment';


const {
  Component,
  computed,
  inject
} = Ember;

export default Component.extend(MathHelper, {
  classNames: ['time-line-progressbar'],
  classNameBindings: ['modifierVisible'],
  attributeBindings: ['style'],

  // BEM Modifier
  modifierVisible: computed('targeting.currentChapter', function () {
    if (this.get('targeting.currentChapter')) {
      return 'time-line-progressbar--visible';
    }
  }),

  // Attributes
  style: computed('targeting.currentChapter', 'targeting.transitionSpeed', function () {
    let position = this.scale(
      this.get('targeting.currentChapter.unixDate'),
      moment(this.get('targeting.currentChapter.story.start')).format('X'),
      moment(this.get('targeting.currentChapter.story.end')).format('X'),
      0,
      100
    );

    return new Ember.Handlebars.SafeString('transition-duration: ' + this.get('targeting.transitionSpeed') + 'ms; width: ' + position + '%');
  }),

  // Targeting Service
  targeting: inject.service('targeting'),
});
