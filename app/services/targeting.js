import Ember from 'ember';

const {
  Service,
  Evented
} = Ember;

export default Service.extend(Evented, {
  currentTarget: null,

  feelings: {
    angst: 'dark',
    stress: 'dark',
    frustriert: 'dark',
    hoffnung: ''
  },

  setTarget: function (chapter) {
    if(this.get('currentTarget') !== chapter) {
      this.trigger('newTarget', chapter);
      this.set('currentTarget', chapter);
      this.setMood(chapter.feeling);
    }
  },

  setMood: function (feeling) {
    let mood = feelings[feeling];
    if(this.get('currentMood') !== mood) {
      this.trigger('newMood', mood);
      this.set('currentMood', mood);
    }
  }
});
