import type {Request, Response} from 'express';
import express from 'express';
import type {HydratedDocument} from 'mongoose';
import {Types} from 'mongoose';
import {constructFreetResponse} from '../freet/util';
import * as userValidator from '../user/middleware';
import {createFeed} from './collection';
import {isValidFreetSettings} from './middleware';
import type {PopulatedFeed} from './model';
import FeedModel from './model';
import {getFreetsForPage} from './util';

const router = express.Router();

router.post(
  '/',
  [userValidator.isUserLoggedIn, isValidFreetSettings],
  async (req: Request, res: Response) => {
    const feed = await createFeed(req.body.freets, req.body.page_length, new Types.ObjectId(req.session.userId));
    const populatedFeed: HydratedDocument<PopulatedFeed> = await feed.populate([{path: 'freets', populate: ['authorId', 'community']}, 'user']);
    res.status(200).json({
      message: 'Feed fetched successfully.',
      id: populatedFeed._id,
      freets: getFreetsForPage(populatedFeed.freets, 1, feed.settings.perPage).map(constructFreetResponse),
      loaded: feed.loaded,
      page_number: 1
    });
  }
);

router.get(
  '/',
  [userValidator.isUserLoggedIn],
  async (req: Request, res: Response) => {
    const feed = await FeedModel.findOne({user: new Types.ObjectId(req.session.userId)}).sort({loaded: -1});
    if (feed === null) {
      res.status(404).json({
        error: 'No feed exists for user.'
      });
      return;
    }

    const populatedFeed: HydratedDocument<PopulatedFeed> = await feed.populate([{path: 'freets', populate: ['authorId', 'community']}, 'user']);
    const page = parseInt(req.query.page as string, 10) || 1;

    res.status(200).json({
      id: feed._id,
      freets: getFreetsForPage(populatedFeed.freets, page, feed.settings.perPage).map(constructFreetResponse),
      loaded: populatedFeed.loaded,
      page_number: page
    });
  }
);

export default router;
