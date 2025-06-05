import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getArticleForNewTrue } from "../../redux/slices/KnowledgeBaseModule";

const KnowledgeBaseComponent = () => {
  const [searchParams] = useSearchParams();
 const viewType = Number(searchParams.get("viewType"));
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { articleDataForNew, isarticleDataForNew } = useSelector(
    (state) => state.KnowledgeBaseReducerModule
  );
  useEffect(() => {
   
    if (viewType) {
      dispatch(getArticleForNewTrue(viewType));
    }
    console.log(articleDataForNew.knowledgeBaseDashboards);
  }, [dispatch, viewType]);

  const typographyStyle = {};

  const handleNavTo = ({ id, forView }) => {
    if (viewType === 2 || viewType === 3) {
      forView = true;
    }
    navigation(`/manage/article/${id}?forview=${forView}`);
  };

  return (
    <div>
      <Box
        sx={{
          mt: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <>
          <>
            {typeof isarticleDataForNew === "undefined" ||
            isarticleDataForNew === null ? (
              <Typography>Loading...</Typography>
            ) : isarticleDataForNew ? (
              <Typography>Loading ....</Typography>
            ) : (
              <>
                {articleDataForNew?.knowledgeBaseDashboards?.length > 0 ? (
                  <Stack sx={{ width: { sm: "90%", xs: "95%" } }}>
                    <Typography sx={typographyStyle}>
                      {viewType == 1
                        ? "Total Count"
                        : viewType == 2
                        ? "Total Viewed"
                        : viewType == 3
                        ? "Total Unviewed"
                        : ""}
                    </Typography>
                    <Stack
                      sx={{ flexDirection: "row", flexWrap: "wrap", gap: 1 }}
                    >
                      {articleDataForNew?.knowledgeBaseDashboards?.map(
                        (each) => (
                          <Stack
                            sx={{
                              mt: 2,
                              width: "300px",
                              border: "1px solid #EEEE",
                              py: 1,
                              px: 2,
                              borderRadius: "7px",
                              bgcolor: "#FFF",
                            }}
                          >
                            <Stack>
                              <Typography>{each.title}</Typography>
                              <Box
                                sx={{
                                  textAlign: "center",

                                  alignItems: "center",
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <Typography
                                  sx={{
                                    p: 1,
                                    width: "30px",
                                    bgcolor: "#EEEE",
                                    borderRadius: "50%",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    handleNavTo({
                                      id: each.articleId,
                                      forView: false,
                                    })
                                  }
                                >
                                  {viewType === 1 && each.totalCount}
                                  {viewType === 2 && each.viewedCount}
                                  {viewType === 3 &&each.unviewedCount}
                                </Typography>
                              </Box>
                            </Stack>
                          </Stack>
                        )
                      )}
                    </Stack>
                  </Stack>
                ) : (
                  <Typography>No data{isarticleDataForNew}</Typography>
                )}
              </>
            )}
          </>
        </>
      </Box>
    </div>
  );
};

export default KnowledgeBaseComponent;
