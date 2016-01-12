import Ember from 'ember';
import MapboxGl from 'ember-cli-mapbox-gl/mixins/mapbox-gl';

const {
  Component,
  computed,
  on,
  run: {
    bind
  },
  inject
} = Ember;

export default Component.extend(MapboxGl, {
  classNames: ['mapbox-map'],

  mapSettings: {
    style: "mapbox-style.json",
    lat: 46.68,
    lng: 8.43,
    zoom: 3.5,
    bearing: 0,
    interactive: true,
    maxBounds: [
      [-22.654296999999588, 32.68561989981147],
      [40.01171862499879, 57.15411999999989]
    ]
  },

  // Targeting Service
  targeting: inject.service('targeting'),

  listen: on('init', function() {
    this.get('targeting').on('newChapter', this, 'setTarget');
    this.get('targeting').on('closeChapter', this, 'zoomOut');
    this.get('targeting').on('newMood', this, 'setMood');
  }),

  // Sort Chapters
  sortProperties: ['number:desc'],
  sortedChapters: computed.sort('chapters', 'sortProperties'),

  didInsertElement: function () {
    this.get('targeting').set('currentMap', this.get('map'));

    this.get('map').on('zoom', bind(this, this.checkFeatures));
    this.get('map').on('move', bind(this, this.checkFeatures));
  },

  checkFeatures: function () {
    this.get('map').featuresIn({layer: 'chapters'}, function (err, features) {
      features.forEach(function (feature) {
        // get all features in viewport
      })
    });
  },

  setTarget: function (chapter, duration) {
    this.get('map').easeTo({
      center: [chapter.get('lng'), chapter.get('lat')],
      zoom: chapter.get('zoom'),
      bearing: chapter.get('bearing') || 0,
      pitch: chapter.get('pitch') || 0,
      duration: duration
    });
  },

  zoomOut: function (duration) {
    this.get('map').easeTo({
      zoom: this.get('map').getZoom()-4,
      duration: duration
    });
  },

  setMood: function (mood) {
    let classes = (mood === 'default') ? '' : mood;
    this.get('map').setClasses([classes]);
  }
});
