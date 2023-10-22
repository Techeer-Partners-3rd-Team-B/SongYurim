import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsCEwBvtTp-9lDw2kb9On1wsCwl8oUMyQ",
  authDomain: "nwitter-reloaded-7f8e0.firebaseapp.com",
  projectId: "nwitter-reloaded-7f8e0",
  storageBucket: "nwitter-reloaded-7f8e0.appspot.com",
  messagingSenderId: "308164398439",
  appId: "1:308164398439:web:b1dd0de77e08d1a7b173c2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);