import Ember from 'ember';
import MapboxGl from 'ember-cli-mapbox-gl/mixins/mapbox-gl';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component,
  computed,
  run: {
    bind,
    later
  },
  inject
} = Ember;

export default Component.extend(MapboxGl, Gestures, {
  classNames: ['mapbox-map'],
  classNameBindings: ['modifierVisible', 'modifierIdentifier'],

  modifierVisible: computed('targeting.isVisible', function () {
    if(this.get('targeting.isVisible')) {
      return 'mapbox-map--detail';
    }
  }),

  modifierIdentifier: computed('identifier', function () {
    return 'mapbox-map--' + this.get('identifier');
  }),

  // Targeting Service
  targeting: inject.service('targeting'),

  // Gesture Settings
  gestures: ['tap', 'press', 'pressup'],

  recognizers: {
    tap: {threshold: 20, time: 480},
    press: {threshold: 20},
  },

  didInsertElement: function () {
    this.get('targeting').set(this.get('identifier'), this.get('map'));
    this.get('targeting.map').setClasses(['default']);

    this.get('map').on('moveend', bind(this.get('targeting'), this.get('targeting').moveEnd));
    this.get('map').on('zoom', bind(this.get('targeting'), this.get('targeting').checkFeatures));
    this.get('map').on('move', bind(this.get('targeting'), this.get('targeting').checkFeatures));

  },

  tap: function (e) {
    this.get('targeting').closePreview();
    this.get('targeting').checkFeatureAt([e.gesture.center.x, e.gesture.center.y], 'tap');
  },

  press: function (e) {
    this.get('targeting').checkFeatureAt([e.gesture.center.x, e.gesture.center.y], 'press');
  },

  pressup: function () {
    this.get('targeting').closePreview();
  },

  actions: {
    addSourceAndLayer: function (id, source, layer) {
      this.get('map').on('style.load', bind(this, function () {
        this.get('map').addSource(id, source);
        this.get('map').addLayer(layer);
        later(this, function () {
          this.get('map').panBy([1,0]);
        }, 100);
      }));

    }
  }
});
