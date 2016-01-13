import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component,
  computed,
  on,
  $
} = Ember;

export default Component.extend(Gestures, {
  classNames: ['chapter-content'],
  classNameBindings: ['modifierNumber'],

  // BEM modifier
  modifierNumber: computed('model.number', function() {
    return 'chapter-content--' + this.get('model.number');
  }),

  gestures: ['pan', 'panleft', 'press', 'pressup'],

  recognizers: {
    pan: {direction: Hammer.DIRECTION_HORIZONTAL}
  },

  targeting: Ember.inject.service('targeting'),

  listen: on('init', function() {
      this.get('targeting').on('showChapter', this, 'showChapter');
      this.get('targeting').on('hideChapter', this, 'hideChapter');
  }),

  didInsertElement: function () {
    // if no currentChapter is set (load on detail), set route chapter
    if(!this.get('targeting').currentChapter) {
      Ember.run.next(this, function () {
        this.get('targeting').setChapter(this.get('model'));
      });
    }
  },

  showChapter: function (speed) {
    this.$().fadeIn(speed);
  },

  hideChapter: function (speed) {
    this.$().fadeOut(speed);
  },

  pan: function () {
    this.get('targeting').backToStory();
  },

  actions: {
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
    }
  }
});
