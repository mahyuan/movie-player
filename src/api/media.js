import request from '@/utils/request'

/**
 * https://mediachain.info/api/search?name=良医&actors&producer&year=2020&page=1
 */
export function getMediaByParams (params) {
  return request.get('/api/search', { params })
}
