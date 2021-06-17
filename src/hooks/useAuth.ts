import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router";

import { user } from "../types/api/user";
import { useMessage } from "./useMessage";

export const useAuth = () => {
  //画面遷移でuseHistoryを使う
  const history = useHistory();
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);

  //不要な再レンダリングが走らないようにuseCallbackを設定する
  const login = useCallback(
    (id: string) => {
      setLoading(true);

      axios
        .get<user>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            showMessage({ title: "ログインしました", status: "success" });
            // console.log(res.data);
            history.push("/home");
          } else {
            showMessage({ title: "ユーザーが見つかりません", status: "error" });
          }
        })
        .catch(() =>
          showMessage({ title: "ログインできません", status: "error" })
        )
        .finally(() => setLoading(false));
    },
    [history, showMessage]
  );
  return { login, loading };
};
