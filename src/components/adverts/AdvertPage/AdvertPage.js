import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import useMutation from "../../../hooks/useMutation";
import { advertLoad } from "../../../store/actions";
// import useQuery from "../../../hooks/useQuery";
import { getAdvertDetail, getUi } from "../../../store/selectors";
import { deleteAdvert } from "../service";
import AdvertDetail from "./AdvertDetail";

function AdvertPage() {
  const { advertId } = useParams();
  const dispatch = useDispatch();
  const { isLoadding } = useSelector(getUi);

  const advert = useSelector(getAdvertDetail(advertId));
  console.log(isLoadding);
  // const navigate = useNavigate();
  // const getAdvertById = useCallback(() => getAdvert(advertId), [advertId]);

  // const { isLoading, data: advert } = useQuery(getAdvertById);
  useEffect(() => {
    dispatch(advertLoad(advertId));
  }, [dispatch, advertId]);

  const mutation = useMutation(deleteAdvert);

  const handleDelete = () => {
    console.log(advertId);
    // dispatch(advertDeleted(advertId));
    // mutation.execute(advertId).then(() => navigate("/"));
  };

  if (isLoadding) {
    return "Loading...";
  }

  return (
    advert && (
      <AdvertDetail
        onDelete={handleDelete}
        isLoading={mutation.isLoading}
        {...advert}
      />
    )
  );
}

export default AdvertPage;
