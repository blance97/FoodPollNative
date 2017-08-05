import * as firebase from "firebase";

export default class Database {

    static createPoll(id, data) {
        return firebase.database().ref(id).set({
            editable: data.editable,
            inputs: data.inputs
        })
    }
    static listen(id, callback){
        return firebase.database().ref(id).on('value', callback);
    }
    static detachListener(id){
        return firebase.database().ref(id).off();
    }
    static getVotingItems(id) {
        return firebase.database().ref(id).once('value');
    }
    static submitVote(id, update) {
        return firebase.database().ref(id).child('peoplePreferences').push(update);
    }
}