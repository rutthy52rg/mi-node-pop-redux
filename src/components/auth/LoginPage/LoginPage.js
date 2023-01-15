import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authLogin, uiResetError } from "../../../store/actions";
import { getUi } from "../../../store/selectors";
import LoginForm from "./LoginForm";

function LoginPage({ ...props }) {
  const { isLoadding, error } = useSelector(getUi);
  const dispatch = useDispatch();
  const handleSubmit = (credentials) => {
    dispatch(authLogin(credentials));
  };
  const resetErrorHandle = () => {
    dispatch(uiResetError());
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} isLoading={isLoadding} />
      {isLoadding && <p>...login in nodepop</p>}
      {error && (
        <div onClick={resetErrorHandle} style={{ color: "red" }}>
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
