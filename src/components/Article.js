import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import Moment from "react-moment";
import { COLORS } from "../constants";

const useStyles = makeStyles({
  container: {
    background: COLORS.articleBackground,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    width: "30%",
    padding: "16px",
    margin: "16px",
    borderRadius: "8px",
    [`@media screen and (max-height: 1440px) and (max-width: 990px)`]: {
      width: "90%",
    },
  },
  media: {
    width: "100%",
    borderRadius: "8px",
  },
  link: {
    color: "blue",
    textDecoration: "underline",
    "&:hover": {
      cursor: "pointer",
    },
  },
});

const Article = (props) => {
  const classes = useStyles();

  const openWebPage = (url) => {
    window.open(url);
  };
  return (
    <Box className={classes.container}>
      <Typography variant="h4" align="center" noWrap>
        {String(props.article.clean_url).toUpperCase()}
      </Typography>
      <hr />
      <Typography variant="h5">{props.article.title}</Typography>
      <Typography variant="subtitle1">
        By:{" "}
        {props.article.author ? props.article.authors.join(", ") : "Anonymous"}
      </Typography>
      <Typography variant="subtitle2">
        Published:
        {/* Moment Documentation: https://momentjs.com/docs/#/parsing/string-format/ */}
        <Moment
          date={props.article.published_date}
          parse="YYYY-MM-DD HH:mm:ss"
          format=" MMMM D, YYYY, h:mA"
        />
      </Typography>
      <img
        src={props.article.media}
        className={classes.media}
        alt="Article Media"
      />
      <Typography variant="body1">{props.article.summary}...</Typography>
      <Typography
        variant="body1"
        onClick={() => {
          openWebPage(props.article.link);
        }}
        className={classes.link}
      >
        View Full Link
      </Typography>
    </Box>
  );
};

export default Article;
