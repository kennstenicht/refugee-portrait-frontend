import Ember from 'ember';
import MapboxGl from 'ember-cli-mapbox-gl/mixins/mapbox-gl';

const {
  Component,
  bind,
  run: {
    later
  }
} = Ember;

export default Component.extend(MapboxGl, {
  classNames: ['mapbox-map'],

  mapSettings: {
    style: "mapbox://styles/mapbox/dark-v8",
    lat: 52.520007,
    lng: 13.404954,
    zoom: 12,
    interactive: true
  },

  actions: {
    toggleClass: function() {
      if ( this.get('map').hasClass('night') ) {
        this.get('map').removeClass('night');
        console.log('day');
      } else {
        this.get('map').addClass('night');
        console.log('night');
      }
    },

    moveTo: function(target) {
      if(target === 'ber') {
        this.get('map').flyTo({
          center: [13.404954, 52.520007],
          zoom: 13
        });
      }

      if(target === 'muc') {
        this.get('map').flyTo({
          center: [11.581981, 48.135125],
          zoom: 13
        });
      }

      if(target === 'muc-easeIn') {
        this.get('map').easeTo({
          center: [11.557768, 48.140350],
          zoom: 16,
          bearing:60,
          pitch:55
        });
      }

      if(target === 'muc-easeOut') {
        this.get('map').easeTo({
          center: [11.581981, 48.135125],
          zoom: 13,
          bearing:0,
          pitch:0
        });
      }
    }
  }
});
