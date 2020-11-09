const functions = require('firebase-functions');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = require('express')();
const auth = require('./middlewares/Auth');

const createAdmin = require('./controllers/createAdmin');
const loginAdmin = require('./controllers/loginAdmin');
const createUser = require('./controllers/createUser');
const loginUser = require('./controllers/loginUser');
const setQuestion = require('./controllers/setQuestion');
const editUser = require('./controllers/editUser');
const saveHistory = require('./controllers/saveHistory');
const getUserDetails = require('./controllers/getUserDetails');
const getCourses = require('./controllers/getCourses');
const getQuestions = require('./controllers/getQuestions');
const getCoursesAdmin = require('./controllers/getCoursesAdmin');
const resetPassword = require('./controllers/resetPassword');
const contact = require('./controllers/contact');
const addCourse = require('./controllers/addCourse');
const addQuestions = require('./controllers/addQuestions');
const deleteCourse = require('./controllers/deleteCourse');
const deleteQuestion = require('./controllers/deleteQuestion');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('hello');
});

app.post('/admin/register', createAdmin);
app.post('/admin/login', loginAdmin);
app.post('/user/register', createUser);
app.post('/user/login', loginUser);
app.post('/quiz', setQuestion);
app.post('/user/update', auth, editUser);
app.post('/user/history/save', saveHistory);
app.get('/user', auth, getUserDetails);

app.get('/questions', getQuestions);
app.post('/questions', addQuestions);
app.delete('/questions/:id', deleteQuestion);

app.get('/courses/all', getCoursesAdmin);
app.post('/courses', addCourse);
app.delete('/courses/:id', deleteCourse);
app.get('/courses', getCourses);

app.post('/reset', resetPassword);
app.post('/contact', contact);

exports.api = functions.https.onRequest(app);
