import { Box, Button, Stack, Typography } from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  fetchSignInReason,
  loggedInUser_get,
} from "../../redux/slices/HomePageSlice";

const SignInReason = () => {
  const [currentPosition, setCurrentPosition] = useState(null);

  const api = "AIzaSyC4NuTVslHVqm9TDBy0_5ckT6wMbOPUn_M";
  const { signInReason, isSignInloading, loggedInUser } = useSelector(
    (state) => state.HomePageModule
  );
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error("Error getting location", error),
      { enableHighAccuracy: true }
    );
  }, []);
  useEffect(() => {
    dispatch(loggedInUser_get({ switchToWebLite: true }));
  }, [dispatch]);

  useEffect(()=>{



  },[signInReason])
  const [searchParams] = useSearchParams();

  // Read parameters from the URL
  const { empId } = useParams();

  const employeeSignIn = searchParams.get("employeeSignIn");
  const signInFrom = searchParams.get("signInFrom");
  const repeatSignIn = searchParams.get("repeatSignIn");
const handleLoginBack  =()=>{
    nav(-1);
}

  useEffect(() => {
    dispatch(
      fetchSignInReason({
        empId,
        employeeSignIn,
        signInFrom,
        repeatSignIn,
      })
    );
  }, [dispatch, empId, employeeSignIn, signInFrom, repeatSignIn]);

  useEffect(() => {}, []);
  const handleLoginOrLogout = ({
  webLiteAccess,
  latitude,
  longitude,
  signInFrom,
  dayPlanId,
  repeatSignIn,
  employeeSignIn,
}) => {
   const empSignIn = Number(employeeSignIn);
 
  
  const updatedEmployeeSignIn = empSignIn === -1 ? 1 : 0;
 

  if (
    signInReason?.StartWorkReasonMandatory !== 0 &&
    signInFrom !== 0
  ) {
    if (signInFrom === 2) {
      // nav(`/home?signInFrom=${signInFrom}&dayPlanId=${dayPlanId}`);
    } else {
      nav(
        `/home?webLiteAccess=${webLiteAccess}&latitude=${latitude}&longitude=${longitude}&signInFrom=${signInFrom}&dayPlanId=${dayPlanId}&repeatSignIn=${repeatSignIn}&employeeSignIn=${updatedEmployeeSignIn}`
      );
    }
  }
};


  return (
    <Box sx={{ mt: 9 }}>
      <Stack sx={{ width: "100%" }}>
        <Stack sx={{ height: { sm: "500px", xs: "430px" } }}>
          <LoadScript googleMapsApiKey={api}>
            {currentPosition && (
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={currentPosition}
                zoom={15}
              >
                <Marker position={currentPosition} />
              </GoogleMap>
            )}
          </LoadScript>
        </Stack>
      </Stack>

      {signInReason && signInReason.StartWorkReasonRequired === 1 && (
        <Typography>Need to add reason for sign in</Typography>
      )}

      <Stack
        sx={{
          position: "absolute",
          bottom: 0,
          zIndex: 999,
          width: "100%",
          p: { sm: 2, xs: 1 },
        }}
      >
        {/* Show login text if reason not required and user is NOT signed in */}
        {signInReason?.StartWorkReasonRequired === "0" &&
          signInReason?.employeeSignIn !== "0" && (
            <Typography>Do you want to login</Typography>
          )}

        {/* Show logout text if user is currently signed in */}
        {signInReason?.employeeSignIn === "0" && (
          <Typography>Do you want to logout</Typography>
        )}
        <Stack
          sx={{
            flexDirection: "row",
            gap: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Button variant="outlined"  onClick={handleLoginBack}>no</Button>
          <Button
            variant="contained"
            onClick={() =>
              handleLoginOrLogout({
                webLiteAccess: "true",
                latitude: currentPosition.lat,
                longitude: currentPosition.lng,
                signInFrom: signInReason.signInFrom,
                dayPlanId: signInReason.dayPlanId,
                repeatSignIn: signInReason?.repeatSignIn,
                employeeSignIn: signInReason?.employeeSignIn,
              })
            }
          >
            Yes
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SignInReason;
