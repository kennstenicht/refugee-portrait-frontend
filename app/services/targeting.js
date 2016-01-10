import Ember from 'ember';
import MathHelper from '../mixins/math-helper';


const {
  Service,
  Evented,
  run
} = Ember;

export default Service.extend(Evented, MathHelper, {
  currentChapter: null,
  currentPreview: null,

  feelings: {
    angst: 'dark',
    stress: 'dark',
    frustriert: 'dark'
  },

  setPreview: function (chapter) {
    console.log(chapter);
    this.set('currentPreview', chapter);
  },

  setChapter: function (chapter) {
    let chapterAnimationSpeed = 300,
      distance = this.calcDistance(chapter),
      transitionSpeed = 300;

    if(distance && distance > 0) {
      transitionSpeed = this.scale(
        distance,
        0,
        2000,
        2000,
        10000
      );
    }

    if(this.get('currentChapter') !== chapter) {
      this.trigger('hideChapter', chapterAnimationSpeed);

      // wait until Chapter is hidden (chapterAnimationSpeed)
      run.later(this, function () {
        if(chapter) {
          this.trigger('newChapter', chapter, transitionSpeed);
          // this.setMood(chapter.get('feeling'));
        } else {
          this.trigger('closeChapter', 2000);
          // this.setMood('default');
        }

        this.set('currentChapter', chapter);

        // wait until target is reached (options.duration)
        run.later(this, function () {
          this.trigger('showChapter', chapterAnimationSpeed)
        }, transitionSpeed);
      }, chapterAnimationSpeed);
    }
  },

  setMood: function (feeling) {
    let mood = this.get('feelings.'+feeling) || 'default';

    if(this.get('currentMood') !== mood) {
      this.trigger('newMood', mood);
      this.set('currentMood', mood);
    }
  },

  calcDistance: function (newChapter) {
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

      return turf.distance(start, end, "miles");
    }
  }
});
