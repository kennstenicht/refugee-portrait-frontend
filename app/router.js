import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('story', { path: 'story/:story_id' }, function() {
    this.resource('chapter', { path: 'chapter/:chapter_id' });
  });
});

export default Router;
