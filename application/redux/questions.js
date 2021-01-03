const SET_QUESTIONS = 'SET_QUESTIONS';
const SET_QUESTION = 'SET_QUESTION';
const SET_INDEX = 'SET_INDEX';
const SAVE_QUESTION = 'SAVE_QUESTION';
const SET_COURSE = 'SET_COURSE';
const SET_DURATION = 'SET_DURATION';
const SAVE_ANSWERED_QUESTIONS = 'SAVE_ANSWERED_QUESTIONS';

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

const saveAnsweredQuestions = (value) => ({
	payload: value,
	type: SAVE_ANSWERED_QUESTIONS,
});

const initialState = {
	all: [],
	single: {},
	index: 0,
	answeredQuestions: [],
	course: '',
	duration: '',
	answered: {},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_QUESTIONS:
			return {
				...state,
				all: action.payload,
				answeredQuestions: action.payload,
			};
		case SET_QUESTION:
			return {
				...state,
				single: action.payload,
			};
		case SAVE_QUESTION:
			let index = state.answeredQuestions.findIndex((question) => question.id === action.payload.id);
			state.answeredQuestions[index].selectedAnswer = action.payload.selectedAnswer;
			state.answeredQuestions[index].isCorrect = action.payload.isCorrect;

			return {
				...state,
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
		case SAVE_ANSWERED_QUESTIONS:
			return {
				...state,
				answered: action.payload,
			};
		default:
			return state;
	}
};

export { reducer, setQuestions, setQuestion, setIndex, saveQuestion, setCourse, setDuration, saveAnsweredQuestions };
