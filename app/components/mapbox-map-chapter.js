import Ember from 'ember';

const {
  Component,
  computed,
  inject
} = Ember;

export default Component.extend({
  didInsertElement: computed('chapter.lng', function () {
    // this.get('chapter').then((chapter) => {
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
    //   console.log(chapter.get('number'));
    //   this.sendAction('addSource', id, source);
    //   this.sendAction('addLayer', layer);
    // });
  })
});
