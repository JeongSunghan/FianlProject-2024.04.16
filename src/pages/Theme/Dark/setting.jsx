import React, { useState } from "react";
import { Box, Button, Card, TextField, Modal, InputAdornment, FormControlLabel, Switch, styled, FormGroup, Typography, Stack } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SnsBar from "../../../components/SnsBar";
import Aside from "../../../components/Aside";
import '../../../CSS/Setting.css'; // CSS 파일 임포트

// import ProfileMenu from "../components/ProfileMenu";

export default function Setting() {
    // 성별
    const [gender, setGender] = useState('');

    // Modal 열기,닫기
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 비밀번호 숨기기/보이기
    const [showPassword, setShowPassword] = useState(false);

    // 성별 이벤트
    const handleChange = (event) => {
        setGender(event.target.value);
    };

    // 모달 이벤트 - 열기
    const openModal = () => {
        setIsModalOpen(true);
    };

    // 모달 이벤트 - 닫힘
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // 비밀번호 숨기기/보이기 토글
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // 테마 변경 함수
    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 0,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                        '#fff',
                    )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
            width: 32,
            height: 32,
            '&::before': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            borderRadius: 20 / 2,
        },
    }));

    // ON / OFF 기능 함수
    const AntSwitch = styled(Switch)(({ theme }) => ({
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
        '&:active': {
            '& .MuiSwitch-thumb': {
                width: 15,
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
                transform: 'translateX(9px)',
            },
        },
        '& .MuiSwitch-switchBase': {
            padding: 2,
            '&.Mui-checked': {
                transform: 'translateX(12px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: 12,
            height: 12,
            borderRadius: 6,
            transition: theme.transitions.create(['width'], {
                duration: 200,
            }),
        },
        '& .MuiSwitch-track': {
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor:
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
            boxSizing: 'border-box',
        },
    }));

    return (
        <>
            <SnsBar />
            {/* <ProfileMenu /> */}

            <Stack direction="row" spacing={0} sx={{ height: "100vh" }}>
                <Stack direction="column" spacing={2} sx={{ flex: 0.2 }}>

                    <Stack alignItems="center" just sx={{ flexGrow: 1 }}>
                        <Aside />
                    </Stack>
                </Stack>
                {/* 첫 번째 영역 */}
                <Stack direction="column" spacing={2} sx={{ flex: 0.8, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>


                    {/* 전체 스타일 */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '35px',
                    }}>

                        {/* 메인 프로필 영역 */}
                        <Card className="MainProfile" style={{
                            border: '1px solid rgb(100, 78, 193)',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>

                            {/* 프로필 사진, 닉네임, 편집 영역 */}
                            <div id="profile" className="profile">
                                <Avatar alt="H" src="/img/profile/profile1.jpg" style={{ marginLeft: '20px' }} />
                                <p style={{ marginLeft: '10px' }}>닉네임</p>
                                <Button className="profile-edit-button" onClick={openModal}>프로필 편집</Button>
                            </div>

                            {/* 소개 영역 */}
                            <div id="introduce" style={{ margin: '10px 0' }}>
                                <p className="introduce-label">소개</p>
                            </div>

                            {/* 소개글 수정 영역 */}
                            <Box component="section" sx={{
                                p: 2,
                                border: 'none',
                                marginTop: '10px',
                                width: '65%',
                            }}>
                                <TextField id="outlined-basic" label="나로 말할거 같으면!" variant="outlined" fullWidth />
                            </Box>

                            <hr />

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
                                        style={{ width: '150px', marginLeft: '35px' }}
                                    >
                                        <MenuItem value={"man"}>남자</MenuItem>
                                        <MenuItem value={"girl"}>여자</MenuItem>
                                        <MenuItem value={"none"}>설정 안함</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            {/* 계정 비활성화(탈퇴) 영역 */}
                            <div id="profile-disabled" className="profile-disabled">
                                <Button sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: 'darkred' } }}>비활성화</Button>
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
                                        id="standard-basic"
                                        label="이름"
                                        variant="standard"
                                        fullWidth  // 입력 폼 너비를 전체로 설정
                                    /><br /><br />

                                    <TextField
                                        className="nickname-text"
                                        id="standard-basic"
                                        label="닉네임"
                                        variant="standard"
                                        fullWidth
                                    /><br /><br />

                                    <TextField
                                        className="email-text"
                                        id="standard-basic"
                                        label="이메일"
                                        variant="standard"
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
                                    </FormGroup>
                                </div>
                            </Modal>

                        </Card>
                    </div>
                    {/* 영역 1의 컨텐츠 */}
                </Stack>

                {/* 두 번째 영역 */}
            </Stack>
        </>
    );
}
