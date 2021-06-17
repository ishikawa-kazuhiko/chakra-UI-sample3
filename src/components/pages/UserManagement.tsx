/* eslint-disable react-hooks/exhaustive-deps */
import {
  Center,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  useDisclosure,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import { memo, useCallback, useEffect, VFC } from "react";

import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";

export const UserManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, users, loading } = useAllUsers();

  //初期マウント時にで１回だけgetUsersが実行
  useEffect(() => getUsers(), []);

  const onClickUser = useCallback(() => onOpen(), []);

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
                onClick={onClickUser} //なぜこうなるのか確認
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        autoFocus={false}
        // motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ユーザー詳細</ModalHeader>
          <ModalCloseButton />
          <ModalBody mx={4}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>名前</FormLabel>
                <Input value="山田太郎" isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel>フルネーム</FormLabel>
                <Input value="山田太郎" isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel>Mail</FormLabel>
                <Input value="aaa@aaa.co.jp" isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel>Tel</FormLabel>
                <Input value="000-0000-9999" isReadOnly />
              </FormControl>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});
