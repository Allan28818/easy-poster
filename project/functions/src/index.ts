import * as functions from "firebase-functions";

import { credential, initializeApp, firestore } from "firebase-admin";
import { onFollowUserModuleFunction } from "./functionsCode/onFollowUserModule";
import { onUnfollowUserModuleFunction } from "./functionsCode/onUnfollowUserModule";
import { PropsReturn } from "./models/core.response";
const serviceAccount = require("../service-account.json");

initializeApp({
  credential: credential.cert(serviceAccount),
});

const db = firestore();

export const onFollowUser = functions.https.onCall(
  async (data, context): Promise<PropsReturn> => {
    if (!context.auth) {
      throw new Error("User not authenticated (context.auth = undfined)");
    }
    const response = await onFollowUserModuleFunction({
      newFollowerId: data.body.newFollowerId,
      userFollowedId: data.body.userFollowedId,
      db,
    });

    return response;
  }
);

export const onUnfollowUser = functions.https.onCall(
  async (data, context): Promise<PropsReturn> => {
    if (!context.auth) {
      throw new Error("User not authenticated (context.auth = undfined)");
    }

    const response = await onUnfollowUserModuleFunction({
      accountToUnfollowId: data.body.accountToUnfollowId,
      unfollowRequesterId: data.body.unfollowRequesterId,
      db,
    });

    return response;
  }
);
