import React from 'react'
import Axios from 'axios'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ImageController = (props) => {
    const {image,setImage} = props
    const [processbar,setProgress] = React.useState(0)

   const removeIfOldImageFound=async()=>{
      if(image && image!==undefined && image.fileId){
       return await Axios.delete(`${process.env.api}/imagekit?id=${image.fileId}`).catch((e)=>console.log("Error removeIfOldImageFound",e))
      }
      return
    }
  

    const  onDrop = (acceptedFile, rejectedFiles) => {
        if (!acceptedFile) {
            return;
        }
       if(acceptedFile.type.match('image/webp') || acceptedFile.type.match('image/jpeg') || acceptedFile.type.match('image/png')){
    
        if (source) {
            source.cancel('');
        }
        var CancelToken = Axios.CancelToken;
        let source = CancelToken.source();
        const config = {
            onUploadProgress: progressEvent =>
            setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total)),
            cancelToken:source.token,
        };
      
        Axios.get(`${process.env.api}/imagekit/auth`).then(res=>{
          if(res.statusText==="OK"){
            let expire = res.data.expire;
            let token = res.data.token;
            let signature = res.data.signature;
            const reader = new FileReader();
            reader.onload = event => {
            const data = new FormData();
            data.append('file', event.target.result.substring(event.target.result.indexOf(',') + 1));
            data.append('fileName', acceptedFile.name);
            data.append('publicKey', "public_t0HUlFTJ4UulFCAn3VihGVktUsc=");
            data.append('signature', signature);
            data.append('token', token);
            data.append('expire', expire);
            data.append('useUniqueFilename', true);
            data.append('folder','amazon');
            Axios.post('https://upload.imagekit.io/api/v1/files/upload', data, config).then(
                            function(res) {
                              if(res && res?.data && res?.data?.url){
                                 removeIfOldImageFound().then(()=>{
                                  setImage(res.data)
                                  setProgress(0)
                                 })
                              }
                              // eslint-disable-next-line
                            }.bind(this)
                        ).catch(
                            function(err) {
                                console.log(err);
                                    setImage('')
                                    setProgress(0)
                              // eslint-disable-next-line
                            }.bind(this)
                        );
                };
                reader.onabort = () => console.log('file reading was aborted');
                reader.onerror = () => console.log('file reading has failed');
                reader.readAsDataURL(acceptedFile);
          }
        }).catch(()=>{
            setImage('')
            setProgress(0)
        });
      }
      }

    return (
        <>
        {processbar>0?(
          <div style={{ width: 60, height: 60 }}>
           <CircularProgressbar value={processbar} text={`${processbar}%`} />
          </div>
        ):<input type='file' accept="image/*" size='sm' id="imageFile"  onChange={(e)=>onDrop(e.target.files[0])}  />}
        </>
    )
}

export default ImageController
