import type { Maybe } from "yup";

export interface Location {
  name: Maybe<string | undefined>;
  address: Maybe<string | undefined>;
  number: Maybe<number | undefined>;
  latitude: Maybe<number | undefined>;
  longitude: Maybe<number | undefined>;
}