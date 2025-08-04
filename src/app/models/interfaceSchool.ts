export interface SchoolsResult {

    results : Results[];
}

export interface Results {


nom_etablissement : string;
position: {
    lon: number,
    lat: number;
}
}

