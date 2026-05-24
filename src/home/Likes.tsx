import { useEffect, useState } from "react"
import { BasicMenuNavContainer } from "../components/Containers.tsx"
import { AuthContextProps, AuthStatus } from "loony-types"
import { apiHttpClient } from "loony-api"

type Tag = { uid: number; name: string }

const Followed = ({ authContext }: { authContext: AuthContextProps }) => {
  const [canFollowTags, setCanFollowTags] = useState<Tag[]>([])

  useEffect(() => {
    if (authContext.status === AuthStatus.AUTHORIZED && authContext.user) {
      apiHttpClient
        .get(`/tag/${authContext.user.uid}/get_all_tags_user_can_follow`)
        .then(({ data }: { data: Tag[] }) => {
          setCanFollowTags(data)
        })
        .catch(() => {})
    }
  }, [])

  const removeFollowedTag = (tag_id: number) => {
    apiHttpClient.post(`/tag/user_removed_a_followed_tag`, {
      tag_id,
      user_id: authContext.user?.uid,
    })
  }

  return (
    <div>
      <p className="text-sm font-semibold mb-2">Recommendations</p>
      {canFollowTags.map((tag) => (
        <BasicMenuNavContainer key={`r-${tag.uid}`}>
          <span className="mr-2.5 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
            {tag.name.charAt(0)}
          </span>
          <div className="flex-1 flex items-center justify-between">
            <span className="text-sm">{tag.name}</span>
            <button
              onClick={() => removeFollowedTag(tag.uid)}
              className="ml-2 text-xs text-gray-500 hover:text-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        </BasicMenuNavContainer>
      ))}
    </div>
  )
}

const Recommended = ({ authContext }: { authContext: AuthContextProps }) => {
  const [followedTags, setFollowedTags] = useState<Tag[]>([])

  useEffect(() => {
    if (authContext.status === AuthStatus.AUTHORIZED && authContext.user) {
      apiHttpClient
        .get(`/tag/${authContext.user.uid}/get_all_tags_user_has_followed`)
        .then(({ data }: { data: Tag[] }) => {
          setFollowedTags(data)
        })
        .catch(() => {})
    }
  }, [])

  const removeFollowedTag = (tag_id: number) => {
    apiHttpClient.post(`/tag/user_removed_a_followed_tag`, {
      tag_id,
      user_id: authContext.user?.uid,
    })
  }

  return (
    <div>
      <p className="text-sm font-semibold mb-2">Followed</p>
      {followedTags.map((tag) => (
        <BasicMenuNavContainer key={`f-${tag.uid}`}>
          <span className="mr-2.5 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
            {tag.name.charAt(0)}
          </span>
          <div className="flex-1 flex items-center justify-between">
            <span className="text-sm">{tag.name}</span>
            <button
              onClick={() => removeFollowedTag(tag.uid)}
              className="ml-2 text-xs text-gray-500 hover:text-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        </BasicMenuNavContainer>
      ))}
    </div>
  )
}

export { Followed, Recommended }
