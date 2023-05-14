import { Link } from "react-router-dom";

import { appURL } from "@/components/functions/appURL";

export function PhotoPresenter() {
  return (
    <Link to={appURL.photoDetail.replace(":id", "1")}>
      <div className="h-10 w-10 bg-slate-500" />
    </Link>
  );
}
