import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component,
  computed,
  $,
  run: {
    bind
  }
} = Ember;

export default Component.extend(Gestures, {
  classNames: ['chapter-content'],
  classNameBindings: ['modifierNumber', 'modifierMood', 'modifierVisible'],

  // BEM modifier
  modifierNumber: computed('model.number', function() {
    return 'chapter-content--' + this.get('model.number');
  }),

  modifierMood: computed('targeting.currentMood', function () {
    if (this.get('targeting.currentMood')) {
      return 'chapter-content--'+this.get('targeting.currentMood');
    }
  }),

  modifierVisible: computed('targeting.isVisible', function () {
    return this.get('targeting.isVisible') ? '' : 'chapter-content--hidden';
  }),

  // Gesture Settings
  gestures: ['pan'],

  recognizers: {
    pan: {direction: Hammer.DIRECTION_HORIZONTAL}
  },

  // Targeting Service
  targeting: Ember.inject.service('targeting'),


  didInsertElement: function () {
    // if no currentChapter is set (load on detail), set route chapter
    if(!this.get('targeting').currentChapter) {
      Ember.run.next(this, function () {
        this.get('targeting').setChapter(this.get('model'));
      });
    }
  },

  pan: function () {
    this.get('targeting').backToStory();
  },


  // $(document).on('keydown', bind(this, this.keyDown));
  // $(document).on('keyup', bind(this, this.keyUp));

  // click: function (e) {
  //   if(e.altKey) {
  //     let newRouetPoint = this.get('targeting.map').unproject([e.clientX, e.clientY]);
  //     if(!this.get('model.route')) {
  //       this.get('model').set('route', []);
  //     }
  //     this.get('model.route').pushObject(newRouetPoint);
  //     this.get('model').save();
  //   }
  // },
  //
  // keyDown: function (e) {
  //   if(e.altKey) {
  //     this.$().show();
  //   }
  // },
  //
  // keyUp: function () {
  //   this.$().hide();
  // },

  actions: {
    // Admin functions
    save: function () {
      let center = this.get('targeting.map').getCenter(),
        zoom = this.get('targeting.map').getZoom(),
        bearing = this.get('targeting.map').getBearing(),
        pitch = this.get('targeting.map').getPitch();

      this.get('model').set('lat', center.lat);
      this.get('model').set('lng', center.lng);
      this.get('model').set('bearing', bearing);
      this.get('model').set('pitch', pitch);
      this.get('model').set('zoom', zoom);
      this.get('model').save();
    },

    adminRemoveRoute: function () {
      this.get('model').set('route', null);
      this.get('model').save();
    }
  }
});
