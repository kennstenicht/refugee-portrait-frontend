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

  setChapter: function (chapter) {
    if(this.get('currentChapter') !== chapter) {
      if(chapter) {
        console.log('service');
        this.trigger('setChapter', chapter);
        // this.setMood(chapter.get('feeling'));
      } else {
        this.trigger('closeChapter');
        // this.setMood('default');
      }
      this.set('currentChapter', chapter);
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
