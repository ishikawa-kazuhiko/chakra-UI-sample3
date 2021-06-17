import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

type Props = {
  title: string;
  status: "info" | "warning" | "success" | "error";
};

export const useMessage = () => {
  const toast = useToast();
  //再レンダリングされないようにuseCallbackで囲う
  const showMessage = useCallback(
    (props: Props) => {
      const { title, status } = props;

      toast({
        title,
        status,
        position: "top",
        duration: 2000, //表示時間2秒
        isClosable: true //閉じているかどうか
      });
    },
    [toast]
  );

  return { showMessage };
};
