import { NextFunction, Request, Response } from 'express';
import { Expo } from 'expo-server-sdk';

import handleControllerError from '../utils/handleControllerError';
import UserRepository from '../../repository/User';

import getPushResultsFromProviders from './getPushResultsFromProviders';
import removeTokensNotRegistered from './removeTokensNotRegistered';
import getErrorsFromProviders from './getErrorsFromProviders';
import getPushResultsFromExpo from './getPushResultsFromExpo';
import buildNotifications from './buildNotifications';
import sendNotifications from './sendNotifications';
import getValidTokens from './getValidTokens';

const expo = new Expo();

const send = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  try {
    const { tokens, title, body } = req.body;

    if (!title || !body || !tokens) {
      return res.status(400).send({
        error: 'Tokens, title or body missed.',
      });
    }

    const users = await UserRepository.read();

    const validTokens = getValidTokens(tokens, users);
    const notifications = buildNotifications(validTokens, body, title);

    const tickets = await sendNotifications(expo, notifications);

    const resultsFromExpo = getPushResultsFromExpo(tickets);
    const resultsFromProvider = await getPushResultsFromProviders(expo, resultsFromExpo.validTickets);
    const errorsFromProvider = getErrorsFromProviders(resultsFromProvider);

    const ticketsNotRegistered = [...resultsFromExpo.ticketsNotRegistered, ...errorsFromProvider.ticketsNotRegistered];
    const ticketsWithErrors = [...resultsFromExpo.ticketsWithErrors, ...errorsFromProvider.ticketsWithErrors];

    if (ticketsNotRegistered.length) {
      await removeTokensNotRegistered(ticketsNotRegistered, users);
    }

    return res.status(200).send({
      ticketsNotRegistered,
      ticketsWithErrors,
    });
  } catch (err) {
    handleControllerError(err, next);
  }
};

export default {
  send,
};
