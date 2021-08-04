import React from "react";
import { Button } from "@components/index";
import "./index.less";

interface Props {
}
const Home: React.FC<Props> = (props: Props) => {
  return (
    <div className={"Home"}>
      <div>home</div>
      <Button />
    </div>
  );
};
export default Home;
