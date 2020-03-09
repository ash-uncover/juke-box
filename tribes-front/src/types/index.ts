// ERROR

export interface ErrorData {
  status: string,
  message: string,
  trace: string,
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
  id: string,
  userId: string,
  friendId: string,
  status?: string,
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
  userId: string,
  tribeId: string,
}

// MESSAGE

export interface MessageData {
  id: string,
  threadId: string,
  userId: string,
  text: string,
  date: string,
  readBy: Array<string>,
}

export interface MessagePostData {
  threadId: string,
  userId: string,
  text: string,
  date: string,
}

export interface MessagePatchData {
  id: string,
  threadId: string,
  userId: string,
  text?: string,
  readBy?: Array<string>,
}

// THREAD

export interface ThreadData {
  id: string,
  name: string,
  type: string,
  userId: Array<string>,
}

export interface ThreadPostData {
  name: string,
  type: string,
  userId: Array<string>,
}

export interface ThreadPatchData {
  id: string,
  name?: string,
  userId?: Array<string>,
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
