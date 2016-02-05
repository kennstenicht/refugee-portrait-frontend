import Ember from 'ember';
import MathHelper from '../mixins/math-helper';

const {
  Service,
  Evented,
  run,
  $,
  run: {
    bind
  }
} = Ember;

export default Service.extend(Evented, MathHelper, {
  currentChapter: null,
  currentPreview: null,
  chapterAnimationSpeed: 1000,
  overview: true,
  isVisible: false,
  mapAnimation: true,
  route: [],
  routeChapters: [],
  routeAnimation: false,

  // New chapter is selected
  setChapter: function (newChapter) {
    if(!this.get('isVisible') && this.get('currentChapter')) {
      return;
    }

    // Hide current chepter
    this.set('isVisible', false);
    this.closePreview();

    run.later(this, function () {
      // // TODO: check direction of movment
      // // TODO: check chapter.number distance to set flyTo or easeTo
      //
      // // Check if chapter has a route
      // if(this.get('currentChapter.route')) {
      //   this.routeToChapter(newChapter);
      // } else {
      //   this.moveToChapter(newChapter);
      // }

      this.moveToChapter(newChapter);
    }, this.get('chapterAnimationSpeed'));
  },

  routeToChapter: function (newChapter) {
    if(newChapter) {
      this.set('newChapter', newChapter);
      this.set('route', this.get('currentChapter.route'));
      this.set('routeAnimation', true);
    }

    if(this.get('route').length > 0) {
      let routePoint = this.get('route').get('firstObject'),
        transitionSpeed = this.calcTransitionSpeed(routePoint) || 2000;

      this.moveToTarget(routePoint, transitionSpeed, true);
      this.get('route').removeAt(0);
    } else {
      this.moveToChapter(this.get('newChapter'));
      this.set('routeAnimation', false);
    }
  },

  moveToChapter: function (newChapter) {
    let transitionSpeed = this.calcTransitionSpeed(newChapter.get('camera')) || 4000;
    this.set('transitionSpeed', transitionSpeed);

    this.moveToTarget(newChapter.get('camera'), transitionSpeed, false);
    run.later(this, function () {
      this.setMood(newChapter.get('feeling'));
    }, transitionSpeed-4000);

    run.later(this, function () {
      if(this.get('mapAnimation')){
        this.showChapter();
      }
    }, transitionSpeed);

    run.next(this, function () {
      this.set('currentChapter', newChapter);
      this.trigger('newChapter', newChapter, transitionSpeed);
    });
  },

  moveToTarget: function(target, duration, linear) {
    this.get('map').flyTo({
      center: [target.lng, target.lat],
      zoom: target.zoom,
      duration: duration,
      bearing: target.bearing || 0,
      pitch: target.pitch || 0,
      easing: function (t) {
        if (linear) { return t; }

        if (t <= 0) { return 0; }
        if (t >= 1) { return 1; }
        var t2 = t * t,
            t3 = t2 * t;
        return 4 * (t < 0.5 ? t3 : 3 * (t - t2) + t3 - 0.75);
      }
    });
  },

  showChapter: function () {
    this.set('isVisible', true);
    this.get('map').setLayoutProperty('route_chapters', 'visibility', 'none');
    this.get('map').setLayoutProperty('route', 'visibility', 'none');
  },

  moveEnd: function () {
    if(this.get('routeAnimation')) {
      this.routeToChapter();
    }
  },

  // Close chapter and zoom out to get a overview
  backToStory: function () {
    this.set('isVisible', false);
    run.later(this, function () {
      this.set('currentChapter', null);
      this.setMood('default');
      this.zoomOut();
      this.trigger('newChapter', '', 2000);
      this.get('map').setLayoutProperty('route_chapters', 'visibility', 'visible');
      this.get('map').setLayoutProperty('route', 'visibility', 'visible');
    }, this.get('chapterAnimationSpeed'));
  },

  zoomOut: function () {
    this.get('map').easeTo({
      zoom: this.get('map').getZoom()-4,
      duration: 2000
    });
  },


  // Change the mood of the map
  setMood: function (feeling) {
    let mood = feeling || 'default';

    if(this.get('currentMood') !== mood) {
      this.get('map').removeClass(this.get('currentMood'));
      this.get('map').setClasses([mood]);
      this.set('currentMood', mood);
      this.trigger('newMood', mood);
    }
  },


  // Show and hiden chapter Preview
  setPreview: function (chapter) {
    this.set('currentPreview', chapter);

    if(this.get('previewPopup')) {
      this.get('previewPopup').remove();
    }

    let marker = new mapboxgl.LngLat(chapter.get('marker.lng'), chapter.get('marker.lat'));
    let coordinates = this.get('map').project(marker);

    coordinates.x = (coordinates.x < 0) ? 10 : coordinates.x;
    coordinates.y = (coordinates.y < 0) ? 0 : coordinates.y;
    coordinates.x = (coordinates.x > $(window).width()) ? $(window).width()-10 : coordinates.x;
    coordinates.y = (coordinates.y > $(window).height()) ? $(window).height()-140 : coordinates.y;

    let lnglat = this.get('map').unproject([coordinates.x, coordinates.y]);

    let preview = new mapboxgl.Popup()
      .setLngLat(lnglat)
      .setHTML('<div class="mapboxgl-popup-content__location">' + chapter.get('location') + '</div><div class="mapboxgl-popup-content__header"><div class="mapboxgl-popup-content__header__number">' + chapter.get('number') + '</div><div class="mapboxgl-popup-content__header__separator"></div><div class="mapboxgl-popup-content__header__title">' + chapter.get('title') + '</div></div><div class="mapboxgl-popup-content__description">' + chapter.get('excerpt') + '</div>')
      .addTo(this.get('map'));

    this.set('previewPopup', preview);
  },

  closePreview: function () {
    if(this.get('previewPopup')) {
      this.get('previewPopup').remove();
      this.set('currentPreview', '');
    }
  },


  // Get distance between to points and map this value on a time range
  calcTransitionSpeed: function (target) {
    let center = this.get('map').getCenter(),
      start = {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [center.lng, center.lat]
        }
      },
      end = {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [target.lng, target.lat]
        }
      },
      distance = turf.distance(start, end, "miles");

    if(distance > 0) {
      let transitionSpeed = this.scale(
        distance,
        0,
        600,
        4000,
        12000
      );

      return transitionSpeed;
    } else {
      return 300;
    }

  },


  checkFeatures: function () {
    if( this.get('map').getZoom() < 4.3) {
      this.set('overview', true);
    } else {
      this.set('overview', false);
    }

    this.get('map').featuresIn({layer: 'route_chapters'}, bind(this, function (err, features) {
      this.set('routeChapters', features);
    }));
  },

  checkFeatureAt: function (e, touchType) {
    this.get('map').featuresAt(e, {radius: 20, layer: 'route_chapters'}, bind(this, function (err, features) {
      if(err || !features.length) { return; }

      let feature = features.get('firstObject'),
        chapter = this.get('chapters').findBy('id', feature.properties.id);
      if(touchType === 'press') {
        this.setPreview(chapter);
      } else {
        this.setChapter(chapter);
      }
    }));
  }
});
