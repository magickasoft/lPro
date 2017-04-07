import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'

import offlineHOC from '../config/offlineHOC'

import UserDetail from '../components/UserDetail'
import { getUserById} from '../queries/index'

const  UserDetailOfflineHOC = offlineHOC( getUserById, {
    options: ({ navigation }) => {
        const { state } = navigation;
        const { params } = state;
        return { variables: { uid: params.uid },fetchPolicy: 'cache-and-network', }
    }
})(UserDetail);
// const UserDetailGraphQl = graphql(getUserById, {
//     options: ({ navigation }) => {
//         const { state } = navigation;
//         const { params } = state;
//         return { variables: { uid: params.uid } }
//     }
// })(UserDetail);
function stateToProps(state) {

    const { autoRehydrated } = state;
    return { autoRehydrated };
}

function dispatchToProps(dispatch) {

    const actions = Object.assign({});
    return bindActionCreators(actions, dispatch)
}

export default connect(stateToProps, dispatchToProps)(UserDetailOfflineHOC)
// export default UserDetailGraphQl;
