const UserController = require('../controllers/user.controller');

module.exports = app => {
    app.get('/api/users/all', UserController.getAllUsers);
    app.get('/api/users/getloggedinuser', UserController.getLoggedInUser);
    app.get('/api/users/logout', UserController.logoutUser);
    app.post('/api/users/register', UserController.registerUser);
    app.post('/api/users/login', UserController.loginUser);
    app.delete('/api/users/delete/:_id', UserController.deleteUser);
}