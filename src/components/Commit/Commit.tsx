import { Box, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { COMMITS_USER } from "../../Store/Selector";

export interface CommitsUser {
  commit: {
    author: {
      name: string;
      date: string;
    };
    message: string;
  };
  sha: string;
}

export function Commits() {
  const commitsUser: CommitsUser[] = useSelector(COMMITS_USER);

  return (
    <Box>
      {!commitsUser[0]?.sha.length ? (
        <Box className={"no-commits"}>No Commits</Box>
      ) : (
        commitsUser.map((item, index) => (
          <Box className="content " key={index}>
            <Box className={"border-item border-padding"}>
              <Typography className={"block-author"}>
                Author: {item.commit.author.name}
              </Typography>
              <Typography>Message: {item.commit.message}</Typography>
            </Box>
            <Box className={"sha-and-date-block"}>
              <Box className={"sha-block-cont"}>
                <Typography className={"border-box  border-item"}>
                  sha:
                </Typography>
                <Typography className={"border-box border-value"}>
                  {" "}
                  {item.sha}
                </Typography>
              </Box>
              <Box className={"border-bot"}>
                <Typography className={"date-block-flex"}>
                  Date: {item.commit.author.date.toString().split("T")[0]}{" "}
                  {
                    item.commit.author.date
                      .toString()
                      .split("T")[1]
                      .split("Z")[0]
                  }
                </Typography>
              </Box>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
}
