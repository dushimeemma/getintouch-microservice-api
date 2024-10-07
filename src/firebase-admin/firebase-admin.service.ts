import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseService {
  constructor() {
    const serviceAccount: any = {
      type: 'service_account',
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`,
      universe_domain: 'googleapis.com',
    };

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.FIREBASE_BUCKET,
      });
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const bucket = admin.storage().bucket();
      const filename = `${Date.now()}-${file.originalname}`;
      const fileRef = bucket.file(filename);

      await fileRef.save(file.buffer, {
        metadata: {
          contentType: file.mimetype,
        },
      });

      await fileRef.makePublic();

      return fileRef.publicUrl();
    } catch (error) {
      throw error;
    }
  }
}
