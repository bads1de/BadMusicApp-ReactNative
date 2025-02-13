import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import getSongsByGenre from "@/actions/getSongsByGenre";
import ListItem from "@/components/ListItem";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useLocalSearchParams } from "expo-router";
import { CACHED_QUERIES } from "@/constants";

export default function GenreSongsScreen() {
  const router = useRouter();
  const { genre } = useLocalSearchParams();
  const {
    data: songs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [CACHED_QUERIES.genre, genre],
    queryFn: () => getSongsByGenre(genre as string),
    enabled: !!genre,
  });

  const { playSong } = useAudioPlayer(songs);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>{genre} の曲一覧</Text>
        </View>
        <FlatList
          data={songs}
          renderItem={({ item }) => (
            <ListItem
              song={item}
              onPress={async (song) => {
                await playSong(song);
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
});
