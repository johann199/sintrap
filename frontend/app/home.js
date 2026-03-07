 import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const ROL_ACTUAL = 'conductor'; // 'usuario' | 'conductor' | 'administrativo'

const NAV_CONFIGS = {
  usuario: [
    { key: 'inicio',    label: 'Home',      icon: 'home',    lib: 'Ionicons'      },
    { key: 'favoritos', label: 'Favoritos', icon: 'heart',   lib: 'Ionicons'      },
    { key: 'rutas',     label: 'Rutas',     icon: 'bus', lib: 'Ionicons' },
   // { key: 'rutas', label: 'Rutas', icon: 'map-marker-path', lib: 'MaterialCommunityIcons' },
    { key: 'perfil',    label: 'Perfil',    icon: 'person',  lib: 'Ionicons'      },
  ],
  conductor: [
    { key: 'inicio',    label: 'Home',     icon: 'home',     lib: 'Ionicons'      },
    { key: 'rutas',     label: 'Rutas',    icon: 'settings-input-composite', lib: 'MaterialIcons' },
    { key: 'agregar',   label: 'Agregar',  icon: 'add',      lib: 'Ionicons'      },
    { key: 'bus',       label: 'Bus',      icon: 'bus',      lib: 'Ionicons'      },
    { key: 'stats',     label: 'Stats',    icon: 'bar-chart',lib: 'Ionicons'      },
  ],
  administrativo: [
    { key: 'inicio',    label: 'Home',     icon: 'home',          lib: 'Ionicons' },
    { key: 'usuarios',  label: 'Usuarios', icon: 'people',        lib: 'Ionicons' },
    { key: 'rutas',     label: 'Rutas',    icon: 'map',           lib: 'Ionicons' },
    { key: 'reportes',  label: 'Reportes', icon: 'document-text', lib: 'Ionicons' },
    { key: 'config',    label: 'Config',   icon: 'settings',      lib: 'Ionicons' },
  ],
};

function NavIcon({ lib, icon, size, color }) {
  if (lib === 'MaterialIcons') return <MaterialIcons name={icon} size={size} color={color} />;
  return <Ionicons name={icon} size={size} color={color} />;
}

export default function Home() {
  const tabs = NAV_CONFIGS[ROL_ACTUAL];
  const [activeTab, setActiveTab] = useState('inicio');

  return (
    <View style={styles.container}>

      {/* Header verde oscuro */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hola Nombre</Text>
        <Text style={styles.headerSub}>¿a donde vamos hoy?</Text>
      </View>

      {/* Contenido con degradado verde */}
      <LinearGradient
        colors={['#2D6A2D', '#A8D5A2', '#e8f5e9']}
        style={styles.gradient}
      >
        {/* Botón de alerta */}
        <TouchableOpacity style={styles.alertBtn}>
          <Ionicons name="notifications" size={16} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.alertText}>Avisarme cuando el bus este cerca</Text>
        </TouchableOpacity>

      </LinearGradient>

      {/* Barra de navegación */}
      <View style={styles.navContainer}>
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.navTab}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.7}
            >
              <NavIcon
                lib={tab.lib}
                icon={tab.icon}
                size={24}
                color={isActive ? '#2D6A2D' : '#555'}
              />
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#1B5E20',
    paddingTop: Platform.OS === 'ios' ? 56 : 48,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
  },
  headerSub: {
    fontSize: 14,
    color: '#A5D6A7',
    marginTop: 4,
  },
  gradient: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  alertBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  alertText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  navContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 10,
  },
  navTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  navLabel: {
    fontSize: 10,
    color: '#888',
  },
  navLabelActive: {
    color: '#2D6A2D',
    fontWeight: '700',
  },
});