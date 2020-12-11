const SET_QUESTIONS = 'SET_QUESTIONS';
const SET_QUESTION = 'SET_QUESTION';
const SET_INDEX = 'SET_INDEX';
const SAVE_QUESTION = 'SAVE_QUESTION';
const SET_COURSE = 'SET_COURSE';

import test from './test';

const setQuestions = (value) => ({
	payload: value,
	type: SET_QUESTIONS,
});

const setQuestion = (value) => ({
	payload: value,
	type: SET_QUESTION,
});

const setCourse = (value) => ({
	payload: value,
	type: SET_COURSE,
});

const setIndex = (value) => ({
	payload: value,
	type: SET_INDEX,
});

const saveQuestion = (value) => ({
	payload: value,
	type: SAVE_QUESTION,
});

const initialState = {
	all: test,
	single: {},
	index: 0,
	answered: [],
	course: 'General',
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_QUESTIONS:
			return {
				...state,
				all: action.payload,
			};
		case SET_QUESTION:
			return {
				...state,
				single: action.payload,
			};
		case SAVE_QUESTION:
			return {
				...state,
				answered: [...action.payload],
			};
		case SET_INDEX:
			return {
				...state,
				index: action.payload,
			};
		default:
			return state;
	}
};

export { reducer, setQuestions, setQuestion, setIndex, saveQuestion, setCourse };
