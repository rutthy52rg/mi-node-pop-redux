import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import useMutation from "../../../hooks/useMutation";
import { advertLoad } from "../../../store/actions";
// import useQuery from "../../../hooks/useQuery";
import { getAdvertDetail } from "../../../store/selectors";
import { deleteAdvert } from "../service";
import AdvertDetail from "./AdvertDetail";

function AdvertPage() {
  const { advertId } = useParams();
  const dispatch = useDispatch();
  const advert = useSelector(getAdvertDetail(advertId));
  console.log(advert);
  // const navigate = useNavigate();
  // const getAdvertById = useCallback(() => getAdvert(advertId), [advertId]);

  // const { isLoading, data: advert } = useQuery(getAdvertById);
  useEffect(() => {
    dispatch(advertLoad(advertId));
  }, [dispatch, advertId]);

  const mutation = useMutation(deleteAdvert);

  const handleDelete = () => {
    // mutation.execute(advertId).then(() => navigate("/"));
  };

  // if (!isLoaded) {
  //   return "Loading...";
  // }

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
