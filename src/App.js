import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  useEffect(() => {
    axios
      .get("https://forum-5.herokuapp.com/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            {!authState.status ? (
              <>
                <Link to="/login">ログイン</Link>
                <Link to="/registration">会員登録</Link>
              </>
            ) : (
              <>
                <Link to="/">ホームページ</Link>
                <Link to="/createpost">投稿する</Link>
              </>
            )}

            <h1 className="navUser">{authState.username}</h1>
            {authState.status && (
              <button className="logout" onClick={logout}>
                ログアウト
              </button>
            )}
          </div>

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createpost" component={CreatePost} />
            <Route path="/post/:id" component={Post} />
            <Route path="/registration" component={Registration} />
            <Route path="/login" component={Login} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/changepassword" component={ChangePassword} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
