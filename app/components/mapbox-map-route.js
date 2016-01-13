import Ember from 'ember';

const {
  Component,
  computed,
  inject
} = Ember;

export default Component.extend({
  didInsertElement: function () {
    let route = [];
    let routeChapters = [];

    this.get('chapters').forEach(function (chapter) {
      // Push point features into the routeChapters array
      routeChapters.pushObject({
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [chapter.get('lng'), chapter.get('lat')]
          },
        "properties": {
          "id": chapter.get('id')
        }
      });

      // Push coordinates into the route array
      route.pushObject([chapter.get('lng'), chapter.get('lat')]);
      if(chapter.get('route')) {
        chapter.get('route').forEach(function (routeSegement) {
          route.pushObject(routeSegement);
        });
      }
    });

    // Send route chapters to the map component
    let routeChapterId = 'route_chapters';
    let routeChaptersSource = {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": routeChapters
      }
    };

    let routeChaptersLayer = {
      "id": routeChapterId,
      "type": "circle",
      "source": routeChapterId,
      "layout": {},
      "paint": {
        "circle-color": "#888",
        "circle-radius": 8
      }
    };

    this.sendAction('addSourceAndLayer', routeChapterId, routeChaptersSource, routeChaptersLayer);

    // Send route to the map component
    let routeId = 'route';
    let routeSource = {
      "type": "geojson",
      "data": {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "LineString",
            "coordinates": route
        }
      }
    };
    let routeLayer = {
      "id": routeId,
      "type": "line",
      "source": routeId,
      "layout": {},
      "paint": {
        "line-color": "#888",
        "line-width": 1
      }
    };

    this.sendAction('addSourceAndLayer', routeId, routeSource, routeLayer);
  }
});
