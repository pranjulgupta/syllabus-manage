import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';
import dataset from '../data';
const data = {dataset,
    statndard:null,
    subject:null
    }
const findData = (data, statndard, subject) => {
    let Data = Object.assign([], data)
    var classDetails = Data.find(cd => cd.class == statndard);
    var subjectContent = classDetails.content.find(cd => cd.sub == subject);
    return subjectContent
}

const taskReducer = (state = data, action) => {
    switch (action.type) {
        case actionTypes.show_data:
            break;
        case actionTypes.fetch_data:
            state.statndard = action.payload.statndard
            state.subject = action.payload.subject
            break
        case actionTypes.add_chapter:
            let newData = Object.assign([], state.dataset)
            var subjectContent = findData(newData, state.statndard, state.subject)
            var db = subjectContent.chapter
            db.push(action.payload.newData)
            state.dataset  = newData;
            break;

        case actionTypes.add_topic:
            let newTopicData = Object.assign([], state.dataset)
            var subjectContent = findData(newTopicData, state.statndard, state.subject)
            var db = subjectContent.chapter
            db[action.payload.id].topic.push(action.payload.newData);
            state.dataset  = newTopicData;
            break;

        case actionTypes.delete_chapter:
            let deleteData = Object.assign([], state.dataset)
            var subjectContent = findData(deleteData,state.statndard, state.subject)
            var db = subjectContent.chapter
            db.splice(action.payload.id, 1)
            state.dataset  = deleteData;
            break;

        case actionTypes.delete_topic:
            let deleteTopicData = Object.assign([], state.dataset)
            var subjectContent = findData(deleteTopicData, state.statndard, state.subject)
            var db = subjectContent.chapter
            db[action.payload.index].topic.splice(action.payload.id, 1);
            state.dataset  = deleteTopicData;
            break;

        case actionTypes.edit_chapter:
            let editData = Object.assign([], state.dataset)
            var subjectContent = findData(editData, state.statndard,state.subject)
            var db = subjectContent.chapter
            db[action.payload.id].chapterName = action.payload.newData;
            state.dataset  = editData;
            break;

        case actionTypes.edit_topic:
            let editTopicData = Object.assign([], state.dataset)
            var subjectContent = findData(editTopicData,state.statndard, state.subject)
            var db = subjectContent.chapter
            db[action.payload.index].topic[action.payload.tindex] = action.payload.newData;
            state.dataset = editTopicData;
            break;

    }
    return state;
}

const rootReducer = combineReducers({
    list: taskReducer,
});
export default rootReducer