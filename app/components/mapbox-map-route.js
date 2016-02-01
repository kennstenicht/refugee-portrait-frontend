import Ember from 'ember';

const {
  Component,
  computed,
  inject
} = Ember;

export default Component.extend({
  targetObject: computed.alias('parentView'),

  // Targeting Service
  targeting: inject.service('targeting'),

  didInsertElement: function () {
    this.get('targeting').set('chapters', this.get('chapters'));

    let route = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": []
      }
    };
    let routeChapters = {
      "type": "FeatureCollection",
      "features": []
    };

    this.get('chapters').forEach(function (chapter) {
      // Push point features into the routeChapters array
      routeChapters.features.pushObject({
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [chapter.get('marker.lng'), chapter.get('marker.lat')]
          },
        "properties": {
          "id": chapter.get('id')
        }
      });

      // Push coordinates into the route array
      // route.geometry.coordinates.pushObject([chapter.get('marker.lng'), chapter.get('marker.lat')]);
      if(chapter.get('route')) {
        chapter.get('route').forEach(function (routeSegement) {
          route.geometry.coordinates.pushObject([routeSegement.lng, routeSegement.lat]);
        });
      }
    });

    // Send route chapters to the map component
    let routeChapterId = 'route_chapters',
      routeChaptersSource = {
        "type": "geojson",
        "data": routeChapters
      },
      routeChaptersLayer = {
        "id": routeChapterId,
        "type": "circle",
        "source": routeChapterId,
        "interactive": true,
        "layout": {},
        "paint": {
          "circle-color": "#3f3f3f",
          "circle-radius": 10
        }
      };

    this.sendAction('addSourceAndLayer', routeChapterId, routeChaptersSource, routeChaptersLayer);

    // Send route to the map component
    let routeId = 'route',
      curvedRoute = turf.bezier(route, 1000000, 0.9),
      routeSource = {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": [curvedRoute]
        }
      },
      routeLayer = {
        "id": routeId,
        "type": "line",
        "source": routeId,
        "layout": {},
        "paint": {
          "line-color": "#3f3f3f",
          "line-width": 1
        }
      };

    this.sendAction('addSourceAndLayer', routeId, routeSource, routeLayer);
  }
});
