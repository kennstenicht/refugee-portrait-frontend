import Ember from 'ember';

const {
  Component,
  run: {
    later
  }
} = Ember;

export default Component.extend({
  classNames: ['object-detection'],

  objectAdded: function(e) {
    let activeObjects = this.get('activeObjects');

    activeObjects.pushObject(e);
  },

  objectMoved: function(e) {
    let activeObjects = this.get('activeObjects');

    activeObjects.replace(
      activeObjects.indexOf(
        activeObjects.findBy('symbolId', e.symbolId)
      ), 1, e
    );
  },

  objectRemoved: function(e) {
    let activeObjects = this.get('activeObjects');

    later(this, e, function() {
      if( activeObjects.findBy('symbolId', e.symbolId) ) {
        activeObjects.removeObject(
          activeObjects.findBy('symbolId', e.symbolId)
        );
      }
    },300);
  }
});
