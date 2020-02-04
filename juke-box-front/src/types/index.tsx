export interface Track {
  id: string,
  name: string,
  artist: string,
  album: string,
  label: string,
  year: string
}

export interface Tribe {
  id: string,
  name: string,
  image: string
}

export interface TribeData {
  id: string,
  name: string,
  image: string
}

export interface MembershipData {
  id: string,
  userId: string,
  tribeId: string
}

export interface User {
  id: string,
  name: string,
  image: string
}

export interface UserData {
  id: string,
  name: string,
  image: string,
  tribes: Array<string>
}
