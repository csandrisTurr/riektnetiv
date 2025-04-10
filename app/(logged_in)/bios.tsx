import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "@/config";
import { useUser } from "@/contexts/user";
import Input from "@/components/input";
import Button from "@/components/button";
import { useRouter } from "expo-router";

interface Bio {
  handle: string;
  name: string;
  widgets: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  user: string;
}

export default function Bios() {
  const [bios, setBios] = useState<Bio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, setUser } = useUser();
  const router = useRouter();

  const fetchBios = async () => {
      try {
        if (!user?.jwt) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${config.API_BASE_URL}/bio`, {
          headers: {
            Authorization: `Bearer ${user.jwt}`
          }
        });

        setBios(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bios:", err);
        setError("Failed to fetch bios. Please try again later.");
        setLoading(false);
      }
    };

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    fetchBios();
  };

  const handleLogout = () => {
    setUser(null);
    router.replace("/login");
  };

  useEffect(() => {
    fetchBios();
  }, [user]);


  const renderBioItem = ({ item }: { item: Bio }) => (
    <View style={styles.bioItem}>
      <View style={styles.bioHeader}>
        <Text style={styles.bioName}>{item.name}</Text>
        <Text style={styles.bioHandle}>@{item.handle}</Text>
      </View>
      <View style={styles.bioStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.widgets}</Text>
          <Text style={styles.statLabel}>Widgets</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.views}</Text>
          <Text style={styles.statLabel}>Views</Text>
        </View>
      </View>
      <View style={styles.bioFooter}>
        <Text style={styles.bioDate}>Created: {item.createdAt}</Text>
        <Text style={styles.bioDate}>Updated: {item.updatedAt}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.page}>
        <ActivityIndicator size="large" color="#F4F4F5" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.page}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Filter bios based on search query
  const filteredBios = bios.filter(bio => {
    const query = searchQuery.toLowerCase();
    return (
      bio.name.toLowerCase().includes(query) ||
      bio.handle.toLowerCase().includes(query)
    );
  });

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Bios</Text>
        <View style={styles.headerButtons}>
          <Button text="Refresh" onPress={handleRefresh} />
          <Button text="Logout" onPress={handleLogout} />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <Input 
          placeholder="Search by name or handle"
          text={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {bios.length === 0 ? (
        <Text style={styles.emptyText}>No bios found</Text>
      ) : (
        <FlatList
          data={filteredBios}
          renderItem={renderBioItem}
          keyExtractor={(item) => item.handle}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#18181B',
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  title: {
    color: '#F4F4F5',
    fontSize: 32,
    fontFamily: "Gabarito_400Regular",
  },
  searchContainer: {
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 24,
  },
  bioItem: {
    backgroundColor: '#27272A',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  bioHeader: {
    marginBottom: 12,
  },
  bioName: {
    color: '#F4F4F5',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bioHandle: {
    color: '#A1A1AA',
    fontSize: 16,
  },
  bioStats: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statItem: {
    marginRight: 24,
  },
  statValue: {
    color: '#F4F4F5',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#A1A1AA',
    fontSize: 14,
  },
  bioFooter: {
    borderTopWidth: 1,
    borderTopColor: '#3F3F46',
    paddingTop: 12,
  },
  bioDate: {
    color: '#A1A1AA',
    fontSize: 14,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    color: '#A1A1AA',
    fontSize: 16,
    textAlign: 'center',
  },
})
