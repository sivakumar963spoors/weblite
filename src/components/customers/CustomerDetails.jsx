import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toggleMenuTitle } from "../../redux/slices/MenuSlice";
import { get_selectedCustomerDetails } from "../../redux/slices/CustomerModule";
const personalDetails = ["First Name", "Last Name", "Title", "Phone", "Email"];
const otherDetails = [
  "Outstanding Amount",
  "Total Calls",
  "Location(Lat, Long)",
  "Currency",
  "Date",
  "DateTime",
  "Number",
  "Text",
  "Time",
  "Email",
  "Location(Lat, Long)",
  "Phone",
  "URL",
  "Audio",
  "Document",
  "Image",
  "Signature",
  "Video",
  "Country",
  "Custom Entity",
  "Customer",
  "Employee",
  "Form",
  "YesOrNo",
  "Dropdown",
  "Multi Pick List",
  "Multi Select Dropdown",
  "Pick List",
  "From Date",
  "To Date",
  "Datespan",
  "Date",
  "2024-09-16",
  "Currency",
  "100.00",
  "Number",
  "Email",
  "Location(Lat, Long)",
  "Audio",
];

const CustomerDetails = () => {
  const [searchParams] = useSearchParams();

  const customerId = searchParams.get("customerId");
  const customerChecknId = searchParams.get("CustomerChecknId");
  const dayPlanId = searchParams.get("dayPlanId");
  const selectedDate = searchParams.get("selectedDate");
  const navigationToCustomerDayplan = searchParams.get(
    "navigationToCustomerDayplan"
  );
  const { isGetSelectedCustomer, get_selectedCustomerDetails_data } =
    useSelector((state) => state.CustomerModule);
  const navigation = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    if (customerId) {
      dispatch(
        get_selectedCustomerDetails({
          customerId,
          customerChecknId,
          dayPlanId,
          selectedDate,
          navigationToCustomerDayplan,
        })
      );
    }
  }, [
    dispatch,
    customerId,
    customerChecknId,
    dayPlanId,
    selectedDate,
    navigationToCustomerDayplan,
  ]);

  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [zIndex, setZIndex] = useState(1000);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setZIndex(500);
      } else {
        setZIndex(1000);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleViewActivity = (id) => {
    navigation(`/customer/view/activity?customerId=${id}`);
  };
  const handleActivity = (id, dayPlanId) => {
  
    setTimeout(() => {
      navigation(
        `/customer/view/activity/forms?customerId=${id}&dayPlanId
        
        =${dayPlanId}`
      );
    }, 100);
  };
  const customerTerritoryId =
    get_selectedCustomerDetails_data?.customer?.customerTerritoryId;

  const matchedTerritory = get_selectedCustomerDetails_data?.territories?.find(
    (territory) => territory?.territoryId === customerTerritoryId
  );

  return (
    <div>
      <Stack sx={{ mt: 8, bgcolor: "#F0F3FA" }}>
        {isGetSelectedCustomer ? (
          <Typography sx={{ textAlign: "center" }}>
            Loading customer details ......
          </Typography>
        ) : (
          <>
            {get_selectedCustomerDetails_data ? (
              <Stack key={get_selectedCustomerDetails_data?.customer?.id}>
                <Stack
                  sx={{
                    mt: -1,
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: { zIndex },
                  }}
                >
                  <Stack
                    sx={{
                      width: { sm: "95%", xs: "95%" },
                      flexDirection: "row",
                      bgcolor: "#FFFF",
                      p: { sm: 1, xs: 1 },
                      borderRadius: "10px",
                      border: "1px solid #EEEE",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
                      {get_selectedCustomerDetails_data?.customer?.customerName}
                    </Typography>
                    <Switch {...label} />
                  </Stack>
                </Stack>
                <Stack
                  sx={{
                    width: "99%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Stack
                    sx={{
                      width: "100%",
                      p: { sm: 1.5, xs: 1 },
                      textTransform: "capitalize",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Stack sx={{ alignItems: "start", width: "97%" }}>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "poppins",
                          fontSize: { sm: "12px", xs: "10px" },
                        }}
                      >
                        customer details
                      </Typography>
                    </Stack>
                    <Stack
                      sx={{
                        width: { sm: "97%", xs: "100%" },
                        flexDirection: "row",
                        bgcolor: "#FFFF",
                        p: { sm: 1.5, xs: 1 },
                        borderRadius: "10px",
                        border: "1px solid #EEEE",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stack sx={{ width: "100%" }}>
                        <Stack
                          sx={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            width: "100%",
                            display: "flex",
                            padding: "15px 0px",

                            "& > *": { width: "50%", marginBottom: "50px" },
                            "& > *> :first-of-type": {
                              color: "#7A7A7A",
                              fontWeight: "bold",
                              fontSize: { sm: "12px", xs: "10px" },
                            },
                            "& > * >: nth-of-type(2)": {
                              fontWeight: "bold",
                              fontSize: { sm: "12px", xs: "10px" },
                            },
                          }}
                        >
                          <Stack sx={{}}>
                            <Typography>Customer Id</Typography>
                            <Typography>
                              {
                                get_selectedCustomerDetails_data?.customer
                                  ?.customerNo
                              }
                            </Typography>
                          </Stack>
                          <Stack>
                            <Typography>Phone</Typography>
                            <Typography>
                              {
                                get_selectedCustomerDetails_data?.customer
                                  ?.customerPhone
                              }
                            </Typography>
                          </Stack>
                          <Stack>
                            <Typography>Location(Lat)</Typography>
                            <Typography>
                              {
                                get_selectedCustomerDetails_data?.customer
                                  ?.customerLat
                              }
                            </Typography>
                          </Stack>
                          <Stack>
                            <Typography>Location(Long)</Typography>
                            <Typography>
                              {
                                get_selectedCustomerDetails_data?.customer
                                  ?.customerLong
                              }
                            </Typography>
                          </Stack>
                          <Stack>
                            <Typography>crated by</Typography>
                            <Typography>
                              {
                                get_selectedCustomerDetails_data?.customerCreatedBy
                              }
                            </Typography>
                          </Stack>
                          <Stack>
                            <Typography>crated Time</Typography>
                            <Typography>
                              {get_selectedCustomerDetails_data?.createTime}
                            </Typography>
                          </Stack>
                          <Stack>
                            <Typography>Territory</Typography>
                            <Typography>
                              {matchedTerritory?.territoryName}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            color: "#003366",

                            margin: "20px 0",
                            fontSize: { sm: "12px", xs: "10px" },
                          }}
                        >
                          Primary Contact
                        </Typography>
                        <Stack
                          sx={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            width: "100%",
                            display: "flex",
                            padding: "10px 0px",
                          }}
                        >
                          <Stack
                            sx={{
                              width: "100%",
                              "& > *> :first-of-type": {
                                color: "#7A7A7A",
                                fontWeight: "bold",
                                fontSize: { sm: "12px", xs: "10px" },
                              },
                              "& > * >: nth-of-type(2)": {
                                fontWeight: "bold",
                                fontSize: { sm: "12px", xs: "10px" },
                              },
                            }}
                          >
                            <Stack
                              sx={{
                                width: "100%",
                                margin: "10px 0px",
                              }}
                            >
                              <Typography
                                sx={{ width: { sm: "30%", xs: "55%" } }}
                              >
                                first name
                              </Typography>
                              <Typography>
                                {
                                  get_selectedCustomerDetails_data?.customer
                                    ?.primaryContactFirstName
                                }
                              </Typography>
                            </Stack>
                            <Stack
                              sx={{
                                width: "100%",
                                margin: "10px 0px",
                              }}
                            >
                              <Typography
                                sx={{ width: { sm: "30%", xs: "55%" } }}
                              >
                                last name
                              </Typography>
                              <Typography>
                                {
                                  get_selectedCustomerDetails_data?.customer
                                    ?.primaryContactLastName
                                }
                              </Typography>
                            </Stack>
                            <Stack
                              sx={{
                                width: "100%",
                                margin: "10px 0px",
                              }}
                            >
                              <Typography
                                sx={{ width: { sm: "30%", xs: "55%" } }}
                              >
                                title
                              </Typography>
                              <Typography>
                                {" "}
                                {
                                  get_selectedCustomerDetails_data?.customer
                                    ?.primaryContactTitle
                                }
                              </Typography>
                            </Stack>
                            <Stack
                              sx={{
                                width: "100%",
                                margin: "10px 0px",
                              }}
                            >
                              <Typography
                                sx={{ width: { sm: "30%", xs: "55%" } }}
                              >
                                phone
                              </Typography>
                              <Typography>
                                {
                                  get_selectedCustomerDetails_data?.customer
                                    ?.primaryContactPhone
                                }
                              </Typography>
                            </Stack>
                            <Stack
                              sx={{
                                width: "100%",
                                margin: "10px 0px",
                              }}
                            >
                              <Typography
                                sx={{ width: { sm: "30%", xs: "55%" } }}
                              >
                                email
                              </Typography>
                              <Typography>
                                {
                                  get_selectedCustomerDetails_data?.customer
                                    ?.primaryContactEmail
                                }
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>

                        <Typography
                          sx={{
                            fontWeight: "bold",
                            color: "#003366",

                            margin: "20px 0",
                            fontSize: { sm: "12px", xs: "10px" },
                          }}
                        >
                          Secondary Contact
                        </Typography>
                        <Stack
                          sx={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            width: "100%",
                            display: "flex",
                            padding: "10px 0px",
                          }}
                        >
                          <Stack
                            sx={{
                              width: "100%",
                              "& > *> :first-of-type": {
                                color: "#7A7A7A",
                                fontWeight: "bold",
                                fontSize: { sm: "12px", xs: "10px" },
                              },
                              "& > * >: nth-of-type(2)": {
                                fontWeight: "bold",
                                fontSize: { sm: "12px", xs: "10px" },
                              },
                            }}
                          >
                            <Stack
                              sx={{
                                width: "100%",
                                margin: "10px 0px",
                              }}
                            >
                              <Typography
                                sx={{
                                  width: { sm: "30%", xs: "55%" },
                                  fontWeight: 600,
                                }}
                              >
                                First Name
                              </Typography>
                              <Typography>
                                {
                                  get_selectedCustomerDetails_data?.customer
                                    ?.secondaryContactFirstName
                                }
                              </Typography>
                            </Stack>

                            <Stack
                              sx={{
                                width: "100%",
                                margin: "10px 0px",
                              }}
                            >
                              <Typography
                                sx={{
                                  width: { sm: "30%", xs: "55%" },
                                  fontWeight: 600,
                                }}
                              >
                                Last Name
                              </Typography>
                              <Typography>
                                {
                                  get_selectedCustomerDetails_data?.customer
                                    ?.secondaryContactLastName
                                }
                              </Typography>
                            </Stack>

                            <Stack
                              sx={{
                                width: "100%",
                                margin: "10px 0px",
                              }}
                            >
                              <Typography
                                sx={{
                                  width: { sm: "30%", xs: "55%" },
                                  fontWeight: 600,
                                }}
                              >
                                Title
                              </Typography>
                              <Typography>
                                {
                                  get_selectedCustomerDetails_data?.customer
                                    ?.secondaryContactTitle
                                }
                              </Typography>
                            </Stack>

                            <Stack
                              sx={{
                                width: "100%",
                                margin: "10px 0px",
                              }}
                            >
                              <Typography
                                sx={{
                                  width: { sm: "30%", xs: "55%" },
                                  fontWeight: 600,
                                }}
                              >
                                Phone
                              </Typography>
                              <Typography>
                                {
                                  get_selectedCustomerDetails_data?.customer
                                    ?.secondaryContactPhone
                                }
                              </Typography>
                            </Stack>

                            <Stack
                              sx={{
                                width: "100%",
                                margin: "10px 0px",
                              }}
                            >
                              <Typography
                                sx={{
                                  width: { sm: "30%", xs: "55%" },
                                  fontWeight: 600,
                                }}
                              >
                                Email
                              </Typography>
                              <Typography>
                                {
                                  get_selectedCustomerDetails_data?.customer
                                    ?.secondaryContactEmail
                                }
                              </Typography>
                            </Stack>

                            <Stack
                              sx={{
                                width: "100%",
                                margin: "10px 0px",
                              }}
                            >
                              <Typography
                                sx={{
                                  width: { sm: "30%", xs: "55%" },
                                  fontWeight: 600,
                                }}
                              >
                                Street
                              </Typography>
                              <Typography>
                                {
                                  get_selectedCustomerDetails_data?.customer
                                    ?.customerAddressStreet
                                }
                              </Typography>
                            </Stack>

                            <Stack
                              sx={{
                                width: "100%",
                                margin: "10px 0px",
                              }}
                            >
                              <Typography
                                sx={{
                                  width: { sm: "30%", xs: "55%" },
                                  fontWeight: 600,
                                }}
                              >
                                Landmark
                              </Typography>
                              <Typography>
                                {
                                  get_selectedCustomerDetails_data?.customer
                                    ?.customerAddressLandMark
                                }
                              </Typography>
                            </Stack>

                            <Stack
                              sx={{
                                width: "100%",
                                margin: "10px 0px",
                              }}
                            >
                              <Typography
                                sx={{
                                  width: { sm: "30%", xs: "55%" },
                                  fontWeight: 600,
                                }}
                              >
                                Area
                              </Typography>
                              <Typography>
                                {
                                  get_selectedCustomerDetails_data?.customer
                                    ?.customerAddressArea
                                }
                              </Typography>
                            </Stack>

                            <Stack
                              sx={{
                                width: "100%",
                                margin: "10px 0px",
                              }}
                            >
                              <Typography
                                sx={{
                                  width: { sm: "30%", xs: "55%" },
                                  fontWeight: 600,
                                }}
                              >
                                City
                              </Typography>
                              <Typography>
                                {
                                  get_selectedCustomerDetails_data?.customer
                                    ?.customerAddressCity
                                }
                              </Typography>
                            </Stack>

                            <Stack
                              sx={{
                                width: "100%",
                                margin: "10px 0px",
                              }}
                            >
                              <Typography
                                sx={{
                                  width: { sm: "30%", xs: "55%" },
                                  fontWeight: 600,
                                }}
                              >
                                District
                              </Typography>
                              <Typography>
                                {
                                  get_selectedCustomerDetails_data?.customer
                                    ?.customerAddressDistrict
                                }
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack
                  sx={{
                    width: "99%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Stack
                    sx={{
                      width: "100%",
                      p: { sm: 1.5, xs: 1 },
                      textTransform: "capitalize",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Stack sx={{ alignItems: "start", width: "97%" }}>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "poppins",
                          fontSize: { sm: "12px", xs: "10px" },
                        }}
                      >
                        other details
                      </Typography>
                    </Stack>
                    <Stack
                      sx={{
                        width: { sm: "97%", xs: "100%" },
                        flexDirection: "row",
                        bgcolor: "#FFFF",
                        p: { sm: 1.5, xs: 1 },
                        borderRadius: "10px",
                        border: "1px solid #EEEE",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stack sx={{ width: "100%" }}>
                        <Stack
                          sx={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            width: "100%",
                            display: "flex",
                            padding: "15px 0px",
                          }}
                        >
                          <Stack
                            sx={{
                              width: "100%",
                              gap: 1,
                              "& > *> :first-of-type": {
                                color: "#7A7A7A",
                                fontWeight: "bold",
                                fontSize: { sm: "12px", xs: "10px" },
                              },
                              "& > * >: nth-of-type(2)": {
                                fontWeight: "bold",
                                fontSize: { sm: "12px", xs: "10px" },
                              },
                            }}
                          >
                            <>
                              {get_selectedCustomerDetails_data?.formDisplays
                                ?.filter((each) => each.type === 1)
                                .map((formDisplay, index) => (
                           
                                  <Stack key={index}>
                                        
                                    <Typography>
                                      {formDisplay.fieldDisplay.fieldType ===
                                      29 ? (
                                        formDisplay.fieldDisplay.fieldLabel
                                      ) : (
                                        <>
                                          {formDisplay.fieldDisplay.fieldLabel}
                                          <Typography>
                                            {formDisplay.fieldDisplay
                                              .fieldType === 12 ||
                                            formDisplay.fieldDisplay
                                              .fieldType === 13 ? (
                                              formDisplay.fieldDisplay
                                                .fieldValueDispaly === null ? (
                                                <></>
                                              ) : (
                                                <>
                                                  <a
                                                    target="_blank"
                                                    href={`${formDisplay.fieldDisplay.fieldValueDispaly}`}
                                                  >
                                                    <Box
                                                      component={"img"}
                                                      sx={{
                                                        maxWidth: "150px",
                                                        maxHeight: "150px",
                                                      }}
                                                      src={`${formDisplay.fieldDisplay.fieldValueDispaly}`}
                                                    >


                                                      ooooooo
                                                    </Box>
                                                  </a>
                                                  {formDisplay.fieldDisplay
                                                    .locationAddress && (
                                                    <p>
                                                      <a
                                                        style={{
                                                          textDecoration:
                                                            "underline",
                                                        }}
                                                        href={`javascript:openLocation('${formDisplay.fieldDisplay.locationLatLong}')`}
                                                      >
                                                        {
                                                          formDisplay
                                                            .fieldDisplay
                                                            .locationAddress
                                                        }
                                                      </a>
                                                    </p>
                                                  )}
                                                  {formDisplay.fieldDisplay
                                                    .locationLatLong && (
                                                    <p>
                                                      <a
                                                        style={{
                                                          textDecoration:
                                                            "underline",
                                                        }}
                                                        href={`javascript:openLocation('${formDisplay.fieldDisplay.locationLatLong}')`}
                                                      >
                                                        {
                                                          formDisplay
                                                            .fieldDisplay
                                                            .locationLatLong
                                                        }
                                                      </a>
                                                    </p>
                                                  )}
                                                </>
                                              )
                                            ) : formDisplay.fieldDisplay
                                                .fieldType === 22 ? (
                                              formDisplay.fieldDisplay
                                                .fieldValueDispaly === null ? (
                                                <></>
                                              ) : (
                                                <>
                                                  {
                                                    formDisplay.fieldDisplay
                                                      .fieldValueDispaly
                                                  }
                                                  <a
                                                    target="_blank"
                                                    href={`${formDisplay.fieldDisplay.fieldValueDispaly}`}
                                                  >
                                                    <img
                                                      style={{
                                                        maxWidth: "150px",
                                                        maxHeight: "150px",
                                                        paddingBottom: "15px",
                                                      }}
                                                      src={`${formDisplay.fieldDisplay.fieldValueDispaly}`}
                                                    />
                                                  </a>
                                                  {formDisplay.fieldDisplay
                                                    .locationAddress && (
                                                    <p>
                                                      <a
                                                        style={{
                                                          textDecoration:
                                                            "underline",
                                                        }}
                                                        href={`javascript:openLocation('${formDisplay.fieldDisplay.locationLatLong}')`}
                                                      >
                                                        {
                                                          formDisplay
                                                            .fieldDisplay
                                                            .locationAddress
                                                        }
                                                      </a>
                                                    </p>
                                                  )}
                                                  {formDisplay.fieldDisplay
                                                    .locationLatLong && (
                                                    <p>
                                                      <a
                                                        style={{
                                                          textDecoration:
                                                            "underline",
                                                        }}
                                                        href={`javascript:openLocation('${formDisplay.fieldDisplay.locationLatLong}')`}
                                                      >
                                                        {
                                                          formDisplay
                                                            .fieldDisplay
                                                            .locationLatLong
                                                        }
                                                      </a>
                                                    </p>
                                                  )}
                                                </>
                                              )
                                            ) : formDisplay.fieldDisplay
                                                .fieldType === 27 ? (
                                              formDisplay.fieldDisplay
                                                .fieldValueDispaly === null ? (
                                                <></>
                                              ) : (
                                                <>
                                                  {
                                                    formDisplay.fieldDisplay
                                                      .fieldValueDispaly
                                                  }
                                                  <a
                                                    target="_blank"
                                                    href={`${formDisplay.fieldDisplay.fieldValueDispaly}`}
                                                  >
                                                    <img
                                                      style={{
                                                        maxWidth: "150px",
                                                        maxHeight: "150px",
                                                        paddingBottom: "15px",
                                                      }}
                                                      src={`${formDisplay.fieldDisplay.fieldValueDispaly}`}
                                                    />
                                                  </a>
                                                  {formDisplay.fieldDisplay
                                                    .locationAddress && (
                                                    <p>
                                                      <a
                                                        style={{
                                                          textDecoration:
                                                            "underline",
                                                        }}
                                                        href={`javascript:openLocation('${formDisplay.fieldDisplay.locationLatLong}')`}
                                                      >
                                                        {
                                                          formDisplay
                                                            .fieldDisplay
                                                            .locationAddress
                                                        }
                                                      </a>
                                                    </p>
                                                  )}
                                                  {formDisplay.fieldDisplay
                                                    .locationLatLong && (
                                                    <p>
                                                      <a
                                                        style={{
                                                          textDecoration:
                                                            "underline",
                                                        }}
                                                        href={`javascript:openLocation('${formDisplay.fieldDisplay.locationLatLong}')`}
                                                      >
                                                        {
                                                          formDisplay
                                                            .fieldDisplay
                                                            .locationLatLong
                                                        }
                                                      </a>
                                                    </p>
                                                  )}
                                                </>
                                              )
                                            ) : formDisplay.fieldDisplay
                                                .fieldType === 33 ? (
                                              formDisplay.fieldDisplay
                                                .fieldValueDispaly === null ? (
                                                <></>
                                              ) : (
                                                <>
                                                  <a
                                                    target="_blank"
                                                    href={`${formDisplay.fieldDisplay.fieldValueDispaly}`}
                                                  >
                                                    <img
                                                      style={{
                                                        maxWidth: "150px",
                                                        maxHeight: "150px",
                                                        paddingBottom: "15px",
                                                      }}
                                                      src={`${formDisplay.fieldDisplay.fieldValueDispaly}`}
                                                    />
                                                  </a>
                                                  {formDisplay.fieldDisplay
                                                    .locationAddress && (
                                                    <p>
                                                      <a
                                                        style={{
                                                          textDecoration:
                                                            "underline",
                                                        }}
                                                        href={`javascript:openLocation('${formDisplay.fieldDisplay.locationLatLong}')`}
                                                      >
                                                        {
                                                          formDisplay
                                                            .fieldDisplay
                                                            .locationAddress
                                                        }
                                                      </a>
                                                    </p>
                                                  )}
                                                  {formDisplay.fieldDisplay
                                                    .locationLatLong && (
                                                    <p>
                                                      <a
                                                        style={{
                                                          textDecoration:
                                                            "underline",
                                                        }}
                                                        href={`javascript:openLocation('${formDisplay.fieldDisplay.locationLatLong}')`}
                                                      >
                                                        {
                                                          formDisplay
                                                            .fieldDisplay
                                                            .locationLatLong
                                                        }
                                                      </a>
                                                    </p>
                                                  )}
                                                </>
                                              )
                                            ) : formDisplay.fieldDisplay
                                                .fieldType === 7 ? (
                                              formDisplay.fieldDisplay
                                                .fieldValueDispaly === null ? (
                                                <></>
                                              ) : (
                                                <>
                                                  {
                                                    formDisplay.fieldDisplay
                                                      .fieldValueDispaly
                                                  }
                                                </>
                                              )
                                            ) : formDisplay.fieldDisplay
                                                .fieldType === 14 ? (
                                              formDisplay.fieldDisplay
                                                .fieldValueDispaly === null ? (
                                                <></>
                                              ) : (
                                                <>
                                                  {
                                                    formDisplay.fieldDisplay
                                                      .fieldValueDispaly
                                                  }
                                                </>
                                              )
                                            ) : formDisplay.fieldDisplay
                                                .fieldType === 15 ? (
                                              formDisplay.fieldDisplay
                                                .fieldValueDispaly === null ? (
                                                <></>
                                              ) : (
                                                <>
                                                  {
                                                    formDisplay.fieldDisplay
                                                      .fieldValueDispaly
                                                  }
                                                </>
                                              )
                                            ) : formDisplay.fieldDisplay
                                                .fieldType === 17 ? (
                                              formDisplay.fieldDisplay
                                                .fieldValueDispaly === null ? (
                                                <></>
                                              ) : (
                                                <>
                                                  {formDisplay.fieldDisplay.genericMultiSelects?.map(
                                                    (multiSelectList, idx) => (
                                                      <span key={idx}>
                                                        {multiSelectList.title}
                                                        &nbsp;&nbsp;
                                                      </span>
                                                    )
                                                  )}
                                                </>
                                              )
                                            ) : formDisplay.fieldDisplay
                                                .fieldType === 30 ? (
                                              formDisplay.fieldDisplay
                                                .fieldValueDispaly === null ? (
                                                <></>
                                              ) : (
                                                <>
                                                  {formDisplay.fieldDisplay.genericMultiSelects?.map(
                                                    (multiSelectList, idx) => (
                                                      <span key={idx}>
                                                        {multiSelectList.title}
                                                        &nbsp;&nbsp;
                                                      </span>
                                                    )
                                                  )}
                                                </>
                                              )
                                            ) : formDisplay.fieldDisplay
                                                .fieldType === 25 ? (
                                              formDisplay.fieldDisplay
                                                .fieldValueDispaly === null ? (
                                                <></>
                                              ) : (
                                                <>
                                                  {
                                                    formDisplay.fieldDisplay
                                                      .fieldValueDispaly
                                                  }
                                                </>
                                              )
                                            ) : formDisplay.fieldDisplay
                                                .fieldType === 32 ? (
                                              formDisplay.fieldDisplay
                                                .fieldValueDispaly === null ? (
                                                <></>
                                              ) : (
                                                <>
                                                  {
                                                    formDisplay.fieldDisplay
                                                      .fieldValueDispaly
                                                  }
                                                </>
                                              )
                                            ) : (
                                              <>
                                                {
                                                  formDisplay.fieldDisplay
                                                    .fieldValueDispaly
                                                }
                                              </>
                                            )}
                                          </Typography>
                                        </>
                                      )}
                                    </Typography>
                                  </Stack>
                                ))}
                            </>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>

                {get_selectedCustomerDetails_data?.fromCustomers === false ||
                get_selectedCustomerDetails_data?.fromCustomers === null ? (
                  <>
                    <Stack
                      sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <Stack sx={{ width: "95%" }}>
                        <Stack
                          sx={{
                            flexDirection: "row",
                            width: "100%",
                            "& > *": {
                              width: "50%",
                              height: { sm: "45px", xs: "30px" },
                              fontWeight: "600",
                              fontSize: {
                                sm: "14px",
                                xs: "10px",
                              },
                            },
                            gap: 1,
                          }}
                        >
                          <Button
                            variant="outlined"
                            onClick={() =>
                              handleViewActivity(
                                get_selectedCustomerDetails_data?.customer
                                  ?.customerId
                              )
                            }
                          >
                            view activities
                          </Button>
                          {(get_selectedCustomerDetails_data?.customer
                            ?.customerCheckIn === true &&
                            get_selectedCustomerDetails_data?.activityWhenCheckIn ===
                              false) ||
                            (get_selectedCustomerDetails_data?.customer
                              ?.customerCheckIn === true &&
                              get_selectedCustomerDetails_data?.activityWhenCheckIn ===
                                true && (
                                <Button variant="contained">activit 1</Button>
                              ))}{" "}
                          {get_selectedCustomerDetails_data?.customer
                            ?.customerCheckIn === false &&
                            get_selectedCustomerDetails_data?.activityWhenCheckIn ===
                              true && (
                              <Button variant="contained">activity 2</Button>
                            )}
                            {/* activity button */}
                          {get_selectedCustomerDetails_data?.customer
                            ?.customerCheckIn === false &&
                            get_selectedCustomerDetails_data?.activityWhenCheckIn ===
                              false && (
                              <Button
                                variant="contained"
                                onClick={() =>
                                  handleActivity(
                                    get_selectedCustomerDetails_data?.customer
                                      ?.customerId,
                                    get_selectedCustomerDetails_data?.dayPlanId
                                  )
                                }
                              >
                                acitivity 
                              </Button>
                            )}
                        </Stack>
                      </Stack>
                    </Stack>
                  </>
                ) : (
                  <Stack
                    sx={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Stack sx={{ width: "95%" }}>
                      <Stack
                        sx={{
                          flexDirection: "row",
                          width: "100%",
                          "& > *": {
                            width: "50%",
                            height: { sm: "45px", xs: "30px" },
                            fontWeight: "600",
                            fontSize: {
                              sm: "14px",
                              xs: "10px",
                            },
                          },
                          gap: 1,
                        }}
                      >
                        <Button
                          variant="outlined"
                          onClick={() =>
                            handleViewActivity(
                              get_selectedCustomerDetails_data?.customer
                                ?.customerId
                            )
                          }
                        >
                          view activities
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() =>
                            handleActivity(
                              get_selectedCustomerDetails_data?.customer
                                ?.customerId,
                              get_selectedCustomerDetails_data?.customer
                                ?.customerName
                            )
                          }
                        >
                          activity
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                )}
              </Stack>
            ) : (
              <Typography>No customer found</Typography>
            )}
          </>
        )}
      </Stack>
    </div>
  );
};

export default CustomerDetails;
