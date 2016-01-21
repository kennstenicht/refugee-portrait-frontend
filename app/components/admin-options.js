import Ember from 'ember';

const {
  Component,
  inject,
  run: {
    bind
  }
} = Ember;

export default Component.extend({
  classNames: ['admin-options'],

  // Targeting service
  targeting: inject.service('targeting'),

  // Variables
  adminText: '',

  didInsertElement: function () {
    $(document).on('click', bind(this, this.addRouteSegment) );
  },

  addRouteSegment: function (e) {
    if(e.altKey) {
      let newRouetPoint = this.get('targeting.map').unproject([e.clientX, e.clientY]);
      if(!this.get('targeting.currentChapter.route')) {
        this.get('targeting.currentChapter').set('route', []);
      }
      this.get('targeting.currentChapter.route').pushObject(newRouetPoint);
      this.get('targeting.currentChapter').save();
    }
  },

  actions: {
    save: function () {
      let center = this.get('targeting.map').getCenter(),
        zoom = this.get('targeting.map').getZoom(),
        bearing = this.get('targeting.map').getBearing(),
        pitch = this.get('targeting.map').getPitch();

      this.get('targeting.currentChapter').set('lat', center.lat);
      this.get('targeting.currentChapter').set('lng', center.lng);
      this.get('targeting.currentChapter').set('bearing', bearing);
      this.get('targeting.currentChapter').set('pitch', pitch);
      this.get('targeting.currentChapter').set('zoom', zoom);
      this.get('targeting.currentChapter').save();
      this.set('adminText', 'Chapter saved: ' + this.get('targeting.currentChapter.number'));
    },

    removeRoute: function () {
      this.get('targeting.currentChapter').set('route', null);
      this.get('targeting.currentChapter').save();
      this.set('adminText', 'Route deleted: ' + this.get('targeting.currentChapter.number'));
    },

    addHotspot: function () {
      console.log('add Hotspot');
      this.set('adminText', 'Hotspot added');
    },

    toggleChapter: function () {
      this.get('targeting').toggleProperty('isVisible');
    },

    toggleAnimation: function () {
      this.get('targeting').toggleProperty('mapAnimation');
    }
  }
});
