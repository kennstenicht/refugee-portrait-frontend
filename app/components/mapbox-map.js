import Ember from 'ember';
import MapboxGl from 'ember-cli-mapbox-gl/mixins/mapbox-gl';

const {
  Component,
  computed,
  on,
  init,
  observer
} = Ember;

export default Component.extend(MapboxGl, {
  classNames: ['mapbox-map'],

  mapSettings: {
    style: "mapbox-style.json",
    lat: 46.68,
    lng: 8.43,
    zoom: 4,
    bearing: 0,
    interactive: true
  },

  targeting: Ember.inject.service('targeting'),

  listen: on('init', function() {
      this.get('targeting').on('newTarget', this, 'setTarget');
      this.get('targeting').on('newMood', this, 'setMood');
  }),

  didInsertElement: function () {
    let map = this.get('map');

    this.get('chapters').forEach(function (chapter) {
      console.log(chapter.store.get('title'));
    });

    map.on('style.load', function () {
        map.addSource("route", {
            "type": "geojson",
            "data": {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [36.284775, 33.493496],
                        [35.664368, 34.254379],
                        [34.641481, 36.812104],
                        [34.641481, 36.812104],
                        [34.578094, 36.770517],
                        [34.641481, 36.812104],
                        [27.142826, 38.423734],
                        [26.277707, 39.264510],
                        [25.775299, 38.016452],
                        [23.729360, 37.983917],
                        [22.944419, 40.640063],
                        [22.944419, 40.640063],
                        [22.494507, 41.140399],
                        [21.745275, 41.608635],
                        [21.725694, 42.132289],
                        [21.967163, 42.312862],
                        [20.448922, 44.786568],
                        [19.605103, 46.167468],
                        [19.605103, 46.167468],
                        [19.503304, 47.162494],
                        [16.373819, 48.208174],
                        [11.581981, 48.135125],
                        [9.993682, 53.551085],
                        [12.568337, 55.676097],
                        [9.792178, 54.913811]
                    ]
                }
            }
        });

        map.addLayer({
            "id": "route",
            "type": "line",
            "source": "route",
            "layout": {
              "line-join": "round",
              "line-cap": "round"
            },
            "paint": {
              "line-color": "#888",
              "line-width": 2
            }
        });
    });
  },

  setTarget: function (chapter) {
    this.get('map').easeTo({
      center: [chapter.get('lng'), chapter.get('lat')],
      zoom: 10 + chapter.get('accuracy'),
      duration: 2000
    });
  },

  setMood: function (mood) {
    let classes = (mood === 'default') ? '' : mood;
    this.get('map').setClasses([classes]);
  }
});
