import { connect } from 'react-redux';
import { REDUCER_KEY } from '../../reducers';
import Table from './Table';

const createTable = (getStateFn, getData, sortAction) => {
  const mapStateToProps = (state, ownProps) => {
    const { error, loading, sortState, sortField } = getStateFn(state[REDUCER_KEY]);

    return {
      loading,
      error,
      data: getData(state, sortState),
      sortState,
      sortField,
      // important to set the columns here since we don't have wrapper anymore
      columns: ownProps.columns,
    };
  };

  const mapDispatchToProps = (dispatch) => ({
    sortClick: (field, sortState, sortFn) => dispatch(sortAction(field, sortState, sortFn)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Table);
};

export default createTable;