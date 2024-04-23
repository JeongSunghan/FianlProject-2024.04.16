import React from "react";
import { Stack } from "@mui/material";

import SnsBar from '../components/Important/SnsBar';
import Aside from "../components/Important/Aside";
import Follow from "../components/Follow/Follow";


export default function Follower() {
    // const [followers, setFollowers] = useState(1);

    return (
        <>
            <SnsBar />
            <Stack direction="row" spacing={0} sx={{ height: "100vh" }}>
                <Stack direction="column" spacing={2} sx={{ flex: 0.3, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                    <Aside />
                </Stack>
                <Stack direction="column" spacing={2} sx={{ flex: 0.2 }}>
                </Stack>
                <Stack direction="column" spacing={2} sx={{ flex: 0.8 }}>
                    <Follow />
                </Stack>
                <Stack direction="column" spacing={2} sx={{ flex: 0.5 }}>
                </Stack>
            </Stack>
        </>
    )
}