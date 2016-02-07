import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  classNames: ['object-detection'],

  activeObjects: [],
  tempObjects: [],

  objectAdded: function(e) {
    let activeObjects = this.get('activeObjects');
    console.log(this.get('tempObjects'));
    activeObjects.pushObject(Object.create({
        symbolId: e.symbolId,
        pageX: e.clientX,
        pageY: e.clientY
      })
    );

    this.get('tempObjects').pushObject(e.symbolId);
  },

  objectMoved: function(e) {
    let activeObjects = this.get('activeObjects'),
      object = activeObjects.findBy('symbolId', e.symbolId);

    if(object) {
      object.set('pageX', e.clientX);
      object.set('pageY', e.clientY);
    }

  },

  objectRemoved: function(e) {
    let activeObjects = this.get('activeObjects');
    let tempObjects = this.get('tempObjects');

    tempObjects.removeObject(e.symbolId);

    Ember.run.later(function () {
      if( !tempObjects.contains(e.symbolId) ) {
        activeObjects.removeObject(
          activeObjects.findBy('symbolId', e.symbolId)
        );
      }
    }, 3000);

  }
});
