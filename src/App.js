import React, { useState } from "react";
import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import { COLORS } from "./constants.js";
import ArticleList from "./components/ArticleList.js";
import { getArticles } from "./utils/FreeNewsAPI.js";

const useStyles = makeStyles({
  root: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: COLORS.background,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  textField: {
    "& .MuiInputBase-input.MuiOutlinedInput-input": {
      backgroundColor: "#f8f8ff",
      borderRadius: "4px",
    },
    margin: "16px 8px 8px 8px",
  },
});

const App = () => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [textField, setTextField] = useState("");

  const queryArticles = async () => {
    const query = textField;
    setTextField("");
    const articles = await getArticles(query);
    setArticles(articles);
    setQuery(query.toUpperCase());
  };

  return (
    <Box className={classes.root}>
      <TextField
        id="outlined-basic"
        className={classes.textField}
        label="Topic"
        variant="outlined"
        value={textField}
        onChange={(e) => setTextField(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            queryArticles();
          }
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={queryArticles}
        style={{ marginBottom: "8px", backgroundColor: COLORS.button }}
      >
        Search News
      </Button>
      <Box className={classes.container}>
        {query ? <ArticleList query={query} articles={articles} /> : ""}
      </Box>
    </Box>
  );
};

export default App;
