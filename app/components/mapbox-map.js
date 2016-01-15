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
    style: "assets/map-styles/default.json",
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

  // Sort Chapters
  sortProperties: ['number:asc'],
  sortedChapters: computed.sort('chapters', 'sortProperties'),

  didInsertElement: function () {
    this.get('targeting').set('map', this.get('map'));

    $.getJSON( "assets/map-styles/danger.json", bind(this, function( data ) {
      this.set('danger', data);
    }));

    $.getJSON( "assets/map-styles/neutral.json", bind(this, function( data ) {
      this.set('default', data);
    }));

    Ember.run.next(this, function () {
      this.get('danger.layers').forEach(bind(this, function( item ) {
        let defaultLayer = this.get('default.layers').findBy('id', item.id);
        if(!defaultLayer) {
          console.log("error: "+item);
        } else {
          defaultLayer['paint.danger'] = item.paint;
        }
      }));
      console.log(this.get('default'));
      this.get('map').setStyle(this.get('default'));
    });

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

  actions: {
    addSourceAndLayer: function (id, source, layer) {
      this.get('map').on('style.load', bind(this, function () {
        this.get('map').addSource(id, source);
        this.get('map').addLayer(layer);
      }));
    }
  }
});
