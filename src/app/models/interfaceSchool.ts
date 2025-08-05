export interface SchoolsResult {
  results: Results[];
}

export interface Results {
  identifiant_de_l_etablissement: string;
  nom_etablissement: string;
  type_etablissement: string;
  statut_public_prive: string;
  adresse_1: string;
  adresse_2: string;
  adresse_3: string;
  mail: string;
  position: {
    lon: number;
    lat: number;
  };
}
