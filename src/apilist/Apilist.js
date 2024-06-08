export const server = `https://nxt-watch-server.onrender.com`;

const apilist = {
  login: `${server}/login`,
  signup: `${server}/signup`,
  
  individualvideo: `${server}/individualvideo`,
  individualgamingvideo: `${server}/individualvideoo`,

  getallvideos: `${server}/get-video-details`,
  savevideostatus: `${server}/videos/`,

  updatelikevideo: `${server}/updatelikevideo`,
  updategaminglikevideo: `${server}/updategamminglikevideo`,

  updatesavevideo: `${server}/videos`,
  updategamingsavevideo: `${server}/videoss`,

  updateunlikevideo: `${server}/updatelikevideo`,
  updategamingunlikevideo: `${server}/updategamminglikevideo`,

  trendingvideos: `${server}/get-video-by-query?category=Trending`,
  gamingvideos: `${server}/get-video-by-queryy?category=Gaming`,

  SavedVideos: `${server}/get-video-savedetail?saved=Saved`,
  gamingSavedVideos: `${server}/get-video-savedetaill?saved=Saved`,

  getuserdetils: `${server}/get-user-details`,
  getimg: `${server}/get-image`,
  uploadimg: `${server}/upload-image`,
};
export default apilist;
