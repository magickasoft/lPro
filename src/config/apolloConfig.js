import { ApolloClient, createNetworkInterface } from 'react-apollo';

const networkInterface = createNetworkInterface({
    //uri: 'http://192.168.0.12:3000/graphql' //to test server
    uri: 'http://192.168.0.12:80/c_graphql',
    opts: {method: 'POST'}
});

const dataIdFromObject = (data) => {
    switch (data.__typename) {
        case 'User':
            return `User#${data.uid}`;

        case 'Event':
            if (data.type && data.timestamp && data.entity ) {
                const entity_id = dataIdFromObject(data.entity);
                if (entity_id) {
                    return `Event#${data.type}#${data.timestamp}#${entity_id}`;
                }
            }
            break;

        case 'EventMetadata':
            if (data.event_key) {
                return `EventMetadata#${data.event_key}`;
            }
            break;

        case 'Timestamp':
            if (data.timestamp) {
                return `Timestamp#${data.timestamp}`;
            }
            break;
    }

    const id = data.id || data.tid;
    if (!id) {
        // console.log('undefined id', data);
        return undefined;
    }

    return `${data.__typename}#${id}`;
};

const apolloClient = new ApolloClient({
    networkInterface,
    dataIdFromObject,
    connectToDevTools: true,
    addTypename: true,
    // shouldBatch: true,
});

export default apolloClient;