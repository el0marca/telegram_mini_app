export interface InputAddress {
  city: string;
  street: string;
  dom: string;
  kv: string;
  entrance: string;
  floor: string;
  korp: string;
  client_comment: string;
  location: Location;
  is_dirty: boolean;
}

export interface AddressCoordinates {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
export interface MarkerPosition {
  latitude: number;
  longitude: number;
}
export interface ProcessedAddress {
  is_dirty: boolean;
  id: string;
  street: string;
  dom: string;
  kv: string;
  korp: string;
  floor: string;
  entrance: string;
  doorcode: string;
  client_comment: string;
  map_addr: string;
  full_addr: string;
  full_addr_with_city: string;
  city: string;
  district_id: string | null;
  district: District;
  item_stocks_report: ItemStocksReport[];
  location: Location;
  can_user_edit: boolean;
}

export interface District {
  id: string;
  title: string;
}

export interface ItemStocksReport {
  id: string;
  title: string;
  quantity: number;
  item: object; // Specify the exact type for this if possible
}

export interface Location {
  lat: number | null;
  lng: number | null;
}

export interface GeocodeRequest {
  prms: {
    noCode: boolean;
  };
  address: ProcessedAddress;
}

export interface GetAddressesResponse {
  addresses: ProcessedAddress[];
}

export interface ReversGeocodeResponse {
  address: { dom: string; city: string; street: string };
  district_id: string | null;
}
export interface UpdateAddressResponse {
  address: ProcessedAddress;
}

export interface Highlight {
  begin: number;
  end: number;
}

export interface Title {
  text: string;
  hl: Highlight[];
}

export interface Distance {
  value: number;
  text: string;
}

export interface YandexSuggest {
  title: Title;
  subtitle?: Title;
  tags: string[];
  distance: Distance;
}

export interface YandexSuggestResponse {
  suggest_reqid: string;
  results: YandexSuggest[];
}

interface GeoObject {
  metaDataProperty: {
    GeocoderMetaData: {
      precision: string;
      text: string;
      kind: string;
      Address: {
        country_code: string;
        formatted: string;
        postal_code: string;
        Components: Array<{
          kind: string;
          name: string;
        }>;
      };
      AddressDetails: {
        Country: {
          AddressLine: string;
          CountryNameCode: string;
          CountryName: string;
          AdministrativeArea: {
            AdministrativeAreaName: string;
            SubAdministrativeArea: {
              SubAdministrativeAreaName: string;
              Locality: {
                LocalityName: string;
                Thoroughfare: {
                  ThoroughfareName: string;
                  Premise: {
                    PremiseNumber: string;
                    PostalCode: {
                      PostalCodeNumber: string;
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
  };
  name: string;
  description: string;
  boundedBy: {
    Envelope: {
      lowerCorner: string;
      upperCorner: string;
    };
  };
  uri: string;
  Point: {
    pos: string;
  };
}

interface FeatureMember {
  GeoObject: GeoObject;
}

export interface GeoObjectCollection {
  metaDataProperty: {
    GeocoderResponseMetaData: {
      request: string;
      results: string;
      suggest: string;
      found: string;
    };
  };
  featureMember: FeatureMember[];
}

export interface YandexGeocodeResponse {
  response: {
    GeoObjectCollection: GeoObjectCollection;
  };
}
