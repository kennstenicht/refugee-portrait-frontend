import Ember from 'ember';
import MapboxGl from 'ember-cli-mapbox-gl/mixins/mapbox-gl';

const {
  Component,
  observer
} = Ember;

export default Component.extend(MapboxGl, {
  classNames: ['mapbox-map'],

  mapSettings: {
    style: "mapbox://styles/mapbox/dark-v8",
    lat: 52.498605,
    lng: 13.391799,
    zoom: 12,
    interactive: true
  },

  moveToTarget: observer('target', function() {
    this.send('moveTo', this.get('target'));
  }),

  actions: {
    moveTo: function(target) {
      this.set('target', target);

      if(target === 'ber') {
        this.get('map').flyTo({
          center: [13.391799, 52.498605],
          zoom: 13
        });
      }

      if(target === 'muc') {
        this.get('map').flyTo({
          center: [11.581981, 48.135125],
          zoom: 13
        });
      }

      if(target === 'easeIn') {
        this.get('map').easeTo({
          zoom: 16,
          bearing:60,
          pitch:55
        });
      }

      if(target === 'easeOut') {
        this.get('map').easeTo({
          zoom: 13,
          bearing:0,
          pitch:0
        });
      }
    }
  }
});
