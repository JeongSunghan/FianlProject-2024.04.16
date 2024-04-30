// 기본
import React, { useEffect, useState } from "react";
import {
  Box, Button, Card, TextField, Modal, InputAdornment, FormControlLabel,
  FormGroup, Typography, Stack, InputLabel, MenuItem, FormControl, Select, Avatar,
  Input
} from "@mui/material";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { FindImage, UploadImage } from "../../api/image.js";

// 아이콘
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// css 연결
import './setting.css';
import { MaterialUISwitch, AntSwitch } from './SettingSwitchStyles.jsx';
import { GetWithExpiry } from "../../api/LocalStorage.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";

export default function SettingDetail() {
  const navigate = useNavigate();
  
  // localStorage를 이용해서 user 받아오기
  const uid = parseInt(GetWithExpiry("uid"));
  const [user, setUser] = useState({});
  
  const [uname, setUname] = useState('');
  const [nickname, setNickname] = useState('');
  const [statusMessage, setStat] = useState('');
  const [profile, setProfile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [change, setChange] = useState(0);
  const [myimage, setMyimage] = useState(null);

  useEffect(() => {
    if (uid == null)
    {
      //alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, []);
  
  useEffect(() => {
    if (uid != null)
    {
      axios.get('http://localhost:8090/user/getUser', {
        params: {
          uid: uid,
        }
      }).then(res => {
        setUser(res.data);
        setUname(res.data.uname);
        setNickname(res.data.nickname);
        setStat(res.data.statusMessage);
        if (res.data.profile != null)
        {
          setProfile(res.data.profile);
          setMyimage(FindImage(res.data.profile));
        }
      }).catch(error => console.log(error));
    }
  }, [])
  
  // 성별
  const [gender, setGender] = useState('');
  // 성별 이벤트
  const handleChange = (event) => {
    setGender(event.target.value);
  };
  
  // 비밀번호 숨기기/보이기
  const [showPassword, setShowPassword] = useState(false);
  // 비밀번호 숨기기/보이기 토글
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Modal 열기,닫기
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 모달 이벤트 - 열기
  const openModal = () => { setIsModalOpen(true); };
  // 모달 이벤트 - 닫힘
  const closeModal = () => { setIsModalOpen(false); };
  
  // const handlePasswordChange = () => {
  //     // 변경 확인 버튼 클릭 시 실행될 로직
  //     console.log('비밀번호 변경 확인');
  // };
  
  const handleUname = (e) => {
    setUname(e.target.value);
  };
  const handleNickname = (e) => {
    setNickname(e.target.value);
  };
  const handleStat = (e) => {
    setStat(e.target.value);
  };
          
  const submitProfile = async () => {
    console.log(uname);
    console.log(nickname);
    console.log(statusMessage);
    console.log(profile);
    console.log(uid);
    if (change != 1)
    {
      axios.post('http://localhost:8090/user/update', null, {
        params: {
          uname: uname,
          nickname: nickname,
          profile: profile,
          statusMessage: statusMessage,
          snsDomain: null,
          uid: uid,
          birth: null,
          tel: null,
        }
      }).catch(error => console.log(error));
    }
    else
    {
      console.log(image);
      const url = UploadImage(image);
      const url2 = url.then((e) => {

      })
      console.log(url);
      axios.post('http://localhost:8090/user/update', null,  {
        params: {
          uname: uname,
          nickname: nickname,
          profile: url,
          statusMessage: statusMessage,
          snsDomain: null,
          uid: uid,
          birth: null,
          tel: null,
        }
      }).catch(error => console.log(error));
    }

    setIsModalOpen(false);
    navigate('/setting');
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (event.target.files.length === 0)
    {
      return;
    }
    else
    {
      setImage(file);
      setChange(1);
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        setPreview(reader.result);
      };
    }
  };

  const handleResetClick = () => {
    setPreview(null);
    setImage(null);
  };

  return (
    <>
      {/* 전체 스타일 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '4%',
      }}>

        {/* 메인 프로필 영역 */}
        <Card className="MainProfile">

          {/* 프로필 사진, 닉네임, 편집 영역 */}
          <div className="profile">
            <Avatar alt="H" src="/img/profile/profile1.jpg"
              style={{ marginLeft: '20px', width: '20%', height: '100%' }} />
            <p className="nickname">닉네임</p>
            <Button className="profile-edit-button"
              onClick={openModal}>프로필 편집</Button>
          </div>

          {/* 소개 영역 */}
          <div id="introduce" style={{ margin: '10px 0' }}>
            <p className="introduce-label">소개</p>
          </div>

          {/* 소개글 수정 영역 */}
          <Box component="section" sx={{
            p: 2,
            border: 'none',
            marginTop: '1%',
            width: '65%',
          }}>
            <TextField id="outlined-basic" label="나로 말할거 같으면!" variant="outlined" fullWidth
            defaultValue={user.statusMessage} onChange={handleStat}/>
          </Box>

          {/* 성별 영역 */}
          <div id="gender" className="gender-select-area">
            <p className="gender-label">성별</p>

            {/* 성별 선택영역 */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" style={{ marginLeft: '35px' }}>성별</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="성별"
                onChange={handleChange}
                style={{ width: '25%', marginLeft: '3%' }}
              >
                <MenuItem value={"man"}>남자</MenuItem>
                <MenuItem value={"girl"}>여자</MenuItem>
                <MenuItem value={"none"}>설정 안함</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* 계정 비활성화(탈퇴) 영역 */}
          <div id="profile-disabled" className="profile-disabled">
            <Button sx={{
              backgroundColor: 'red',
              color: 'white', '&:hover':
                { backgroundColor: 'darkred' }
            }}>계정 비활성화</Button>
          </div>

          {/* 프로필 편집 - 모달 영역 */}
          <Modal
            open={isModalOpen}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >

            <div className="modal-content">
              <h2 id="modal-modal-title">프로필 편집</h2>
              <p id="modal-modal-description" className="another-label"
                style={{ width: '100%', marginLeft: '2px', marginBottom: '10px', }}>개인정보 수정</p>

              {/* 프로필 편집 폼 */}
              <TextField
                className="email-text"
                id="standard-basic"
                label="이메일"
                variant="standard"
                defaultValue={user.email}
                disabled
                fullWidth
              /><br /><br />

              <div>
                <input
                  id="hidden-input"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                  hidden
                />
                <label htmlFor="hidden-input">
                  <div>
                    Upload a file
                  </div>
                </label>
                <div>
                  {preview && <img src={preview} alt="preview" className="w-full" /> }
                  {myimage && <AdvancedImage cldImg={myimage} /> }
                </div>
              </div>

              <div>
                {/* <button
                  onClick={uploadImage}
                  disabled={!image}
                >
                  Upload now
                </button> */}
                <button
                  onClick={handleResetClick}
                  disabled={!image}
                >
                  Reset
                </button>
              </div>
              <br /><br />

              <TextField
                id="standard-basic"
                label="이름"
                variant="standard"
                defaultValue={user.uname}
                onChange={handleUname}
                fullWidth  // 입력 폼 너비를 전체로 설정
              /><br /><br />

              <TextField
                className="nickname-text"
                id="standard-basic"
                label="닉네임"
                variant="standard"
                defaultValue={user.nickname}
                onChange={handleNickname}
                fullWidth
                /><br /><br />

              <TextField
                className="pwd-text"
                id="standard-basic"
                label="비밀번호"
                variant="standard"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        color="inherit"
                        style={{ width: '10px' }}
                        onClick={togglePasswordVisibility}
                        onMouseDown={(event) => event.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
              <div style={{ textAlign: 'right' }}>
                <Button variant="contained" color="primary"
                  style={{
                    width: '30%', marginTop: '1%'
                  }}>
                  비밀번호 변경
                </Button>
              </div>


              {/* 그 외 정보에서 도메인 구간 */}
              <br /><br />
              <p className="another-label"
                style={{
                  width: '100%', marginLeft: '-2px',
                  marginTop: '10px',
                  marginBottom: '8px'
                }}>도메인 수정</p>

              <TextField
                id="standard-basic"
                label="도메인"
                variant="standard"
                fullWidth
              /><br /><br /><br />

              {/* 드롭다운 밝은배경/어두운 배경 */}
              <FormGroup>
                <p className="another-label"
                  style={{ width: '100%', marginLeft: '0px', marginBottom: '15px' }}>테마 선택</p>
                <FormControlLabel
                  style={{ justifyContent: 'center' }}
                  control={<MaterialUISwitch sx={{ m: 2 }} defaultChecked />}
                  label="밝은 테마 / 어두운 테마"
                />
                <br /><br />

                {/* on/off에 따른 계정 공개/비공개 */}
                <p className="another-label"
                  style={{ width: '100%', marginLeft: '0px', marginBottom: '15px' }}
                >계정 공개 여부</p>
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Typography>비공개</Typography>
                  <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                  <Typography>공개</Typography>
                </Stack>

                <div style={{ textAlign: 'right', marginTop: '5%' }}>
                  <Button variant="contained" color="primary" onClick={submitProfile}
                    style={{ width: '35%' }}> 프로필 수정하기
                  </Button>
                </div>
              </FormGroup>
            </div>
          </Modal>
        </Card>
      </div>
    </>
  );
}
