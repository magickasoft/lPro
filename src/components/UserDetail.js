import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import GiftedSpinner from 'react-native-gifted-spinner';
import Spinner from 'react-native-loading-spinner-overlay';

import Row from './Row'
import Header from './Header'
import SectionHeader from './SectionHeader'
import Footer from './Footer'
import demoData from '../data'


class UserDetail extends React.Component {
  constructor(props){
    super(props);
    const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];

    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
        getSectionData,
        getRowData,
    });

    const { dataBlob, sectionIds, rowIds } = this.formatData(demoData);
    this.state = {
        visible : true,
        dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds)
    };
  }
  formatData(data) {
    // We're sorting by alphabetically so we need the alphabet
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // Need somewhere to store our data
    const dataBlob = {};
    const sectionIds = [];
    const rowIds = [];

    // Each section is going to represent a letter in the alphabet so we loop over the alphabet
    for (let sectionId = 0; sectionId < alphabet.length; sectionId++) {
        // Get the character we're currently looking for
        const currentChar = alphabet[sectionId];

        // Get users whose first name starts with the current letter
        const users = data.filter((user) => user.name.first.toUpperCase().indexOf(currentChar) === 0);

        // If there are any users who have a first name starting with the current letter then we'll
        // add a new section otherwise we just skip over it
        if (users.length > 0) {
            // Add a section id to our array so the listview knows that we've got a new section
            sectionIds.push(sectionId);

            // Store any data we would want to display in the section header. In our case we want to show
            // the current character
            dataBlob[sectionId] = { character: currentChar };

            // Setup a new array that we can store the row ids for this section
            rowIds.push([]);

            // Loop over the valid users for this section
            for (let i = 0; i < users.length; i++) {
                // Create a unique row id for the data blob that the listview can use for reference
                const rowId = `${sectionId}:${i}`;

                // Push the row id to the row ids array. This is what listview will reference to pull
                // data from our data blob
                rowIds[rowIds.length - 1].push(rowId);

                // Store the data we care about for this row
                dataBlob[rowId] = users[i];
            }
        }
    }

    return { dataBlob, sectionIds, rowIds };
  }
  renderUserInfo(user){
      return (
        <View>
            <Tile
                imageSrc={{ uri: user.photo_url}}
                featured
                title={`${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()}`}
                caption={user.mail}
            />

            <List>
                <ListItem
                    title="Email"
                    rightTitle={user.mail}
                    hideChevron
                />
                {/*<ListItem*/}
                {/*title="Phone"*/}
                {/*rightTitle={phone}*/}
                {/*hideChevron*/}
                {/*/>*/}
            </List>

            <List>
                <ListItem
                    title="Username"
                    rightTitle={user.name}
                    hideChevron
                />
            </List>

            <List>
                <ListItem
                    title="Birthday"
                    rightTitle={user.birthday}
                    hideChevron
                />
                <ListItem
                    title="City"
                    rightTitle={user.city.name}
                    hideChevron
                />
            </List>
        </View>
      )
  }
  render() {
    const { data } = this.props;

    return (
      <ScrollView>
          { data ? data.loading ?
              <List><GiftedSpinner /></List>
              /*<Spinner visible={data.loading}/>*/
              :
              data.user ? this.renderUserInfo(data.user) : <Text>{'None User'}</Text>
              : <Text>{'Reload page'}</Text>

          }
          {/*<View style={styles.container}>
              <ListView
                  style={styles.container}
                  dataSource={this.state.dataSource}
                  renderRow={(data) => <Row {...data} />}
                  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                  renderHeader={() => <Header />}
                  renderFooter={() => <Footer />}
                  renderSectionHeader={(sectionData) => <SectionHeader {...sectionData} />}
              />
          </View>*/}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
    scrollView: {
    },
    container: {
        flex: 1,
        marginTop: 20,
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#8E8E8E',
    },
});
export default UserDetail;
