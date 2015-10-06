import Ember from 'ember';

const {
  Controller
} = Ember;

export default Controller.extend({
  activeObjects: [],
  target: null,

  actions: {
    setTarget: function(target) {
      this.set('target', target);
    },

    addNewStory: function () {
      let story = this.get('model');
      console.log(story);

      let newChapter = this.store.createRecord('chapter', {
        title: 'Rami und die türkische Mafia',
        description: 'Ramis türkischer Schleuser arbeitet offenbar mit der Mafia zusammen. Der Plan: Die türkische Mafia holt Rami und die anderen Flüchtlinge aus den Verstecken in Mersin ab und bringt sie zu den kleinen Booten am Wasser. Mit denen geht es dann zu einem großen Containerschiff, das vor Zypern auf sie wartet. Das Schiff soll sie dann nach Italien bringen. "Wenn Beamte bestochen werden müssen, dann übernimmt das die Mafia", sagt der Schleuser zu Rami. Für den Transport werden die Flüchtlinge in Gruppen eingeteilt.',
        location: 'Mersin',
        lat: 36.812104,
        lng: 34.641481,
        date: new Date(2015, 3, 10),
        accuracy: 2,
        action: 'reden',
        feeling: '',
        type: 'video',
      });
      story.get('chapters').pushObject(newChapter);

      newChapter.save().then(function () {
        return story.save();
      });
    }
  }
});
