const basePublicPath = 'https://public.api.bsky.app'
const baseSocialPath = 'https://bsky.social'

const callAPI = async (uri: string, method: string, data?: Record<string, any>) => {
  try {
    const url = new URL(uri)

    if (method === 'GET' && data) {
      // Append query parameters for GET requests
      Object.keys(data).forEach((key) => {
        url.searchParams.append(key, data[key])
      })
    }

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    }

    if (method === 'POST') {
      // Add body for POST requests
      options.body = JSON.stringify(data)
    }

    const response = await fetch(url.toString(), options)

    if (!response.ok) {
      // Handle error response
      const error = await response.json()
      return { error: { message: error?.message || 'Unknown error' } }
    }

    // Return response as object
    return await response.json()
  } catch (err) {
    console.log(err)
    // Handle network or unexpected errors
    return { error: { message: err instanceof Error ? err.message : 'Unexpected error' } }
  }
}

const getProfile = async (did: string) => {
  return await callAPI(basePublicPath + '/xrpc/app.bsky.actor.getProfile', 'GET', { actor: did })
}

const getHandle = async (did: string) => {
  const profile = await getProfile(did)
  return profile.handle
}

const extractDID = (uri: string) => {
  uri = uri.replace('at://', '')
  const parts = uri.split('/')
  return parts[0]
}

const extractRkey = (uri: string) => {
  uri = uri.replace('at://', '')
  const parts = uri.split('/')
  return parts[2]
}

const generateUrlForPost = (uri: string) => {
  return 'https://bsky.app/profile/' + extractDID(uri) + '/post/' + extractRkey(uri)
}

const generateUrlForUser = (did: string) => {
  return 'https://bsky.app/profile/' + did
}

const getRecord = async (uri: string) => {
  let repo = ''
  let collection = ''
  let rkey = ''
  uri = uri.replace('at://', '')

  try {
    // Split the URI into parts
    const parts = uri.split('/')

    // Validate the structure of the URI
    if (parts.length === 3 && parts[0].startsWith('did')) {
      repo = parts[0] // Extract repo
      collection = parts[1] // Extract collection
      rkey = parts[2] // Extract rkey
    } else {
      throw new Error('Invalid URI structure')
    }
  } catch (error) {
    // @ts-ignore
    console.error('Error extracting URI parts:', error.message)
    return { error: { message: 'Failed to parse the URI' } }
  }

  const path = await getBasePath(repo)

  console.log(path)

  return await callAPI(path + '/xrpc/com.atproto.repo.getRecord', 'GET', {
    repo: repo,
    collection: collection,
    rkey: rkey,
  })
}

const getPlcDoc = async (did: string) => {
  return await callAPI('https://plc.directory/' + did, 'GET')
}

const getBasePath = async (did: string) => {
  const plcDoc = await getPlcDoc(did)
  return plcDoc.service[0]?.serviceEndpoint ?? baseSocialPath
}

const getActorRecords = async (
  did: string,
  collection:
    | 'app.bsky.feed.post'
    | 'app.bsky.feed.like'
    | 'app.bsky.feed.repost'
    | 'app.bsky.graph.follow'
    | 'app.bsky.graph.block',
  cursor: string | null = null,
  pds: string | null = null,
) => {
  const path = (await getBasePath(did)) ?? pds

  return await callAPI(path + '/xrpc/com.atproto.repo.listRecords', 'GET', {
    repo: did,
    collection: collection,
    limit: 5,
    cursor: cursor,
  })
}

const getActorLikes = async (
  did: string,
  cursor: string | null = null,
  pds: string | null = null,
) => {
  return await getActorRecords(did, 'app.bsky.feed.like', cursor, pds)
}

const getActorPosts = async (
  did: string,
  cursor: string | null = null,
  pds: string | null = null,
) => {
  return await getActorRecords(did, 'app.bsky.feed.post', cursor, pds)
}

const getActorReposts = async (
  did: string,
  cursor: string | null = null,
  pds: string | null = null,
) => {
  // console.log('here')
  return await getActorRecords(did, 'app.bsky.feed.repost', cursor, pds)
}

const getActorFollows = async (
  did: string,
  cursor: string | null = null,
  pds: string | null = null,
) => {
  // console.log('here')
  return await getActorRecords(did, 'app.bsky.graph.follow', cursor, pds)
}

const getActorBlocks = async (
  did: string,
  cursor: string | null = null,
  pds: string | null = null,
) => {
  // console.log('here')
  return await getActorRecords(did, 'app.bsky.graph.block', cursor, pds)
}

export {
  getProfile,
  getPlcDoc,
  getActorLikes,
  getActorPosts,
  getRecord,
  extractDID,
  getHandle,
  generateUrlForPost,
  generateUrlForUser,
  extractRkey,
  getActorReposts,
  getActorFollows,
  getActorBlocks,
}
