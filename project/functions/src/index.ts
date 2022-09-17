import * as functions from "firebase-functions";

import admin from "firebase-admin";
import { onFollowUserModuleFunction } from "./functionsCode/onFollowUserModule";
import { onUnfollowUserModuleFunction } from "./functionsCode/onUnfollowUserModule";
import { PropsReturn } from "./models/core.response";
const serviceAccount = require("../service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export const onFollowUser = functions.https.onCall(
  async (data, context): Promise<PropsReturn> => {
    if (!context.auth) {
      throw new Error("User not authenticated (cotext.auth = undfined)");
    }
    const response = await onFollowUserModuleFunction({
      newFollowerId: data.newFollowerId,
      userFollowedId: data.userFollowedId,
      db,
    });

    return response;
  }
);

export const onUnfollowUser = functions.https.onCall(
  async (data, context): Promise<PropsReturn> => {
    if (!context.auth) {
      throw new Error("User not authenticated (cotext.auth = undfined)");
    }

    const response = await onUnfollowUserModuleFunction({
      accountToUnfollowId: data.accountToUnfollowId,
      unfollowRequesterId: data.unfollowRequesterId,
      db,
    });

    return response;
  }
);
