import Ember from 'ember';

const {
  Component,
  computed,
  inject
} = Ember;

export default Component.extend({
  didInsertElement: function () {
    console.log(this.get('chapter.number'));

    //   let id = 'chapter-' + chapter.get('number');
    //   let source = {
    //       "type": "geojson",
    //       "data": {
    //           "type": "Feature",
    //           "properties": {},
    //           "geometry": {
    //               "type": "Point",
    //               "coordinates": [
    //                   [chapter.get('lng'), chapter.get('lat')],
    //               ]
    //           }
    //       }
    //   };
    //
    //   let layer = {
    //       "id": 'chapter-' + chapter.get('number'),
    //       "type": "circle",
    //       "source": 'chapter-' + chapter.get('number'),
    //       "layout": {},
    //       "paint": {
    //         "circle-color": "#888",
    //         "circle-radius": 10
    //       }
    //   };
    //
    //   this.sendAction('addSource', id, source);
    //   this.sendAction('addLayer', layer);
    // });
  }
});
