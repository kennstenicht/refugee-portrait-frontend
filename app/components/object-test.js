import Ember from 'ember';

const {
  Component,
  computed,
  observer
} = Ember;

export default Component.extend({
  classNames: ['object-test'],

  didInsertElement: function() {
    let object = this.get('activeObjects').findBy('symbolId', this.get('activeId'));

    this.$().css({
      'top': object.clientY,
      'left': object.clientX
    });
  },

  moveObject: observer('activeObjects@each', function() {
    console.log('test');
    let object = this.get('activeObjects').findBy('symbolId', this.get('activeId'));

    // this.$().css({
    //   'top': object.clientY,
    //   'left': object.clientX
    // });
  }),

  actions: {
    easeIn: function() {
      this.sendAction('setTarget', 'easeIn');
    },

    easeOut: function() {
      this.sendAction('setTarget', 'easeOut');
    }
  }
});
