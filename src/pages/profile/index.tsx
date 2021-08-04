import React from "react";
import renderRoutes from "react-router-config";
import moment from "moment";
import "moment/locale/zh-cn"; //手动引入所需要的语言包，IgnorePlugin 里ignore了语言包，这里需要手动引入使用


moment.locale("zh-cn");
console.log("moment", moment().endOf("day").fromNow());
interface Props {}

const Profile: React.FC<Props> = (props: Props) => {
  return (
    <div className={"Profile"}>
      Profile
    </div>
  );
};
export default Profile;
