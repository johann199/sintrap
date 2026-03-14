import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

/**
 * ProfileCard Component
 *
 * Props:
 * - name: string
 * - email: string
 * - isActive: boolean
 * - avatarUri: string | null
 * - role: "usuario" | "admin" | "conductor"
 *
 * Handlers comunes:
 * - onTripHistory, onNotifications, onEditProfile
 * - onSettings, onChangePassword, onLogout
 *
 * Solo admin:
 * - onManageUsers, onReports, onManageRoutes
 *
 * Solo conductor:
 * - onMyVehicle, onAssignedRoutes, onToggleService, serviceActive
 */

const ProfileCard = ({
  name = "Nombre",
  email = "nombre@gmail.com",
  isActive = true,
  avatarUri = null,
  role = "usuario",
  onTripHistory,
  onNotifications,
  onEditProfile,
  onSettings,
  onChangePassword,
  onLogout,
  // Admin
  onManageUsers,
  onReports,
  onManageRoutes,
  // Conductor
  onMyVehicle,
  onAssignedRoutes,
  onToggleService,
  serviceActive = true,
}) => {
  const roleConfig = {
    usuario: {
      label: "Usuario activo",
      headerColor: "#27AE60",
      badgeBg: "#E8F8EF",
      badgeText: "#27AE60",
      avatarBg: "#C0392B",
    },
    admin: {
      label: "Administrador",
      headerColor: "#2C6FE0",
      badgeBg: "#EAF0FB",
      badgeText: "#2C6FE0",
      avatarBg: "#1A3A8F",
    },
    conductor: {
      label: "Conductor",
      headerColor: "#E67E22",
      badgeBg: "#FEF5E7",
      badgeText: "#E67E22",
      avatarBg: "#A04000",
    },
  }[role];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* ── Header ── */}
      <View style={[styles.header, { backgroundColor: roleConfig.headerColor }]}>
        <View style={styles.avatarWrapper}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatarPlaceholder, { backgroundColor: roleConfig.avatarBg }]}>
              <Ionicons name="person" size={40} color="#fff" />
            </View>
          )}
        </View>
      </View>

      {/* ── Info ── */}
      <View style={styles.profileInfo}>
        <Text style={styles.name}>{name}</Text>
        <View style={[styles.badgeContainer, { backgroundColor: roleConfig.badgeBg }]}>
          <Text style={[styles.badgeText, { color: roleConfig.badgeText }]}>
            {roleConfig.label}
          </Text>
        </View>
        <Text style={styles.email}>{email}</Text>
      </View>

      {/* ══ SOLO ADMIN ══ */}
      {role === "admin" && (
        <>
          <Text style={styles.sectionTitle}>Administración</Text>
          <View style={styles.card}>
            <MenuItem
              icon={<Ionicons name="people" size={22} color="#2C6FE0" />}
              label="Gestión de usuarios"
              onPress={onManageUsers}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={<Ionicons name="bar-chart" size={22} color="#2C6FE0" />}
              label="Reportes"
              onPress={onReports}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={<MaterialCommunityIcons name="map-marker-path" size={22} color="#2C6FE0" />}
              label="Gestión de rutas"
              onPress={onManageRoutes}
            />
          </View>
        </>
      )}

      {/* ══ SOLO CONDUCTOR ══ */}
      {role === "conductor" && (
        <>
          <Text style={styles.sectionTitle}>Mi servicio</Text>
          <View style={styles.card}>
            <MenuItem
              icon={<Ionicons name="bus" size={22} color="#E67E22" />}
              label="Mi vehículo"
              onPress={onMyVehicle}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={<MaterialCommunityIcons name="map-marker-path" size={22} color="#E67E22" />}
              label="Rutas asignadas"
              onPress={onAssignedRoutes}
            />
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={onToggleService}
              activeOpacity={0.6}
            >
              <View style={styles.iconContainer}>
                <Ionicons
                  name={serviceActive ? "radio-button-on" : "radio-button-off"}
                  size={22}
                  color={serviceActive ? "#27AE60" : "#E74C3C"}
                />
              </View>
              <Text style={styles.menuLabel}>
                Estado:{" "}
                <Text style={{ color: serviceActive ? "#27AE60" : "#E74C3C", fontWeight: "600" }}>
                  {serviceActive ? "En servicio" : "Fuera de servicio"}
                </Text>
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#BDC3C7" />
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* ══ ACTIVIDAD — todos los roles ══ */}
      <Text style={styles.sectionTitle}>Actividad</Text>
      <View style={styles.card}>
        <MenuItem
          icon={<Ionicons name="bus" size={22} color="#27AE60" />}
          label="Historial de viajes"
          onPress={onTripHistory}
        />
        <View style={styles.divider} />
        <MenuItem
          icon={<Ionicons name="notifications" size={22} color="#F5A623" />}
          label="Notificaciones"
          onPress={onNotifications}
        />
      </View>

      {/* ══ CUENTA — todos los roles ══ */}
      <Text style={styles.sectionTitle}>Cuenta</Text>
      <View style={styles.card}>
        <MenuItem
          icon={<Ionicons name="person-circle" size={22} color="#27AE60" />}
          label="Editar perfil"
          onPress={onEditProfile}
        />
        <View style={styles.divider} />
        <MenuItem
          icon={<Ionicons name="settings" size={22} color="#7F8C8D" />}
          label="Configuración"
          onPress={onSettings}
        />
      </View>

      {/* ══ SEGURIDAD — todos los roles ══ */}
      <Text style={styles.sectionTitle}>Seguridad</Text>
      <View style={styles.card}>
        <MenuItem
          icon={<Ionicons name="lock-closed" size={22} color="#27AE60" />}
          label="Cambiar contraseña"
          onPress={onChangePassword}
        />
        <View style={styles.divider} />
        <MenuItem
          icon={<MaterialCommunityIcons name="logout" size={22} color="#E74C3C" />}
          label="Cerrar sesión"
          onPress={onLogout}
          labelStyle={{ color: "#E74C3C" }}
        />
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

/* ── MenuItem reutilizable ── */
const MenuItem = ({ icon, label, onPress, labelStyle }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.6}>
    <View style={styles.iconContainer}>{icon}</View>
    <Text style={[styles.menuLabel, labelStyle]}>{label}</Text>
    <Ionicons name="chevron-forward" size={20} color="#BDC3C7" />
  </TouchableOpacity>
);

/* ── Estilos ── */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
  },

  header: {
    height: 160,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  avatarWrapper: {
    marginBottom: -44,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  avatarPlaceholder: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  profileInfo: {
    alignItems: "center",
    marginTop: 54,
    marginBottom: 20,
    paddingHorizontal: 24,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A2E",
    letterSpacing: 0.3,
  },
  badgeContainer: {
    marginTop: 6,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "500",
  },
  email: {
    marginTop: 8,
    fontSize: 14,
    color: "#7F8C8D",
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#7F8C8D",
    marginTop: 20,
    marginBottom: 8,
    marginHorizontal: 20,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginHorizontal: 16,
    paddingVertical: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginHorizontal: 16,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  iconContainer: {
    width: 30,
    alignItems: "center",
    marginRight: 14,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: "#2C3E50",
    fontWeight: "400",
  },
});

export default ProfileCard;
