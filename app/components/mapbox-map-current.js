import Ember from 'ember';

const {
  Component,
  computed,
  inject,
  on
} = Ember;

export default Component.extend({
  targetObject: computed.alias('parentView'),

  // Targeting Service
  targeting: inject.service('targeting'),

  listen: on('init', function() {
    this.get('targeting').on('newChapter', this, 'updateCurrent');
  }),

  updateCurrent: function (chapter) {
    if(!chapter) {return;}

    this.get('currentChapterSource').setData({
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [chapter.get('marker.lng'), chapter.get('marker.lat')]
          }
        });
  },

  didInsertElement: function () {
    let currentChapterId = 'current_chapters',
      currentChapterSource = new mapboxgl.GeoJSONSource({
        data: {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [8.34, 44.68]
          }
        }
      }),
      currentChapterLayer = {
        "id": currentChapterId,
        "type": "circle",
        "source": currentChapterId,
        "interactive": true,
        "layout": {},
        "paint": {
          "circle-color": "#33662d",
          "circle-radius": 5
        }
      };

    this.set('currentChapterSource', currentChapterSource);
    this.sendAction('addSourceAndLayer', currentChapterId, currentChapterSource, currentChapterLayer);
  }
});
