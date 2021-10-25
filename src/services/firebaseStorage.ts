import { storage } from '@/contexts/FirebaseContext';

interface IFirebaseStorageService {
  uploadFile: (file: File) => Promise<string>;
  uploadMutipleFile: (file: File[]) => Promise<string[]>;
}

class FirebaseStorageService implements IFirebaseStorageService {
  uploadMutipleFile = (file: File[]) => {
    const promiseArr = file.map(this.uploadFile);
    return Promise.all(promiseArr);
  };

  uploadFile = (file: File) => {
    const fileName = file.name;
    const uploadTask = storage.ref(`/images/${fileName}`).put(file);
    // initiates the firebase side uploading
    return new Promise<string>((res, reject) => {
      uploadTask.on(
        'state_changed',
        (snapShot) => {
          // takes a snap shot of the process as it is happening
          console.log(snapShot);
        },
        (err) => {
          // catches the errors
          console.log(err);
          return reject(err);
        },
        async () => {
          // gets the functions from storage refences the image storage in firebase by the children
          // gets the download url then sets the image from firebase as the value for the imgUrl key:
          const linkUrl = await uploadTask.snapshot.ref.getDownloadURL();
          return res(linkUrl);
        },
      );
    });
  };
}

const firebaseStorageService = new FirebaseStorageService();

export default firebaseStorageService;
