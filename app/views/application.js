import Ember from 'ember';

const {
  View,
  run: {
    later
  }
} = Ember;

export default View.extend({
  classNames: ['application'],

  objectAdded: function(e) {
    let activeObjects = this.get('controller.activeObjects');
    let activeIds = this.get('controller.activeIds');

    activeIds.pushObject(e.symbolId);
    activeObjects.pushObject(e);
  },

  objectMoved: function(e) {
    let activeObjects = this.get('controller.activeObjects');

    activeObjects.replace(
      activeObjects.indexOf(
        activeObjects.findBy('symbolId', e.symbolId)
      ), 1, e
    );
  },

  objectRemoved: function(e) {
    let activeObjects = this.get('controller.activeObjects');
    let activeIds = this.get('controller.activeIds');

    activeIds.removeObject(e.symbolId);

    later(this, e, function() {
      if( activeObjects.findBy('symbolId', e.symbolId) ) {
        activeObjects.removeObject(
          activeObjects.findBy('symbolId', e.symbolId)
        );
      }
    },300);

  }
});
