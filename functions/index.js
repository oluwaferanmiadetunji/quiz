const functions = require('firebase-functions');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = require('express')();
const auth = require('./middlewares/Auth');

const loginAdmin = require('./controllers/loginAdmin');
const loginUser = require('./controllers/loginUser');
const setQuestion = require('./controllers/setQuestion');
const editUser = require('./controllers/editUser');
const saveHistory = require('./controllers/saveHistory');
const getUserDetails = require('./controllers/getUserDetails');
const getCourses = require('./controllers/getCourses');
const getQuestions = require('./controllers/getQuestions');
const resetPassword = require('./controllers/resetPassword');
const contact = require('./controllers/contact');
const addCourse = require('./controllers/addCourse');
const addQuestions = require('./controllers/addQuestions');
const deleteCourse = require('./controllers/deleteCourse');
const deleteQuestion = require('./controllers/deleteQuestion');
const editQuestion = require('./controllers/editQuestion');
const getAdmins = require('./controllers/getAdmins');
const getUsers = require('./controllers/getUsers');
const getUser = require('./controllers/getUser');
const createUser = require('./controllers/createUser');
const createAdmin = require('./controllers/createAdmin');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('hello');
});

app.post('/admin/login', loginAdmin);
app.get('/admins', getAdmins);
app.post('/admin/register', createAdmin);

app.post('/user/register', createUser);
app.post('/user/login', loginUser);
app.post('/quiz', auth, setQuestion);
app.post('/user/update', auth, editUser);
app.post('/user/history/save', auth, saveHistory);
app.get('/user', auth, getUserDetails);
app.get('/users', getUsers);
app.get('/users/:id', getUser);

app.get('/questions', getQuestions);
app.post('/questions', addQuestions);
app.delete('/questions/:id', deleteQuestion);
app.post('/questions/:id', editQuestion);

app.post('/courses', addCourse);
app.post('/courses/delete', deleteCourse);
app.get('/courses', getCourses);

app.post('/reset', resetPassword);
app.post('/contact', contact);

exports.api = functions.https.onRequest(app);
