module.exports = (app) => {
    app.get('/profeflix/ping', (req, res) => res.status(200).send({
        message: 'Health check ping endpoint',
    }));
};
