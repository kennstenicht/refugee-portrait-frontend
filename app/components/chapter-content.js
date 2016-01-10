import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';
import animationIf from '../mixins/animation-if';

const {
  Component,
  computed,
  on,
  $
} = Ember;

export default Component.extend(Gestures, animationIf, {
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
    if(!this.get('targeting').currentChapter) {
      Ember.run.next(this, function () {
        this.get('targeting').setChapter(this.get('model'));
      });
    }
  },

  showChapter: function (speed) {
    $('.chapter-content').fadeIn(speed);
  },

  hideChapter: function (speed) {
    $('.chapter-content').fadeOut(speed);
  },

  pan: function () {
    this.get('targeting').setChapter('');
  },

  actions: {
    save: function () {
      let center = this.get('targeting.currentMap').getCenter(),
        zoom = this.get('targeting.currentMap').getZoom(),
        bearing = this.get('targeting.currentMap').getBearing(),
        pitch = this.get('targeting.currentMap').getPitch();

      this.get('model').set('lat', center.lat);
      this.get('model').set('lng', center.lng);
      this.get('model').set('bearing', bearing);
      this.get('model').set('pitch', pitch);
      this.get('model').set('zoom', zoom);
      this.get('model').save();

    }
  }
});
