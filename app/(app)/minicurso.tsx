import { allCoursesData } from "@/coursesData/courses";
import { useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from "react-native";




export default function MiniCursoScreen() {
    const router = useRouter();

    const navigateToCourseDetail = (courseSlug: string) => {
        router.push({
            pathname: '/cursos/[slug]',
            params: {slug: courseSlug}
        });
    }


    const renderCourseItem = ({ item }: { item: typeof allCoursesData[0] }) => (
    <TouchableOpacity
      style={styles.courseCard}
      onPress={() => navigateToCourseDetail(item.slug)}
    >
      <Text style={styles.courseIcon}>{item.icon}</Text>
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Seus Minicursos</Text>
      <FlatList
        data={allCoursesData}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF', 
    paddingTop: 80, 
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333C57',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333C57',
    marginBottom: 5,
  },
  courseDescription: {
    fontSize: 14,
    color: '#666',
  },
});