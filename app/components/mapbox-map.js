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

  // Targeting Service
  targeting: inject.service('targeting'),

  didInsertElement: function () {
    this.get('targeting').set(this.get('identifier'), this.get('map'));
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
