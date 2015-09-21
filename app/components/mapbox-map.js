import Ember from 'ember';
import MapboxGl from 'ember-cli-mapbox-gl/mixins/mapbox-gl';
import Gestures from 'ember-cli-tuio/mixins/gestures';

export default Ember.Component.extend(MapboxGl, Gestures, {
  classNames: ['mapbox-map'],

  gestures: ['tap', 'pinch', 'pinchstart'],

  recognizers: {
    tap: { threshold: 40 },
    pinch: { enable: true}
  },

  tap: function() {

  },
  click: (e) => {
    console.log(e);
  },

  touchStart: function(e) {
    console.log(e.originalEvent.changedTouches[0]);
  },

  pinch: function() {
    console.log('pinch');
  }
});
