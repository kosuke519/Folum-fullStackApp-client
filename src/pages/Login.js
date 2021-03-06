import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let history = useHistory();

  const login = () => {
    const data = { username: username, password: password };
    axios
      .post("https://forum-5.herokuapp.com/auth/login", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          history.push("/");
        }
      });
  };
  return (
    <div className="formContainer">
      　<label>ユーザーネーム</label>
      <input
        id="inputCreatePost"
        type="text"
        placeholder="ユーザーネームを入力してください"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>パスワード</label>
      <input
        id="inputCreatePost"
        type="password"
        placeholder="パスワードを入力してください"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button onClick={login}>ログイン</button>
    </div>
  );
}

export default Login;
