const DEV_API = 'http://localhost:5001'

export const API_URI = 
  process.env.NODE_ENV === 'development' ?
    DEV_API :
    process.env.REACT_APP_API_URI || DEV_API