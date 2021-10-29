import { Box, CardMedia, Typography } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import StarIcon from "@material-ui/icons/Star";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { getCommitsWithGit } from "../../Store/Effect";
import store from "../../Store/Store";
import {
  ActionDeleteUserCommits,
  ActionOutputCommitsRepoUser,
} from "../../Store/Action";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useSelector } from "react-redux";
import { CHECK_EXPANDED } from "../../Store/Selector";
import React from "react";

export interface DescProps {
  item: {
    data: {
      html_url: string;
      name: string;
      subscribers_count: string;
      watchers: string;
      forks: string;
      language: string;
      owner: {
        avatar_url: string;
        html_url: string;
        login: string;
      };
    };
  };
}

export function Repository(props: DescProps) {
  const expandedLogin: string = useSelector(CHECK_EXPANDED);
  const refreshCommits = async (
    e: React.MouseEvent<SVGSVGElement>,
    login: string,
    nameRepo: string
  ) => {
    e.stopPropagation();
    store.dispatch(ActionDeleteUserCommits(login));
    await store.dispatch(getCommitsWithGit(login, nameRepo));
    if (expandedLogin === login) {
      store.dispatch(ActionOutputCommitsRepoUser(login));
    }
    return 0;
  };

  return (
    <>
      <span />
      <span />
      <span />
      <span />
      <Box className="cont-avatar">
        <CardMedia
          className={"img-avatar"}
          image={props.item.data.owner.avatar_url}
          title="avatar"
        />
      </Box>

      <Box className="cont-text">
        <Typography>
          {" "}
          User name:{" "}
          <a
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noreferrer"
            href={props.item.data.owner.html_url}
          >
            {props.item.data.owner.login}
          </a>
        </Typography>
        <div className={"link-name-repo"}>
          Name repositories:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            className={"link-name-repo"}
            onClick={(e) => e.stopPropagation()}
            href={props.item.data.html_url}
          >
            {props.item.data.name}
          </a>
        </div>
        <RefreshIcon
          className={"btn-refresh-commits"}
          onClick={(event) => {
            refreshCommits(
              event,
              props.item.data.owner.login,
              props.item.data.name
            ).then();
          }}
        />
      </Box>

      <Box className="cont-info">
        <Box className={"root-flex-cont"}>
          <Box className="flex-cont">
            <Typography className={"flex-cont border-box border-item"}>
              <VisibilityIcon />
              Watcher{" "}
            </Typography>
            <Typography className={"border-box border-value"}>
              {props.item.data.subscribers_count}
            </Typography>
          </Box>

          <Box className="flex-cont">
            <Typography className={"flex-cont border-box border-item"}>
              <StarIcon />
              Star{" "}
            </Typography>
            <Typography className={"border-box border-value"}>
              {" "}
              {props.item.data.watchers}{" "}
            </Typography>
          </Box>

          <Box className="flex-cont">
            <Typography className={"flex-cont  border-box border-item"}>
              <AccountTreeIcon />
              Fork{" "}
            </Typography>
            <Typography className={"border-box border-value"}>
              {props.item.data.forks}
            </Typography>
          </Box>
        </Box>
        {props.item.data.language ? (
          <div>Language: {props.item.data.language}</div>
        ) : (
          <div className={"cont-info"} />
        )}
      </Box>
    </>
  );
}
