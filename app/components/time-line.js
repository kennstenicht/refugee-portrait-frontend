import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';
import MathHelper from '../mixins/math-helper';
import groupBy from 'ember-group-by';
import Sly from '../mixins/sly';
import moment from 'moment';

const {
  Component,
  observer,
  computed,
  inject,
  on,
  run: {
    bind
  },
  $
} = Ember;

export default Component.extend(Gestures, Sly, MathHelper, {
  classNames: ['time-line'],
  classNameBindings: ['modifierMode', 'modifierMood'],

  // BEM Modifier
  modifierMode: computed('zoom', 'targeting.currentChapter', function () {
    if (this.get('targeting.currentChapter')) {
      return 'time-line--detail';
    } else if (this.get('zoom') === 0) {
      return 'time-line--overview';
    }
  }),

  modifierMood: computed('targeting.currentMood', function () {
    if (this.get('targeting.currentMood')) {
      return 'time-line--'+this.get('targeting.currentMood');
    }
  }),

  // Gesture Settings
  gestures: ['pinch', 'pinchstart', 'pinchmove'],

  recognizers: {
    pinch: {enable: true}
  },

  // Variables
  zoom: 0,
  columns: groupBy('chapters', 'unixDate'),

  // Targeting Service
  targeting: inject.service('targeting'),

  listen: on('init', function() {
    this.get('targeting').on('newChapter', this, 'setProgressbar');
  }),

  // Targeting Functions
  setProgressbar: function (chapter, speed) {
    let position = 0;
    if(chapter) {
      position = this.scale(
        chapter.get('unixDate'),
        moment(this.get('story.start')).format('X'),
        moment(this.get('story.end')).format('X'),
        0,
        100
      );
    }


    $('.time-line__container__frame__slider__progressbar__indicator').animate({width: position + '%'}, speed, 'easeOutCirc');
  },

  // Functions
  didInsertElement: function () {
    this.initSly();
  },

  willDestroyElement: function () {
    this.destroySly();
  },

  overview: observer('targeting.currentChapter', function () {
    let frameWidth = $('.time-line__container__frame').width();

    if( this.get('targeting.currentChapter') ) {
      $('.time-line__container__frame__slider').animate({'width': frameWidth}, 600, bind(this, function () {
        this.get('sly').reload();
      }));
    }
  }),

  firstChapter: computed('chapters', function () {
    return this.get('chapters').get('firstObject');
  }),

  lastChapter: computed('chapters', function () {
    return this.get('chapters').get('lastObject');
  }),










  // setSize: observer('width', function () {
  //   this.get('slider').css({
  //     width: this.get('width'),
  //   });
  //
  //   this.get('sly').reload();
  //
  //   Ember.run.next(this, function() {
  //     this.get('sly').slideTo(this.get('startPosRel') * this.get('width'), true);
  //   });
  // }),
  // pinchstart: function (e) {
  //   this.set('startWidth', this.get('slider').width() );
  //   console.log("cur: " + this.get('sly').pos.cur);
  //   this.set('startPosRel', (this.get('sly').pos.cur + e.gesture.center.x) / this.get('startWidth') );
  //
  // },
  //
  // pinchmove: function (e) {
  //   let newWidth = this.get('startWidth') * e.gesture.scale;
  //
  //   this.set('width', newWidth );
  // },

  // zoomStep: 300,
  // position: 0,
  // size: 3000,
  // minSize: window.innerWidth,
  // maxSize: 30000,
  // minPosition: 0,
  // maxPosition: computed('size', function () {
  //   return -(this.get('size') - this.get('minSize'));
  // }),
  // slider: computed(function () {
  //   return this.$().find('.time-line__slider');
  // }),
  //
  //
  // setPosition: function (position, speed) {
  //   this.set('position', position);
  //   this.get('slider').animate({
  //     left: position,
  //   }, speed);
  // },
  //
  // setSize: function (size, speed) {
  //   this.set('size', size);
  //   this.get('slider').animate({
  //     width: size,
  //   }, speed);
  // },
  //
  //
  // // Start & End Gesture - set start values and bounce after
  // startGesture: function() {
  //   this.set('startPosition', this.get('slider').position().left );
  //   this.set('startSize', this.get('slider').width() );
  // },
  // endGesture: function() {
  //   if(this.get('size') < this.get('minSize')) {
  //     this.setSize(this.get('minSize'), 600);
  //   }
  //
  //   if(this.get('size') > this.get('maxSize')) {
  //     this.setSize(this.get('maxSize'), 600);
  //   }
  //
  //   if(this.get('position') > this.get('minPosition')) {
  //     this.setPosition(this.get('minPosition'), 600);
  //   }
  //
  //   if(this.get('position') < this.get('maxPosition')) {
  //     this.setPosition(this.get('maxPosition'), 600);
  //   }
  // },
  //
  //
  // // Pan Gesture - drag timeline
  // panstart: function() {
  //   this.startGesture();
  // },
  // panmove: function(e) {
  //   let newPosition = this.get('startPosition') + e.gesture.deltaX;
  //   this.setPosition(newPosition, 0);
  // },
  // panend: function () {
  //   this.endGesture();
  // },
  //
  //
  // // Pinch Gesture - zoom timeline
  // pinchstart: function () {
  //   this.startGesture();
  // },
  // pinchmove: function (e) {
  //   let pinchLeftRelative = e.gesture.center.x / this.$().innerWidth(),
  //     newSize = this.get('startSize') * e.gesture.scale,
  //     differenceSize = newSize - this.get('startSize');
  //
  //   if(this.get('position') >= this.get('maxPosition') || this.get('position') <= this.get('minPosition')) {
  //     this.setPosition(
  //       this.get('startPosition') - ( differenceSize * pinchLeftRelative ), 0
  //     );
  //     this.setSize(newSize, 0);
  //   }
  // },
  // pinchend: function () {
  //   this.endGesture();
  // }
});
