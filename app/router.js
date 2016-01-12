import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('overview', { path: '/' });
  this.resource('story', { path: 'story/:story_id' }, function() {
    this.resource('chapter', { path: 'chapter/:chapter_id' });
  });
});

export default Router;
