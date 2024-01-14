import React from "react"
import Typography from "@mui/material/Typography"
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const Logo: React.FC<{}> = () => {
  return (
    <div>
      <Typography variant="h4">— The —</Typography>
      <Typography variant="h1">BOON</Typography>
      <Typography variant="body2" gutterBottom>
        UK <VolumeUpIcon fontSize="small" />
        /bu:n/ | US <VolumeUpIcon fontSize="small" /> /bu:n/
      </Typography>
    </div>
  )
}

export default Logo
