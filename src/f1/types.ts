export interface Driver {
  dateOfBirth: string,
  familyName: string,
  givenName: string,
  url: string,
}

export interface Race {
  raceName: string;
  url: string;

  season: number;
  round: number;
  Circuit: {
    circuitName: string;
  },
  results: RaceResult[];
  statuses: Status[];
}

export interface Section<T> {
  items: T[];
  maxItems: number;
  total: number;
  offset: number;
  loading: boolean;
}

export interface Qualifying {
  QualifyingResults: {number: number, position: number, Driver: {givenName: string, familyName: string}}[],
  raceName: string;
}

export interface RaceResult {
  number: number,
  laps: number,
  position: number,
  Driver: {givenName: string, familyName: string},
}

export interface Status {
  status: StatusType;
  count: number;
}

export type StatusType = 'Finished'|'Accident'|'+1 Lap';
