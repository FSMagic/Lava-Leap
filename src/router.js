var controllers = require('./controllers');

var router = function(app) {

    app.get('/', controllers.main);
    app.post('/time', controllers.updateTime);
};

module.exports = router;