import { usersDucksExpirationLength, userExpirationLength } from '../../config/constants';

export function formatUserInfo(name, avatar, uid) {
  return {
    name,
    avatar,
    uid
  };
}

export function formatDuck(text, { name, avatar, uid }) {
  return {
    text,
    name,
    avatar,
    uid,
    timestamp: Date.now()
  };
}

export function formatTimeStamp(timestamp) {
  const date = new Date(timestamp);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export const getMilliseconds = timestamp => new Date().getTime() - new Date(timestamp).getTime();
export const staleDucks = timestamp => getMilliseconds(timestamp) > usersDucksExpirationLength;
export const staleUser = timestamp => getMilliseconds(timestamp) > userExpirationLength;
