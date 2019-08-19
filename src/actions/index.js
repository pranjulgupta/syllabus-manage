import * as actionTypes from "./types";
export const showData = () => {
    return {
        type: actionTypes.show_data,
    };
};

export const fetchData=(statndard, subject)=>{
    return {
        type: actionTypes.fetch_data,
        payload: {
        statndard, subject
        }
    };
}
export const addChapter = (newData) => {
    return {
        type: actionTypes.add_chapter,
        payload: {
            newData
        }
    };
};

export const deleteChapter = (id) => {
    return {
        type: actionTypes.delete_chapter,
        payload: {
            id
        }
    };
};

export const editChapter = (id, newData) => {
    return {
        type: actionTypes.edit_chapter,
        payload: {
            id, newData
        }
    };
};

export const addTopic = (id, newData) => {
    return {
        type: actionTypes.add_topic,
        payload: {
            id, newData
        }
    };
};

export const deleteTopic = (index, id) => {
    return {
        type: actionTypes.delete_topic,
        payload: {
            index, id
        }
    };
};

export const editTopic = (index, tindex, newData) => {
    return {
        type: actionTypes.edit_topic,
        payload: {
            index, tindex, newData
        }
    };
};