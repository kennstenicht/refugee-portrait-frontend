import Ember from 'ember';

const {
  Component,
  Object,
  run: {
    later
  }
} = Ember;

export default Component.extend({
  classNames: ['object-detection'],

  objectAdded: function(e) {
    let activeObjects = this.get('activeObjects');

    activeObjects.pushObject(Object.create({
        symbolId: e.symbolId,
        pageX: e.pageX,
        pageY: e.pageY
      })
    );
  },

  objectMoved: function(e) {
    let activeObjects = this.get('activeObjects'),
      object = activeObjects.findBy('symbolId', e.symbolId);

    if(object) {
      object.set('pageX', e.pageX);
      object.set('pageY', e.pageY);
    }

  },

  objectRemoved: function(e) {
    let activeObjects = this.get('activeObjects');

    activeObjects.removeObject(
      activeObjects.findBy('symbolId', e.symbolId)
    );
  }
});
