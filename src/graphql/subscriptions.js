/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStore = /* GraphQL */ `
  subscription OnCreateStore($filter: ModelSubscriptionStoreFilterInput) {
    onCreateStore(filter: $filter) {
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
export const onUpdateStore = /* GraphQL */ `
  subscription OnUpdateStore($filter: ModelSubscriptionStoreFilterInput) {
    onUpdateStore(filter: $filter) {
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
export const onDeleteStore = /* GraphQL */ `
  subscription OnDeleteStore($filter: ModelSubscriptionStoreFilterInput) {
    onDeleteStore(filter: $filter) {
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
export const onCreateCar = /* GraphQL */ `
  subscription OnCreateCar($filter: ModelSubscriptionCarFilterInput) {
    onCreateCar(filter: $filter) {
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
export const onUpdateCar = /* GraphQL */ `
  subscription OnUpdateCar($filter: ModelSubscriptionCarFilterInput) {
    onUpdateCar(filter: $filter) {
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
export const onDeleteCar = /* GraphQL */ `
  subscription OnDeleteCar($filter: ModelSubscriptionCarFilterInput) {
    onDeleteCar(filter: $filter) {
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
export const onCreateOwner = /* GraphQL */ `
  subscription OnCreateOwner($filter: ModelSubscriptionOwnerFilterInput) {
    onCreateOwner(filter: $filter) {
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
export const onUpdateOwner = /* GraphQL */ `
  subscription OnUpdateOwner($filter: ModelSubscriptionOwnerFilterInput) {
    onUpdateOwner(filter: $filter) {
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
export const onDeleteOwner = /* GraphQL */ `
  subscription OnDeleteOwner($filter: ModelSubscriptionOwnerFilterInput) {
    onDeleteOwner(filter: $filter) {
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
