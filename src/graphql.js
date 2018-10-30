export const ListGrudges = `
  query ListGrudges {
    listGrudges {
      items {
        id
        userId
        person
        deed
        avenged
      }
    }
  }
`;

export const CreateGrudge = `
  mutation CreateGrudge(
    $id: String!
    $userId: String!
    $person: String!
    $deed: String!
    $avenged: Boolean!
  ) {
    createGrudges(input: {
      id: $id,
      userId: $userId,
      person: $person,
      deed: $deed,
      avenged: $avenged
    }) {
      id
      userId
      person
      deed
      avenged
    }
  }
`;

export const UpdateGrudge = `
  mutation UpdateGrudge(
    $id: String!
    $userId: String!
    $person: String!
    $deed: String!
    $avenged: Boolean!
  ) {
    updateGrudges(input: {
      id: $id,
      userId: $userId,
      person: $person,
      deed: $deed,
      avenged: $avenged
    }) {
      id
      userId
      person
      deed
      avenged
    }
  }
`;

export const DeleteGrudge = `
  mutation DeleteGrudge(
    $id: String!
    $userId: String!
  ) {
    deleteGrudges(input: {
      id: $id,
      userId: $userId
    }) {
      id
    }
  }
`;

export const SubscribeToNewGrudge = `
  subscription SubscribeToNewGrudges {
    onCreateGrudges {
      id
      person
      deed
      avenged
    }
  }
`;

export const SubscribeToUpdatedGrudge = `
  subscription SubscribeToUpdatedGrudges {
    onUpdateGrudges {
      id
      person
      deed
      avenged
    }
  }
`;

export const SubscribeToDeletedGrudge = `
  subscription SubscribeToDeletedGrudges {
    onDeleteGrudges {
      id
    }
  }
`;
