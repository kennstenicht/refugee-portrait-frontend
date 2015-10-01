import Ember from 'ember';

const {
  Controller
} = Ember;

export default Controller.extend({
  activeObjects: [],
  target: null,
  isItem: false,

  actions: {
    setTarget: function(target) {
      this.set('target', target);
    }
  }
});