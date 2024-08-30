import express from 'express';
import mongoose from 'mongoose';
import {Shortener} from '../types';
import Link from '../models/Link';

const linksRouter = express.Router();

linksRouter.post('/links', async (req, res, next) => {
  try {
    const randomShortLink = (length: number) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };

    let shortUrl = randomShortLink(7);
    let isUnique = false;

    while (!isUnique) {
      const existingShortUrl = await Link.findOne({ shortUrl });
      if (!existingShortUrl) {
        isUnique = true;
      } else {
        shortUrl = randomShortLink(7);
      }
    }

    const newLink: Shortener = {
      shortUrl,
      originalUrl: req.body.url,
    };

    const link = new Link(newLink);
    await link.save();

    return res.send(link);
  } catch (error) {
    if(error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    next(error);
  }
});

linksRouter.get('/:id', async (req, res, next) => {
  try {
    const link = await Link.findOne({shortUrl: req.params.id});

    if(link === null) {
      return res.status(404).send({error: 'URL not found'});
    }

    return res.status(301).redirect(link.originalUrl);
  } catch (error) {
    next(error);
  }
});

export default linksRouter;