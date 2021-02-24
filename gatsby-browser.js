import './src/styles/tailwind.css'
import '@fontsource/lato'
import '@fontsource/yakuhanjp'
import '@fontsource/kosugi-maru'

export const onRouteUpdate = ({ location, prevLocation }) => {
  console.log('new pathname', location.pathname)
  console.log('old pathname', prevLocation ? prevLocation.pathname : null)
}