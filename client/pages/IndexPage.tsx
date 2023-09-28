import {
  Button,
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { trpc } from "../utils/trpc";
import { useState } from "react";

export default function IndexPage() {
  const [name, setName] = useState("Useless Text");

  const {
    data: users,
    isLoading: userLoading,
    refetch,
  } = trpc.user.getUsers.useQuery();
  const { data, isLoading } = trpc.user.getUserById.useQuery("2");

  const mutation = trpc.user.createUser.useMutation({
    onSuccess: () => refetch(),
  });

  const handleChange = (text: string) => {
    setName(text);
  };

  const handleSubmit = () => {
    setName("");
    mutation.mutate({ name });
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (userLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginTop: 120 }}>
        {users?.map((user) => (
          <Text key={user.id}>{user.name}</Text>
        ))}
      </View>
      <View style={{ marginTop: 120 }}>
        <Text>{data?.name}</Text>
      </View>
      <View style={{ marginTop: 120 }}>
        <TextInput
          style={styles.input}
          onChangeText={handleChange}
          value={name}
        />
        <Button onPress={handleSubmit} title="Submit" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
