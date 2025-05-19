import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetKnowledgeBase } from "../../redux/slices/KnowledgeBaseModule";

const KnowledgeBaseAll = () => {
  const nav = useNavigate();

  const { KnowledgeBaseData, isKnowledgeBaseData } = useSelector(
    (state) => state.KnowledgeBaseReducerModule
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetKnowledgeBase());
  }, [dispatch]);
  const handleArticle = ({ id, forView }) => {
    nav(`/manage/article/${id}?forview=${forView}`);
  };
  return (
    <Box sx={{ mt: 10 }}>
      <Stack sx={{ width: "100%", alignItems: "center" }}>
        <Stack sx={{ width: { sm: "95%", xs: "100%" } }}>
          <Stack
            sx={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 1,
              "& > *": {
                width: { sm: "30%", xs: "95%" },
                border: "1px solid #DDD",
                background: "#fff",
                boxShadow: "0 1px 10px rgba(0,0,0,.05)",
                borderRadius: "5px",
                py: 1,
                px: 1,
                fontSize: { sm: "14px", xs: "10px" },
              },

              "& > * button": {
                borderColor: "red",
                color: "red",
                width: "100px",
                mt: 1,
                textAlign: "center !important",
                alignItems: "center !important",
                fontSize: { sm: "14px !important", xs: "10px !important" },
              },
            }}
          >
            {isKnowledgeBaseData ? (
              <Typography>loading....</Typography>
            ) : (
              <>
                {KnowledgeBaseData?.knowledgeBaseDashboards?.length > 0 &&
                  KnowledgeBaseData?.knowledgeBaseDashboards?.map(
                    (item, index) => (
                      <Stack key={index}>
                        <Typography>{item.title}</Typography>

                        {item.unviewedCount === 0 ? (
                          <Stack
                            sx={{
                              textAlign: "center",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                bgcolor: "#ddd",
                                height: "50px",
                                width: "50px",
                                borderRadius: "50%",
                                textAlign: "center",
                                alignItems: "center",
                                pt: 2,
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleArticle({
                                  id: item.articleId,
                                  forView: false,
                                })
                              }
                            >
                              {item.totalCount}
                            </Typography>
                          </Stack>
                        ) : (
                          <>
                            <Stack
                              sx={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                my: 1,
                              }}
                            >
                              <Typography
                                sx={{
                                  bgcolor: "#ddd",
                                  height: "50px",
                                  width: "50px",
                                  borderRadius: "50%",
                                  textAlign: "center",
                                  pt: 2,
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleArticle({
                                    id: item.articleId,
                                    forView: true,
                                  })
                                }
                              >
                                {item.unviewedCount}
                              </Typography>

                              <Typography
                                sx={{
                                  bgcolor: "#ddd",
                                  height: "50px",
                                  width: "50px",
                                  borderRadius: "50%",
                                  textAlign: "center",
                                  pt: 2,
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleArticle({
                                    id: item.articleId,
                                    forView: false,
                                  })
                                }
                              >
                                {item.totalCount}
                              </Typography>
                            </Stack>
                            <Button variant="outlined">New</Button>
                          </>
                        )}
                      </Stack>
                    )
                  )}
              </>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default KnowledgeBaseAll;
