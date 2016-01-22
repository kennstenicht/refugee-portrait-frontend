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
    lat: 44.68,
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
    style: "assets/map-styles/default.json",
    lat: 44.68,
    lng: 8.43,
    zoom: 9,
    bearing: 0,
    interactive: false,
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
