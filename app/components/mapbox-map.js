import Ember from 'ember';
import MapboxGl from 'ember-cli-mapbox-gl/mixins/mapbox-gl';

const {
  Component,
  computed,
  run: {
    bind
  },
  inject
} = Ember;

export default Component.extend(MapboxGl, {
  classNames: ['mapbox-map'],
  classNameBindings: ['modifierIdenrifier', 'modifierMode'],

  // BEM Modifier
  modifierIdenrifier: computed('identifier', function () {
    return 'mapbox-map--' + this.get('identifier');
  }),

  modifierMode: computed('targeting.currentChapter', function () {
    if (this.get('targeting.currentChapter')) {
      return 'mapbox-map--detail';
    }
  }),

  // Targeting Service
  targeting: inject.service('targeting'),

  didInsertElement: function () {
    this.get('targeting').set(this.get('identifier'), this.get('map'));

    this.get('map').on('moveend', bind(this.get('targeting'), this.get('targeting').moveEnd));
    this.get('map').on('zoom', bind(this.get('targeting'), this.get('targeting').checkFeatures));
    this.get('map').on('move', bind(this.get('targeting'), this.get('targeting').checkFeatures));
  },

  actions: {
    addSourceAndLayer: function (id, source, layer) {
      this.get('map').on('style.load', bind(this, function () {
        this.get('map').addSource(id, source);
        this.get('map').addLayer(layer);
        Ember.run.next(this, function () {
          this.get('targeting').checkFeatures();
        });
      }));
    }
  }
});
