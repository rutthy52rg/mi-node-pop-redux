import T from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { authLogout } from "../../../store/actions";
import { getIsLogged } from "../../../store/selectors";
import { ConfirmationButton } from "../../common";
import { AuthConsumer } from "../context";
// import { logout } from "../service";

const AuthButton = ({ handleLogout }) => {
  // const mutation = useMutation(logout);
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();
  const handleLogoutConfirm = async () => {
    await dispatch(authLogout());
  };

  return isLogged ? (
    <ConfirmationButton
      confirmation="Are you sure?"
      onConfirm={handleLogoutConfirm}
    >
      Logout
    </ConfirmationButton>
  ) : (
    <Link to="/login">Login</Link>
  );
};

AuthButton.propTypes = {
  handleLogout: T.func.isRequired,
  isLogged: T.bool,
};

AuthButton.defaultProps = {
  isLogged: false,
};

const ConnectedAuthButton = (props) => (
  <AuthConsumer>{(auth) => <AuthButton {...auth} {...props} />}</AuthConsumer>
);

export default ConnectedAuthButton;
