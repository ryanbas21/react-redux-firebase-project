import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from '../../components';
import * as modalActionCreators from '../../redux/modules/modal';
import * as duckActionCreators from '../../redux/modules/ducks';

const mapStateToProps = ({ modal, users }) => {
  const ducktextLength = modal.duckText.length;
  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
    duckText: modal.duckText,
    isOpen: modal.isOpen,
    isSubmitDisabled: ducktextLength <= 0 || ducktextLength > 140
  };
};
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...modalActionCreators,
    ...duckActionCreators
  },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
