import React from "react"
import Typography from "@material-ui/core/Typography"
import VolumeUpIcon from "@material-ui/icons/VolumeUp"

const Logo: React.FC<{}> = () => {
  return (
    <div>
      <Typography color="primary" variant="h4">
        — The —
      </Typography>
      <Typography color="primary" variant="h1">
        BOON
      </Typography>
      <Typography color="primary" variant="body2" gutterBottom>
        UK <VolumeUpIcon fontSize="small" />
        /bu:n/ | US <VolumeUpIcon fontSize="small" /> /bu:n/
      </Typography>
    </div>
  )
}

export default Logo
