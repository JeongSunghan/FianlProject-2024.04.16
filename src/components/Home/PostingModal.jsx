import React, { useState } from "react";
import {
  Card, Stack, TextField, Button, Grid, Modal, Box,
  Accordion, AccordionSummary, AccordionDetails, Typography,
  Switch // 스위치가 여기에 포함됩니다
} from "@mui/material";
import { styled } from '@mui/material/styles'; // 스타일 관련 함수
import CreateIcon from '@mui/icons-material/Create'; // 아이콘
import '../../css/posting.css'; // 외부 CSS 스타일

// 스위치 스타일링
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

// Modal스타일
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '65vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    maxHeight: '90vh',
};

export default function Posting() {
    // 창열고 닫기
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // 아코디언
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    // 이미지 파일 불러오기
    const [images, setImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);

    // 파일이 선택되었을 때 호출되는 함수
    // 파일이 선택되었을 때 호출되는 함수
    const handleFileChange = (event) => {
        // 이미지가 5개를 초과하지 않도록 확인
        if (event.target.files.length + images.length > 5) {
            alert('최대 5개의 이미지만 업로드할 수 있습니다.');
            return;
        }
        const selectedFiles = Array.from(event.target.files);
        setImages(images.concat(selectedFiles)); // 기존 이미지 배열에 추가
        const newPreviewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
        setPreviewUrls(previewUrls.concat(newPreviewUrls)); // 미리보기 URL 배열에 추가
    };

    // 이미지 삭제 핸들러
    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index)); // 이미지 배열에서 삭제
        setPreviewUrls(previewUrls.filter((_, i) => i !== index)); // 미리보기 URL 배열에서 삭제
    };

    return (
        <>
            {/* 기존의 버튼 및 아이콘 */}
            <button className='asideStyle' onClick={handleOpen}>
                <Grid container>
                    <Grid item xs={12} lg={6} sx={{ display: { xs: 'flex', lg: 'flex' }, pl: 3 }}>
                        <CreateIcon className='iconStyle' />
                    </Grid>
                    <Grid item xs={0} lg={6} sx={{ display: { xs: 'none', lg: 'flex' }, pr: 3, justifyContent: 'flex-end' }}>
                        글쓰기
                    </Grid>
                </Grid>
            </button>

            {/* 글쓰기 모달 */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Box sx={modalStyle}>
                    {/* 모달의 상단에 있는 헤더 부분 */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={2}>
                        <Button color="primary" onClick={handleClose}>창 닫기</Button>
                        <Typography variant="h6" component="h2" fontWeight="bold">새 게시물 만들기</Typography>
                        <Button color="primary">작성</Button>
                    </Stack>

                    {/* 구분선 */}
                    <hr style={{ opacity: '0.5' }} />

                    {/* 이미지 업로드 및 미리보기 */}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button variant="outlined" component="label">
                                이미지 추가하기
                                <input
                                    type="file"
                                    multiple
                                    hidden
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </Button>
                        </Grid>

                        {/* 이미지 미리보기 */}
                        {previewUrls.map((url, index) => (
                            <Grid item key={index} xs={4} sm={2}>
                                <Card>
                                    <img src={url} alt={`Preview ${index}`} style={{ width: '15.5vh', height: '15vh', objectFit: 'cover' }} />
                                    <Button style={{ justifyContent: 'center' }}
                                        onClick={() => handleRemoveImage(index)}>제거</Button>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* 게시글 작성 부분 */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            sx={{ marginTop: '0.5em' }}
                            placeholder="문구를 입력하세요..."
                            id="outlined-multiline-static"
                            multiline
                            rows={6}
                            fullWidth
                            variant="outlined"
                        />
                        <Accordion>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography>이모티콘 선택</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    이모지를 선택해
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>


                    {/* 위치 */}
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                            <Typography>위치 추가</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                카카오 맵 API 지도 생성
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    {/* 게시물 공개 비공개 */}
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography>게시글 공개 혹은 비공개 </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ display: 'flex' }}>
                            <Typography sx={{ marginRight: '1em' }}>비공개</Typography>
                            <AntSwitch sx={{ marginTop: '0.25em' }} defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                            <Typography sx={{ marginLeft: '1em' }}>공개</Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Modal >
        </>
    );
}