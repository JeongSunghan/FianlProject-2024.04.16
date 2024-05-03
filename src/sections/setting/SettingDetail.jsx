// 기본
import React, { useEffect, useState } from "react";
import {
  Box, Button, Card, TextField, InputAdornment,
  Typography, InputLabel, MenuItem, FormControl, Select, Avatar,
  IconButton, Grid,
  Stack
} from "@mui/material";
// import { Cloudinary } from "@cloudinary/url-gen/index";
import { FindImage, UploadImage } from "../../api/image.js";

// 아이콘
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// css 연결
import './setting.css';
import { GetWithExpiry } from "../../api/LocalStorage.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { AdvancedImage } from "@cloudinary/react";
// import { bool } from "prop-types";

// alert 창
import Swal from "sweetalert2";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

// 생년월일
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip arrow {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    boxShadow: theme.shadows[1],
    fontSize: 16,
  },
}));

export default function SettingDetail() {
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (event.target.files.length === 0) {
      return;
    }
    else {
      setImage(file);
      setChange(1);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setPreview(reader.result);
      };
    }
  };

  // localStorage를 이용해서 user 받아오기
  const uid = parseInt(GetWithExpiry("uid"));
  const email = GetWithExpiry("email");
  const [user, setUser] = useState({});

  const [uname, setUname] = useState('');
  const [nickname, setNickname] = useState('');
  const [statusMessage, setStat] = useState('');
  const [profile, setProfile] = useState('');
  const [image, setImage] = useState('');
  const [tel, setTel] = useState('');
  const [snsDomain, setSnsDomain] = useState('');

  const [birth, setBirth] = useState('');

  const [pwd1, setPwd1] = useState('');
  const [pwd2, setPwd2] = useState('');
  const [checkingPwd, setCheckingPwd] = useState(0);
  const [checkingNickName, setCheckingNickname] = useState(0);
  const [checkingTel, setCheckingTel] = useState(0);

  const [status, setStatus] = useState('0');
  const [preview, setPreview] = useState('');

  const [change, setChange] = useState(0);
  const [myimage, setMyimage] = useState('');

  const [gender, setGender] = useState('');

  useEffect(() => {
    if (uid == null) {
      navigate('/login');
    }
  }, []);

  // 핸드폰 번호 입력 시 자동으로 '-' 추가
  const handleTelChange = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, '');
    let formattedTel = '';
    let cursorPosition = e.target.selectionStart; // 커서의 현재 위치 저장
  
    if (input.length > 2) {
      formattedTel += input.substring(0, 3) + '-';
      if (input.length > 6) {
        formattedTel += input.substring(3, 7) + '-';
        formattedTel += input.substring(7, 11);
      } else {
        formattedTel += input.substring(3, input.length);
      }
    } else {
      formattedTel = input;
    }
  
    // 입력된 값이 삭제되지 않았을 때만 상태 업데이트
    if (e.target.value.length >= formattedTel.length || e.target.value === formattedTel) {
      setTel(formattedTel);
    }
  
    // 입력한 위치로 커서 이동
    const newCursorPosition = cursorPosition + (formattedTel.length - e.target.value.length);
    e.target.value = formattedTel;
  
    // 입력된 값이 줄어들 때 하이픈이 사라지도록 처리
    if (e.target.value.length < formattedTel.length) {
      // 입력된 값이 줄어들 때 하이픈을 삭제
      const deletedChar = e.target.value.charAt(newCursorPosition - 1);
      if (deletedChar === '-') {
        // 하이픈을 삭제하고, 커서를 하이픈의 위치로 이동시킴
        const newFormattedTel = formattedTel.slice(0, newCursorPosition - 1) + formattedTel.slice(newCursorPosition);
        setTel(newFormattedTel);
        e.target.value = newFormattedTel;
        e.target.setSelectionRange(newCursorPosition - 1, newCursorPosition - 1);
        return;
      }
    }
  
    // 커서 위치 조정
    e.target.setSelectionRange(newCursorPosition, newCursorPosition);
  };
  

  useEffect(() => {
    if (uid != null) {
      axios.get('http://localhost:8090/user/getUser', {
        params: {
          uid: uid,
        }
      }).then(res => {
        if (res.data.profile != null) {
          setProfile(res.data.profile);
          setMyimage(FindImage(res.data.profile));
        }
        setUser(res.data);
        setUname(res.data.uname);
        setNickname(res.data.nickname);
        setStat(res.data.statusMessage);
        setBirth(res.data.birth);
        setTel(res.data.tel);
        setSnsDomain(res.data.snsDomain);
      }).catch(error => console.log(error));
    }

  }
    , [])



  const handleStat = (e) => { setStat(e.target.value); };
  const handleGender = (event) => { setGender(event.target.value === 'man' ? 0 : (event.target.value === 'woman' ? 1 : 2)); };

  const handleUname = (e) => { setUname(e.target.value); };
  const handleNickname = (e) => { setNickname(e.target.value); };
  const handleSnsDomain = (e) => { setSnsDomain(e.target.value); };
  const handleBirth = (e) => { setBirth(dayjs(e.target.value)); };

  const submitProfile = async () => {
    if (checkingNickName === 0) {
      Swal.fire({
        title: "닉네임 중복 확인을 해주세요",
        icon: "warning"
      });
      return;
    }
    if (checkingTel === 0) {
      Swal.fire({
        title: "전화번호 중복 확인을 해주세요",
        icon: "warning"
      });
      return;
    }
    console.log("asd" + birth)
    if (change !== 1) {
      axios.post('http://localhost:8090/user/update', {
        pwd: pwd1,
        uname: uname,
        nickname: nickname,
        profile: null,
        statusMessage: statusMessage,
        snsDomain: snsDomain,
        uid: uid,
        gender: gender,
        birth: birth,
        tel: tel,
      }).catch(error => console.log(error));
    } else {
      console.log(image);
      const url = UploadImage(image);
      const url2 = url.then((e) => {

      });
      console.log(url);
      axios.post('http://localhost:8090/user/update', {
        pwd: pwd1,
        uname: uname,
        nickname: nickname,
        profile: url,
        statusMessage: statusMessage,
        snsDomain: snsDomain,
        uid: uid,
        gender: gender,
        birth: birth,
        tel: tel,
      }).catch(error => console.log(error));
    }

    Swal.fire({
      icon: 'success',
      title: "설정 변경에 성공했습니다.",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
    navigate('/setting');
  }

  const checkNickname = () => {
    axios.get('http://localhost:8090/user/nickname',
      {
        params: {
          email: email
        }
      })
      .then(response => {
        const userList = response.data; // 응답 데이터 전체를 가져옵니다.
        if (!userList) {
          console.error('User list is undefined or null');
          return;
        }

        const nicknames = userList.map(user => user.nickname);
        if (nicknames.includes(nickname)) {
          Swal.fire({
            text: "닉네임이 중복됩니다.",
            icon: "warning"
          });
          return;
        }
        Swal.fire({
          icon: "success",
          text: "닉네임 사용 가능합니다!",
        });
        setCheckingNickname(1);
        return;
      }).catch(error => {
        console.error('Error fetching nicknames:', error);
      });
  }
  const checkTel = () => {
    axios.get('http://localhost:8090/user/tel', {
      params: {
        email: email
      }
    })
      .then(response => {
        const userList = response.data; // 응답 데이터 전체를 가져옵니다.
        if (!userList) {
          console.error('User list is undefined or null');
          return;
        }

        const tels = userList.map(user => user.tel);
        if (tels.includes(tel)) {
          Swal.fire({
            text: "전화번호가 중복됩니다.",
            icon: "warning"
          });
          return;
        }
        Swal.fire({
          icon: "success",
          text: "전화번호 사용 가능합니다!",
        });
        setCheckingTel(1);
        return;
      }).catch(error => {
        console.error('Error fetching tels:', error);
      });
  }


  const handleResetClick = () => {
    setPreview(null);
    setImage(null);
  };


  const goBack = () => {
    navigate('/');
  }

  const deactiveAccount = () => {
    setStatus(status === 0 ? 1 : 0)
  }

  const handleImageEdit = () => {
    // "사진수정" 버튼 클릭 시 input[type='file'] 트리거
    document.getElementById('hidden-input').click();
  };


  return (
    <>
      <Box sx={{
        display: 'flex', justifyContent: 'center',
        width: '80%',
        border: '0px solid rgb(92, 22, 153)'
      }}>
        <Card sx={{
          mt: 5,
          boxShadow: 'none', width: '70%',
        }}>
          <Typography variant="h6"
            sx={{
              mt: 2, mb: 2,
              fontWeight: 'bold',
              color: 'rgb(92, 22, 153)',
              margin: '0px 0px 0px 15px',
            }}>프로필 편집</Typography>

          <Box sx={{ m: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* 프로필 사진, 닉네임, 편집 버튼 */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                backgroundColor: '#4b008225',
                borderRadius: '15px',
                padding: '0.75em 0.25em',
              }}>

              <Avatar
                alt="H"
                src="/img/profile/profile1.jpg"
                sx={{
                  width: 80, height: 80, ml: 3, mr: 2, cursor: 'pointer'
                }}
                onClick={handleImageEdit}

              />
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                hidden
                id="hidden-input"
              />

              <Typography variant="h6"
                sx={{
                  flexGrow: 1, fontWeight: 'bold',
                  display: {
                    xs: 'none',
                    md: 'none',
                    lg: 'flex'
                  },
                }}>{nickname}</Typography>
              <Button
                variant='contained'
                onClick={handleImageEdit}
                style={{
                  marginRight: '2.5em',
                  backgroundColor: 'rgb(54, 11, 92)',

                }}>사진수정</Button>

            </Box>

            <br />

            {/* 프로필 편집 폼 */}
            <TextField
              fullWidth
              label="이메일"
              variant="outlined"
              value={email || ''}
              disabled
              sx={{ mt: 2, width: '100%' }}
            />
            <br />
            {/* 소개 영역 */}
            <TextField
              fullWidth
              label="상태 메시지를 수정하세요"
              variant="outlined"
              value={statusMessage || ''}
              onChange={handleStat}
              sx={{ width: '100%' }}
            />

            {/* 성별 선택 영역 */}
            <Box sx={{ alignSelf: 'flex-start', mt: 2, mb: 2, width: '100%' }}>
              <FormControl fullWidth>
                <InputLabel>성별</InputLabel>
                <Select
                  value={gender === 0 ? 'man' : (gender === 1 ? 'woman' : 'none')}
                  label="성별"
                  onChange={handleGender}
                >
                  <MenuItem value={"man"}>남자</MenuItem>
                  <MenuItem value={"woman"}>여자</MenuItem>
                  <MenuItem value={"none"}>설정 안함</MenuItem>
                </Select>
              </FormControl>
              <br /><br />
              {/* 생일 변경 */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker sx={{ mt: 2, width: '100%' }} label="생년월일" onChange={handleBirth} slots={{ textField: TextField }}
                    value={dayjs(birth)} formatDensity="spacious" />
                </DemoContainer>
              </LocalizationProvider>
            </Box>

            {/* 이름 입력 */}
            <TextField
              required
              fullWidth
              label="이름"
              variant="standard"
              value={uname || ''}
              onChange={handleUname}
              sx={{ mt: 2, width: '100%' }}
            />

            {/* 닉네임 입력 */}
            <Grid container style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <Grid item xs={8} md={10} lg={10.8}>
                <LightTooltip
                  title="별명을 입력하세요." arrow placement="bottom" >
                  <TextField
                    required
                    fullWidth
                    label="닉네임"
                    variant="standard"
                    value={nickname || ''}
                    onChange={handleNickname}
                    sx={{ mt: 2, width: '100%' }}
                  />
                </LightTooltip>
              </Grid>
              <Grid item xs={4} md={2} lg={1.2}>
                <Button onClick={checkNickname} variant="contained" sx={{ backgroundColor: 'rgb(54, 11, 92)', width: '10%' }} style={{ margin: '20px 0px 0px 5px' }} >확인</Button>
              </Grid>
            </Grid>


            {/* 도메인 입력 */}
            <TextField
              fullWidth
              label="도메인 주소"
              variant="standard"
              value={snsDomain || ''}
              onChange={handleSnsDomain}
              sx={{ mt: 2, width: '100%' }}
            />


            {/* 전화번호 입력 */}
            <Grid container style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <Grid item xs={8} md={10} lg={10.8}>
                <LightTooltip title="' - ' 없이 숫자만 입력하세요." placement='bottom' >
                  <TextField
                    required
                    fullWidth
                    label="전화번호"
                    variant="standard"
                    value={tel || ''}
                    onChange={handleTelChange}
                    sx={{ mt: 2, width: '100%' }}
                  />
                </LightTooltip>
              </Grid>
              <Grid item xs={4} md={2} lg={1.2}>
                <Button onClick={checkTel} variant="contained" sx={{ backgroundColor: 'rgb(54, 11, 92)' }} style={{ margin: '20px 0px 0px 5px' }} >확인</Button>
              </Grid>
            </Grid>

            {/* 하단 버튼 영역 */}
            <Grid container sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Grid item xs={8} lg={6} sx={{ display: 'flex' }}>
                <Button
                  variant="contained"
                  onClick={submitProfile}
                  style={{ margin: '1em', width: '20%', backgroundColor: 'rgb(54, 11, 92)' }}>
                  완료
                </Button>

                <Button
                  variant="contained"
                  onClick={goBack}
                  style={{ margin: '1em', width: '20%', backgroundColor: '#bbbbbb' }}>
                  취소
                </Button>
              </Grid>

              {status == 0 ?
                <Grid item xs={4} lg={6} >
                  <Button
                    variant="contained"
                    onClick={deactiveAccount}
                    style={{ margin: '1em', width: '15%', backgroundColor: 'red' }}>
                    계정<br />잠그기
                  </Button>
                </Grid>
                :
                <Grid item xs={4} lg={6} >
                  <Button
                    variant="contained"
                    onClick={deactiveAccount}
                    style={{ margin: '1em', width: '15%', backgroundColor: 'Blue' }}>
                    활성화
                  </Button>
                </Grid>}
            </Grid>

          </Box>

        </Card >
      </Box >
    </>
  );

}