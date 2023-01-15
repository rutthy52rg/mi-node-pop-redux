import T from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getIsLogged } from "../../../store/selectors";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isLogged = useSelector(getIsLogged);

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

RequireAuth.propTypes = {
  children: T.node,
};

export default RequireAuth;
