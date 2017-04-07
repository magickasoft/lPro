import React, { Component } from 'react';
import {
  Animated,
  Text,
  View,
  Image,
  ListView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import GiftedSpinner from 'react-native-gifted-spinner';
import Spinner from 'react-native-loading-spinner-overlay';

// import { allUsers } from '../queries/index'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const VIEWABILITY_CONFIG = {
    minimumViewTime: 3000,
    viewAreaCoveragePercentThreshold: 100,
    waitForInteraction: true,
};
class Feed extends React.Component {
    constructor(props, context) {
    super(props, context);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: this.rowHasChanged.bind(this),
      }),
    };
   // this.state.dataSource = this.getUpdatedDataStore(props);
  }
  componentWillReceiveProps(nextProps) {
    // this.setState({
    //     dataSource: this.getUpdatedDataSource(nextProps),
    // });
  }
  getUpdatedDataSource(props) {
    const { data } = props;
    let rows = data.users;
    let ids = rows.map((obj, index) => index);

    return this.state.dataSource.cloneWithRows(rows, ids);
  }
  rowHasChanged(r1, r2) {
    return JSON.stringify(r1) !== JSON.stringify(r2);
  }
  onLearnMore = (user) => {
    // this.props.navigation.navigate('Details', { ...user });
    this.props.navigation.navigate('Details', { uid: user.uid });
  };
  onButtonPress () {
    const { data } = this.props;
    //apolloClient.resetStore();
    data.refetch();
  }
  _keyExtractor = (item, index) => item.id;
    renderStats() {
        const { data } = this.props;
        const { users } = data;
        return (
            <View>
                <Text>Количество {users.length}</Text>
                <ListItem
                    key={users[0].uid}
                    roundAvatar
                    avatar={{ uri: users[0].photo_url ? users[0].photo_url : null }}
                    title={`${users[0].firstname.toUpperCase()} ${users[0].lastname.toUpperCase()}`}
                    subtitle={users[0].mail}
                    onPress={() => this.onLearnMore({ name: 'UserDetailContainer', props: {uid: parseInt(users[0].uid)}})}
                />
                <ListItem
                    key={users[1].uid}
                    roundAvatar
                    avatar={{ uri: users[1].photo_url ? users[1].photo_url : null }}
                    title={`${users[1].firstname.toUpperCase()} ${users[1].lastname.toUpperCase()}`}
                    subtitle={users[1].mail}
                    onPress={() => this.onLearnMore({ name: 'UserDetailContainer', props: {uid: parseInt(users[1].uid)}})}
                />
                <ListItem
                    key={users[2].uid}
                    roundAvatar
                    avatar={{ uri: users[2].photo_url ? users[2].photo_url : null }}
                    title={`${users[2].firstname.toUpperCase()} ${users[2].lastname.toUpperCase()}`}
                    subtitle={users[2].mail}
                    onPress={() => this.onLearnMore({ name: 'UserDetailContainer', props: {uid: parseInt(users[2].uid)}})}
                />
            </View>
        )
    }
    _scrollSinkY = Animated.event(
        [{nativeEvent: { contentOffset: { y: this._scrollPos } }}],
        {useNativeDriver: true},
    );
    _scrollPos = new Animated.Value(0);
  componentWillMount() {
      // const _this = this;
      // this.props.client.query({
      //     query: allUsers,
      // }).then((response) => {
      //     _this.setState({
      //         data: response.data,
      //     });
      // })
  }
  render() {

    const { data } = this.props;
    //const { data } = this.state;
    return (
      <View style={styles.scrollView} contentContainerStyle={{paddingBottom: 15}}>
        <Button
            onPress={this.onButtonPress.bind(this)}
            raised
            icon={{name: 'cached'}}
            title='Update data' />
        <List>
            {/*<AnimatedFlatList*/}
                {/*data={users}*/}
                {/*legacyImplementation={false}*/}
                {/*numColumns={1}*/}
                {/*onScroll={ this._scrollSinkY}*/}
                {/*refreshing={false}*/}
                {/*disableVirtualization={false}*/}
                {/*// keyExtractor={this._keyExtractor}*/}
                {/*extraData={this.state}*/}
                {/*viewabilityConfig={VIEWABILITY_CONFIG}*/}
                {/*renderItem={(user) => {*/}
                    {/*console.log('---- user', user.item);*/}
                    {/*return (*/}
                        {/*<ListItem*/}
                            {/*key={user.item.login.username}*/}
                            {/*roundAvatar*/}
                            {/*avatar={{ uri: user.item.picture ? user.item.picture.medium : null }}*/}
                            {/*title={`${user.item.name.first.toUpperCase()} ${user.item.name.last.toUpperCase()}`}*/}
                            {/*subtitle={user.item.email}*/}
                            {/*onPress={() => this.onLearnMore(user.item)}*/}
                        {/*/>*/}
                    {/*)*/}
                {/*}}*/}
            {/*/>*/}
            { data ? data.loading ?
                <GiftedSpinner />
                /*<Spinner visible={data.loading}/>*/
                :
                data.users ?
                    // this.renderStats()
                    /*data.users.map(user => (
                        <ListItem
                            key={user.uid}
                            roundAvatar
                            avatar={{ uri: user.photo_url ? user.photo_url : null }}
                            title={`${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()}`}
                            subtitle={user.mail}
                            onPress={() => this.onLearnMore(user)}
                        />
                    ))*/
                    <AnimatedFlatList
                        data={data.users}
                        legacyImplementation={false}
                        numColumns={1}
                        onScroll={ this._scrollSinkY}
                        refreshing={false}
                        disableVirtualization={false}
                        keyExtractor={this._keyExtractor}
                        extraData={this.state}
                        viewabilityConfig={VIEWABILITY_CONFIG}
                        renderItem={(user) => {
                                // console.log('---- user', user.item);
                            return (
                                <TouchableOpacity onPress={() => this.onLearnMore(user.item)} style={styles.containerPanelTop_inner}>
                                    <Image  style={styles.panelTop_innerUserImage}  source={{ uri: user.item.photo_url ? user.item.photo_url : null }}/>
                                    <View style={styles.containerPanelTop_innerDetail}>
                                        <Text
                                            numberOfLines={1}
                                            style={styles.panelTop_LabelTitle}>{`${user.item.firstname.toUpperCase()} ${user.item.lastname.toUpperCase()}`}</Text>
                                        <Text
                                            numberOfLines={1}
                                            style={styles.panelTop_LabelSubTitle}>{user.item.mail}</Text>
                                    </View>
                                </TouchableOpacity>
                                /*<ListItem
                                    key={user.item.uid}
                                    roundAvatar
                                    avatar={{ uri: user.item.photo_url ? user.item.photo_url : null }}
                                    title={`${user.item.firstname.toUpperCase()} ${user.item.lastname.toUpperCase()}`}
                                    subtitle={user.item.mail}
                                    onPress={() => this.onLearnMore(user.item)}
                                />*/
                            )
                        }}
                     />
                    /*<ListView
                        dataSource={this.state.dataSource}
                        pageSize={10}
                        removeClippedSubviews={true}
                        renderRow={(user) => (
                            <ListItem
                                key={user.uid}
                               // roundAvatar
                               // avatar={{ uri: user.photo_url ? user.photo_url : null }}
                                title={`${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()}`}
                                subtitle={user.mail}
                                onPress={() => this.onLearnMore(user)}
                            />
                        )}
                    />*/
                    : <Text>{'None'}</Text>
                : <Text>{'Reload page'}</Text>

            }
        </List>
      </View>
    );
  }
}
Feed.propTypes = {
   // data: React.PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    scrollView: {
    },
    containerPanelTop_inner: {
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent:'flex-start',
    },
    panelTop_innerUserImage: {
        height:70,
        width:70,
        borderRadius: 35,
        marginRight: 10,
    },
    containerPanelTop_innerDetail: {
        flex: 1,
        flexDirection: 'column',
        justifyContent:'center',
    },
    panelTop_LabelTitle:{
        color: '#000000',
        fontSize: 18,
    },
    panelTop_LabelSubTitle:{
        color: '#000000',
        fontSize: 14,
        opacity: 0.8,
    },
});
export default Feed;
