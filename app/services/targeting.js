import Ember from 'ember';

const {
  Service,
  Evented
} = Ember;

export default Service.extend(Evented, {
  feelings: {
    angst: 'dark',
    stress: 'dark',
    frustriert: 'dark'
  },

  setTarget: function (chapter) {
    if(this.get('currentTarget') !== chapter) {
      this.trigger('newTarget', chapter);
      this.set('currentTarget', chapter);
      this.trigger('newChapter', chapter);
      this.setMood(chapter.get('feeling'));
    }
  },

  setMood: function (feeling) {
    let mood = this.get('feelings.'+feeling) || 'default';
    if(this.get('currentMood') !== mood) {
      this.trigger('newMood', mood);
      this.set('currentMood', mood);
    }
  }
});
