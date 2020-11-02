/**
 * Routes available to all users (logged in or not)
 */
export const GENERIC_ROUTES_PATHS = {
	WILD_CARD: '*',
};

/**
 * Route paths for authenticated users
 * @constant
 */
export const AUTH_ROUTE_PATHS = {
	ADD_QUESTION: '/questions/add',
	ADD_ADMIN: '/admin/add',
	QUESTIONS: '/questions',
	USERS: '/users',
	ADMINS: '/admins',
	QUESTION: '/questions/:questionId',
	USER: '/users/:userId',
	ADD_COURSE: '/courses/add',
	COURSES: '/courses',
};

/**
 * Route paths for unauthenticated users
 * @constant
 */
export const PUBLIC_ROUTE_PATHS = {
	LOGIN: '',
	SIGNUP: '/pungis',
	RESET_PASSWORD: '/reset-password',
};

export const titles = {
	ADD_ADMIN: 'Add Admin',
	ADD_COURSE: 'Add Course',
	ADD_QUESTION: 'Add Question',
	ADMINS: 'Admins',
	COURSES: 'Courses',
	QUESTIONS: 'Questions',
	USERS: 'Users',
	LOGOUT: 'Logout',
};
