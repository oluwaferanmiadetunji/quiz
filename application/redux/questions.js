const SET_QUESTIONS = 'SET_QUESTIONS';
const SET_QUESTION = 'SET_QUESTION';
const SET_INDEX = 'SET_INDEX';
const SAVE_QUESTION = 'SAVE_QUESTION';
const SET_COURSE = 'SET_COURSE';
const SET_DURATION = 'SET_DURATION';

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

const setDuration = (value) => ({
	payload: value,
	type: SET_DURATION,
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
	all: [],
	single: {},
	index: 0,
	answered: {},
	course: '',
	duration: '',
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
				answered: action.payload,
			};
		case SET_INDEX:
			return {
				...state,
				index: action.payload,
			};
		case SET_COURSE:
			return {
				...state,
				course: action.payload,
			};
		case SET_DURATION:
			return {
				...state,
				duration: action.payload,
			};
		default:
			return state;
	}
};

export { reducer, setQuestions, setQuestion, setIndex, saveQuestion, setCourse, setDuration };
