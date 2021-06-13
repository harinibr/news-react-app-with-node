const news = require('../controllers/news/getNews');

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Todos API!',
    }));
    //api routes for news controller
    app.get('/api/news/:country', news.getNews);
}