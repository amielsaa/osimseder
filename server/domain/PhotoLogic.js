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

  async removePhoto(photoName) {
    try {
        housesLogger.debug('Removing photo to house: ' + photoName);
        argumentChecker.checkSingleArugments([photoName], ['photoName']);

        const photo = await Photos.destroy({
            where: {photoName: photoName},
        });

        housesLogger.debug('Successfully Removing photo to house: ' + photoName);
        return { success: true, message: 'Photo removed successfully' };
    } catch (error) {
        housesLogger.error('Failed Removing photo to house: ' + photoName + ': ' + error.message);
        throw new Error('Failed Removing photo to house: ' + photoName + ': ' + error.message);
    }
  }

  async getPhotos(houseId) {
    try {
      housesLogger.debug('Getting photos of house: ' + houseId);
      argumentChecker.checkSingleArugments([houseId], ['houseId']);

      const photos = await Photos.findAll({
        where: { houseId: houseId }
      });

      if (!photos) {
        throw new Error('Photos not found');
      }

      housesLogger.debug('Successfully Getting photos of house: ' + houseId);
      return photos;

    } catch (error) {
      housesLogger.error('Failed Getting photos of house: ' + houseId + ': ' + error.message);
      throw new Error('Failed Getting photos of house: ' + houseId + ': ' + error.message);
    }
  }
}

module.exports = new PhotoLogic();
