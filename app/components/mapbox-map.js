import Ember from 'ember';
import MapboxGl from 'ember-cli-mapbox-gl/mixins/mapbox-gl';

const {
  Component,
  run: {
    bind
  },
  inject
} = Ember;

export default Component.extend(MapboxGl, {
  classNames: ['mapbox-map'],

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

  // Targeting Service
  targeting: inject.service('targeting'),

  didInsertElement: function () {
    this.get('targeting').set('map', this.get('map'));

    this.get('map').on('zoom', bind(this, this.checkFeatures));
    this.get('map').on('move', bind(this, this.checkFeatures));
  },

  checkFeatures: function () {
    if( this.get('map').getZoom() < 4.3) {
      this.get('targeting').set('overview', true);
    } else {
      this.get('targeting').set('overview', false);
    }

    this.get('map').featuresIn({layer: 'route_chapters'}, bind(this, function (err, features) {
      this.get('targeting').set('route_chapters', features);
    }));
  },
  end: function () {
    console.log('end');
  },

  actions: {
    addSourceAndLayer: function (id, source, layer) {
      this.get('map').on('style.load', bind(this, function () {
        this.get('map').addSource(id, source);
        this.get('map').addLayer(layer);
      }));
    }
  }
});
