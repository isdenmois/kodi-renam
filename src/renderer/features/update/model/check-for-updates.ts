import { githubAPI } from 'shared/api'
import { env } from 'shared/lib'

interface UpdateParams {
  title: string
  message: string
  url: string
}

const updateVersion = (params: UpdateParams) => window.electron.ipcRenderer.invoke('version/update', params)

export const checkForUpdate = async () => {
  const release = await githubAPI.latestRelease()

  if (release.tag_name !== env.appVersion) {
    const date = release.created_at.toLocaleDateString('ru-RU')

    updateVersion({
      title: `Version ${release.tag_name} (${date}) is available`,
      message: 'Do you want to download the update?',
      url: release.html_url,
    })
  }
}
