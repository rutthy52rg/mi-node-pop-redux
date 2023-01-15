import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { advertDeleted, advertLoad } from "../../../store/actions";
// import useQuery from "../../../hooks/useQuery";
import { getAdvertDetail, getUi } from "../../../store/selectors";
import AdvertDetail from "./AdvertDetail";

function AdvertPage() {
  const { advertId } = useParams();
  const dispatch = useDispatch();
  const { isLoadding } = useSelector(getUi);

  const advert = useSelector(getAdvertDetail(advertId));
  console.log(isLoadding);

  useEffect(() => {
    dispatch(advertLoad(advertId));
  }, [dispatch, advertId]);

  const handleDelete = () => {
    console.log(advertId);
    dispatch(advertDeleted(advertId));
  };

  if (isLoadding) {
    return "Loading...";
  }

  return (
    advert && (
      <AdvertDetail
        onDelete={handleDelete}
        isLoading={isLoadding}
        {...advert}
      />
    )
  );
}

export default AdvertPage;
