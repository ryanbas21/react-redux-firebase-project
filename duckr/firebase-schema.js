/*
  * No perfect schema
  *  there are tradeoffs
  *  keep your firebase schema shallow
  *  Repeating data is allowed!
  *
  *  Schema
  *
  *   Home
  *       All Ducks
  *
  *        Profile  View
  *  User Info  || Users Ducks
  *
  *
  *                 Replies View
  *     Specific Ducks ||  Ducks Replies
  *
      *     /users
      *           uid
      *             ducks
      *               duckId
          *             replies
          *               replyId
          *                 uid
          *                 name
          *                 comment
          *                 etc
          *             info about post
               *            uid
               *            name
               *            comment
               *            numberofLikes
          *            likes
          *             duckId
      *
  *
  *
  * /ducks
  *    duckId
  *      rep.ies
  *      replyId
  *        Name
  *        comment
  *        etc
  *      Info
  *        avatar
  *        text
  *        etc
  *      Likes
  *        uids
  *
  *
  *
  *
  *
  *
  *   /users
  *     uid
  *       info
  *     ducks
  *       duckId
  *       replies
  *       info
  *       usersWhoHaveLiked
  *     likes
  *       duckId
  *
  *   /ducks
  *     duckId
  *       replies
  *       info
  *
  *
  *
  *
  *   /users
  *     uid
  *       name
  *       uid
  *       avatar
  *
  *   /ducks
  *     duckId
  *       avatar
  *       duckId
  *       name
  *       text
  *       timestamp
  *       uid
  *   /likeCount
  *     duckId
 *
 *    /usersDucks
 *      uid
 *        duckId
   *        avatar
   *        duckId
   *        name
   *        text
   *        timestamp
   *        uid
   *
   *
   *  /replies
   *    duckId
   *      replyId
   *        name
   *        comment
   *        uid
   *        timestamp
   *        avatar
   *
   *    /usersLikes
   *      uid
   *        duckId
 */

