// ERROR

export interface ErrorData {
  status: string,
  message: string,
  trace: string,
}

// TRIBE

export interface TribeData {
  id: string,
  name: string,
  image: string,
}

export interface TribePostData {
  name: string,
  image: string,
}

export interface TribePatchData {
  id: string,
  name?: string,
  image?: string,
}

// FRIENDSHIP

export interface FriendshipData {
  id: string,
  userId: string,
  friendId: string,
  status: string,
}

export interface FriendshipPostData {
  userId: string,
  friendId: string,
}

export interface FriendshipPatchData {
  status: string,
}

// MEMBERSHIP

export interface MembershipData {
  id: string,
  userId: string,
  tribeId: string,
}

export interface MembershipPostData {
  userId: string,
  tribeId: string,
}

export interface MembershipPatchData {
  id: string,
  userId?: string,
  tribeId?: string,
}

// USER

export interface UserData {
  id: string,
  username: string,
  name: string,
  image: string,
}

export interface UserPostData {
  username: string,
  name: string,
  image: string,
}

export interface UserPatchData {
  id: string,
  username?: string,
  name?: string,
  image?: string,
}

// EVENT

export interface EventData {
  id: string,
  name: string,
  tribeId: string,
  startDate: string,
  endDate: string,
}

export interface EventPostData {
  name: string,
  startDate: string,
  endDate: string,
}

export interface EventPatchData {
  id: string,
  name?: string,
  startDate?: string,
  endDate?: string,
}
