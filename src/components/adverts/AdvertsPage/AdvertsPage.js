import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { advertsLoad } from "../../../store/actions";
import { getAdverts, getUi } from "../../../store/selectors";
import storage from "../../../utils/storage";
import AdvertsList from "./AdvertsList";
import EmptyList from "./EmptyList";
import { defaultFilters, filterAdverts } from "./filters";
import FiltersForm from "./FiltersForm";

const getFilters = () => storage.get("filters") || defaultFilters;
const saveFilters = (filters) => storage.set("filters", filters);

function AdvertsPage({ onAdvertsLoaded, adverts, ...props }) {
  const [filters, setFilters] = useState(getFilters);
  // const { isLoading, data: adverts = [] } = useQuery(getAdverts);
  const { isLoadding } = useSelector(getUi);

  useEffect(() => {
    onAdvertsLoaded();
    saveFilters(filters);
  }, [onAdvertsLoaded, filters]);

  const filteredAdverts = filterAdverts(adverts, filters);

  if (isLoadding) {
    return "Loading...";
  }

  return (
    <>
      {adverts.length > 0 && (
        <FiltersForm
          initialFilters={filters}
          defaultFilters={defaultFilters}
          prices={adverts.map(({ price }) => price)}
          onFilter={setFilters}
        />
      )}
      {filteredAdverts.length ? (
        <AdvertsList adverts={filteredAdverts} {...props} />
      ) : (
        <EmptyList advertsCount={adverts.length} />
      )}
    </>
  );
}

const mapStateToProps = (state, ownProps) => ({
  // tweets: state.tweets,
  adverts: getAdverts(state),
});
const mapDispatchToProps = { onAdvertsLoaded: advertsLoad };

const connectedAdvertsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvertsPage);

export default connectedAdvertsPage;
