import Ember from 'ember';

const {
  Mixin,
  computed
} = Ember;

export default Mixin.create({
  sly: null,

  slider: computed(function () {
    return this.$().find('.time-line__container__frame__slider');
  }),

  initSly: function () {
    if(this.get('sly')) {
      return
    }

    let sly = new Sly('.time-line__container__frame', {
      horizontal: 1,
      itemNav: 0,
      activateMiddle: 1,
      smart: 1,
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      startAt: 0,
      speed: 300,
      elasticBounds: 1,
      scrollBar: '.time-line__container__scrollbar',
      dynamicHandle: 1,
      dragHandle: 1
    });

    this.set('sly', sly.init())
  },

  destroySly: function () {
    this.get('sly').destroy();
  }
});
