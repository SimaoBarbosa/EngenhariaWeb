var express = require('express');
var router = express.Router();
var app = require('../app.js');
const NotificationController = require('../controllers/notification');

// get notifications of a user
router.get('/user/:oid', async (req, res) => {
    let userId = req.params.oid
    NotificationController.notificationsUser(userId).then(notifications => {
      res.send(JSON.stringify({notifications}));
    });
});

module.exports = router;