const { Photos } = require('../models');
const { housesLogger } = require('../utils/Logger');
const argumentChecker = require('./utils/ArgumentChecker');

class PhotoLogic {
  async addPhoto(houseId, photoName) {
    try {
      housesLogger.debug('Adding photo to house: ' + houseId);
      argumentChecker.checkSingleArugments([houseId], ['houseId']);

      const photo = await Photos.create({
        photoName: photoName,
        // photoPath: '../uploads/' + photoName,
        houseId: houseId,
      });

      if (!photo) {
        throw new Error('Photo not created');
      }

      housesLogger.debug('Successfully added photo to house: ' + houseId);
      return photo;
    } catch (error) {
      housesLogger.error('Failed Adding photo to house: ' + houseId + ': ' + error.message);
      throw new Error('Failed Adding photo to house: ' + houseId + ': ' + error.message);
    }
  }
}

module.exports = new PhotoLogic();
