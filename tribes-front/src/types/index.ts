export interface Track {
  id: string,
  name: string,
  artist: string,
  album: string,
  label: string,
  year: string
}

// TRIBE

export interface Tribe {
  id: string,
  name: string,
  image: string,
  users: Array<User>
}

export interface TribeData {
  id: string,
  name: string,
  image: string
}

export interface TribePostData {
  name: string,
  image: string
}

export interface TribePatchData {
  id: string,
  name?: string,
  image?: string
}

// MEMBERSHIP
export interface MembershipData {
  id: string,
  userId: string,
  tribeId: string
}

export interface MembershipPostData {
  userId: string,
  tribeId: string
}

export interface MembershipPatchData {
  id: string,
  userId?: string,
  tribeId?: string
}

// USER

export interface User {
  id: string,
  name: string,
  image: string,
  tribes: Array<Tribe>
}

export interface UserData {
  id: string,
  name: string,
  image: string
}

export interface UserPostData {
  name: string,
  image: string
}

export interface UserPatchData {
  id: string,
  name?: string,
  image?: string
}
