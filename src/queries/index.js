'use strict';

import gql from 'graphql-tag'

export const allUsers = gql`
    query allUsers {
        users {
            uid
            name
            fullname
            lastname
            firstname
            mail
            phones
            birthday
            photo_url(style: avatar)
            city {
                tid
                name
                fias_aoguid
            }
        }
    }`;

export const getUserById = gql`
    query getUserById($uid: Int!) {
      user(uid: $uid) {
          uid
          name
          fullname
          lastname
          firstname
          mail
          phones
          birthday
          photo_url(style: avatar)
          city {
              tid
              name
              fias_aoguid
          }
      }
    }`;

export const getUserByIdAllFields = gql`
    query getUserByIdAllFields($u_id: Int!) {
      user(uid: $u_id) {
        uid
        name
        firstname
        lastname
        position
        phones
        city {
          tid
          name
          fias_aoguid
        }
        mail
      }
    }`;
