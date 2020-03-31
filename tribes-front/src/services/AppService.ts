import { Actions as ProfileActions } from '../store/app/profile/profileActions'

const AppService = {

  profile: {
    messageEdit: (dispatch: any, threadId: string, messageId: string) => {
      dispatch(ProfileActions.appProfileMessageEdit(threadId, messageId))
    },

    messageRelease: (dispatch: any) => {
      dispatch(ProfileActions.appProfileMessageRelease())
    },
  },
}

export default AppService