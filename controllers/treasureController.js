const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models");
const geolib = require("geolib");

const degreesToRadians = (degrees) => (degrees / 180.0) * Math.PI;

exports.post = (req, res, next) => {
  models.Treasures.create(req.body)
    .then((result) => {
      res.json({ success: true, status: "Created Successfully" });
    })
    .catch((err) => {
      res.json({ error: true, message: err });
    });
};

exports.get = (req, res, next) => {
  models.Treasures.findAll()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ error: true, message: err });
    });
};
exports.findTreasure = (req, res, next) => {
  try {
    let { latitude, longitude, distance, prize } = req.query;
    //validation
    let message = validate(latitude, longitude, distance, prize);

    if (message !== null) {
      res.json({ error: true, message: message });
    }

    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);
    distance = parseInt(distance);
    prize = parseInt(prize);

    const minLat = latitude - distance / 111.12;
    const maxLat = latitude + distance / 111.12;

    const minLon =
      longitude -
      distance / (Math.abs(Math.cos(degreesToRadians(longitude))) * 111.12);

    const maxLon =
      longitude +
      distance / (Math.abs(Math.cos(degreesToRadians(longitude))) * 111.12);

    if (prize !== undefined && prize !== null && !isNaN(prize)) {
      models.Treasures.findAll({
        where: {
          latitude: {
            [Op.gte]: minLat,
            [Op.lte]: maxLat,
          },
          longitude: {
            [Op.gte]: minLon,
            [Op.lte]: maxLon,
          },
        },
      })
        .then((result) => {
          let list = filterResults(latitude, longitude, distance, result);
          var ids = [];
          list.forEach((treasure) => {
            ids.push(treasure.dataValues.id);
          });
          models.Money_Values.findAll({
            attributes: [
              "treasure_id",
              [Sequelize.fn("min", Sequelize.col("amt")), "minprize"],
            ],
            group: ["treasure_id"],
            having: Sequelize.literal("min(amt) >=" + prize),
            raw: true,
            where: {
              treasure_id: ids,
            },
          })
            .then((prizes) => {
              var selectedIds = [];
              prizes.forEach((res) => {
                selectedIds.push(res.treasure_id);
              });

              var output = [];
              list.forEach((r) => {
                const index = selectedIds.indexOf(r.dataValues.id);
                if (index !== -1) {
                  output.push({
                    ...r.dataValues,
                    prize: prizes[index].minprize,
                  });
                }
              });
              res.json(output);
            })
            .catch((err) => {
              console.log(err);
              res.json({ error: true, message: err });
            });
        })
        .catch((err) => {
          res.json({ error: true, message: err });
        });
    } else {
      models.Treasures.findAll({
        where: {
          latitude: {
            [Op.gte]: minLat,
            [Op.lte]: maxLat,
          },
          longitude: {
            [Op.gte]: minLon,
            [Op.lte]: maxLon,
          },
        },
      })
        .then((result) => {
          res.json(filterResults(latitude, longitude, distance, result));
        })
        .catch((err) => {
          res.json({ error: true, message: err });
        });
    }
  } catch (e) {
    console.log(e);
  }
};

const validate = (latitude, longitude, distance, prize) => {
  if (latitude == null || longitude == null || distance == null) {
    return "All three parameters latitude, longitude and distance are mandatory";
  }

  if (
    isNaN(latitude) ||
    isNaN(longitude) ||
    isNaN(distance) ||
    (prize !== undefined && isNaN(prize))
  ) {
    return "Atleast one of the parameter is not a number";
  }

  if (!(parseInt(distance) == 1 || parseInt(distance) == 10)) {
    return "distance only accepts 1 or 10 kms";
  }

  if (prize != null) {
    const floatPrize = parseFloat(prize);
    if (floatPrize % 1 !== 0) {
      return "prize only accepts whole numbers";
    }

    if (floatPrize < 10 || floatPrize > 30) {
      return " prize should be between 10 and 30 inclusive";
    }
  }
  return null;
};

const filterResults = (latitude, longitude, radius, list) => {
  let finalList = [];
  list.forEach((treasure) => {
    try {
      var dist =
        geolib.distanceConversion.km *
        geolib.getDistance(
          { latitude, longitude },
          {
            latitude: treasure.dataValues.latitude,
            longitude: treasure.dataValues.longitude,
          }
        );
    } catch (err) {
      console.log(err);
    }
    if (dist < radius) {
      finalList.push(treasure);
    }
  });
  return finalList;
};
