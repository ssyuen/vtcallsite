/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStore = /* GraphQL */ `
  query GetStore($id: ID!) {
    getStore(id: $id) {
      id
      name
      xCoord
      yCoord
      cars {
        items {
          id
          make
          makeDate
          color
          listingPrice
          createdAt
          updatedAt
          storeCarsId
          ownerCarHistoryId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listStores = /* GraphQL */ `
  query ListStores(
    $filter: ModelStoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStores(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        xCoord
        yCoord
        cars {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCar = /* GraphQL */ `
  query GetCar($id: ID!) {
    getCar(id: $id) {
      id
      make
      store {
        id
        name
        xCoord
        yCoord
        cars {
          nextToken
        }
        createdAt
        updatedAt
      }
      makeDate
      color
      listingPrice
      owners {
        items {
          id
          firstName
          lastName
          phoneNumber
          createdAt
          updatedAt
          carOwnersId
        }
        nextToken
      }
      createdAt
      updatedAt
      storeCarsId
      ownerCarHistoryId
    }
  }
`;
export const listCars = /* GraphQL */ `
  query ListCars(
    $filter: ModelCarFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCars(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        make
        store {
          id
          name
          xCoord
          yCoord
          createdAt
          updatedAt
        }
        makeDate
        color
        listingPrice
        owners {
          nextToken
        }
        createdAt
        updatedAt
        storeCarsId
        ownerCarHistoryId
      }
      nextToken
    }
  }
`;
export const getOwner = /* GraphQL */ `
  query GetOwner($id: ID!) {
    getOwner(id: $id) {
      id
      firstName
      lastName
      carHistory {
        items {
          id
          make
          makeDate
          color
          listingPrice
          createdAt
          updatedAt
          storeCarsId
          ownerCarHistoryId
        }
        nextToken
      }
      phoneNumber
      createdAt
      updatedAt
      carOwnersId
    }
  }
`;
export const listOwners = /* GraphQL */ `
  query ListOwners(
    $filter: ModelOwnerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOwners(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        carHistory {
          nextToken
        }
        phoneNumber
        createdAt
        updatedAt
        carOwnersId
      }
      nextToken
    }
  }
`;
