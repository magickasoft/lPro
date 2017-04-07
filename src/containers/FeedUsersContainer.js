import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { graphql, compose, withApollo } from 'react-apollo'

import offlineHOC from '../config/offlineHOC'

import First_tab from '../components/FeedUsers'
import { allUsers } from '../queries/index'


const  First_tabOfflineHOC = offlineHOC( allUsers, {
    options: {
    //fetchPolicy: 'cache-and-network',
}})(First_tab);
// const First_tabGraphQl = graphql(allUsers, {
//     options: {
//         //fetchPolicy: 'cache-and-network',
//     }})(First_tab);
function stateToProps(state) {

    const { autoRehydrated } = state;
    return { autoRehydrated };
}

function dispatchToProps(dispatch) {

    const actions = Object.assign({});
    return bindActionCreators(actions, dispatch)
}

export default connect(stateToProps, dispatchToProps)(First_tabOfflineHOC)
// export default withApollo(First_tabGraphQl);
