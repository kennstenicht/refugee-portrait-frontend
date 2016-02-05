import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  classNames: ['overlay-help'],
  classNameBindings: ['modifierVisble'],

  // Variables
  help: null,

  // BEM Modifier
  modifierVisble: computed('help', function () {
    if(this.get('help')) {
      return 'overlay-help--' + this.get('help');
    }
  }),

  actions: {
    toggleHelp: function () {
      if(this.get('help')) {
        this.set('help', null);
      } else {
        this.set('help', 'overview');
      }
    }
  }
});
