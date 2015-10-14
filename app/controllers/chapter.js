import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    closeChapter: function () {
      this.transitionToRoute('story', this.get('model.story'));
    }
  }
});
