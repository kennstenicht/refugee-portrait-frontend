import Ember from 'ember';
import MapboxGl from 'ember-cli-mapbox-gl/mixins/mapbox-gl';

const {
  Component,
  on,
  init,
  observer
} = Ember;

export default Component.extend(MapboxGl, {
  classNames: ['mapbox-map'],

  mapSettings: {
    style: "mapbox-style.json",
    lat: 52.498605,
    lng: 13.391799,
    zoom: 12,
    interactive: true
  },

  targeting: Ember.inject.service('targeting'),

  listen: on('init', function() {
      this.get('targeting').on('newTarget', this, 'setTarget');
      this.get('targeting').on('newMood', this, 'setMood');
  }),

  setTarget: function (chapter) {
    this.get('map').flyTo({
      center: [chapter.get('lng'), chapter.get('lat')],
      zoom: 10 + chapter.get('accuracy')
    });
  },

  setMood: function (mood) {
    let classes = (mood === 'default') ? '' : mood;
    this.get('map').setClasses([classes]);
  }
});
