import Ember from 'ember';

const {
  Component,
  computed,
  inject
} = Ember;

export default Component.extend({
  classNames: ['story-content'],
  classNameBindings: ['modifierOverview'],

  // BEM Modifier
  modifierOverview: computed('overview', function () {
    if( !this.get('overview') ) {
      return 'story-content--hidden';
    }
  }),

  // Targeting Service
  targeting: inject.service('targeting'),

  overview: computed('targeting.overview', function () {
    return this.get('targeting.overview');
  }),
});
