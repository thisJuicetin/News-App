import React, { useEffect, useState } from "react";
import { Box, Collapse, makeStyles, Typography } from "@material-ui/core";
import { COLORS } from "../constants";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Article from "./Article";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    width: "100%",
    minHeight: "100%",
    justifyContent: "center",
    alignItems: "center",
    [`@media screen and (max-height: 1440px) and (max-width: 990px)`]: {
      flexDirection: "column",
    },
  },
  container: {
    background: COLORS.articleBackground,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    maxWidth: "40%",
    padding: "16px 16px 8px 16px",
    margin: "16px",
    borderRadius: "8px",
    [`@media screen and (max-height: 1440px) and (max-width: 990px)`]: {
      maxWidth: "80%",
    },
  },
  articleLink: {
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
});

const ArticleList = (props) => {
  const classes = useStyles();
  const isMobile =
    window.innerHeight <= 1440 && window.innerWidth <= 990 ? true : false;
  const articles = props.articles;
  const [article, setArticle] = useState();
  const [selectedArticle, setSelectedArticle] = useState();
  const [expanded, setExpanded] = useState(true);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const ArticlePreview = (props) => {
    return (
      <Typography
        variant="body1"
        className={classes.articleLink}
        style={props.selected ? { textDecoration: "underline" } : {}}
      >
        {props.index + 1}. {props.article.title}
      </Typography>
    );
  };
  useEffect(() => {
    setArticle(null);
  }, [props.articles]);

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.container}>
        <Typography variant="h4" align="center">
          {props.query}
        </Typography>
        <hr />
        <Collapse in={expanded}>
          {articles
            ? articles.map((article, i) => {
                return (
                  <Box
                    onClick={() => {
                      setArticle(<Article article={article} />);
                      setSelectedArticle(i);
                      if (isMobile) toggleExpanded();
                    }}
                    key={article.date + " " + i}
                  >
                    <ArticlePreview
                      article={article}
                      index={i}
                      selected={selectedArticle === i}
                    />
                  </Box>
                );
              })
            : "No articles were found."}
        </Collapse>
        {isMobile ? (
          <Box
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={toggleExpanded}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Box>
        ) : (
          ""
        )}
      </Box>
      {article ? article : ""}
    </Box>
  );
};

export default ArticleList;
