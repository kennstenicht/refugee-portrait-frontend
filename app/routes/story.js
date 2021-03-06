import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.findRecord('story', params.story_id);
  },
  afterModel: function(model) {
    return model.get('chapters');
  }
});
