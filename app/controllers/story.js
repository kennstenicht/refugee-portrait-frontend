import Ember from 'ember';

const {
  Controller,
  on,
  run: {
    bind
  }
} = Ember;

export default Controller.extend({
  // Variables
  mapSettings: {
    style: "assets/map-styles/default.json",
    lat: 4.68,
    lng: 8.43,
    zoom: 4.2,
    bearing: 0,
    interactive: true,
    maxBounds: [
      [45.156351889056566, 57.5384830127297],
      [-28.296351889056666,28.179171973745554]
    ]
  },

  overviewSettings: {
    style: "mapbox://styles/kennstenicht/cik439q7u00349um68mwlzn5r",
    lat: 47.221190,
    lng: 8.621094,
    zoom: 2.5,
    bearing: 0
  },

  // Targeting Service
  targeting: Ember.inject.service('targeting'),

  listen: on('init', function() {
    this.get('targeting').on('newChapter', this, 'setChapter');
  }),

  setChapter: function (chapter) {
    if(chapter) {
      this.transitionToRoute('chapter', chapter);
    } else {
      this.transitionToRoute('story', this.get('model'));
    }
  }
});
