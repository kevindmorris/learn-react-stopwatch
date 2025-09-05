import { Pause, PlayArrow, RestartAlt } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

export default function Component() {
  const [time, setTime] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const playPause = () => {
    setIsActive((prev) => !prev);
  };

  const reset = () => {
    setIsActive(false);
    setTime(0);
  };

  React.useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " ") {
        event.preventDefault();
        playPause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const formatTime = (hundredths: number) => {
    const totalSeconds = Math.floor(hundredths / 100);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const hundredth = hundredths % 100;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}.${String(hundredth).padStart(2, "0")}`;
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ minWidth: 400 }}>
        <CardContent sx={{ height: "100%" }}>
          <Typography
            variant="h1"
            component="div"
            textAlign="center"
            fontWeight={500}
          >
            {formatTime(time)}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton color="primary" onClick={reset}>
              <RestartAlt />
            </IconButton>
            <IconButton color="primary" onClick={playPause}>
              {isActive ? <Pause /> : <PlayArrow />}
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
