const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const profileService = require('../services/admin-side/profileService');

// GET /api/v1/admin-profiles
router.get('/admin-profiles', function(req, res) {
    profileService.getProfiles()
        .then(profiles => res.json(profiles));
});

// GET /api/v1/admin-profiles/:id
router.get('/admin-profiles/:id', function(req, res) {
    const id = req.params.id;
    profileService.getProfile(id)
        .then(profile => res.json(profile));
});

// POST /api/v1/admin-profiles
router.post('/admin-profiles', jsonParser, function(req, res) {
    profileService.addProfile(req.body)
        .then(function(profile) {
            res.json(profile);
        }, function(error) {
            res.status(400).send('Admin profile already exists');
        });
});

module.exports = router;