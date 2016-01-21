import Ember from 'ember';
import MathHelper from '../mixins/math-helper';

const {
  Service,
  Evented,
  run,
  run: {
    bind
  }
} = Ember;

export default Service.extend(Evented, MathHelper, {
  currentChapter: null,
  chapterAnimationSpeed: 300,
  overview: true,
  isVisible: false,
  mapAnimation: true,

  // init: function () {
  //   this.get('map').on('moveend', bind(this, this.end));
  // },

  // didInsertElement: function () {
  //   this.get('targeting').set('map', this.get('map'));
  //
  //   this.get('map').on('zoom', bind(this, this.checkFeatures));
  //   this.get('map').on('move', bind(this, this.checkFeatures));
  // },
  //
  // checkFeatures: function () {
  //   if( this.get('map').getZoom() < 4.3) {
  //     this.get('targeting').set('overview', true);
  //   } else {
  //     this.get('targeting').set('overview', false);
  //   }
  //
  //   // this.get('map').featuresIn({layer: 'route_chapters'}, bind(this, function (err, features) {
  //   //   this.get('targeting').set('route_chapters', features);
  //   // }));
  // },

  setChapter: function (newChapter) {
    if(this.get('mapAnimation')) {
      if(this.get('currentChapter') !== newChapter) {
        if(this.get('currentChapter')) {
          this.set('isVisible', false);
        }

        run.later(this, function () {
          let transitionSpeed = this.calcTransitionSpeed(newChapter) || 2000;

          this.set('currentChapter', newChapter);

          this.setMood(newChapter.get('feeling'));
          this.setTarget(newChapter, transitionSpeed);
          this.trigger('newChapter', newChapter, transitionSpeed);

          run.later(this, function () {
            this.set('isVisible', true);
          }, transitionSpeed);
        }, this.get('chapterAnimationSpeed'));
      }
    } else {
      this.set('currentChapter', newChapter);
      this.trigger('newChapter', newChapter, 100);
    }
  },

  backToStory: function () {
    this.set('isVisible', false);
    run.later(this, function () {
      this.set('currentChapter', null);
      this.setMood('default');
      this.zoomOut();
      this.trigger('newChapter', '', 2000);
    }, this.get('chapterAnimationSpeed'));
  },

  setPreview: function (chapter) {
    let longlat = new mapboxgl.LngLat(chapter.get('lng'), chapter.get('lat'));

    let preview = new mapboxgl.Popup()
      .setLngLat(longlat)
      .setHTML('<div class="mapboxgl-popup-content__location">' + chapter.get('location') + '</div><div class="mapboxgl-popup-content__header"><div class="mapboxgl-popup-content__header__number">' + chapter.get('number') + '</div><div class="mapboxgl-popup-content__header__title">' + chapter.get('title') + '</div></div><div class="mapboxgl-popup-content__description">' + chapter.get('excerpt') + '</div>')
      .addTo(this.get('map'));

    this.set('currentPreview', preview);
  },

  closePreview: function () {
    this.get('currentPreview').remove();
  },

  calcTransitionSpeed: function (newChapter) {
    if( this.get('currentChapter') && newChapter) {
      let start = {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [this.get('currentChapter.lat'), this.get('currentChapter.lng')]
        }
      };

      let end = {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [newChapter.get('lat'), newChapter.get('lng')]
        }
      };

      let distance = turf.distance(start, end, "miles");

      if(distance > 0) {
        let transitionSpeed = this.scale(
          distance,
          0,
          2000,
          2000,
          10000
        );

        return transitionSpeed;
      } else {
        return 300;
      }
    }
  },

  setTarget: function(newChapter, duration) {
    this.get('map').easeTo({
      center: [newChapter.get('lng'), newChapter.get('lat')],
      zoom: newChapter.get('zoom'),
      bearing: newChapter.get('bearing') || 0,
      pitch: newChapter.get('pitch') || 0,
      duration: duration
    });
  },

  zoomOut: function () {
    this.get('map').easeTo({
      zoom: this.get('map').getZoom()-4,
      duration: 2000
    });
  },

  setMood: function (feeling) {
    let mood = feeling || 'default';

    if(this.get('currentMood') !== mood) {
      this.get('map').removeClass(this.get('currentMood'));
      this.get('map').setClasses([mood]);
      this.set('currentMood', mood);
      this.trigger('newMood', mood);
      console.log(this.get('map').getClasses());
    }
  },

  actions: {
    newChapter: function () {
      console.log('action newChapter');
    }
  }
});
