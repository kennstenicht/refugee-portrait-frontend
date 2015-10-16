import Ember from 'ember';
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component,
  computed,
  observer
} = Ember;

export default Component.extend(Gestures, {
  classNames: ['object-item'],

  targeting: Ember.inject.service('targeting'),

  setPosition: observer('object.{pageX,pageY}', function () {
    this.$().css({
      transform: "translate(" + this.get('object.pageX') + "px ," + this.get('object.pageY') + "px)"
    })
  }),

  chapter: computed(function() {
    // TODO: Store neads to be inside of the component
    // return this.store.find('chapter', '-K0_a1PUD-3uHoNXyQQu');
  }),

  actions: {
    setTarget: function() {
      // this.get('targeting').setTarget(this.get('chapter'));
    }
  }
});
