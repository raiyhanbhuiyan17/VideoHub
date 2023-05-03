import React,{useState, useEffect} from 'react';
import {useParams,Link} from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Box,Stack,Typography, CircularProgress } from '@mui/material';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { CheckCircle } from '@mui/icons-material';
import { Videos} from "./";


const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos,setVideos] = useState([]);
  const {id} =  useParams();

  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
    .then((data)=>{ //console.log(data)
      setVideoDetail(data.items[0])}).finally(()=>setLoading(false));
    // setDetail(data.items[0])

    //console.log(data)
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))
  },[id])

  if(!videoDetail?.snippet)return 'Loading...';

  const channelTitle = videoDetail? videoDetail.snippet.channelTitle: "";
  const title = videoDetail? videoDetail.snippet.title: "";
  const channelId = videoDetail? videoDetail.snippet.channelId: "";

  const viewCount = videoDetail? videoDetail.statistics.viewCount: "";
  const likeCount = videoDetail? videoDetail.statistics.likeCount: "";
  console.log("detail",videoDetail);
  // const {statistics}= detail;
  //const {snippet:{channelTitle}}= videoDetail;
  //console.log("stat",statistics);
  //console.log("ct",channelTitle);
  

  


  return (
    <Box minHeight='95vh'>
      <Stack direction={{xs:'column', md:'row'}}>
        <Box flex={1}>
          <Box sx={{width:'100%', position:'sticky', top:'86px'}}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`}
            className='react-player' controls/>
            {loading && <CircularProgress />}
            {!loading &&  <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>}
           
            <Stack direction='row' justifyContent='space-between' sx={{color:'#fff'}} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{sm:'subtitle',md:'h6'}} color='#fff'>
                  {channelTitle}
                  <CheckCircle sx={{fontSize:'12px', color:'gray', ml:'5px'}}/>
                </Typography>
              </Link>
            <Stack direction='row' gap='19px' alignItems ='center'>
              <Typography variant='body1' sx={{opacity:0.7}}>
                {parseInt(viewCount).toLocaleString()} views
              </Typography>
              <Typography variant='body1' sx={{opacity:0.7}}>
                {parseInt(likeCount).toLocaleString()} likes
              </Typography>
            </Stack>  
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
          <Videos videos={videos} direction="column" />
      </Box>

      </Stack>
    
    </Box>
  )
}

export default VideoDetail