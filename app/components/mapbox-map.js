import Ember from 'ember';
import MapboxGl from 'ember-cli-mapbox-gl/mixins/mapbox-gl';

export default Ember.Component.extend(MapboxGl, {
  classNames: ['mapbox-map']
});
