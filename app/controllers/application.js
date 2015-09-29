import Ember from 'ember';

const {
  Controller
} = Ember;

export default Controller.extend({
  activeObjects: [],
  target: null,

  actions: {
    setTarget: function(target) {
      this.set('target', target);
    }
  }
});