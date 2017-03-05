/*
 *
 *
 *   Redux Schema
 *
 */




{
  users: {
    isAuthed,
    isFetching,
    error,
    authedId,
    [uid] : {
      lastUpdated,
      info: {
        name,
          uid,
          avatar
      }
    }
  },
  ducks: {
    isFetching,
      error,
    [duckId] : {
      lastUpdated,

      info: {
        avatar,
          duckId,
          name,
          text,
          timestamp,
          uid
      }
    }
  },
  modal: {
    duck,
    isOpen,

  },
  usersDucks: {
    [uid]: {
      lastUpdated,
        isFetching,
        Error
      duckIds: [ duckID, duckId, duckId]
    }
  },
  likeACount: {
    [duckId] : 0
  },
  usersLikes : {
    [duckId] : true
  },
  replies: {
    [duckId]: {
      replies : {
        [replyId] : {
          lastUpdated,
            isFetching,
            Error
          name,
          comment,
            uid,
            timestamp,
            avatar
        }
      }
    }
  },
  listeners: {
    [listenerId] : true
  },
  feed: {
    isFetching,
      error,
      newDucksAvailable,
      duckIdsToADd: [duckId, duckId],
      duckIds: [duckId, duckId]

  }

}