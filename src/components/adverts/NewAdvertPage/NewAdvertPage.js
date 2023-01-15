import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import useMutation from "../../../hooks/useMutation";
import { advertCreated } from "../../../store/actions";
import { getUi } from "../../../store/selectors";
// import { createAdvert } from "../service";
import NewAdvertForm from "./NewAdvertForm";

function NewAdvertPage() {
  // const navigate = useNavigate();
  // const { execute } = useMutation(createAdvert);
  const { isLoadding } = useSelector(getUi);
  const dispatch = useDispatch();

  const handleSubmit = (newAdvert) => {
    console.log("new", newAdvert);
    dispatch(advertCreated(newAdvert));
    // execute(newAdvert).then(({ id }) => navigate(`/adverts/${id}`));
  };

  return <NewAdvertForm onSubmit={handleSubmit} isLoading={isLoadding} />;
}

export default NewAdvertPage;
