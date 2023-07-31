import * as FIREBASE_CERTIFICATE from "../../../certification.json";
import { ServiceAccount } from "firebase-admin";

interface IFirebaseConfig {
  clientEmail: string;
  privateKey: string;
  projectId: string;
  databaseURL?: string;
}

export const firebaseConfig: IFirebaseConfig = {
  clientEmail: FIREBASE_CERTIFICATE.client_email,
  privateKey: FIREBASE_CERTIFICATE.private_key,
  projectId: FIREBASE_CERTIFICATE.project_id,
  databaseURL: 'https://xxxxx.firebaseio.com'
};

