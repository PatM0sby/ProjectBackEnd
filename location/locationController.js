var Location = require('./locationSchema');

exports.postLocation = function(req, res) {
    var location = new Location(req.body);

    /*///do not allow user to fake identity. The user who postet the movie must be the same user that is logged in
    if (!req.user.equals(location.user)) {
        res.sendStatus(401);
    }*/

    location.save(function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json(m);
    });
};

// Create endpoint /api/movies for GET
exports.getLocations = function(req, res) {
    Location.find(function(err, locations) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(locations);
    });
};


// Create endpoint /api/movies/:movie_id for GET
exports.getLocation = function(req, res) {
    // Use the Beer model to find a specific beer
    Location.findById(req.params.location_id, function(err, location) {
        if (err) {
            res.status(500).send(err)
            return;
        };

        res.json(location);
    });
};

//Create endpoint /api/movies/:movie_id for PUT
exports.putLocation = function(req, res) {
    // Use the Beer model to find a specific beer
    Location.findByIdAndUpdate(
       req.params.location_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, location) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(location);
        });

};

// Create endpoint /api/movies/:movie_id for DELETE
exports.deleteLocation = function(req, res) {

    Location.findById(req.params.location_id, function (err, location) {
        if (err) {
            res.status(206).send(err);
            return;
        }

        location.remove()
            .then(function () {
                res.status(200).json(location);

                console.log("deleted: " + location.name);
            })
            .catch(function (e) {
                res.status(206).json({
                    message: 'Object could not be removed!',
                    error: e
                });
            });
    });
};
