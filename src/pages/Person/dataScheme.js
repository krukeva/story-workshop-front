const dataScheme = {
    identity: {
        label: "Identité et état-civil",
        fields : 
        [
            {
              name: "surname",
              label: "Nom de famille",
            },
            {
              name: "firstName",
              label: "Prénom",
            },
            {
              name: "nickmane",
              label: "Surnom",
            },
            {
              name: "pseudo",
              label: "Pseudonyme",
            },
            {
              name: "dateOfBirth",
              label: "Date de naissance",
            },
            {
              name: "sexe",
              label: "Sexe",
            },
            {
              name: "citizenship",
              label: "Nationalité",
            },
            {
              name: "maritalStatus",
              label: "Statut matrimonial",
            },
            {
              name: "address",
              label: "Adresse",
            },
          ]
    },
    appearance: {
        label: "Apparence",
        fields: 
        [
            {
              name: "hair",
              label: "Cheveux",
            },
            {
              name: "eyes",
              label: "Yeux",
            },
            {
              name: "sign",
              label: "Signe distinctif",
            },
          ],
    },
  }

export default dataScheme