import Ember from 'ember';

const {
  Service,
  Evented
} = Ember;

export default Service.extend(Evented, {
  setTarget: function (chapter) {
    this.trigger('newTarget', chapter);
  }
});
