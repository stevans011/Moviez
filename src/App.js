import { useState, useEffect } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { Routes, Route } from "react-router-dom";

// import page components
import { Home } from "./pages/Home";

import { Signup } from "./pages/Signup";
import { Signout } from "./pages/Signout";
import { Signin } from "./pages/Signin";
import { Details } from "./pages/Details";
import { Profile } from "./pages/Profile";

//updates DW
import { Experiences } from "./pages/Experiences";
import { Deals } from "./pages/Deals";
import { Cinema } from "./pages/Cinema";
import { Cart } from "./pages/Cart";

// import firebase
import { initializeApp } from "firebase/app";
import { FirebaseConfig } from "./config/FirebaseConfig";
// import firebase firestore
import { getFirestore, getDocs, collection, doc, getDoc } from "firebase/firestore";
// import firebase auth
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updatePassword,
  updateEmail,
} from "firebase/auth";

import { Movies } from "./pages/Movies";
import { useRecoilState, useSetRecoilState } from "recoil";
import { moviesAtom, genresAtom, filteredAtom } from "./states/movies";

// initialise Firebase
const FBapp = initializeApp(FirebaseConfig);
// initialise Firebase Auth
const FBauth = getAuth(FBapp);
// initialise FireStore Database
const FBdb = getFirestore(FBapp);

// function to create user account
const signup = (email, password) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(FBauth, email, password)
      .then((userCredential) => resolve(userCredential.user))
      .catch((error) => {
        // console.log(error)
        reject(error);
      });
  });
};

const signin = (email, password) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(FBauth, email, password)
      .then((userCredential) => resolve(userCredential.user))
      .catch((error) => reject(error));
  });
};

const signoutuser = () => {
  return new Promise((resolve, reject) => {
    signOut(FBauth)
      .then(() => resolve(true))
      .catch((error) => reject(error));
  });
};

const updateUserEmail = (user, email) => {
  return new Promise((resolve, reject) => {
    updateEmail(user, email)
      .then((r) => {
        resolve(true);
      })
      .catch((err) => reject(err));
  });
};
const updateUserPassword = (user, pwd) => {
  return new Promise((resolve, reject) => {
    updatePassword(user, pwd)
      .then(() => resolve(true))
      .catch((err) => reject(err));
  });
};

const RightNavData = [
  { name: "Cinema", path: "/cinema", icon: "fa-solid fa-map-location-dot", public: true },
  { name: "Cart", path: "/cart", icon: "fa-solid fa-cart-shopping", public: true },
  { name: "Sign In", path: "/signin", icon: "fa-solid fa-user", public: true },
];

const LeftNavData = [
  { name: "Movies", path: "/Movies", public: true },
  { name: "Experiences", path: "/experiences", public: true },
  { name: "Deals", path: "/deals", public: true },
];

const NavDataAuth = [
  { name: "Cinema", path: "/cinema", icon: "fa-solid fa-map-location-dot", public: true },
  { name: "Cart", path: "/cart", icon: "fa-solid fa-cart-shopping", public: true },
  { name: "Profile", path: "/profile", icon: "fa-solid fa-user", public: true },
  { name: "Sign Out", path: "/signout", icon: "fa-solid fa-user", public: true },
];

function App() {
  const [auth, setAuth] = useState();
  const [rightNav, setRightNav] = useState(RightNavData);
  const [leftNav, setLeftNav] = useState(LeftNavData);
  // const [data, setData] = useState([]);
  // const [filterData, setFilterData] = useState([]);

  const setMovies = useSetRecoilState(moviesAtom);
  const setFiltered = useSetRecoilState(filteredAtom);
  const setGenres = useSetRecoilState(genresAtom);

  useEffect(() => {
    getDataCollection("movies");
  }, []);

  // an observer to determine user's authentication status
  onAuthStateChanged(FBauth, (user) => {
    if (user) {
      // visitor is authenticated
      // console.log(user)
      setAuth(user);
      setLeftNav(LeftNavData);
      setRightNav(NavDataAuth);
    } else {
      // if user is null means visitor is not authenticated
      // console.log('not signed in')
      setAuth(null);
      setLeftNav(LeftNavData);
      setRightNav(RightNavData);
    }
  });

  const getDataCollection = async (path) => {
    const collectionData = await getDocs(collection(FBdb, path));

    let dbItems = [];
    collectionData.forEach((doc) => {
      let item = doc.data();
      item.id = doc.id;
      dbItems.push(item);
    });
    setMovies(dbItems);
    setFiltered(dbItems);

    const filterItems = [];
    collectionData.forEach((doc) => {
      const item = doc.data();
      if (item.genre) {
        item.genre.forEach((g) => {
          if (g) {
            if (!filterItems.includes(g)) {
              filterItems.push(g);
            }
          }
        });
      }
    });

    setGenres(filterItems);
    // return dbItems
  };

  //db.collection("app").document("users").collection(uid).document("notifications")

  const getDocument = async (col, id) => {
    const docRef = doc(FBdb, col, id);
    const docData = await getDoc(docRef);
    if (docData.exists()) {
      const collectionData = await getDocs(collection(FBdb, `movies/${id}/reviews`));
      let dbItems = [];
      let movieData = docData.data();
      collectionData.forEach((doc) => {
        let item = doc.data();
        item.id = doc.id;
        dbItems.push(item);
      });
      movieData.reviews = dbItems;
      return movieData;
    } else {
      return null;
    }
  };

  return (
    <div className="App">
      <Header title="BRAND" rightnav={rightNav} leftnav={leftNav} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />

        <Route path="/signup" element={<Signup handler={signup} />} />
        <Route path="/signout" element={<Signout handler={signoutuser} auth={auth} />} />
        <Route path="/signin" element={<Signin handler={signin} />} />
        <Route
          path="/profile"
          element={
            <Profile
              auth={auth}
              updateEmail={updateUserEmail}
              updatePassword={updateUserPassword}
            />
          }
        />
        <Route path="/movie/:movieId" element={<Details getter={getDocument} />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/cinema" element={<Cinema />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer year="2022" />
    </div>
  );
}

export default App;
