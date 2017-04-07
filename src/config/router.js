import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

// import Feed from '../screens/Feed';
import Feed from '../containers/FeedUsersContainer';
import Settings from '../screens/Settings';
// import UserDetail from '../screens/UserDetail';
import UserDetail from '../containers/UserDetailContainer';
import Me from '../screens/Me';

export const FeedStack = StackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      title: 'Feed',
    },
  },
  // Details: {
  //   screen: UserDetail,
  //   navigationOptions: {
  //     title: ({ state }) => `${state.params.name.first.toUpperCase()} ${state.params.name.last.toUpperCase()}`
  //   },
  // },
}, {
    mode: 'modal',
    headerMode: 'none',
});

export const Tabs = TabNavigator({
  Feed: {
    screen: FeedStack,
    navigationOptions: {
        tabBar: {
        label: 'Feed',
        icon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
      },
    },
  },
  Me: {
    screen: Me,
    navigationOptions: {
      title: 'MEE',
        tabBar: {
        label: 'Me',
        icon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
      },
    },
  },
});

export const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
    },
  },
}, {
    mode: 'modal',
    headerMode: 'none',
});

export const DetailsStack = StackNavigator({
    Details: {
        screen: UserDetail,
        navigationOptions: {
            cardStack: {
                gesturesEnabled: true,
            },
            //title: ({ state }) => `${state.params.firstname.toUpperCase()} ${state.params.lastname.toUpperCase()}`
        },
    },
}, {
    mode: 'card',
    headerMode: 'none',
});


export const Root = StackNavigator({
  FeedStack: {
    screen: FeedStack,
  },
  Details: {
    screen: DetailsStack,
  },
}, {
  // mode: 'modal',
  // headerMode: 'none',
});
