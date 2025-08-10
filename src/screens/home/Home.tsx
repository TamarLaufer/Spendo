import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenLayout from '../../components/screenLayout/ScreenLayout';

const Home = () => {
  return (
    <ScreenLayout>
      <View style={styles.container}>
        <Text style={styles.text}>שלום עמוד הבית </Text>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Assistant',
    fontSize: 20,
  },
});

export default Home;

// import React from 'react';
// import { View, Text, ScrollView } from 'react-native';

// const FONTS = [
//   'PlaypenSansHebrew-Regular', // הפונט שעובד אצלך
//   'Assistant', // אמור לעבוד
//   'Fredoka', // לא תומך בעברית
//   'Rubik', // לדוגמה
//   'VarelaRound', // אם קיים
//   'Rubik',
// ];

// export default function Home() {
//   return (
//     <ScrollView contentContainerStyle={{ padding: 20 }}>
//       {FONTS.map(font => (
//         <View key={font} style={{ marginBottom: 24 }}>
//           <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{font}</Text>
//           <Text style={{ fontSize: 22, fontFamily: font }}>
//             עברית: אבגדהוז חטיכלמנסעפצקרשת
//           </Text>
//           <Text style={{ fontSize: 22, fontFamily: font }}>
//             English: The quick brown fox
//           </Text>
//         </View>
//       ))}
//     </ScrollView>
//   );
// }
