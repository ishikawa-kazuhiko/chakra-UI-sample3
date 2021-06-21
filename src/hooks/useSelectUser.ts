import { useCallback, useState } from "react";
import { User } from "../types/api/user";

type Props = {
  id: number;
  users: Array<User>;
  onOpen: () => void;
};

// 選択したユーザー情報を特定しモーダルを表示するカスタムフック
export const useSelectUser = () => {
  //何故、ここで型がUser、又は、nullと定義されるのか？
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const onSelectUser = useCallback((props: Props) => {
    const { id, users, onOpen } = props;
    //条件に一致する最初の要素を返してくる
    const targetUser = users.find((user) => user.id === id);

    // //??は左辺がundefind、又は、nullのとき、nullをセットする
    // setSelectedUser(targetUser ?? null);

    //上記のfindで、undefindがあるかもしれないということだが、
    //明示的にundefindがないことを示すために、後ろに!をつける
    //typescriptを無視した形になる。確実にあるときだけ使用する
    setSelectedUser(targetUser!);
    onOpen();
  }, []);
  return { onSelectUser, selectedUser };
};
