import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Season from '../models/seasonModel.js';
import { isAdmin, isAuth} from '../utils.js';

const seasonRouter = express.Router();

seasonRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const seasons = await Season.find({})      
    res.send(seasons);
  })
);


seasonRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const season = await Season.findById(req.params.id);
    if (season) {
      res.send(season);
    } else {
      res.status(404).send({ message: 'Season Not Found' });
    }
  })
);



seasonRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const season = new Season({
        title: 'sample name ' + Date.now(),
        image: '/images/p1.jpg',
      });
      const createdSeason = await season.save();
      res.send({ message: 'Season Created', season: createdSeason });
    })
  );



seasonRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const seasonId = req.params.id;
    const season = await Season.findById(seasonId);
    if (season) {
      season.title = req.body.title;
      season.image = req.body.image;
      const updatedSeason = await season.save();
      res.send({ message: 'Season Updated', season: updatedSeason });
    } else {
      res.status(404).send({ message: 'Season Not Found' });
    }
  })
);

seasonRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const season = await Season.findById(req.params.id);
    if (season) {
      const deleteSeason = await season.remove();
      res.send({ message: 'season Deleted', season: deleteSeason });
    } else {
      res.status(404).send({ message: 'Season Not Found' });
    }
  })
);

export default seasonRouter;
