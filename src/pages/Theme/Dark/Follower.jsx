import { Avatar, Box, Button, Container, FormControl, Input, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Follower() {
    const [followers, setFollowers] = useState(1);

    return (
        <Stack sx={{padding: '20px'}} justifyContent="center">
            <Container sx={{width: '500px', border: '1px solid black', borderRadius: '20px', minHeight: '300px'}}>
                <Stack>
                    <FormControl variant="standard">
                        <Input sx={{height: '50px', fontSize: '25px'}} placeholder="팔로우한 유저 찾기" startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle sx={{fontSize: '35px'}}></AccountCircle>
                            </InputAdornment>
                        } endAdornment={
                            <InputAdornment>
                                <Button>
                                    <SearchIcon sx={{fontSize: '35px'}}></SearchIcon>
                                </Button>
                            </InputAdornment>
                        }/>
                    </FormControl>
                </Stack>
                <Stack sx={{marginTop: '20px'}} spacing={2}>
                    <Stack direction='row' alignItems='center'>
                        <Avatar sx={{marginRight: '10px'}}>
                            R
                        </Avatar>
                        <Stack width='100%'>
                            <Typography>
                                O O O
                            </Typography>
                            <Typography fontSize={12} color='rgb(120, 120, 120)'>
                                OOOO-OO-OO 추가
                            </Typography>
                        </Stack>
                        <Stack direction='row' justifyContent='flex-end'>
                            <Button>
                                <MoreVertIcon></MoreVertIcon>
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack direction='row' alignItems='center'>
                        <Avatar sx={{marginRight: '10px'}}>
                            R
                        </Avatar>
                        <Stack width='100%'>
                            <Typography>
                                O O O
                            </Typography>
                            <Typography fontSize={12} color='rgb(120, 120, 120)'>
                                OOOO-OO-OO 추가
                            </Typography>
                        </Stack>
                        <Stack direction='row' justifyContent='flex-end'>
                            <Button>
                                <MoreVertIcon></MoreVertIcon>
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack direction='row' alignItems='center'>
                        <Avatar sx={{marginRight: '10px'}}>
                            R
                        </Avatar>
                        <Stack width='100%'>
                            <Typography>
                                O O O
                            </Typography>
                            <Typography fontSize={12} color='rgb(120, 120, 120)'>
                                OOOO-OO-OO 추가
                            </Typography>
                        </Stack>
                        <Stack direction='row' justifyContent='flex-end'>
                            <Button>
                                <MoreVertIcon></MoreVertIcon>
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </Stack>
    )
}