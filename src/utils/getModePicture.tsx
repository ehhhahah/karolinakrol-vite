import aboutIcon from './../assets/texts/about.png'
import publicationsIcon from './../assets/texts/publications.png'
import illustrationsIcon from './../assets/texts/illustrations.png'
import postersIcon from './../assets/texts/posters.png'
import homeIcon from './../assets/texts/home.png'

interface ModePictureMap {
    [key: string]: string
}

const getModePicture = (mode: string): string => {
    const modePictureMap: ModePictureMap = {
        bio: aboutIcon,
        posters: postersIcon,
        illustrations: illustrationsIcon,
        publications: publicationsIcon,
        home: homeIcon
    }

    return modePictureMap[mode] || homeIcon
}

export default getModePicture