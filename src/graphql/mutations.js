/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createStore = /* GraphQL */ `
  mutation CreateStore(
    $input: CreateStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    createStore(input: $input, condition: $condition) {
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
export const updateStore = /* GraphQL */ `
  mutation UpdateStore(
    $input: UpdateStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    updateStore(input: $input, condition: $condition) {
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
export const deleteStore = /* GraphQL */ `
  mutation DeleteStore(
    $input: DeleteStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    deleteStore(input: $input, condition: $condition) {
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
export const createCar = /* GraphQL */ `
  mutation CreateCar(
    $input: CreateCarInput!
    $condition: ModelCarConditionInput
  ) {
    createCar(input: $input, condition: $condition) {
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
export const updateCar = /* GraphQL */ `
  mutation UpdateCar(
    $input: UpdateCarInput!
    $condition: ModelCarConditionInput
  ) {
    updateCar(input: $input, condition: $condition) {
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
export const deleteCar = /* GraphQL */ `
  mutation DeleteCar(
    $input: DeleteCarInput!
    $condition: ModelCarConditionInput
  ) {
    deleteCar(input: $input, condition: $condition) {
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
export const createOwner = /* GraphQL */ `
  mutation CreateOwner(
    $input: CreateOwnerInput!
    $condition: ModelOwnerConditionInput
  ) {
    createOwner(input: $input, condition: $condition) {
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
export const updateOwner = /* GraphQL */ `
  mutation UpdateOwner(
    $input: UpdateOwnerInput!
    $condition: ModelOwnerConditionInput
  ) {
    updateOwner(input: $input, condition: $condition) {
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
export const deleteOwner = /* GraphQL */ `
  mutation DeleteOwner(
    $input: DeleteOwnerInput!
    $condition: ModelOwnerConditionInput
  ) {
    deleteOwner(input: $input, condition: $condition) {
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
