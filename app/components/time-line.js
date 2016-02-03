import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';
import MathHelper from '../mixins/math-helper';
import groupBy from 'ember-group-by';
// import Sly from '../mixins/sly';
import moment from 'moment';

const {
  Component,
  computed,
  inject,
  on,
  $
} = Ember;

export default Component.extend(Gestures, MathHelper, {
  classNames: ['time-line'],
  classNameBindings: ['modifierMode', 'modifierMood'],

  // BEM Modifier
  modifierMode: computed('zoom', 'targeting.currentChapter', function () {
    if (this.get('targeting.currentChapter')) {
      return 'time-line--detail';
    } else if (this.get('zoom') === 0) {
      return 'time-line--overview';
    }
  }),

  modifierMood: computed('targeting.currentMood', function () {
    if (this.get('targeting.currentMood')) {
      return 'time-line--'+this.get('targeting.currentMood');
    }
  }),

  // Gesture Settings
  gestures: ['pinch', 'pinchstart', 'pinchmove'],

  recognizers: {
    pinch: {enable: true}
  },

  // Variables
  zoom: 0,
  columns: groupBy('chapters', 'unixDate'),

  // Targeting Service
  targeting: inject.service('targeting'),

  // Computed Properties
  firstChapter: computed('chapters', function () {
    return this.get('chapters').get('firstObject');
  }),

  lastChapter: computed('chapters', function () {
    return this.get('chapters').get('lastObject');
  }),

  days: computed(function () {
    let dateArray = [],
      currentDate = moment(this.get('story.start'));

    while (currentDate <= moment(this.get('story.end'))) {
      dateArray.push(moment(currentDate));
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  })
});
