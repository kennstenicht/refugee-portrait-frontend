import Ember from 'ember';
import MathHelper from '../mixins/math-helper';


const {
  Service,
  Evented,
  run
} = Ember;

export default Service.extend(Evented, MathHelper, {
  currentChapter: null,
  chapterAnimationSpeed: 300,

  feelings: {
    angst: 'dark',
    stress: 'dark',
    frustriert: 'dark'
  },


  setChapter: function (newChapter) {
    if(this.get('currentChapter') !== newChapter) {
      this.trigger('hideChapter', this.get('chapterAnimationSpeed'));

      run.later(this, function () {
        let transitionSpeed = this.calcTransitionSpeed(newChapter) || 300;

        this.trigger('newChapter', newChapter, transitionSpeed);
        this.setTarget(newChapter, transitionSpeed);

        run.later(this, function () {
          this.set('currentChapter', newChapter);
          this.trigger('showChapter', this.get('chapterAnimationSpeed'));
        }, transitionSpeed);
      }, this.get('chapterAnimationSpeed'))
    }
  },

  backToStory: function () {
    this.trigger('hideChapter', this.get('chapterAnimationSpeed'));
    run.later(this, function () {
      this.set('currentChapter', '');
      this.zoomOut();

      run.later(this, function () {
        this.trigger('closeChapter', 2000);
      }, 2000);
    }, this.get('chapterAnimationSpeed'))
  },

  setPreview: function (chapter) {
    let longlat = new mapboxgl.LngLat(chapter.get('lng'), chapter.get('lat'));

    let preview = new mapboxgl.Popup()
      .setLngLat(longlat)
      .setHTML(chapter.get('title'))
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
    let mood = this.get('feelings.'+feeling) || 'default';

    if(this.get('currentMood') !== mood) {
      this.get('map').setClasses([classes]);
      this.set('currentMood', mood);
    }
  },
});
